"use client";

export default function AnimatedBackground() {
  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(to right, #E54D5E 1px, transparent 1px), linear-gradient(to bottom, #E54D5E 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Animated gradient orbs */}
        <div className="absolute -top-20 left-1/4 w-[600px] h-[600px] bg-[#E54D5E]/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[120px] animate-blob-delayed-1" />
        <div className="absolute -bottom-20 left-1/2 w-[550px] h-[550px] bg-blue-500/12 rounded-full blur-[120px] animate-blob-delayed-2" />

        {/* Vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, rgba(11, 14, 20, 0.4) 100%)",
          }}
        />
      </div>
    </>
  );
}
