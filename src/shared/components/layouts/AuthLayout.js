"use client";

import PropTypes from "prop-types";
import ThemeToggle from "../ThemeToggle";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col relative bg-bg transition-colors duration-500 overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Background effects */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 dark:bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-orange-200/20 dark:bg-orange-900/10 rounded-full blur-[120px] pointer-events-none z-0 translate-y-1/3 translate-x-1/3" />

      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle variant="card" />
      </div>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 z-10 w-full h-full">
        {children}
      </main>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
