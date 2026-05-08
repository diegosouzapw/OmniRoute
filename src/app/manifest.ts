import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OmniRoute",
    short_name: "OmniRoute",
    description:
      "OmniRoute is an AI gateway for multi-provider LLMs. One endpoint for all your AI providers.",
    start_url: "/",
    scope: "/",
    display: "fullscreen",
    orientation: "any",
    background_color: "#0b0f1a",
    theme_color: "#0b0f1a",
    icons: [
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
