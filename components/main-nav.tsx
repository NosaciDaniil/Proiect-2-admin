"use client"

import * as React from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    const storeId = params?.storeId?.toString();
    const routes = [
        {
            href: `/${storeId}`,
            label: 'Overview',
            active: pathname === `/${storeId}`,
        },
        {
            href: `/${storeId}/billboards`,
            label: 'Billboards',
            active: pathname === `/${storeId}/billboards`,
        },
        {
            href: `/${storeId}/categories`,
            label: 'Categories',
            active: pathname === `/${storeId}/categories`,
        },
        {
            href: `/${storeId}/sizes`,
            label: 'Sizes',
            active: pathname === `/${storeId}/sizes`,
        },
        {
            href: `/${storeId}/colors`,
            label: 'Colors',
            active: pathname === `/${storeId}/colors`,
        },
        {
            href: `/${storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${storeId}/settings`,
        },
    ];

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            >
                {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
                ))}
            </nav>
    )
};