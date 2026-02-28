import CoolButton from '@/Components/CoolButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Alert, Box, Chip, MenuItem, Stack, TextField, Typography } from '@mui/material';
import JoditEditor from 'jodit-react';
import { useMemo, useState } from 'react';

export default function WriterDashboard({ articles, categories, flash }) {
    const createForm = useForm({
        title: '',
        content: '',
        category_id: categories[0]?.id ?? '',
    });

    const [revisionDrafts, setRevisionDrafts] = useState(() => {
        const draftMap = {};
        for (const article of articles) {
            draftMap[article.id] = { title: article.title, content: article.content, category_id: article.category_id };
        }
        return draftMap;
    });

    const drafts = articles.filter((article) => article.status?.name === 'draft');
    const submitted = articles.filter((article) => article.status?.name === 'submitted');
    const needsRevision = articles.filter((article) => article.status?.name === 'needs_revision');
    const publishedCount = articles.filter((article) => article.status?.name === 'published').length;

    const [statusFilter, setStatusFilter] = useState('all');

    const visibleArticles = useMemo(() => {
        if (statusFilter === 'draft') return drafts;
        if (statusFilter === 'submitted') return submitted;
        if (statusFilter === 'needs_revision') return needsRevision;
        return articles;
    }, [articles, drafts, submitted, needsRevision, statusFilter]);

    const joditConfig = useMemo(() => ({
        readonly: false, 
        minHeight: 350, 
        placeholder: 'Start writing your campus story here...',
        style: { background: 'transparent' }
    }), []);

    const handleCreate = (event) => {
        event.preventDefault();
        createForm.post(route('articles.store'), { onSuccess: () => createForm.reset('title', 'content') });
    };

    const updateRevisionField = (articleId, field, value) => {
        setRevisionDrafts((prev) => ({ ...prev, [articleId]: { ...prev[articleId], [field]: value } }));
    };

    const getStatusColor = (statusName) => {
        switch (statusName) {
            case 'draft': return 'default';
            case 'submitted': return 'primary';
            case 'needs_revision': return 'warning';
            case 'published': return 'success';
            default: return 'default';
        }
    };

    // Progression Tier Logic
    const getTierInfo = (count) => {
        if (count >= 20) return { title: 'Expert Strategist', next: 'Max Level', target: 20 };
        if (count >= 10) return { title: 'Senior Columnist', next: 'Expert Strategist', target: 20 };
        if (count >= 5) return { title: 'Seasoned Author', next: 'Senior Columnist', target: 10 };
        if (count >= 1) return { title: 'Junior Contributor', next: 'Seasoned Author', target: 5 };
        return { title: 'Entry-Level Writer', next: 'Junior Contributor', target: 1 };
    };

    const tierInfo = getTierInfo(publishedCount);
    const progressPercentage = Math.min(100, (publishedCount / tierInfo.target) * 100);

    const dashboardAnimations = `
        @keyframes reveal-up {
            0% { transform: translateY(30px); opacity: 0; filter: blur(4px); }
            100% { transform: translateY(0); opacity: 1; filter: blur(0); }
        }
        .animate-reveal-0 { animation: reveal-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
        .animate-reveal-1 { animation: reveal-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
        .animate-reveal-2 { animation: reveal-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
        
        /* Sleek custom scrollbar for the sidebar */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }
    `;

    return (
        <AuthenticatedLayout fullWidth={true}>
            <Head title="Writer Dashboard" />
            <style>{dashboardAnimations}</style>

            <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8 lg:py-12">
                <div className="mb-8 animate-reveal-0">
                    <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Writer Workspace
                    </h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                        Draft new stories, track your rank, and manage your campus publications.
                    </p>
                </div>

                {flash?.success && (
                    <div className="mb-6 animate-reveal-0">
                        <Alert severity="success" sx={{ borderRadius: 3 }}>{flash.success}</Alert>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* LEFT SIDEBAR (Sticky with Internal Scroll) */}
                    <div className="w-full lg:w-[340px] flex-shrink-0 space-y-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto animate-reveal-1 pb-4 pr-1 custom-scrollbar">
                        
                        {/* 1. Gamification / Rank Bento */}
                        <div className="bg-white dark:bg-gray-800/80 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Rank</h3>
                                <span className="text-3xl">🏆</span>
                            </div>
                            
                            <div className="mb-5">
                                <span className="inline-flex items-center rounded-xl bg-amber-100 dark:bg-amber-900/30 px-4 py-2 text-sm font-black uppercase tracking-wider text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
                                    {tierInfo.title}
                                </span>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-bold text-gray-600 dark:text-gray-400">
                                    <span>{publishedCount} Published</span>
                                    <span>{tierInfo.target === 20 && publishedCount >= 20 ? 'Maxed' : `Goal: ${tierInfo.target}`}</span>
                                </div>
                                <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                                    <div 
                                        className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-1000 ease-out relative"
                                        style={{ width: `${progressPercentage}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                    </div>
                                </div>
                                {tierInfo.next !== 'Max Level' && (
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-2 text-center">
                                        Publish <span className="text-[#2f6fdb]">{tierInfo.target - publishedCount}</span> more to unlock <br/>
                                        <strong className="text-gray-800 dark:text-gray-200">{tierInfo.next}</strong>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* 2. Portfolio Statistics Grid */}
                        <div className="bg-white dark:bg-gray-800/80 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Portfolio Overview</h3>
                            
                            <div className="grid grid-cols-2 gap-3">
                                {/* Published Stat */}
                                <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                    <span className="text-2xl mb-1">✅</span>
                                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{publishedCount}</span>
                                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-500 uppercase tracking-wide">Published</span>
                                </div>
                                
                                {/* Drafts Stat */}
                                <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                    <span className="text-2xl mb-1">📝</span>
                                    <span className="text-2xl font-black text-gray-700 dark:text-gray-300">{drafts.length}</span>
                                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Drafts</span>
                                </div>

                                {/* Submitted Stat */}
                                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                    <span className="text-2xl mb-1">⏳</span>
                                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{submitted.length}</span>
                                    <span className="text-xs font-bold text-blue-800 dark:text-blue-500 uppercase tracking-wide">Submitted</span>
                                </div>

                                {/* Needs Revision Stat */}
                                <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                    <span className="text-2xl mb-1">⚠️</span>
                                    <span className="text-2xl font-black text-orange-600 dark:text-orange-400">{needsRevision.length}</span>
                                    <span className="text-xs font-bold text-orange-800 dark:text-orange-500 uppercase tracking-wide">Revisions</span>
                                </div>
                            </div>
                        </div>

                        {/* 3. Timeline Workflow Tips */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 rounded-[2rem] p-6 shadow-md text-white border border-gray-800">
                            <h3 className="text-lg font-bold mb-5 flex items-center gap-2 text-white">
                                💡 Editor's Advice
                            </h3>
                            
                            <div className="relative border-l-2 border-gray-700 ml-3 space-y-6">
                                {/* Step 1 */}
                                <div className="relative pl-6">
                                    <span className="absolute -left-[13px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#2f6fdb] text-xs font-bold text-white ring-4 ring-gray-900 dark:ring-black">
                                        1
                                    </span>
                                    <h4 className="font-bold text-gray-100 text-sm">Save Frequently</h4>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                        Keep your work safely stored as a Draft before finalizing details.
                                    </p>
                                </div>
                                
                                {/* Step 2 */}
                                <div className="relative pl-6">
                                    <span className="absolute -left-[13px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-xs font-bold text-white ring-4 ring-gray-900 dark:ring-black">
                                        2
                                    </span>
                                    <h4 className="font-bold text-gray-100 text-sm">Review & Submit</h4>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                        Ensure your catchy title and correct category are set before clicking submit.
                                    </p>
                                </div>

                                {/* Step 3 */}
                                <div className="relative pl-6">
                                    <span className="absolute -left-[13px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white ring-4 ring-gray-900 dark:ring-black">
                                        3
                                    </span>
                                    <h4 className="font-bold text-gray-100 text-sm">Handle Feedback</h4>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                        If marked for revision, check the editor's notes, adjust your article, and re-submit.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MAIN CONTENT AREA */}
                    <div className="flex-1 min-w-0 space-y-8">
                        
                        {/* Create New Article Bento */}
                        <div className="bg-white dark:bg-gray-800/80 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden animate-reveal-2">
                            <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-700/50">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Start a New Article</h2>
                            </div>
                            <div className="p-6 sm:p-8">
                                <Box component="form" onSubmit={handleCreate}>
                                    <Stack spacing={3}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <TextField
                                                label="Catchy Title"
                                                value={createForm.data.title}
                                                onChange={(event) => createForm.setData('title', event.target.value)}
                                                error={Boolean(createForm.errors.title)}
                                                helperText={createForm.errors.title}
                                                fullWidth
                                            />
                                            <TextField
                                                select
                                                label="Category"
                                                value={createForm.data.category_id}
                                                onChange={(event) => createForm.setData('category_id', event.target.value)}
                                                error={Boolean(createForm.errors.category_id)}
                                                helperText={createForm.errors.category_id}
                                                fullWidth
                                            >
                                                {categories.map((category) => (
                                                    <MenuItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        
                                        <Box className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                            <JoditEditor
                                                value={createForm.data.content}
                                                config={joditConfig}
                                                onBlur={(value) => createForm.setData('content', value)}
                                            />
                                        </Box>
                                        {createForm.errors.content && (
                                            <Typography color="error" variant="caption">{createForm.errors.content}</Typography>
                                        )}
                                        
                                        <CoolButton type="submit" disabled={createForm.processing} sx={{ alignSelf: 'flex-start' }}>
                                            Save Draft
                                        </CoolButton>
                                    </Stack>
                                </Box>
                            </div>
                        </div>

                        {/* Article Workspace Header & Filters */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-reveal-2 pt-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Articles Workspace</h2>
                            <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-900/50 p-1.5 rounded-2xl w-fit">
                                {[{ key: 'all', label: 'All' }, { key: 'draft', label: 'Drafts' }, { key: 'submitted', label: 'Submitted' }, { key: 'needs_revision', label: 'Needs Revision' }].map((option) => (
                                    <button
                                        key={option.key}
                                        onClick={() => setStatusFilter(option.key)}
                                        className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                                            statusFilter === option.key ? 'bg-white dark:bg-gray-800 text-[#2f6fdb] shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Articles List */}
                        <div className="space-y-6 animate-reveal-2">
                            {visibleArticles.length === 0 ? (
                                <div className="bg-white dark:bg-gray-800/80 rounded-[2rem] p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700/50">
                                    <span className="text-4xl mb-4 block">📝</span>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Create a new draft above or change your filters.</p>
                                </div>
                            ) : (
                                visibleArticles.map((article) => (
                                    <div key={article.id} className="bg-white dark:bg-gray-800/80 rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700/50 transition-all hover:shadow-md">
                                        <Stack spacing={3}>
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{article.title}</h3>
                                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                        {article.category?.name} • Updated {new Date(article.updated_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <Chip label={article.status?.label ?? 'Unknown'} color={getStatusColor(article.status?.name)} variant="outlined" sx={{ fontWeight: 'bold', borderRadius: 2 }}/>
                                            </div>

                                            {article.revisions?.length > 0 && (
                                                <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-2xl p-4 sm:p-5">
                                                    <h4 className="text-sm font-bold text-orange-800 dark:text-orange-400 mb-2 flex items-center gap-2">
                                                        <span>⚠️</span> Latest Editor Feedback
                                                    </h4>
                                                    <p className="text-sm text-orange-900 dark:text-orange-200 leading-relaxed">
                                                        {article.revisions[article.revisions.length - 1]?.comments}
                                                    </p>
                                                </div>
                                            )}

                                            {(article.status?.name === 'needs_revision' || article.status?.name === 'draft') && (
                                                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <TextField label="Update Title" value={revisionDrafts[article.id]?.title ?? ''} onChange={(e) => updateRevisionField(article.id, 'title', e.target.value)} fullWidth size="small" />
                                                        <TextField select label="Update Category" value={revisionDrafts[article.id]?.category_id ?? ''} onChange={(e) => updateRevisionField(article.id, 'category_id', e.target.value)} fullWidth size="small">
                                                            {categories.map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                                                        </TextField>
                                                    </div>
                                                    <Box className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                                        <JoditEditor value={revisionDrafts[article.id]?.content ?? ''} config={joditConfig} onBlur={(val) => updateRevisionField(article.id, 'content', val)} />
                                                    </Box>
                                                </div>
                                            )}

                                            <div className="flex flex-wrap gap-3 pt-2">
                                                {article.status?.name === 'draft' && <CoolButton onClick={() => router.post(route('articles.submit', article.id))}>Submit for Review</CoolButton>}
                                                {article.status?.name === 'needs_revision' && <CoolButton onClick={() => router.put(route('articles.revise', article.id), revisionDrafts[article.id])}>Submit Revision</CoolButton>}
                                            </div>
                                        </Stack>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}