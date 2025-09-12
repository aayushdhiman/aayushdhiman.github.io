import { NextResponse } from "next/server";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_RECENT_URL =
    "https://api.spotify.com/v1/me/player/recently-played?limit=5";

export const dynamic = "force-dynamic";
export const revalidate = 0; // ensures no caching
export const runtime = "nodejs"; // optional: make intent explicit

type SpotifyImage = {
    url: string;
    height: number | null;
    width: number | null;
};

type SpotifyArtist = {
    name: string;
};

type SpotifyAlbum = {
    name: string;
    images?: SpotifyImage[];
};

type SpotifyTrack = {
    id: string;
    name: string;
    artists?: SpotifyArtist[];
    album?: SpotifyAlbum;
    preview_url?: string | null;
    external_urls?: { spotify?: string };
};

type SpotifyRecentItem = {
    played_at: string;
    track: SpotifyTrack;
};

type SpotifyRecentResponse = {
    items?: SpotifyRecentItem[];
};

type Track = {
    id: string;
    title: string;
    artists: string;
    album: string;
    image: string | null;
    previewUrl: string | null;
    externalUrl: string | null;
    playedAt: string; // ISO
};

async function refreshAccessToken(): Promise<string> {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
        process.env;

    const basic = Buffer.from(
        `${SPOTIFY_CLIENT_ID ?? ""}:${SPOTIFY_CLIENT_SECRET ?? ""}`,
    ).toString("base64");

    const res = await fetch(SPOTIFY_TOKEN_URL, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: SPOTIFY_REFRESH_TOKEN ?? "",
        }),
        cache: "no-store",
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Failed to refresh token: ${res.status} ${txt}`);
    }

    const json = (await res.json()) as {
        access_token?: string;
    };

    if (!json.access_token) {
        throw new Error("No access_token in refresh response");
    }

    return json.access_token;
}

export async function GET() {
    try {
        const {
            SPOTIFY_CLIENT_ID,
            SPOTIFY_CLIENT_SECRET,
            SPOTIFY_REFRESH_TOKEN,
        } = process.env;

        if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
            return NextResponse.json(
                { error: "Missing Spotify env vars" },
                { status: 500 },
            );
        }

        const accessToken = await refreshAccessToken();

        const recent = await fetch(SPOTIFY_RECENT_URL, {
            headers: { Authorization: `Bearer ${accessToken}` },
            cache: "no-store",
        });

        if (!recent.ok) {
            const txt = await recent.text();
            throw new Error(
                `Failed to load recently played: ${recent.status} ${txt}`,
            );
        }

        const data = (await recent.json()) as SpotifyRecentResponse;
        const items = data.items ?? [];

        const tracks: Track[] = items.map((item) => {
            const t = item.track;
            const image = t.album?.images?.[0]?.url ?? null;

            return {
                id: t.id || item.played_at, // fallback so React keys are stable
                title: t.name ?? "Unknown",
                artists: (t.artists ?? []).map((a) => a.name).filter(Boolean).join(", "),
                album: t.album?.name ?? "",
                image,
                previewUrl: t.preview_url ?? null,
                externalUrl: t.external_urls?.spotify ?? null,
                playedAt: item.played_at,
            };
        });

        const [now, ...rest] = tracks;
        const next = rest.slice(0, 4);

        return NextResponse.json({ now, next }, { status: 200 });
    } catch (err) {
        const message =
            err instanceof Error ? err.message : "Unexpected server error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
