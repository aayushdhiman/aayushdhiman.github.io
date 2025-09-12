// app/about/page.tsx
"use client";
import { AppShell } from "@mantine/core";
import type { Metadata } from "next";
import Image from "next/image";
import React from "react";
import Header from "~/app/_components/Header";

export default function AboutPage() {
    const photoStyle: React.CSSProperties = {
        borderRadius: 12,
        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12)",
        objectFit: "cover",
    };

    return (
        <>
            {/* Header (full-width so internal grid centers)
            <header
                style={{
                    width: "100vw",
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 16px",
                }}
            >
                <div style={{ width: "100%", maxWidth: 1280, margin: "0 auto" }}>
                    <Header />
                </div>
            </header> */}
            <AppShell header={{ height: 56 }} padding="lg">
                <AppShell.Header>
                    <Header />
                </AppShell.Header>

                <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
                    <h1 style={{ textAlign: "center", margin: 0, marginBottom: 8 }}>About</h1>
                    <p
                        style={{
                            textAlign: "center",
                            color: "var(--mantine-color-dimmed, #9aa1ac)",
                            marginTop: 0,
                            marginBottom: 32,
                        }}
                    >
                        oh, the places you'll go...
                    </p>

                    {/* Collage */}
                    <section
                        style={{
                            position: "relative",
                            minHeight: 360,
                            margin: "0 auto 32px",
                        }}
                    >
                        <div style={{ position: "absolute", top: 0, left: "5%", transform: "rotate(-2deg)" }}>
                            <Image src="/images/about-1.jpg" alt="About photo 1" width={280} height={200} style={photoStyle} priority />
                        </div>

                        <div style={{ position: "absolute", top: 40, right: "10%", transform: "rotate(3deg)" }}>
                            <Image src="/images/about-2.jpg" alt="About photo 2" width={260} height={200} style={photoStyle} />
                        </div>

                        <div style={{ position: "absolute", bottom: 20, left: "18%", transform: "rotate(1.5deg)" }}>
                            <Image src="/images/about-3.jpg" alt="About photo 3" width={260} height={200} style={photoStyle} />
                        </div>

                        <div style={{ position: "absolute", bottom: 0, right: "22%", transform: "rotate(-4deg)" }}>
                            <Image src="/images/about-4.jpg" alt="About photo 4" width={280} height={200} style={photoStyle} />
                        </div>
                    </section>

                    {/* ---- Timeline (styled like your screenshot) ---- */}
                    <h2 style={{ margin: "36px 0 16px", fontSize: 22 }}>Timeline</h2>
                    <Timeline lineColor="#2f6db1">
                        {/* latest → oldest */}
                        <TimelineItem
                            color="#2f6db1"
                            title="MIT Lincoln Laboratory"
                            subtitle="Full-Stack Software Engineer"
                            period="2023 - Now"
                            bullets={["interned both part and full time starting in 2023", "full time as of may 2025, working on anti malware systems and doing cyber research"]}
                        />
                        <TimelineItem
                            color="#d44545"
                            title="Northeastern University, Boston, MA"
                            subtitle="B.S. Computer Science"
                            period="2021 - 2025"
                            bullets={["got my degree (cs with a concentration in ai)"]}
                        />
                        <TimelineItem
                            color="#e0b341"
                            title="ManTech International"
                            subtitle="Forensic Analysis Intern"
                            period="2020 - 2023"
                            bullets={["built tools and did forensic analysis and reverse engineering", "eventually taught other interns my skills in 2022 and 2023"]}
                        />
                    </Timeline>
                </main>
            </AppShell>

        </>
    );
}

/* ---------------- Timeline primitives (pure React/HTML) ---------------- */

function Timeline({
    children,
    lineColor = "#d3d3d3",
}: {
    children: React.ReactNode;
    lineColor?: string;
}) {
    return (
        <div
            style={{
                position: "relative",
                margin: "0 auto",
                maxWidth: 980,
                paddingLeft: 4, // gutter for bullets/line
            }}
        >
            {/* vertical line behind bullets (extends past top/bottom) */}
            <div
                style={{
                    position: "absolute",
                    left: 28, // center of bullets (14px radius + 14px inset)
                    top: -24,
                    bottom: -24,
                    width: 2,
                    background: lineColor,
                    opacity: 0.7,
                    zIndex: 0,
                }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
        </div>
    );
}

function TimelineItem({
    color,
    title,
    subtitle,
    period,
    bullets,
}: {
    color: string;
    title: string;
    subtitle: string;
    period: string;
    bullets: string[];
}) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr auto",
                columnGap: 16,
                alignItems: "start",
                marginBottom: 28,
                position: "relative",
            }}
        >
            {/* Bullet column (relative so we can place the dot precisely) */}
            <div style={{ position: "relative", height: 0 }}>
                <span
                    style={{
                        position: "absolute",
                        left: 18, // aligns with line at 28px (center)
                        top: 6,
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: color,
                        boxShadow:
                            "0 0 0 3px rgba(255,255,255,0.06), 0 0 0 5px rgba(0,0,0,0.2)", // soft ring like screenshot
                    }}
                />
            </div>

            {/* Content */}
            <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{title}</div>
                <div
                    style={{
                        fontStyle: "italic",
                        color: "var(--mantine-color-dimmed, rgba(255,255,255,0.7))",
                        marginTop: 2,
                        marginBottom: 6,
                    }}
                >
                    {subtitle}
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, color: "inherit", opacity: 0.95 }}>
                    {bullets.map((b, i) => (
                        <li key={i} style={{ marginBottom: 4, lineHeight: 1.5 }}>
                            {b}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Period (right aligned) */}
            <div
                style={{
                    whiteSpace: "nowrap",
                    color: "var(--mantine-color-dimmed, rgba(255,255,255,0.7))",
                    marginTop: 2,
                    fontSize: 16,
                }}
            >
                {period}
            </div>
        </div>
    );
}
