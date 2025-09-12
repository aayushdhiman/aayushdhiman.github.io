"use client";

import { Badge, Card, Group, Image, Stack, Text, Anchor } from "@mantine/core";

export type LargeTrackProps = {
    title: string;
    artists: string;
    album: string;
    image: string | null;
    externalUrl: string | null;
};

export default function LargeTrackWidget({
    title,
    artists,
    album,
    image,
    externalUrl,
}: LargeTrackProps) {
    const alt = `${title} — ${artists} (cover art)`;

    return (
        <Card withBorder radius="md" p="md">
            <Group align="flex-start" wrap="nowrap" gap="md">
                <Image
                    src={image ?? ""}
                    w={120}
                    h={120}
                    radius="sm"
                    alt={alt}
                    fallbackSrc="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='100%25' height='100%25' fill='%23ddd'/%3E%3C/svg%3E"
                />
                <Stack gap={4} flex={1}>
                    <Badge size="sm" variant="light">
                        Recently played
                    </Badge>
                    <Text fw={700} size="lg" lineClamp={2}>
                        {externalUrl ? (
                            <Anchor href={externalUrl} target="_blank" rel="noreferrer">
                                {title}
                            </Anchor>
                        ) : (
                            title
                        )}
                    </Text>
                    <Text size="sm" c="dimmed">
                        {artists}
                    </Text>
                    <Text size="sm">{album}</Text>
                </Stack>
            </Group>
        </Card>
    );
}
