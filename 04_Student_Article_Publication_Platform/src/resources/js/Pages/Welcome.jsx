import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeModeToggle from '@/Components/ThemeModeToggle';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Box, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Welcome() {
    const { auth, recentPublications = [] } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const publicationCards = recentPublications.length > 0 ? recentPublications : [
        { id: 'placeholder-1', title: 'Campus Sustainability Initiatives', content: 'Sample publication preview text.', writer: { name: 'Editorial Team' }, category: { name: 'Campus Life' }, cover_image_url: null },
        { id: 'placeholder-2', title: 'Research Spotlight: AI in Education', content: 'Sample publication preview text.', writer: { name: 'Editorial Team' }, category: { name: 'Technology' }, cover_image_url: null },
        { id: 'placeholder-3', title: 'Student Voices: Community Service', content: 'Sample publication preview text.', writer: { name: 'Editorial Team' }, category: { name: 'Culture' }, cover_image_url: null },
    ];

    const navItems = [
        { label: 'Product', href: '#product' },
        { label: 'Publications', href: '#recent-publications' },
    ];

    // Jeton-style Custom CSS Animations
    const jetonAnimations = `
        @keyframes reveal-up {
            0% { transform: translateY(80px); opacity: 0; filter: blur(8px); }
            100% { transform: translateY(0); opacity: 1; filter: blur(0); }
        }
        @keyframes float-blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-reveal-0 { animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
        .animate-reveal-1 { animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
        .animate-reveal-2 { animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
        .animate-reveal-3 { animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
        .animate-reveal-4 { animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }
        
        .animate-blob { animation: float-blob 8s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        .bento-card:hover .bento-img { transform: scale(1.08); }
        .text-mask { clip-path: polygon(0 0, 100% 0, 100% 150%, 0 150%); }
    `;

    return (
        <>
            <Head title="Welcome to Campus Press" />
            <style>{jetonAnimations}</style>

            <Box className="min-h-screen bg-[#fafbfc] dark:bg-[#0b1120] transition-colors duration-300 overflow-x-hidden" id="product">
                
                {/* Navigation Header */}
                <Box component="header" className="absolute inset-x-0 top-0 z-50">
                    <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                        <div className="flex lg:flex-1 animate-reveal-0">
                            <Link href="/" className="-m-1.5 flex items-center gap-2 p-1.5 text-[#2f6fdb]">
                                <ApplicationLogo className="h-8 w-8" />
                                <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Campus Press</span>
                            </Link>
                        </div>

                        <div className="flex lg:hidden animate-reveal-0">
                            <IconButton onClick={() => setMobileOpen(true)} className="text-gray-700 dark:text-gray-200">
                                <MenuIcon />
                            </IconButton>
                        </div>

                        <div className="hidden lg:flex lg:gap-x-12 animate-reveal-0">
                            {navItems.map((item) => (
                                <a key={item.label} href={item.href} className="text-sm font-semibold leading-6 text-gray-700 dark:text-gray-200 hover:text-[#2f6fdb] transition-colors">
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-6 animate-reveal-0">
                            <ThemeModeToggle size="small" />
                            <Link href={route(auth?.user ? 'dashboard' : 'login')} className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-[#2f6fdb]">
                                {auth?.user ? 'Dashboard' : 'Log in'} <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </nav>

                    <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)} PaperProps={{ className: "w-full sm:max-w-sm bg-white dark:bg-gray-900" }}>
                        <Box className="p-6">
                            <div className="flex items-center justify-between">
                                <Link href="/" className="flex items-center gap-2 text-[#2f6fdb]">
                                    <ApplicationLogo className="h-8 w-8" />
                                    <span className="font-bold text-gray-900 dark:text-white">Campus Press</span>
                                </Link>
                                <IconButton onClick={() => setMobileOpen(false)} className="text-gray-700 dark:text-gray-200"><CloseIcon /></IconButton>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                                    <div className="space-y-2 py-6">
                                        {navItems.map((item) => (
                                            <a
                                                key={item.label}
                                                href={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {item.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Drawer>
                </Box>

                {/* Hero Section */}
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    
                    {/* Dynamic Floating Background Blobs (Jeton Style) */}
                    <div className="absolute inset-x-0 -top-40 -z-10 flex justify-center overflow-hidden blur-3xl sm:-top-80 pointer-events-none">
                        <div className="relative w-full max-w-3xl">
                            <div className="absolute top-40 -left-20 w-72 h-72 bg-[#2f6fdb] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-30 dark:opacity-20 animate-blob"></div>
                            <div className="absolute top-40 -right-20 w-72 h-72 bg-[#7ea5ea] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-30 dark:opacity-20 animate-blob animation-delay-2000"></div>
                            <div className="absolute top-80 left-20 w-72 h-72 bg-[#1e4b9b] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-30 dark:opacity-20 animate-blob animation-delay-4000"></div>
                        </div>
                    </div>

                    <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
                        <div className="text-center">
                            
                            {/* FIXED: Standard h1 tag restores Tailwind text-9xl sizing */}
                            <h1 className="text-5xl font-black tracking-tight text-gray-900 dark:text-white sm:text-7xl lg:text-9xl leading-[1.05] transition-colors">
                                <span className="block text-mask">
                                    <span className="block animate-reveal-1">Welcome to</span>
                                </span>
                                <span className="block text-mask mt-2">
                                    <span className="block text-[#2f6fdb] animate-reveal-2">Campus Press</span>
                                </span>
                            </h1>
                            
                            {/* FIXED: Standard h2 tag restores Tailwind sizing */}
                            <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100 sm:text-4xl lg:text-5xl text-mask">
                                <span className="block animate-reveal-3">Publish better campus stories</span>
                            </h2>
                            
                            {/* DESCRIPTION P */}
                            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400 sm:text-xl animate-reveal-4">
                                Writers create, editors curate, and students engage with meaningful articles in one streamlined workflow. 
                                A professional ecosystem built for the next generation of campus journalists.
                            </p>
                            
                            {/* CALL TO ACTION BUTTONS */}
                            <div className="mt-12 flex items-center justify-center gap-x-6 animate-reveal-4" style={{ animationDelay: '0.6s' }}>
                                {auth?.user ? (
                                    <Link href={route('dashboard')} className="rounded-full bg-[#2f6fdb] px-8 py-4 text-base font-bold text-white shadow-lg hover:shadow-[#2f6fdb]/30 hover:bg-[#2157b4] hover:-translate-y-1 transition-all duration-300">
                                        Open dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('register')} className="rounded-full bg-[#2f6fdb] px-8 py-4 text-base font-bold text-white shadow-lg hover:shadow-[#2f6fdb]/30 hover:bg-[#2157b4] hover:-translate-y-1 transition-all duration-300">
                                            Get started
                                        </Link>
                                        <a href="#recent-publications" className="text-base font-bold text-gray-900 dark:text-white hover:text-[#2f6fdb] transition-colors">
                                            Read previews <span aria-hidden="true">&rarr;</span>
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Box>

            {/* Publication Feed Section (BENTO CARDS DESIGN) */}
            <section id="recent-publications" className="bg-white dark:bg-[#0b1120] py-24 sm:py-32 transition-colors duration-300 relative z-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    
                    <div className="mx-auto max-w-2xl text-center animate-reveal-1">
                        <p className="text-sm font-black text-[#2f6fdb] uppercase tracking-widest">Recently Published</p>
                        <p className="mt-3 text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">Latest campus publications</p>
                    </div>
                    
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {publicationCards.slice(0, 3).map((publication, i) => (
                            <article 
                                key={publication.id} 
                                className={`bento-card group flex flex-col bg-[#f4f7fb] dark:bg-gray-800/50 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden hover:shadow-[0_20px_40px_rgb(47,111,219,0.1)] hover:-translate-y-2 transition-all duration-500 will-change-transform animate-reveal-${(i % 3) + 2}`}
                            >
                                {/* Image Half with Hover Zoom */}
                                <div className="relative w-full h-64 shrink-0 overflow-hidden bg-gray-200 dark:bg-gray-900">
                                    <img
                                        src={publication.cover_image_url || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80'}
                                        alt={publication.title}
                                        className="bento-img absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out"
                                    />
                                    {/* Subtle gradient overlay to make tags pop */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-black uppercase tracking-wider text-[#2f6fdb]">
                                            {publication.category?.name || 'General'}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Content Half */}
                                <div className="flex flex-1 flex-col justify-between p-8">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white group-hover:text-[#2f6fdb] transition-colors line-clamp-2">
                                            {publication.title}
                                        </h3>
                                        <p className="mt-4 line-clamp-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                                            {(publication.content || '').replace(/<[^>]*>?/gm, '')}
                                        </p>
                                    </div>
                                    
                                    {/* Dedicated Preview Footer Area */}
                                    <div className="mt-8 pt-6 border-t border-gray-200/60 dark:border-gray-700/60">
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                                By {publication.writer?.name || 'Anonymous'}
                                            </p>
                                        </div>
                                        
                                        {/* Elevated Preview Button */}
                                        <Link 
                                            href={route('publications.show', publication.id)} 
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white dark:bg-gray-900 px-4 py-3.5 text-sm font-bold text-[#2f6fdb] shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700 hover:bg-[#2f6fdb] hover:text-white hover:ring-transparent transition-all duration-300"
                                        >
                                            Preview Article <span aria-hidden="true" className="text-lg leading-none">&rarr;</span>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-white/10 py-12 transition-colors duration-300">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Campus Press. All rights reserved.</p>
                        <div className="flex gap-8 text-sm font-bold text-gray-500 dark:text-gray-400">
                            <a href="#product" className="hover:text-[#2f6fdb] transition-colors">Product</a>
                            <a href="#recent-publications" className="hover:text-[#2f6fdb] transition-colors">Publications</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}