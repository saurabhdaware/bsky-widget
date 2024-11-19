import { highlightBlock } from "./highlightCode";
import { copyCode, dedent, setShare } from "./utils";

const code = document.querySelector<HTMLElement>("code")!;
const widget = document.querySelector<HTMLElement>("bsky-widget")!;

type WidgetPropsType = {
  handle: string;
  showDescription: boolean;
  showBanner: boolean;
  theme: string;
};

const getCode = ({ handle, showDescription, showBanner, theme }: WidgetPropsType) => {
  let additionalProps = "";
  if (showDescription === false) {
    additionalProps += `\n  show-description="${showDescription}"`;
  }

  if (showBanner === false) {
    additionalProps += `\n  show-banner="${showBanner}"`;
  }

  if (theme !== 'light') {
    additionalProps += `\n  theme="${theme}"`;
  }

  return dedent(`
&lt;!-- Paste in your CSS to avoid layout shift --&gt;
&lt;style&gt;
bsky-widget {
  min-height: 400px;
  width: 350px;
}
&lt;/style&gt;

&lt;!-- Paste wherever you want to render the card --&gt;
&lt;bsky-widget 
  handle="${handle}"${additionalProps}
&gt;
&lt;/bsky-widget&gt;

&lt;!-- Paste before end of body --&gt;
&lt;script 
  src="https://unpkg.com/bsky-widget@~0.1/dist/index.js" 
  type="module"
&gt;
&lt;/script&gt;`);
};

export const setPreview = ({
  handle,
  showDescription,
  showBanner,
  theme
}: WidgetPropsType) => {
  // RLO character ends up in input when you copy-paste from bluesky. This should remove it
  const handleValue = handle.replace(/[\u202A-\u202E]/g, "").trim();
  setShare(handleValue);
  widget.setAttribute("handle", handleValue);
  widget.setAttribute("show-banner", String(showBanner));
  widget.setAttribute("show-description", String(showDescription));
  widget.setAttribute("theme", theme);

  code.innerHTML = getCode({ handle, showBanner, showDescription, theme });
  highlightBlock(code);

  // Check the bounds of rendered card to add better min-height value
  const boundCheckInterval = setInterval(() => {
    if (widget.dataset.rendered === "true") {
      clearInterval(boundCheckInterval);

      setTimeout(() => {
        const widgetBounds = widget.getClientRects()[0];
        const height = Math.round(widgetBounds.height);
        const width = Math.round(widgetBounds.width);

        code.innerHTML = code.innerHTML
          .replace("400px", `${height}px`)
          .replace("350px", `${width}px`);
        highlightBlock(code);
      }, 500);
    }
  }, 100);
};

export const handleCopy = (e: MouseEvent) => {
  const copyButton = e.target as HTMLButtonElement;
  copyCode(code.innerText);
  copyButton.innerText = "Copied";
  setTimeout(() => {
    copyButton.innerText = "Copy";
  }, 2000);
};
