"use client";

import { Title } from "@mantine/core";
import { useEffect, useState } from "react";

type Props = {
    text: string;
    order?: 1 | 2 | 3 | 4 | 5 | 6;
    speedMs?: number;                // typing speed per char (default 100ms)
    stopCursorOnComplete?: boolean;  // hide cursor when done
    align?: "left" | "center" | "right";
};

export default function TypingTitle({
    text,
    order = 1,
    speedMs = 100,
    stopCursorOnComplete = false,
    align = "left",
}: Props) {
    const [displayText, setDisplayText] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayText(text.slice(0, i + 1));
            i++;
            if (i === text.length) {
                clearInterval(interval);
                setDone(true);
            }
        }, speedMs);

        return () => clearInterval(interval);
    }, [text, speedMs]);

    return (
        <>
            <Title order={order} ta={align}>
                {displayText}
                <span className={`typing-cursor ${done && stopCursorOnComplete ? "hidden" : ""}`}>|</span>
            </Title>

            <style jsx>{`
        .typing-cursor {
          display: inline-block;
          margin-left: 2px;
          width: 1ch;
          animation: blink 1s step-start infinite;
        }
        .typing-cursor.hidden {
          visibility: hidden;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
        </>
    );
}
