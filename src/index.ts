/**
 * Hello Widget — minimal LakeHouse Studio panel widget.
 * Customize src/ + widget.json; bump versions together (see AGENTS.md).
 */
import { type WidgetModule } from "@lakehouse/widget-sdk";
import { ensureStyles } from "./styles.js";

const widget: WidgetModule = {
  mount({ root, bridge, inputs }) {
    ensureStyles();
    const greeting =
      typeof inputs.greeting === "string" && inputs.greeting.trim()
        ? inputs.greeting.trim()
        : "Hello";
    const settings = bridge.getSettings<{ title?: string }>();
    const title = settings.title?.trim() || "Hello Widget";

    root.innerHTML = `
      <section class="lh-widget" data-widget="hello">
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(greeting)} from LakeHouse Studio. Dark mode only · accent <code>#7DFFFF</code>.</p>
        <button type="button" data-action="ping">Ping host</button>
      </section>
    `;

    const button = root.querySelector<HTMLButtonElement>("[data-action=ping]");
    const onClick = () => {
      bridge.postMessage("ping", { at: new Date().toISOString() });
    };
    button?.addEventListener("click", onClick);
    bridge.reportReady();

    return () => {
      button?.removeEventListener("click", onClick);
      root.replaceChildren();
    };
  },
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export default widget;
