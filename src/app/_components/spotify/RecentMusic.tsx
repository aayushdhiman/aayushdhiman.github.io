"use client";

import { useEffect, useState } from "react";
import { Alert, Center, Grid, Loader, Stack } from "@mantine/core";
import LargeTrackWidget from "~/app/_components/spotify/LargeTrackWidget";
import SmallTrackWidget from "~/app/_components/spotify/SmallTrackWidget";

type Track = {
    id: string;
    title: string;
    artists: string;
    album: string;
    image: string | null;
    previewUrl: string | null;
    externalUrl: string | null;
    playedAt: string;
};

type ApiResponse =
    | { now: Track | null; next: Track[] }
    | { error: string };

export default function RecentMusic() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [now, setNow] = useState<Track | null>(null);
    const [next, setNext] = useState<Track[]>([]);

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            try {
                const res = await fetch("/api/spotify/recently-played", {
                    cache: "no-store",
                });
                const json = (await res.json()) as ApiResponse;

                if (!res.ok) {
                    const message = "error" in json ? json.error : "Failed to fetch";
                    throw new Error(message);
                }

                if (mounted) {
                    if ("now" in json && "next" in json) {
                        setNow(json.now ?? null);
                        setNext(Array.isArray(json.next) ? json.next : []);
                    }
                    setLoading(false);
                }
            } catch (e: unknown) {
                if (mounted) {
                    const message =
                        e instanceof Error ? e.message : "Unexpected error loading Spotify";
                    setError(message);
                    setLoading(false);
                }
            }
        };

        void load();

        return () => {
            mounted = false;
        };
    }, []);

    if (loading) {
        return (
            <Center my="md">
                <Loader />
            </Center>
        );
    }

    if (error) {
        return (
            <Alert color="red" title="Spotify Error" my="md">
                {error}
            </Alert>
        );
    }

    if (!now) return null;

    return (
        <Grid mt="md" gutter="md">
            {/* Left: large widget */}
            <Grid.Col span={{ base: 12, md: 7 }}>
                <LargeTrackWidget
                    title={now.title}
                    artists={now.artists}
                    album={now.album}
                    image={now.image}
                    externalUrl={now.externalUrl}
                />
            </Grid.Col>

            {/* Right: stack of 4 small widgets */}
            <Grid.Col span={{ base: 12, md: 5 }}>
                <Stack gap="sm">
                    {next.slice(0, 4).map((t) => (
                        <SmallTrackWidget
                            key={t.id}
                            title={t.title}
                            artists={t.artists}
                            image={t.image}
                            externalUrl={t.externalUrl}
                        />
                    ))}
                </Stack>
            </Grid.Col>
        </Grid>
    );
}
