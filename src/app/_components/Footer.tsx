"use client";

import { Group, ActionIcon, Container } from "@mantine/core";
import {
    IconBrandGithub,
    IconBrandGitlab,
    IconBrandLinkedin,
    IconBrandSpotify,
    IconBrandInstagram,
} from "@tabler/icons-react";

export default function Footer() {
    return (
        <footer>
            <Container py="md">
                <Group justify="center" gap="md">
                    <ActionIcon
                        component="a"
                        href="https://github.com/aayushdhiman"
                        target="_blank"
                        rel="noreferrer"
                        size="lg"
                        variant="subtle"
                        aria-label="GitHub"
                    >
                        <IconBrandGithub size={22} />
                    </ActionIcon>

                    <ActionIcon
                        component="a"
                        href="https://gitlab.com/aayushdhiman"
                        target="_blank"
                        rel="noreferrer"
                        size="lg"
                        variant="subtle"
                        aria-label="GitLab"
                    >
                        <IconBrandGitlab size={22} />
                    </ActionIcon>

                    <ActionIcon
                        component="a"
                        href="https://linkedin.com/in/aayushdhiman"
                        target="_blank"
                        rel="noreferrer"
                        size="lg"
                        variant="subtle"
                        aria-label="LinkedIn"
                    >
                        <IconBrandLinkedin size={22} />
                    </ActionIcon>

                    <ActionIcon
                        component="a"
                        href="https://tinyurl.com/aayushs-tunes"
                        target="_blank"
                        rel="noreferrer"
                        size="lg"
                        variant="subtle"
                        aria-label="Spotify"
                    >
                        <IconBrandSpotify size={22} />
                    </ActionIcon>

                    <ActionIcon
                        component="a"
                        href="https://instagram.com/aayush_d10"
                        target="_blank"
                        rel="noreferrer"
                        size="lg"
                        variant="subtle"
                        aria-label="Instagram"
                    >
                        <IconBrandInstagram size={22} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}
