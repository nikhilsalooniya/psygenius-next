"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";

export function VideoSection() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <section className="relative overflow-hidden min-h-screen py-20 sm:py-24 lg:py-28 flex items-center">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        loop
        playsInline
        poster="/Home-Screen.png"
        aria-hidden="true"
        autoPlay
        muted
      >
        <source src="/mentora-video.webm" type="video/webm" />
      </video>

      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      <Container>
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Logo className="h-8 w-auto invert" />
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            MentoraGenius
          </h2>
          <p className="text-base text-gray-100 sm:text-lg">
            PsyGenius macht den Anfang – weitere Genius-Apps folgen
          </p>
        </div>
      </Container>

      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-2 ring-white/60 transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-4"
      >
        {muted ? (
          <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>
    </section>
  );
}
