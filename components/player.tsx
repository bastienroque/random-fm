"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Shuffle,
  Volume1,
  Volume2,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { fetchRandomStation } from "@/lib/radio-browser";
import { useFilters } from "@/context/FilterContext";
import { LikeStationButton } from "./like-station-button";
import PlayButton from "./play-button";
import { useLastPlayed } from "@/context/LastPlayedContext";
import Link from "next/link";
import { notify } from "@/lib/notifications";

const Player = () => {
  const {
    station,
    setStation,
    filters: activeFilters,
    isPlaying,
    streamError,
    setStreamError,
    setIsBuffering,
    setIsPlaying,
    registerTogglePlay,
  } = useFilters();
  const { updateLastPlayed } = useLastPlayed();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !station) return;

    setStreamError(false);
    setIsBuffering(true);
    audio.src = station.url_resolved;
    audio.load();

    notify.promise(
      new Promise<void>((resolve, reject) => {
        audio.oncanplay = () => resolve();
        audio.onerror = () => reject();
        audio.play().catch(reject);
      }),
      {
        loading: `Loading station...`,
        success: `Now playing: ${station.name}`,
        error:
          "Failed to load station, please Shuffle or hit the Randomise button again",
      },
    );
  }, [station?.url_resolved]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || streamError) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsBuffering(true);
      audio.play().catch(() => {
        setStreamError(true);
        setIsBuffering(false);
      });
    }
  }, [isPlaying, streamError]);

  useEffect(() => {
    registerTogglePlay(togglePlay);
  }, [togglePlay]);

  if (!station) return null;

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val / 100;
  };

  const handleRandomise = async () => {
    setIsShuffling(true);
    try {
      const next = await fetchRandomStation(activeFilters);
      if (next) {
        setStation(next);
        updateLastPlayed(next);
      }
    } finally {
      setIsShuffling(false);
    }
  };

  const tags = station.tags
    ? station.tags.split(",").slice(0, 3).filter(Boolean)
    : [];

  return (
    <>
      <audio
        ref={audioRef}
        preload="none"
        onPlaying={() => {
          setIsPlaying(true);
          setIsBuffering(false);
        }}
        onWaiting={() => setIsBuffering(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setStreamError(true);
          setIsBuffering(false);
          setIsPlaying(false);
        }}
      />
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] max-w-6xl z-50  bg-background dark:bg-foreground border-t border rounded-md">
        <div className="mx-auto w-full max-w-6xl px-2 sm:px-4">
          {/* collapsed bar */}
          <div
            className="flex items-center gap-2 sm:gap-4 min-h-14 py-2 cursor-pointer select-none"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse player" : "Expand player"}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span
                className={`absolute inline-flex h-full w-full rounded-md dark:bg-background bg-foreground opacity-60 ${isPlaying ? "animate-ping" : ""}`}
              />
              <span className="relative inline-flex rounded-md h-1.5 w-1.5 dark:bg-background bg-foreground" />
            </span>

            <span className="tracking-widest dark:text-background text-foreground font-medium shrink-0">
              live
            </span>
            <div className="w-px h-4 shrink-0 bg-muted" />
            <span className="tracking-wider text-muted truncate max-w-30 sm:max-w-none">
              {station.name}
            </span>
            <span className="hidden sm:block text-muted flex-1 truncate font-mono">
              {station.country}
              {station.language ? ` · ${station.language}` : ""}
              {station.bitrate > 0 ? ` · ${station.bitrate} kbps` : ""}
            </span>
            <button
              aria-label={isExpanded ? "Collapse player" : "Expand player"}
              className="text-muted hover:text-foreground dark:hover:text-background transition-colors ml-auto shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
          </div>
        </div>
        <div
          className={
            isExpanded
              ? "border-t border-foreground dark:border-background"
              : "hidden"
          }
        />
        <div className="mx-auto w-full max-w-6xl px-3 sm:px-4">
          {/* expanded panel */}
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: isExpanded ? "500px" : "0px" }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 py-4">
              {/* station logo */}
              <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-md bg-foreground dark:bg-background border border-background flex items-center justify-center shrink-0">
                {station.favicon ? (
                  <img
                    src={station.favicon}
                    alt={station.name ? "station.name" : "Radio station logo"}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <span className="text-3xl">📻</span>
                )}
              </div>
              <div className="flex flex-col gap-3 flex-1 min-w-0">
                <div>
                  <p className="tracking-widest text-muted mb-0.5 line-clamp-2">
                    {station.name}
                    {station.homepage ? (
                      <>
                        {" · "}
                        <Link
                          href={station.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold hover:text-foreground dark:hover:text-background transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          website ↗
                        </Link>
                      </>
                    ) : null}
                  </p>
                  {tags.length > 0 ? (
                    <p className="text-muted font-mono whitespace-break-spaces">
                      {tags.map((t) => t.trim()).join(" · ")}
                    </p>
                  ) : (
                    <p className="text-muted font-mono line-through whitespace-break-spaces">
                      tags unavailable
                    </p>
                  )}
                  {streamError && (
                    <p className="text-red-400 text-xs mt-1">
                      Station unavailable — try shuffling to another station or
                      use the randomise button again.
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <PlayButton station={station} />
                  <button
                    aria-label="Randomise station"
                    onClick={handleRandomise}
                    disabled={isShuffling}
                    className="w-10 h-10 rounded-md border border-muted text-muted flex items-center justify-center hover:border-foreground dark:hover:border-background hover:text-foreground dark:hover:text-background transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isShuffling ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Shuffle size={15} />
                    )}
                  </button>
                  <LikeStationButton station={station} />
                  <div className="flex items-center gap-1 sm:gap-3 w-full sm:w-1/3 md:w-1/4 min-w-0">
                    <button
                      type="button"
                      onClick={() => {
                        setVolume(0);
                        if (audioRef.current) audioRef.current.volume = 0;
                      }}
                      className="text-muted hover:text-foreground dark:hover:text-background transition-colors shrink-0"
                      aria-label="Mute volume"
                    >
                      <Volume1 size={14} />
                    </button>
                    <div className="relative flex-1 flex items-center group">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={volume}
                        onChange={handleVolume}
                        aria-label="Volume"
                        className="absolute inset-0 w-full opacity-0 cursor-pointer z-10 h-full"
                      />
                      <div className="w-full h-1 rounded-full bg-muted overflow-visible relative">
                        <div
                          className="h-full rounded-full bg-foreground dark:bg-background"
                          style={{ width: `${volume}%` }}
                        />
                        <div
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground dark:bg-background shadow"
                          style={{ left: `${volume}%` }}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setVolume(100);
                        if (audioRef.current) audioRef.current.volume = 1;
                      }}
                      className="text-muted hover:text-foreground dark:hover:text-background transition-colors shrink-0"
                      aria-label="Max volume"
                    >
                      <Volume2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
