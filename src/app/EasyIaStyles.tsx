"use client";

export default function EasyIaStyles() {
  return (
    <style jsx global>{`
      .easyia-root {
        --ink: #09111f;
        --muted: #617086;
        --panel: rgba(255, 255, 255, 0.78);
        --line: rgba(22, 39, 65, 0.12);
        --brand: #f45b45;
        --brand-2: #16b8c9;
        --gold: #f0b83f;
        --deep: #0c172a;
        --soft: #eef6f7;
        --radius: 28px;
        color: var(--ink);
        background:
          radial-gradient(circle at top left, rgba(244, 91, 69, 0.22), transparent 34rem),
          radial-gradient(circle at 88% 12%, rgba(22, 184, 201, 0.2), transparent 30rem),
          linear-gradient(135deg, #fff7ec 0%, #eef8fb 52%, #f8fbff 100%);
        font-family: Georgia, "Times New Roman", serif;
        min-height: 100vh;
      }
      .easyia-root * {
        box-sizing: border-box;
      }
      .easyia-root a {
        color: inherit;
        text-decoration: none;
      }
      .easyia-root button,
      .easyia-root input,
      .easyia-root select,
      .easyia-root textarea {
        font: inherit;
      }
      .easyia-root .shell {
        width: min(1180px, calc(100% - 32px));
        margin: 0 auto;
      }
      .easyia-root .nav {
        position: sticky;
        top: 16px;
        z-index: 10;
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        padding: 14px 16px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.72);
        backdrop-filter: blur(18px);
        box-shadow: 0 18px 60px rgba(15, 35, 60, 0.08);
      }
      .easyia-root .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 900;
        letter-spacing: -0.03em;
      }
      .easyia-root .logo-mark {
        width: 38px;
        height: 38px;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--brand), var(--brand-2));
        box-shadow: 0 10px 26px rgba(244, 91, 69, 0.25);
      }
      .easyia-root .nav-links {
        display: flex;
        gap: 8px;
        align-items: center;
        color: var(--muted);
        font-family: "Trebuchet MS", sans-serif;
        font-size: 14px;
      }
      .easyia-root .nav-links a {
        padding: 10px 13px;
        border-radius: 999px;
      }
      .easyia-root .nav-links a:hover {
        background: rgba(9, 17, 31, 0.06);
        color: var(--ink);
      }
      .easyia-root .cta,
      .easyia-root .ghost,
      .easyia-root .danger,
      .easyia-root .small-btn {
        border: 0;
        cursor: pointer;
        border-radius: 999px;
        padding: 12px 18px;
        font-family: "Trebuchet MS", sans-serif;
        font-weight: 800;
        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease,
          background 0.2s ease;
      }
      .easyia-root .cta {
        color: white;
        background: linear-gradient(135deg, var(--brand), #d9345a);
        box-shadow: 0 16px 42px rgba(217, 52, 90, 0.25);
      }
      .easyia-root .ghost {
        background: rgba(255, 255, 255, 0.68);
        border: 1px solid var(--line);
        color: var(--ink);
      }
      .easyia-root .danger {
        background: rgba(244, 91, 69, 0.1);
        color: #ad2c1b;
        border: 1px solid rgba(244, 91, 69, 0.2);
      }
      .easyia-root .small-btn {
        padding: 9px 12px;
        font-size: 13px;
        background: var(--deep);
        color: white;
      }
      .easyia-root .cta:hover,
      .easyia-root .ghost:hover,
      .easyia-root .small-btn:hover {
        transform: translateY(-2px);
      }
      .easyia-root .hero {
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: 34px;
        align-items: center;
        padding: 84px 0 64px;
      }
      .easyia-root .badge {
        display: inline-flex;
        gap: 8px;
        align-items: center;
        padding: 8px 12px;
        border: 1px solid rgba(22, 184, 201, 0.25);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.62);
        color: #147f8a;
        font-family: "Trebuchet MS", sans-serif;
        font-weight: 800;
        font-size: 13px;
      }
      .easyia-root h1 {
        margin: 18px 0;
        font-size: clamp(48px, 7vw, 94px);
        line-height: 0.91;
        letter-spacing: -0.07em;
      }
      .easyia-root .lead {
        color: #324154;
        font-size: clamp(18px, 2.2vw, 24px);
        line-height: 1.45;
        max-width: 680px;
      }
      .easyia-root .hero-actions {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-top: 28px;
      }
      .easyia-root .metric-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-top: 30px;
      }
      .easyia-root .metric {
        padding: 18px;
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.64);
        border: 1px solid var(--line);
      }
      .easyia-root .metric strong {
        display: block;
        font-size: 28px;
        letter-spacing: -0.04em;
      }
      .easyia-root .metric span {
        color: var(--muted);
        font-family: "Trebuchet MS", sans-serif;
        font-size: 13px;
      }
      .easyia-root .chat-card,
      .easyia-root .card,
      .easyia-root .portal-card {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: var(--radius);
        box-shadow: 0 24px 80px rgba(12, 23, 42, 0.12);
        backdrop-filter: blur(16px);
      }
      .easyia-root .chat-card {
        padding: 20px;
        transform: rotate(1deg);
      }
      .easyia-root .chat-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        font-family: "Trebuchet MS", sans-serif;
        color: var(--muted);
      }
      .easyia-root .dots {
        display: flex;
        gap: 7px;
      }
      .easyia-root .dots i {
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: var(--brand);
        display: block;
      }
      .easyia-root .dots i:nth-child(2) {
        background: var(--gold);
      }
      .easyia-root .dots i:nth-child(3) {
        background: var(--brand-2);
      }
      .easyia-root .bubble {
        padding: 14px 16px;
        border-radius: 18px;
        margin: 10px 0;
        line-height: 1.45;
        font-family: "Trebuchet MS", sans-serif;
      }
      .easyia-root .bubble.user {
        background: #0d1b2f;
        color: white;
        margin-left: 54px;
      }
      .easyia-root .bubble.ai {
        background: white;
        border: 1px solid var(--line);
        margin-right: 30px;
      }
      .easyia-root .chat-form {
        display: grid;
        gap: 10px;
        margin-top: 14px;
      }
      .easyia-root textarea,
      .easyia-root input,
      .easyia-root select {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 16px;
        padding: 13px 14px;
        background: rgba(255, 255, 255, 0.78);
        color: var(--ink);
        outline: none;
      }
      .easyia-root textarea:focus,
      .easyia-root input:focus,
      .easyia-root select:focus {
        border-color: rgba(22, 184, 201, 0.55);
        box-shadow: 0 0 0 4px rgba(22, 184, 201, 0.12);
      }
      .easyia-root .section {
        padding: 58px 0;
      }
      .easyia-root .section-title {
        display: flex;
        justify-content: space-between;
        align-items: end;
        gap: 24px;
        margin-bottom: 22px;
      }
      .easyia-root h2 {
        margin: 0;
        font-size: clamp(34px, 4.4vw, 60px);
        line-height: 0.96;
        letter-spacing: -0.055em;
      }
      .easyia-root .section-title p {
        color: var(--muted);
        max-width: 520px;
        font-family: "Trebuchet MS", sans-serif;
      }
      .easyia-root .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 18px;
      }
      .easyia-root .card {
        padding: 24px;
        min-height: 260px;
        position: relative;
        overflow: hidden;
      }
      .easyia-root .card.feature::after {
        content: "";
        position: absolute;
        width: 130px;
        height: 130px;
        right: -45px;
        bottom: -45px;
        background: radial-gradient(circle, rgba(22, 184, 201, 0.28), transparent 65%);
      }
      .easyia-root .price {
        font-size: 42px;
        font-weight: 900;
        letter-spacing: -0.06em;
        margin: 14px 0 4px;
      }
      .easyia-root .muted {
        color: var(--muted);
        font-family: "Trebuchet MS", sans-serif;
      }
      .easyia-root .combo-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 18px;
      }
      .easyia-root .combo-pill {
        border: 1px solid rgba(12, 23, 42, 0.12);
        background: rgba(255, 255, 255, 0.68);
        padding: 7px 10px;
        border-radius: 999px;
        font-family: "Trebuchet MS", sans-serif;
        font-size: 12px;
        color: #304158;
      }
      .easyia-root .signup-panel {
        display: grid;
        grid-template-columns: 0.9fr 1.1fr;
        gap: 18px;
      }
      .easyia-root .form {
        display: grid;
        gap: 12px;
      }
      .easyia-root .notice {
        padding: 14px 16px;
        border-radius: 18px;
        background: rgba(22, 184, 201, 0.1);
        color: #106d77;
        font-family: "Trebuchet MS", sans-serif;
      }
      .easyia-root .codebox {
        word-break: break-all;
        background: #08111f;
        color: #b9ffec;
        border-radius: 18px;
        padding: 16px;
        font-family: "Courier New", monospace;
      }
      .easyia-root .footer {
        padding: 32px 0 48px;
        color: var(--muted);
        font-family: "Trebuchet MS", sans-serif;
      }
      .easyia-root .portal-wrap {
        min-height: 100vh;
        padding: 28px 0 64px;
      }
      .easyia-root .portal-grid {
        display: grid;
        grid-template-columns: 360px 1fr;
        gap: 18px;
        margin-top: 24px;
      }
      .easyia-root .portal-card {
        padding: 22px;
      }
      .easyia-root .stat-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
      }
      .easyia-root .stat {
        padding: 16px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.64);
        border: 1px solid var(--line);
      }
      .easyia-root .progress {
        height: 10px;
        border-radius: 999px;
        background: rgba(12, 23, 42, 0.1);
        overflow: hidden;
        margin-top: 10px;
      }
      .easyia-root .progress span {
        display: block;
        height: 100%;
        background: linear-gradient(90deg, var(--brand-2), var(--brand));
      }
      .easyia-root .table {
        width: 100%;
        border-collapse: collapse;
        font-family: "Trebuchet MS", sans-serif;
      }
      .easyia-root .table th,
      .easyia-root .table td {
        text-align: left;
        padding: 13px;
        border-bottom: 1px solid var(--line);
      }
      .easyia-root .table th {
        color: var(--muted);
        font-size: 13px;
      }
      @media (max-width: 860px) {
        .easyia-root .hero,
        .easyia-root .signup-panel,
        .easyia-root .portal-grid {
          grid-template-columns: 1fr;
        }
        .easyia-root .grid,
        .easyia-root .metric-row,
        .easyia-root .stat-grid {
          grid-template-columns: 1fr;
        }
        .easyia-root .nav {
          align-items: flex-start;
          border-radius: 24px;
        }
        .easyia-root .nav-links {
          display: none;
        }
        .easyia-root .chat-card {
          transform: none;
        }
      }
    `}</style>
  );
}
