"use client";

import { Group, ActionIcon, useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function Header() {
    const { setColorScheme } = useMantineColorScheme();
    // Avoid SSR/CSR mismatch by only computing on the client
    const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });
    const isDark = computedColorScheme === "dark";

    return (
        <Group h="100%" px="md" justify="flex-end">
            <ActionIcon
                variant="default"
                aria-label="Toggle color scheme"
                onClick={() => setColorScheme(isDark ? "light" : "dark")}
            >
                {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
        </Group>
    );
}