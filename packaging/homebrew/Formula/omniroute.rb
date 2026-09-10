class Omniroute < Formula
  desc "Unified AI router with 160+ providers, auto fallback, MCP/A2A, and OpenAI-compatible APIs"
  homepage "https://github.com/KooshaPari/OmniRoute"
  version "3.8.49-koosha.0"
  url "https://registry.npmjs.org/@kooshapari/omniroute/-/omniroute-3.8.49-koosha.0.tgz"
  sha256 "5cf098e0245aa5a5cf0eee7480e7f17aed0198557346afec7ac921a46731e1cf"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *std_npm_args
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    system "#{bin}/omniroute", "--version"
  end
end
