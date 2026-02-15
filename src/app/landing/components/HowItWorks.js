"use client";

export default function HowItWorks() {
  return (
    <section className="py-24 border-y border-[#2D333B] bg-[#111520]/30" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How OmniRoute Works</h2>
          <p className="text-gray-400 max-w-xl text-lg">
            Data flows seamlessly from your application through our intelligent routing layer to the
            best provider for the job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-linear-to-r from-gray-700 via-[#E54D5E] to-gray-700 -z-10"></div>

          {/* Step 1: CLI & SDKs */}
          <div className="flex flex-col gap-6 relative group">
            <div className="w-24 h-24 rounded-2xl bg-[#0B0E14] border border-[#2D333B] flex items-center justify-center shadow-xl group-hover:border-gray-500 transition-colors z-10 mx-auto md:mx-0">
              <span className="material-symbols-outlined text-4xl text-gray-300">terminal</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">1. CLI &amp; SDKs</h3>
              <p className="text-sm text-gray-400">
                Your requests start from your favorite tools or our unified SDK. Just change the
                base URL.
              </p>
            </div>
          </div>

          {/* Step 2: OmniRoute Hub */}
          <div className="flex flex-col gap-6 relative group md:items-center md:text-center">
            <div className="w-24 h-24 rounded-2xl bg-[#0B0E14] border-2 border-[#E54D5E] flex items-center justify-center shadow-[0_0_30px_rgba(229,77,94,0.2)] z-10 mx-auto">
              <span className="material-symbols-outlined text-4xl text-[#E54D5E] animate-pulse">
                hub
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-[#E54D5E]">2. OmniRoute Hub</h3>
              <p className="text-sm text-gray-400">
                Our engine analyzes the prompt, checks provider health, and routes for lowest
                latency or cost.
              </p>
            </div>
          </div>

          {/* Step 3: AI Providers */}
          <div className="flex flex-col gap-6 relative group md:items-end md:text-right">
            <div className="w-24 h-24 rounded-2xl bg-[#0B0E14] border border-[#2D333B] flex items-center justify-center shadow-xl group-hover:border-gray-500 transition-colors z-10 mx-auto md:mx-0">
              <div className="grid grid-cols-2 gap-2">
                <div className="w-6 h-6 rounded bg-white/10"></div>
                <div className="w-6 h-6 rounded bg-white/10"></div>
                <div className="w-6 h-6 rounded bg-white/10"></div>
                <div className="w-6 h-6 rounded bg-white/10"></div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">3. AI Providers</h3>
              <p className="text-sm text-gray-400">
                The request is fulfilled by OpenAI, Anthropic, Gemini, or others instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
