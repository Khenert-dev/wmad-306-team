import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeModeToggle from '@/Components/ThemeModeToggle';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Box, Drawer, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

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
        { label: 'Publications', href: '#recent-publications' },
    ];

    return (
        <>
            <Head title="Campus Press" />

            <Box className="bg-white dark:bg-gray-900 transition-colors duration-300" id="product">
                <Box component="header" className="absolute inset-x-0 top-0 z-50">
                    <Box component="nav" aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                        <Box className="flex lg:flex-1">
                            {/* Color synced to #2f6fdb via text-[#2f6fdb] */}
                            <Link href="/" className="-m-1.5 flex items-center gap-2 p-1.5 text-[#2f6fdb]">
                                <span className="sr-only">Campus Press</span>
                                <ApplicationLogo className="h-8 w-8" />
                                <span className="text-sm font-bold tracking-tight">Campus Press</span>
                            </Link>
                        </Box>

                        <Box className="flex lg:hidden">
                            <IconButton
                                onClick={() => setMobileOpen(true)}
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
                                aria-label="Open main menu"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        <Box className="hidden lg:flex lg:gap-x-8">
                            {navItems.map((item) => (
                                <a key={item.label} href={item.href} className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#2f6fdb] dark:hover:text-[#2f6fdb] transition-colors">
                                    {item.label}
                                </a>
                            ))}
                        </Box>

                        <Box className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
                            <ThemeModeToggle size="small" />
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-[#2f6fdb] transition-colors">
                                    Dashboard <span aria-hidden="true">&rarr;</span>
                                </Link>
                            ) : (
                                <Link href={route('login')} className="text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-[#2f6fdb] transition-colors">
                                    Log in <span aria-hidden="true">&rarr;</span>
                                </Link>
                            )}
                        </Box>
                    </Box>

                    <Drawer
                        anchor="right"
                        open={mobileOpen}
                        onClose={() => setMobileOpen(false)}
                        PaperProps={{
                            className: "w-full sm:max-w-sm bg-white dark:bg-gray-900 transition-colors duration-300",
                            elevation: 0
                        }}
                    >
                        <Box className="p-6">
                            <Box className="flex items-center justify-between gap-3">
                                <Link href="/" className="-m-1.5 flex items-center gap-2 p-1.5 text-[#2f6fdb]">
                                    <ApplicationLogo className="h-8 w-8" />
                                    <span className="text-sm font-bold">Campus Press</span>
                                </Link>
                                <Box className="flex items-center gap-2">
                                    <ThemeModeToggle size="small" />
                                    <IconButton
                                        onClick={() => setMobileOpen(false)}
                                        className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
                                        aria-label="Close menu"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box className="mt-6 flow-root">
                                <Box className="-my-6 divide-y divide-gray-200 dark:divide-white/10">
                                    <Box className="space-y-2 py-6">
                                        {navItems.map((item) => (
                                            <a
                                                key={item.label}
                                                href={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {item.label}
                                            </a>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Drawer>
                </Box>

                <Box className="relative isolate px-6 pt-14 lg:px-8">
                    {/* Background glows updated to the icon color #2f6fdb */}
                    <Box aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                        <Box style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#2f6fdb] to-[#7ea5ea] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></Box>
                    </Box>

                    <Box className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 welcome-fade-up">
                        <Box className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <Box className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 dark:text-gray-400 ring-1 ring-gray-900/10 dark:ring-white/10 hover:ring-gray-900/20 dark:hover:ring-white/20 transition-colors">
                                Guest readers can now preview published journals.
                                <a href="#recent-publications" className="font-semibold text-[#2f6fdb] ml-1">
                                    Browse previews <span aria-hidden="true">&rarr;</span>
                                </a>
                            </Box>
                        </Box>

                        <Box className="text-center">
                            <Typography component="h1" variant="inherit" className="text-5xl font-bold tracking-tight text-balance text-gray-900 dark:text-white sm:text-7xl transition-colors">
                                Publish better campus stories
                            </Typography>
                            <Typography component="p" variant="inherit" className="mt-8 text-lg font-medium text-pretty text-gray-600 dark:text-gray-400 sm:text-xl/8 transition-colors">
                                Writers create, editors curate, and students engage with meaningful articles in one streamlined workflow.
                            </Typography>
                            <Box className="mt-10 flex items-center justify-center gap-x-6">
                                {auth?.user ? (
                                    <Link href={route('dashboard')} className="rounded-md bg-[#2f6fdb] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2157b4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6fdb]">
                                        Open dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('register')} className="rounded-md bg-[#2f6fdb] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2157b4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6fdb]">
                                            Get started
                                        </Link>
                                        <a href="#recent-publications" className="text-sm/6 font-semibold text-gray-900 dark:text-white transition-colors hover:text-[#2f6fdb]">
                                            Read previews <span aria-hidden="true">&rarr;</span>
                                        </a>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box id="recent-publications" className="bg-gray-50 dark:bg-gray-950 py-24 sm:py-32 welcome-fade-up transition-colors duration-300">
                <Box className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <Typography component="h2" variant="inherit" className="text-center text-base/7 font-bold text-[#2f6fdb]">Recently Published</Typography>
                    <Typography component="p" variant="inherit" className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-900 dark:text-white sm:text-5xl transition-colors">
                        Latest campus publications
                    </Typography>

                    <Box className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                        {publicationCards.slice(0, 4).map((publication, index) => {
                            const isTall = index === 0 || index === 3;
                            const image = publication.cover_image_url || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80';
                            const summary = (publication.content || '').replace(/<[^>]*>?/gm, '').slice(0, 140);

                            return (
                                <Box key={publication.id} className={`relative ${isTall ? 'lg:row-span-2' : ''}`}>
                                    <Box className="absolute inset-px rounded-lg bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300"></Box>
                                    <Box className="relative flex h-full flex-col overflow-hidden rounded-[calc(0.5rem+1px)]">
                                        <Box className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                                            <Typography component="p" variant="inherit" className="mt-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white max-lg:text-center transition-colors">
                                                {publication.title}
                                            </Typography>
                                            <Typography component="p" variant="inherit" className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-400 max-lg:text-center transition-colors">
                                                {summary || 'Read the latest published article from our editorial platform.'}
                                            </Typography>
                                            <Typography component="p" variant="inherit" className="mt-2 text-xs font-bold text-[#2f6fdb] max-lg:text-center transition-colors">
                                                {publication.category?.name} • {publication.writer?.name}
                                            </Typography>
                                        </Box>
                                        <Box className="relative min-h-72 w-full grow">
                                            <img
                                                src={image}
                                                alt={publication.title}
                                                className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-xl object-cover shadow-md"
                                            />
                                            <Box className="absolute inset-4 rounded-xl ring-1 ring-gray-900/10 dark:ring-white/10 transition-colors"></Box>
                                        </Box>
                                        <Box className="px-8 pb-8">
                                            <Link href={route('publications.show', publication.id)} className="inline-flex text-sm font-bold text-[#2f6fdb] hover:text-[#2157b4] transition-colors">
                                                Preview Journal <span aria-hidden="true" className="ml-1">&rarr;</span>
                                            </Link>
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Box>

            <Box component="footer" className="border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-950 py-8 transition-colors duration-300">
                <Box className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-gray-500 dark:text-gray-400 lg:flex-row lg:px-8">
                    <Typography component="p" variant="inherit">© {new Date().getFullYear()} Campus Press. Student Article Publication Platform.</Typography>
                    <Box className="flex items-center gap-4">
                        <a href="#product" className="hover:text-[#2f6fdb] transition-colors">Product</a>
                        <a href="#recent-publications" className="hover:text-[#2f6fdb] transition-colors">Publications</a>
                    </Box>
                </Box>
            </Box>
        </>
    );
}