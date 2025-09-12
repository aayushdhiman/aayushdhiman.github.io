"use client";

import {
    ActionIcon,
    Anchor,
    Group,
    Box,
    useMantineColorScheme,
    useComputedColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const { setColorScheme } = useMantineColorScheme();
    const computed = useComputedColorScheme("light", { getInitialValueInEffect: true });
    const isDark = computed === "dark";
    const pathname = usePathname();

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
    ];

    return (
        <Box
            h="100%"
            px="md"
            style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                alignItems: "center",
                gap: "0.5rem",
            }}
        >
            {/* Left: Logo */}
            <Anchor
                component={Link}
                href="/"
                aria-label="Go home"
                style={{ display: "inline-flex", alignItems: "center" }}
            >
                <Image src="/logo.png" alt="logo" width={28} height={28} priority />
            </Anchor>

            {/* Center: Nav */}
            <Group gap="md" justify="center">
                {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <Anchor
                            key={item.href}
                            component={Link}
                            href={item.href}
                            underline="never"
                            c="dimmed"
                            fw={500}
                            style={{
                                padding: "4px 10px",
                                borderRadius: "8px",
                                transition: "all 150ms ease",
                                backgroundColor: active
                                    ? "var(--mantine-color-gray-1)"
                                    : "transparent",
                                color: active
                                    ? "var(--mantine-color-text)"
                                    : "var(--mantine-color-dimmed)",
                            }}
                            onMouseEnter={(e) => {
                                if (!active) e.currentTarget.style.color = "var(--mantine-color-text)";
                            }}
                            onMouseLeave={(e) => {
                                if (!active) e.currentTarget.style.color = "var(--mantine-color-dimmed)";
                            }}
                        >
                            {item.label}
                        </Anchor>
                    );
                })}
            </Group>

            {/* Right: Theme toggle */}
            <Group justify="flex-end">
                <ActionIcon
                    variant="default"
                    aria-label="Toggle color scheme"
                    onClick={() => setColorScheme(isDark ? "light" : "dark")}
                >
                    {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
                </ActionIcon>
            </Group>
        </Box>
    );
}
