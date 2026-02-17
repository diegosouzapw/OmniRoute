import figlet from "figlet";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";

/**
 * Display banner
 */
export function showBanner() {
  const banner = (figlet as any).textSync("LLM Proxy", {
    font: "ANSI Shadow",
    horizontalLayout: "default",
    verticalLayout: "default",
  });

  console.log("\n" + gradient.pastel.multiline(banner));
  console.log(gradient.cristal("  🚀 OAuth CLI for AI Providers\n"));
}

/**
 * Display simple banner (no animation)
 */
export function showSimpleBanner() {
  const banner = (figlet as any).textSync("EP CLI", {
    font: "Standard",
    horizontalLayout: "default",
  });
  console.log(gradient.pastel.multiline(banner));
  console.log(gradient.cristal("  OAuth CLI for AI Providers\n"));
}

/**
 * Display success animation
 */
export async function showSuccess(message: string) {
  return new Promise<void>((resolve) => {
    const animation = chalkAnimation.rainbow(`\n✨ ${message}\n`);
    setTimeout(() => {
      animation.stop();
      resolve();
    }, 1000);
  });
}

/**
 * Display loading animation
 */
export function showLoading(text: string) {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let i = 0;

  const interval = setInterval(() => {
    process.stdout.write(`\r${frames[i]} ${text}`);
    i = (i + 1) % frames.length;
  }, 80);

  return {
    stop: () => {
      clearInterval(interval);
      process.stdout.write("\r");
    },
  };
}
