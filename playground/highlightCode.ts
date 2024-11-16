import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";

export const initHighlight = () => {
  // Then register the languages you need
  hljs.registerLanguage("html", xml);
  hljs.registerLanguage("css", css);
  hljs.initHighlightingOnLoad();
};

export const highlightBlock = (code: HTMLElement) => {
  code.removeAttribute("data-highlighted");
  return hljs.highlightBlock(code);
};
