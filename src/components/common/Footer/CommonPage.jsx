import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from '../../ui/Button/Button';

// Dynamic Page Configurations
const PAGE_CONFIGS = {
    features: {
        title: 'Platform Features',
        subtitle: 'Explore everything Campus Connect offers to organize, discover, and enjoy campus life.',
        category: 'Product',
    },
    integrations: {
        title: 'Integrations & Tools',
        subtitle: 'Connect Campus Connect with Google Calendar, WhatsApp, and university portals.',
        category: 'Product',
    },
    pricing: {
        title: 'Plans & Pricing',
        subtitle: 'Free for students and campus clubs. Premium plans available for institutional admin controls.',
        category: 'Product',
    },
    changelog: {
        title: 'Product Changelog',
        subtitle: 'Track our latest feature releases, performance improvements, and security updates.',
        category: 'Product',
    },
    documentation: {
        title: 'Documentation',
        subtitle: 'Technical docs, setup guides, and API integration instructions for developers.',
        category: 'Resources',
    },
    guides: {
        title: 'Campus Guides',
        subtitle: 'Learn how to host successful hackathons, sports tournaments, and cultural events.',
        category: 'Resources',
    },
    api: {
        title: 'API Reference',
        subtitle: 'RESTful API endpoints for fetching public event feeds and managing registration Webhooks.',
        category: 'Resources',
    },
    community: {
        title: 'Student Community',
        subtitle: 'Join our student developer group, campus ambassadors, and open-source contributors.',
        category: 'Resources',
    },
    about: {
        title: 'About Campus Connect',
        subtitle: 'Building accessible, modular, and responsive Web applications for vibrant student communities.',
        category: 'Company',
    },
    careers: {
        title: 'Careers at Campus Connect',
        subtitle: 'We are looking for student interns, developers, and UI/UX designers to join our team.',
        category: 'Company',
    },
    privacy: {
        title: 'Privacy Policy',
        subtitle: 'How we collect, protect, and handle your data across our services.',
        category: 'Legal',
    },
    terms: {
        title: 'Terms of Service',
        subtitle: 'Read our terms and conditions for using the Campus Connect platform.',
        category: 'Legal',
    },
};

export default function CommonPage() {
    const location = useLocation();
    const pageKey = location.pathname.replace('/', '').toLowerCase();
    const pageData = PAGE_CONFIGS[pageKey] || {
        title: pageKey.charAt(0).toUpperCase() + pageKey.slice(1),
        subtitle: 'Information and updates regarding Campus Connect.',
        category: 'Information',
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname]);

    return (
        <div className="relative min-h-screen  overflow-y-hidden overflow-x-hidden rounded-[1.5rem] sm:rounded-[2.5rem] bg-slate-50 p-3 sm:p-6 lg:p-8 space-y-6 sm:space-y-10">
            {/* Background Glow Effects */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-[400px] w-[400px] rounded-full bg-blue-100/70 blur-[100px]" />
            <div className="pointer-events-none absolute top-1/2 -right-24 h-[400px] w-[400px] rounded-full bg-indigo-100/60 blur-[100px]" />

            <div className="relative z-10 mx-auto max-w-5xl space-y-10">
                {/* Header Hero Section */}
                <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl sm:p-12">
                    <div className="space-y-4">
                        <span className="inline-block rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 border border-blue-100">
                            {pageData.category}
                        </span>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                            {pageData.title}
                        </h1>
                        <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                            {pageData.subtitle}
                        </p>
                    </div>
                </section>

                {/* Placeholder Information Section */}
                <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm space-y-6 sm:p-10">
                    <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
                    <p className="text-slate-600 leading-relaxed">
                        Welcome to the official <strong>{pageData.title}</strong> page for Campus Connect. We are continuously updating our modules to give students and campus leaders the best platform experience possible.
                    </p>

                    <div className="grid gap-6 sm:grid-cols-2 pt-4">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <h3 className="font-bold text-slate-900">Need immediate help?</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Have questions about this topic or facing an issue on campus? Reach out to our team directly.
                            </p>
                            <Link to="/contact" className="mt-4 inline-block">
                                <Button variant="outline" size="sm">
                                    Contact Support →
                                </Button>
                            </Link>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <h3 className="font-bold text-slate-900">Explore Events</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Check out active hackathons, sports cups, and cultural fests happening around campus.
                            </p>
                            <Link to="/explore" className="mt-4 inline-block">
                                <Button variant="primary" size="sm">
                                    Browse Events →
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}