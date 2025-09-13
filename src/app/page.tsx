"use client";

import { Container, Text, Stack, Flex, Divider } from "@mantine/core";
import TypingTitle from "~/app/_components/TypingTitle";
// import RecentMusic from "~/app/_components/spotify/RecentMusic";

export default function Page() {
  return (
    <Flex justify="center">
      <Container size="md">
        <Stack gap="sm" align="center">
          <TypingTitle
            text="hey there, i'm Aayush"
            order={1}
            speedMs={100}
            stopCursorOnComplete={false}
            align="center"
          />
          <Text ta="center">
            just a developer building things and going places
          </Text>
          <Divider my="sm" />
          {/* <RecentMusic /> */}
        </Stack>
      </Container>
    </Flex>
  );
}