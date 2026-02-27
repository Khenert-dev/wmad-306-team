import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeModeToggle from '@/Components/ThemeModeToggle';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

function SectionBreak() {
    return (
        <div aria-hidden="true" className="bg-gray-950 px-6">
            <div className="mx-auto max-w-7xl">
                <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/55 to-transparent" />
            </div>
        </div>
    );
}

export default function Welcome() {
    const { auth, recentPublications = [] } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const publicationCards = recentPublications.length > 0 ? recentPublications : [
        { id: 'placeholder-1', title: 'Campus Sustainability Initiatives', content: 'Sample publication preview text.', writer: { name: 'Editorial Team' }, category: { name: 'Campus Life' }, cover_image_url: null },
        { id: 'placeholder-2', title: 'Research Spotlight: AI in Education', content: 'Sample publication preview text.', writer: { name: 'Editorial Team' }, category: { name: 'Technology' }, cover_image_url: null },
        { id: 'placeholder-3', title: 'Student Voices: Community Service', content: 'Sample publication preview text.', writer: { name: 'Editorial Team' }, category: { name: 'Culture' }, cover_image_url: null },
        { id: 'placeholder-4', title: 'Inside the Editor Workflow', content: 'Sample publication preview text.', writer: { name: 'Editorial Team' }, category: { name: 'Education' }, cover_image_url: null },
    ];

    const navItems = [
        { label: 'Product', href: '#product' },
        { label: 'Features', href: '#features' },
        { label: 'Workflow', href: '#workflow' },
        { label: 'Blog', href: '#blog' },
        { label: 'Team', href: '#team' },
        { label: 'FAQs', href: '#faqs' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <Head title="Campus Press" />

            <div className="bg-gray-900" id="product">
                <header className="absolute inset-x-0 top-0 z-50">
                    <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                        <div className="flex lg:flex-1">
                            <Link href="/" className="-m-1.5 flex items-center gap-2 p-1.5 text-white">
                                <span className="sr-only">Campus Press</span>
                                <ApplicationLogo className="h-8 w-8" />
                                <span className="text-sm font-semibold">Campus Press</span>
                            </Link>
                        </div>

                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                onClick={() => setMobileOpen(true)}
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6">
                                    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="hidden lg:flex lg:gap-x-8">
                            {navItems.map((item) => (
                                <a key={item.label} href={item.href} className="text-sm font-semibold text-gray-200 hover:text-white">
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
                            <ThemeModeToggle size="small" />
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="text-sm/6 font-semibold text-white">
                                    Dashboard <span aria-hidden="true">&rarr;</span>
                                </Link>
                            ) : (
                                <Link href={route('login')} className="text-sm/6 font-semibold text-white">
                                    Log in <span aria-hidden="true">&rarr;</span>
                                </Link>
                            )}
                        </div>
                    </nav>

                    {mobileOpen && (
                        <div className="lg:hidden">
                            <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileOpen(false)} />
                            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
                                <div className="flex items-center justify-between gap-3">
                                    <Link href="/" className="-m-1.5 flex items-center gap-2 p-1.5 text-white">
                                        <ApplicationLogo className="h-8 w-8" />
                                        <span className="sr-only">Campus Press</span>
                                    </Link>
                                    <div className="flex items-center gap-2">
                                        <ThemeModeToggle size="small" />
                                        <button
                                            type="button"
                                            onClick={() => setMobileOpen(false)}
                                            className="-m-2.5 rounded-md p-2.5 text-gray-200"
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6">
                                                <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-white/10">
                                        <div className="space-y-2 py-6">
                                            {navItems.map((item) => (
                                                <a
                                                    key={item.label}
                                                    href={item.href}
                                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
                                                    onClick={() => setMobileOpen(false)}
                                                >
                                                    {item.label}
                                                </a>
                                            ))}
                                        </div>
                                        <div className="py-6">
                                            {auth?.user ? (
                                                <Link href={route('dashboard')} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5">
                                                    Dashboard
                                                </Link>
                                            ) : (
                                                <Link href={route('login')} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5">
                                                    Log in
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </header>

                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                        <div style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
                    </div>

                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 welcome-fade-up">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                                Guest readers can now preview published journals.
                                <a href="#recent-publications" className="font-semibold text-indigo-400">
                                    <span aria-hidden="true" className="absolute inset-0"></span>
                                    Browse previews <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>

                        <div className="text-center">
                            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                                Publish better campus stories
                            </h1>
                            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                                Writers create, editors curate, and students engage with meaningful articles in one streamlined workflow.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                {auth?.user ? (
                                    <Link href={route('dashboard')} className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400">
                                        Open dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('register')} className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400">
                                            Get started
                                        </Link>
                                        <a href="#recent-publications" className="text-sm/6 font-semibold text-white">
                                            Read previews <span aria-hidden="true">&rarr;</span>
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                        <div style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
                    </div>
                </div>
            </div>

            <SectionBreak />

            <div id="features" className="bg-gray-900 py-24 sm:py-32 welcome-fade-up">
                <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-center text-base/7 font-semibold text-indigo-400">Platform Features</h2>
                    <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                        Everything your student journal needs
                    </p>

                    <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2" id="workflow">
                        <div className="relative lg:row-span-2">
                            <div className="absolute inset-px rounded-lg bg-gray-800 lg:rounded-l-[2rem]"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.5rem+1px)] lg:rounded-l-[calc(2rem+1px)] welcome-glow-card">
                                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Mobile friendly</p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                                        Write, review, and comment from any device with responsive pages for students and editors.
                                    </p>
                                </div>
                                <div className="relative min-h-80 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                                    <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[3rem] border-x-8 border-t-8 border-gray-700 bg-gray-900 outline outline-white/20">
                                        <img src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png" alt="Mobile preview" className="size-full object-cover object-top" />
                                    </div>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-[2rem]"></div>
                        </div>

                        <div className="relative max-lg:row-start-1">
                            <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-t-[2rem]"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.5rem+1px)] max-lg:rounded-t-[calc(2rem+1px)] welcome-glow-card">
                                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Performance</p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                                        Fast role-based dashboards keep publication flow smooth from draft to published.
                                    </p>
                                </div>
                                <div className="flex flex-1 items-center justify-center px-8 pt-10 pb-12 sm:px-10 lg:pb-2">
                                    <img src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-performance.png" alt="Performance preview" className="w-full max-w-xs" />
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-[2rem]"></div>
                        </div>

                        <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                            <div className="absolute inset-px rounded-lg bg-gray-800"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.5rem+1px)] welcome-glow-card">
                                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Security</p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                                        Protected routes, role middleware, and policy checks keep workflows properly scoped.
                                    </p>
                                </div>
                                <div className="flex flex-1 items-center max-lg:py-6 lg:pb-2">
                                    <img src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-security.png" alt="Security preview" className="h-40 object-cover" />
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15"></div>
                        </div>

                        <div className="relative lg:row-span-2" id="company">
                            <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.5rem+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)] welcome-glow-card">
                                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Powerful APIs</p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                                        Extend notifications, publishing logic, and editorial tools with clean Laravel architecture.
                                    </p>
                                </div>
                                <div className="relative min-h-80 w-full grow">
                                    <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900/60 outline outline-white/10">
                                        <div className="flex bg-gray-900 outline outline-white/5">
                                            <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white text-sm">PublicationFlow.tsx</div>
                                            <div className="border-r border-gray-600/10 px-4 py-2 text-sm text-gray-300">Notifications</div>
                                        </div>
                                        <div className="px-6 pt-6 pb-14">
                                            <pre className="text-xs leading-6 text-gray-300 whitespace-pre-wrap">{`draft -> submitted -> needs_revision\n-> published -> commented`}</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                        </div>
                    </div>
                </div>
            </div>

            <SectionBreak />

            <div id="recent-publications" className="bg-gray-950 py-24 sm:py-32 welcome-fade-up">
                <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-center text-base/7 font-semibold text-indigo-400">Recently Published</h2>
                    <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                        Latest campus publications
                    </p>

                    <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                        {publicationCards.slice(0, 4).map((publication, index) => {
                            const isTall = index === 0 || index === 3;
                            const image = publication.cover_image_url || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80';
                            const summary = (publication.content || '').replace(/<[^>]*>?/gm, '').slice(0, 140);

                            return (
                                <div key={publication.id} className={`relative ${isTall ? 'lg:row-span-2' : ''}`}>
                                    <div className="absolute inset-px rounded-lg bg-gray-800"></div>
                                    <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.5rem+1px)] welcome-glow-card">
                                        <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                                            <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                                                {publication.title}
                                            </p>
                                            <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                                                {summary || 'Read the latest published article from our editorial platform.'}
                                            </p>
                                            <p className="mt-2 text-xs text-indigo-300 max-lg:text-center">
                                                {publication.category?.name} • {publication.writer?.name}
                                            </p>
                                            {!auth?.user && (
                                                <p className="mt-2 text-xs text-emerald-300 max-lg:text-center">
                                                    Guest access: limited preview enabled
                                                </p>
                                            )}
                                        </div>
                                        <div className="relative min-h-72 w-full grow">
                                            <img
                                                src={image}
                                                alt={publication.title}
                                                className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-xl object-cover"
                                            />
                                            <div className="absolute inset-4 rounded-xl ring-1 ring-white/10"></div>
                                        </div>
                                        <div className="px-8 pb-8">
                                            <Link href={route('publications.show', publication.id)} className="inline-flex text-sm font-semibold text-indigo-300 hover:text-indigo-200">
                                                Preview Journal <span aria-hidden="true" className="ml-1">&rarr;</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <SectionBreak />

            <div className="bg-gray-900 py-16 welcome-fade-up" id="blog">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-10 text-white shadow-lg welcome-glow-card">
                        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-100">Editorial Banner</p>
                        <h3 className="mt-2 text-3xl font-semibold tracking-tight">Weekly Campus Highlights</h3>
                        <p className="mt-3 max-w-2xl text-indigo-100">
                            Discover fresh stories from writers, curated by editors, and shared with the student community every week.
                        </p>
                        <div className="mt-5">
                            <a href="#recent-publications" className="inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">
                                Explore latest publications
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <SectionBreak />

            <div id="team" className="bg-gray-900 py-24 sm:py-32 welcome-fade-up">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-base font-semibold text-indigo-400">Team</h2>
                    <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        Meet the Publication Team
                    </p>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { name: 'Lead Editor', role: 'Editorial Review', initials: 'LE' },
                            { name: 'Content Writer', role: 'Draft & Submit', initials: 'CW' },
                            { name: 'Student Reviewer', role: 'Community Feedback', initials: 'SR' },
                            { name: 'Platform Admin', role: 'Workflow Management', initials: 'PA' },
                        ].map((member) => (
                            <div key={member.name} className="rounded-2xl border border-white/10 bg-gray-800/80 p-6 text-center welcome-glow-card">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-lg font-bold text-white">
                                    {member.initials}
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-white">{member.name}</h3>
                                <p className="mt-1 text-sm text-indigo-200">{member.role}</p>
                                <a href="#contact" className="mt-4 inline-block text-sm font-semibold text-indigo-300 hover:text-indigo-200">
                                    Contact <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <SectionBreak />

            <div id="faqs" className="bg-gray-950 py-24 sm:py-32 welcome-fade-up">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <h2 className="text-center text-base font-semibold text-indigo-400">FAQs</h2>
                    <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        Frequently Asked Questions
                    </p>
                    <div className="mt-12 space-y-4">
                        {[
                            {
                                q: 'Can guests read journals without an account?',
                                a: 'Yes. Guests can open published journals and read a limited preview before logging in for full access.',
                            },
                            {
                                q: 'How does an article get published?',
                                a: 'Writers submit drafts, editors review or request revision, and approved articles are published for students.',
                            },
                            {
                                q: 'Who can comment on articles?',
                                a: 'Only users with the student role can post comments, and only on published articles.',
                            },
                        ].map((faq) => (
                            <div key={faq.q} className="rounded-xl border border-white/10 bg-gray-800/80 p-5 welcome-glow-card">
                                <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                                <p className="mt-2 text-sm/6 text-gray-300">{faq.a}</p>
                                <a href="#contact" className="mt-3 inline-block text-sm font-semibold text-indigo-300 hover:text-indigo-200">
                                    Need more help? Contact us
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <SectionBreak />

            <div id="contact" className="bg-gray-900 py-24 sm:py-32 welcome-fade-up">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <h2 className="text-center text-base font-semibold text-indigo-400">Contact</h2>
                    <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        Get in touch with the team
                    </p>
                    <div className="mt-12 rounded-2xl border border-white/10 bg-gray-800/80 p-8 welcome-glow-card">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <p className="text-sm font-semibold text-indigo-300">Email</p>
                                <a href="mailto:editorial@campuspress.edu" className="mt-1 block text-white hover:text-indigo-200">
                                    editorial@campuspress.edu
                                </a>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-indigo-300">Office Hours</p>
                                <p className="mt-1 text-white">Mon - Fri, 9:00 AM - 5:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="border-t border-white/10 bg-gray-950 py-8">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-gray-400 lg:flex-row lg:px-8">
                    <p>© {new Date().getFullYear()} Campus Press. Student Article Publication Platform.</p>
                    <div className="flex items-center gap-4">
                        <a href="#features" className="hover:text-gray-200">Features</a>
                        <a href="#recent-publications" className="hover:text-gray-200">Publications</a>
                        <a href="#contact" className="hover:text-gray-200">Contact</a>
                    </div>
                </div>
            </footer>
        </>
    );
}
