"use client";

import { Card, Group, Text, Image, Anchor } from "@mantine/core";

export type SmallTrackProps = {
    title: string;
    artists: string;
    image: string | null;
    externalUrl: string | null;
};

export default function SmallTrackWidget({
    title,
    artists,
    image,
    externalUrl,
}: SmallTrackProps) {
    return (
        <Card withBorder radius="md" p="sm">
            <Group wrap="nowrap" gap="sm" align="center">
                <Image
                    src={image ?? ""}
                    w={56}
                    h={56}
                    radius="sm"
                    alt={`${title} cover`}
                    fallbackSrc="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Crect width='100%25' height='100%25' fill='%23ddd'/%3E%3C/svg%3E"
                />
                <div style={{ minWidth: 0 }}>
                    <Text fw={600} size="sm" lineClamp={1}>
                        {externalUrl ? (
                            <Anchor href={externalUrl} target="_blank" rel="noreferrer">
                                {title}
                            </Anchor>
                        ) : (
                            title
                        )}
                    </Text>
                    <Text size="xs" c="dimmed" lineClamp={1}>{artists}</Text>
                </div>
            </Group>
        </Card>
    );
}
