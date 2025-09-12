"use client";

import { AppShell, Container, Text, Stack, Flex, Divider } from "@mantine/core";
import Header from "~/app/_components/Header";
import TypingTitle from "~/app/_components/TypingTitle";
// import RecentMusic from "./_components/spotify/RecentMusic";

export default function Page() {
  return (
    <AppShell header={{ height: 56 }} padding="lg">
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Flex justify="center">
          <Container size="md">
            <Stack gap="sm" align="center">
              <TypingTitle
                text="hey there, i'm Aayush"
                order={1}
                speedMs={100}
                stopCursorOnComplete={false} // set true if you want cursor to vanish
                align="center"
              />
              <Text ta="center">
                just a developer building things and going places
              </Text>
              <Divider my="sm" />

              {/* Spotify section */}
              {/* <RecentMusic /> */}
            </Stack>
          </Container>
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
}
