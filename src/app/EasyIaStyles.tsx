"use client";

export default function EasyIaStyles() {
  return (
    <style jsx global>{`
      .easyia-root {
        --ink: #d9e7ff;
        --muted: #8ea4c7;
        --panel: rgba(10, 18, 34, 0.72);
        --line: rgba(111, 138, 190, 0.28);
        --brand: #16b8c9;
        --brand-2: #4f7cff;
        --gold: #f0b83f;
        --deep: #0a1224;
        --radius: 28px;
        color: var(--ink);
        background:
          radial-gradient(circle at top left, rgba(22, 184, 201, 0.26), transparent 34rem),
          radial-gradient(circle at 88% 12%, rgba(79, 124, 255, 0.24), transparent 30rem),
          linear-gradient(135deg, #050a14 0%, #0a1224 52%, #111d35 100%);
        font-family: "Inter", "Segoe UI", "Helvetica Neue", sans-serif;
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
        gap: 14px;
        padding: 14px 16px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: rgba(10, 18, 34, 0.74);
        backdrop-filter: blur(18px);
        box-shadow: 0 18px 60px rgba(5, 14, 30, 0.35);
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
        box-shadow: 0 10px 26px rgba(79, 124, 255, 0.35);
      }
      .easyia-root .nav-links {
        display: flex;
        gap: 8px;
        align-items: center;
        color: var(--muted);
        font-size: 14px;
      }
      .easyia-root .nav-links a {
        padding: 10px 13px;
        border-radius: 999px;
      }
      .easyia-root .nav-links a:hover {
        background: rgba(79, 124, 255, 0.15);
        color: #dff0ff;
      }
      .easyia-root .lang-switch {
        display: inline-flex;
        border: 1px solid rgba(111, 138, 190, 0.35);
        border-radius: 999px;
        padding: 3px;
        background: rgba(9, 16, 30, 0.85);
      }
      .easyia-root .lang-switch button {
        border: 0;
        background: transparent;
        color: #a5bddf;
        border-radius: 999px;
        padding: 7px 10px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
      }
      .easyia-root .lang-switch button.active {
        background: linear-gradient(135deg, var(--brand), var(--brand-2));
        color: #ffffff;
      }
      .easyia-root .cta,
      .easyia-root .ghost,
      .easyia-root .danger,
      .easyia-root .small-btn {
        border: 0;
        cursor: pointer;
        border-radius: 999px;
        padding: 12px 18px;
        font-weight: 800;
        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease,
          background 0.2s ease;
      }
      .easyia-root .cta {
        color: white;
        background: linear-gradient(135deg, var(--brand), var(--brand-2));
        box-shadow: 0 16px 42px rgba(79, 124, 255, 0.32);
      }
      .easyia-root .ghost {
        background: rgba(20, 33, 56, 0.72);
        border: 1px solid rgba(130, 154, 201, 0.35);
        color: #dce9ff;
      }
      .easyia-root .danger {
        background: rgba(244, 91, 69, 0.1);
        color: #ff8d7b;
        border: 1px solid rgba(244, 91, 69, 0.2);
      }
      .easyia-root .small-btn {
        padding: 9px 12px;
        font-size: 13px;
        background: #122445;
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
        border: 1px solid rgba(79, 124, 255, 0.4);
        border-radius: 999px;
        background: rgba(13, 23, 41, 0.7);
        color: #8fd7ff;
        font-weight: 800;
        font-size: 13px;
      }
      .easyia-root h1 {
        margin: 18px 0;
        font-size: clamp(44px, 6.5vw, 82px);
        line-height: 0.95;
        letter-spacing: -0.05em;
      }
      .easyia-root .lead {
        color: #aac0df;
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
        background: rgba(13, 23, 41, 0.7);
        border: 1px solid rgba(111, 138, 190, 0.24);
      }
      .easyia-root .metric strong {
        display: block;
        font-size: 28px;
        letter-spacing: -0.04em;
      }
      .easyia-root .metric span {
        color: var(--muted);
        font-size: 13px;
      }
      .easyia-root .chat-card,
      .easyia-root .card,
      .easyia-root .portal-card {
        background: var(--panel);
        border: 1px solid rgba(111, 138, 190, 0.24);
        border-radius: var(--radius);
        box-shadow: 0 24px 80px rgba(6, 14, 28, 0.45);
        backdrop-filter: blur(16px);
      }
      .easyia-root .chat-card {
        padding: 20px;
      }
      .easyia-root .chat-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
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
      }
      .easyia-root .bubble.user {
        background: #122445;
        color: white;
        margin-left: 54px;
      }
      .easyia-root .bubble.ai {
        background: rgba(19, 33, 58, 0.8);
        border: 1px solid rgba(111, 138, 190, 0.24);
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
        border: 1px solid rgba(111, 138, 190, 0.28);
        border-radius: 16px;
        padding: 13px 14px;
        background: rgba(8, 16, 31, 0.72);
        color: #dce9ff;
        outline: none;
      }
      .easyia-root textarea:focus,
      .easyia-root input:focus,
      .easyia-root select:focus {
        border-color: rgba(79, 124, 255, 0.58);
        box-shadow: 0 0 0 4px rgba(79, 124, 255, 0.16);
      }
      .easyia-root .section {
        padding: 58px 0;
      }
      .easyia-root .team-strip {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-top: -12px;
      }
      .easyia-root .team-card {
        border-radius: var(--radius);
        overflow: hidden;
        border: 1px solid rgba(111, 138, 190, 0.24);
        background: rgba(9, 17, 33, 0.7);
      }
      .easyia-root .team-card img {
        width: 100%;
        height: 220px;
        object-fit: cover;
        display: block;
      }
      .easyia-root .team-card div {
        padding: 16px 18px 18px;
      }
      .easyia-root .team-card h3 {
        margin: 0 0 8px;
        font-size: 22px;
        letter-spacing: -0.03em;
      }
      .easyia-root .team-card p {
        margin: 0;
        color: var(--muted);
        line-height: 1.45;
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
        font-size: clamp(32px, 4.4vw, 56px);
        line-height: 0.98;
        letter-spacing: -0.04em;
      }
      .easyia-root .section-title p {
        color: var(--muted);
        max-width: 520px;
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
        background: radial-gradient(circle, rgba(79, 124, 255, 0.28), transparent 65%);
      }
      .easyia-root .price {
        font-size: 42px;
        font-weight: 900;
        letter-spacing: -0.06em;
        margin: 14px 0 4px;
      }
      .easyia-root .muted {
        color: var(--muted);
      }
      .easyia-root .combo-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 18px;
      }
      .easyia-root .combo-pill {
        border: 1px solid rgba(111, 138, 190, 0.22);
        background: rgba(12, 22, 39, 0.72);
        padding: 7px 10px;
        border-radius: 999px;
        font-size: 12px;
        color: #b8ccef;
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
        background: rgba(79, 124, 255, 0.14);
        color: #98dfff;
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
        background: rgba(13, 23, 41, 0.7);
        border: 1px solid rgba(111, 138, 190, 0.24);
      }
      .easyia-root .progress {
        height: 10px;
        border-radius: 999px;
        background: rgba(150, 170, 210, 0.15);
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
      }
      .easyia-root .table th,
      .easyia-root .table td {
        text-align: left;
        padding: 13px;
        border-bottom: 1px solid rgba(111, 138, 190, 0.24);
      }
      .easyia-root .table th {
        color: var(--muted);
        font-size: 13px;
      }
      @media (max-width: 980px) {
        .easyia-root .nav {
          border-radius: 24px;
          align-items: flex-start;
          flex-wrap: wrap;
        }
      }
      @media (max-width: 860px) {
        .easyia-root .hero,
        .easyia-root .signup-panel,
        .easyia-root .portal-grid,
        .easyia-root .team-strip {
          grid-template-columns: 1fr;
        }
        .easyia-root .grid,
        .easyia-root .metric-row,
        .easyia-root .stat-grid {
          grid-template-columns: 1fr;
        }
        .easyia-root .nav-links {
          display: none;
        }
      }
    `}</style>
  );
}
