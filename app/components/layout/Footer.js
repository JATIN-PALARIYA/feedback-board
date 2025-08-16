'use client';

import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full border-t border-sidebar-border bg-background text-muted-foreground py-4 px-6 flex justify-end items-center text-sm">
            <div>
                © 2025 FeedbackHub. All rights reserved | Version {process.env.NEXT_PUBLIC_APP_VERSION}
            </div>
        </footer>
    );
}
