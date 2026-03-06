<?php

namespace App\Http\Controllers;

use App\Models\RoleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RoleRequestController extends Controller
{
    /**
     * STUDENT: Submit a request to become a writer or editor.
     */
    public function store(Request $request)
    {
        $request->validate([
            'role_name' => 'required|in:writer,editor',
            'justification' => 'required|string|max:1000',
        ]);

        $user = Auth::user();

        // FIX #1: Use standard database query instead of a missing custom model method
        $alreadyHasPending = RoleRequest::where('user_id', $user->id)
            ->where('role_name', $request->role_name)
            ->where('status', 'pending')
            ->exists();

        if ($alreadyHasPending) {
            return back()->with('error', 'You already have a pending application for this role.');
        }

        // Security check: Make sure they don't already HAVE the role
        // Using direct trait method call with docblock to help IDE recognize the method
        /** @var \Spatie\Permission\Traits\HasRoles $user */
        if ($user->hasRole($request->role_name)) {
            return back()->with('error', "You are already a {$request->role_name}.");
        }

        RoleRequest::create([
            'user_id' => $user->id,
            'role_name' => $request->role_name,
            'justification' => $request->justification,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Your application has been submitted successfully and is pending review.');
    }

    /**
     * SUPER ADMIN: View all pending requests.
     */
    public function index()
    {
        $pendingRequests = RoleRequest::with('user')
            ->where('status', 'pending')
            ->latest()
            ->get();

        // FIX #2: Updated this string to exactly match your React file: Admin/RoleRequests
        return Inertia::render('Admin/RoleRequests', [
            'pendingRequests' => $pendingRequests
        ]);
    }

    /**
     * SUPER ADMIN: Approve a request.
     */
    public function approve(RoleRequest $roleRequest)
    {
        // 1. Mark as approved and record who did it
        $roleRequest->update([
            'status' => 'approved',
            'actioned_by' => Auth::id(),
        ]);

        // 2. Actually assign the role to the user!
        $roleRequest->user->assignRole($roleRequest->role_name);

        return back()->with('success', "Application approved. {$roleRequest->user->name} is now a {$roleRequest->role_name}.");
    }

    /**
     * SUPER ADMIN: Reject a request.
     */
    public function reject(RoleRequest $roleRequest)
    {
        $roleRequest->update([
            'status' => 'rejected',
            'actioned_by' => Auth::id(),
        ]);

        return back()->with('success', 'Application has been rejected.');
    }
}