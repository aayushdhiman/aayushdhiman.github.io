import { NextResponse } from "next/server";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_RECENT_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=5";

async function refreshAccessToken() {
    const basic = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const res = await fetch(SPOTIFY_TOKEN_URL, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? "",
        }),
        cache: "no-store",
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Failed to refresh token: ${res.status} ${txt}`);
    }

    const json = await res.json();
    return json.access_token as string;
}

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

export async function GET() {
    try {
        if (
            !process.env.SPOTIFY_CLIENT_ID ||
            !process.env.SPOTIFY_CLIENT_SECRET ||
            !process.env.SPOTIFY_REFRESH_TOKEN
        ) {
            return NextResponse.json(
                { error: "Missing Spotify env vars" },
                { status: 500 }
            );
        }

        const accessToken = await refreshAccessToken();

        const recent = await fetch(SPOTIFY_RECENT_URL, {
            headers: { Authorization: `Bearer ${accessToken}` },
            cache: "no-store",
        });

        if (!recent.ok) {
            const txt = await recent.text();
            throw new Error(`Failed to load recently played: ${recent.status} ${txt}`);
        }

        const data = await recent.json();

        const tracks: Track[] = (data.items ?? []).map((item: any) => {
            const t = item.track;
            const image = t?.album?.images?.[0]?.url ?? null;
            return {
                id: t?.id ?? item.played_at,
                title: t?.name ?? "Unknown",
                artists: (t?.artists ?? []).map((a: any) => a?.name).filter(Boolean).join(", "),
                album: t?.album?.name ?? "",
                image,
                previewUrl: t?.preview_url ?? null,
                externalUrl: t?.external_urls?.spotify ?? null,
                playedAt: item?.played_at ?? "",
            } as Track;
        });

        const [now, ...rest] = tracks;
        const next = rest.slice(0, 4);

        return NextResponse.json({ now, next }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
