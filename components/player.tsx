"use client";

import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
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

const Player = () => {
  const {
    station,
    setStation,
    filters: activeFilters,
    isPlaying,
    isBuffering,
    streamError,
    setStreamError,
    setIsBuffering,
    setIsPlaying,
  } = useFilters();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isExpanded, setIsExpanded] = useState(false);

  // Reload audio whenever the station changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !station) return;

    setStreamError(false);
    setIsBuffering(true);
    audio.src = station.url_resolved;

    if (isPlaying) {
      audio.play().catch(() => setStreamError(true));
    }
  }, [station?.url_resolved]);

  if (!station) return null;

  const togglePlay = () => {
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
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val / 100;
  };

  const handleRandomise = async () => {
    setIsShuffling(true);
    try {
      const next = await fetchRandomStation(activeFilters);
      if (next) setStation(next);
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

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-[#1c1c1c]">
        <div className="mx-auto w-full max-w-6xl px-3 sm:px-4">
          {/* collapsed bar */}
          <div
            className="flex items-center gap-2 sm:gap-4 min-h-14 py-2 cursor-pointer select-none"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {/* live indicator */}
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span
                className={`absolute inline-flex h-full w-full rounded-md bg-[#00ff87] opacity-60 ${isPlaying ? "animate-ping" : ""}`}
              />
              <span className="relative inline-flex rounded-md h-1.5 w-1.5 bg-[#00ff87]" />
            </span>

            <span className="tracking-widest text-[#00ff87] font-medium shrink-0">
              live
            </span>

            <div className="w-px h-4 shrink-0 bg-muted" />

            <span className="tracking-wider text-muted truncate max-w-30 sm:max-w-none">
              {station.name}
            </span>

            <span className="hidden sm:block text-[#e0e0e0] flex-1 truncate font-mono">
              {station.country}
              {station.language ? ` · ${station.language}` : ""}
              {station.bitrate > 0 ? ` · ${station.bitrate} kbps` : ""}
            </span>

            <button
              aria-label={isExpanded ? "Collapse player" : "Expand player"}
              className="text-muted hover:text-[#666] transition-colors ml-auto shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
          </div>
        </div>

        <div className="border-t border-[#161616]" />

        <div className="mx-auto w-full max-w-6xl px-3 sm:px-4">
          {/* expanded panel */}
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: isExpanded ? "500px" : "0px" }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 py-4">
              {/* station logo */}
              <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-md bg-background border border-[#222] flex items-center justify-center shrink-0">
                {station.favicon ? (
                  <img
                    src={station.favicon}
                    alt={station.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <span className="text-3xl">📻</span>
                )}
              </div>

              {/* info + controls */}
              <div className="flex flex-col gap-3 flex-1 min-w-0">
                {/* station info */}
                <div>
                  <p className="tracking-widest text-muted mb-0.5">
                    {station.name}
                    {station.homepage ? (
                      <>
                        {" · "}
                        <a
                          href={station.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          website ↗
                        </a>
                      </>
                    ) : null}
                  </p>
                  {tags.length > 0 && (
                    <p className="text-muted font-mono truncate">
                      {tags.map((t) => t.trim()).join(" · ")}
                    </p>
                  )}
                  {streamError && (
                    <p className="text-red-400 text-xs mt-1">
                      Stream unavailable — try shuffling to another station.
                    </p>
                  )}
                </div>

                {/* controls row */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full">
                  <button
                    aria-label={isPlaying ? "Pause" : "Play"}
                    onClick={togglePlay}
                    disabled={streamError}
                    className="w-10 h-10 rounded-md border border-[#222] text-muted flex items-center justify-center hover:text-[#ccc] transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isBuffering ? (
                      <Loader2
                        size={16}
                        className="rounded-full animate-spin"
                      />
                    ) : isPlaying ? (
                      <Pause size={16} />
                    ) : (
                      <Play size={16} />
                    )}
                  </button>

                  <button
                    aria-label="Randomise station"
                    onClick={handleRandomise}
                    disabled={isShuffling}
                    className="w-10 h-10 rounded-md border border-[#222] text-muted flex items-center justify-center hover:text-[#ccc] transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isShuffling ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Shuffle size={15} />
                    )}
                  </button>

                  <LikeStationButton station={station} />

                  <div className="flex items-center gap-3 w-full sm:w-1/3 md:w-1/4 min-w-0">
                    <button
                      type="button"
                      onClick={() => {
                        setVolume(0);
                        if (audioRef.current) audioRef.current.volume = 0;
                      }}
                      className="text-muted hover:text-white transition-colors shrink-0"
                      aria-label="Mute volume"
                    >
                      <Volume1 size={14} />
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={volume}
                      onChange={handleVolume}
                      aria-label="Volume"
                      className="flex-1 cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #00ff87 ${volume}%, #1e1e1e ${volume}%)`,
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setVolume(100);
                        if (audioRef.current) audioRef.current.volume = 1;
                      }}
                      className="text-muted hover:text-white transition-colors shrink-0"
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
