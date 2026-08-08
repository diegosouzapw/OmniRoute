/**
 * remotion_satc_titles.tsx — Remotion Composition for 777Ледіс SATC 20s Opening Titles
 *
 * Renders Ukrainian Cyrillic titles with Sex and the City (Didot serif) styling
 * over clean Veo 3.1 video plates (S01–S05).
 *
 * Requirements:
 *   npx create-video@latest
 *   npm install @remotion/google-fonts
 */

import React from "react";
import { AbsoluteFill, Composition, Sequence, Video, interpolate, useCurrentFrame } from "remotion";

const FPS = 24;

interface TitleLayerProps {
  text: string;
  subText?: string;
  fontSize: number;
  subFontSize?: number;
  yOffset?: number;
  textColor?: string;
  letterSpacing?: string;
}

const SATCTitleCard: React.FC<TitleLayerProps> = ({
  text,
  subText,
  fontSize,
  subFontSize = 32,
  yOffset = 0,
  textColor = "#FFFFFF",
  letterSpacing = "0.15em",
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, 60, 72], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        transform: `translateY(${yOffset}px)`,
        opacity,
        fontFamily: "'Didot', 'Playfair Display', serif",
      }}
    >
      <div
        style={{
          fontSize,
          fontWeight: 700,
          color: textColor,
          letterSpacing,
          textShadow: "0px 4px 16px rgba(0, 0, 0, 0.75)",
          textAlign: "center",
        }}
      >
        {text}
      </div>
      {subText && (
        <div
          style={{
            fontSize: subFontSize,
            fontStyle: "italic",
            color: "#DCDCDC",
            letterSpacing: "0.10em",
            marginTop: 16,
            textShadow: "0px 2px 8px rgba(0, 0, 0, 0.8)",
          }}
        >
          {subText}
        </div>
      )}
    </AbsoluteFill>
  );
};

export const SATCOpeningComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* S01: Logo / Intro (0s - 3s = 72 frames) */}
      <Sequence from={0} durationInFrames={72}>
        <Video src="output/satc_5shots/clips_raw/S01_scene_01_logo.mp4" />
        <SATCTitleCard text="777Ледіс" subText="представляє" fontSize={92} subFontSize={32} />
      </Sequence>

      {/* S02: Main Title over Brooklyn Bridge Sunset (3s - 7s = 96 frames) */}
      <Sequence from={72} durationInFrames={96}>
        <Video src="output/satc_5shots/clips_raw/S02_scene_02_skyline_title.mp4" />
        <SATCTitleCard text="777 Ледіс" fontSize={130} textColor="#242220" letterSpacing="0.12em" />
      </Sequence>

      {/* S03: Heroine Manhattan Walk Subtitle (7s - 11s = 96 frames) */}
      <Sequence from={168} durationInFrames={96}>
        <Video src="output/satc_5shots/clips_raw/S03_scene_03_heroine_walk.mp4" />
        <SATCTitleCard
          text="Перше і єдине онлайн казино тільки для Леді"
          fontSize={38}
          yOffset={380}
          textColor="#FFFFFF"
          letterSpacing="0.08em"
        />
      </Sequence>

      {/* S04: Bus Splash Climax (11s - 16s = 120 frames) */}
      <Sequence from={264} durationInFrames={120}>
        <Video src="output/satc_5shots/clips_raw/S04_scene_04_bus_splash.mp4" />
        {/* Bus banner ad overlay handled either in plate or tracking */}
      </Sequence>

      {/* S05: Final Card (16s - 20s = 96 frames) */}
      <Sequence from={384} durationInFrames={96}>
        <Video src="output/satc_5shots/clips_raw/S05_scene_05_final_card.mp4" />
        <SATCTitleCard
          text="777Ледіс"
          subText="Перше і єдине онлайн казино тільки для Леді"
          fontSize={96}
          subFontSize={34}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
