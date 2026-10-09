/** Dark-only LakeHouse widget styles (accent #7DFFFF). */
export const widgetCss = `
:root {
  color-scheme: dark;
  --lh-accent: #7dffff;
  --lh-bg: #0b0f14;
  --lh-panel: #121821;
  --lh-text: #e8eef5;
  --lh-muted: #9aa7b5;
  --lh-border: #243041;
  font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--lh-bg); color: var(--lh-text); }
.lh-widget {
  min-height: 100%;
  padding: 1.25rem;
  background:
    radial-gradient(120% 80% at 10% 0%, color-mix(in srgb, var(--lh-accent) 18%, transparent), transparent 55%),
    var(--lh-panel);
  border: 1px solid var(--lh-border);
}
.lh-widget h1 { margin: 0 0 0.35rem; font-size: 1.35rem; letter-spacing: 0.02em; }
.lh-widget p { margin: 0 0 1rem; color: var(--lh-muted); line-height: 1.45; }
.lh-widget button {
  appearance: none;
  border: 1px solid color-mix(in srgb, var(--lh-accent) 55%, var(--lh-border));
  background: color-mix(in srgb, var(--lh-accent) 16%, var(--lh-panel));
  color: var(--lh-text);
  padding: 0.55rem 0.9rem;
  cursor: pointer;
  font: inherit;
}
.lh-widget button:hover { border-color: var(--lh-accent); color: var(--lh-accent); }
.lh-widget button:focus-visible { outline: 2px solid var(--lh-accent); outline-offset: 2px; }
`.trim();

export function ensureStyles(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById("lh-widget-styles")) return;
  const style = document.createElement("style");
  style.id = "lh-widget-styles";
  style.textContent = widgetCss;
  document.head.appendChild(style);
}
