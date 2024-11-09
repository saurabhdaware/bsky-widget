import sdk from "@stackblitz/sdk";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";

// Then register the languages you need
hljs.registerLanguage("html", xml);
hljs.registerLanguage("css", css);

const handle = document.querySelector("input#handle");
const showDescriptionEl = document.querySelector("input#show-description");
const showBannerEl = document.querySelector("input#show-banner");
const code = document.querySelector("code");

const searchParams = new URLSearchParams(window.location.search);
const handleParam = searchParams.get("handle");
if (handleParam) {
  handle.value = handleParam;
}

const setShare = (handle) => {
  const shareText = encodeURIComponent(
    `I just created my Bluesky Widget Card 🦋 <br/><br/>Check it out and create yours at-<br/><br/> https://bsky-widget.saurabhdaware.in/?handle=${handle}`
  );
  document.querySelector(
    "#bsky-share-button"
  ).href = `https://bsky.app/intent/compose?text=${shareText}`;
};

const appendHandleParam = (handleValue) => {
  // Get the current URL
  const url = new URL(window.location.href);

  // Set or update the 'handle' parameter
  url.searchParams.set("handle", handleValue);

  // Update the URL in the address bar without reloading the page
  window.history.pushState({}, "", url);
};

function dedent(text) {
  const lines = text.split("\n");

  const indentLevel = Math.min(
    ...lines
      .filter((line) => line.trim())
      .map((line) => line.match(/^(\s*)/)[0].length)
  );

  // Remove the common indentation from each line
  return lines
    .map((line) => line.slice(indentLevel)) // Remove leading whitespace
    .join("\n") // Join lines back together
    .trim(); // Trim any leading or trailing whitespace
}

const setWidgetPreview = () => {
  const widget = document.querySelector("bsky-widget");
  // RLO character ends up in input when you copy-paste from bluesky. This should remove it
  const handleValue = handle.value.replace(/[\u202A-\u202E]/g, "").trim();

  widget.setAttribute("data-handle", handleValue);
  widget.setAttribute("data-show-banner", showBannerEl.checked);
  widget.setAttribute("data-show-description", showDescriptionEl.checked);

  let additionalProps = "";
  if (!showDescriptionEl.checked) {
    additionalProps += `\n  data-show-description="${showDescriptionEl.checked}"`;
  }

  if (!showBannerEl.checked) {
    additionalProps += `\n  data-show-banner="${showBannerEl.checked}"`;
  }

  code.innerHTML = dedent(`
&lt;!-- Paste in your CSS to avoid layout shift --&gt;
&lt;style&gt;
bsky-widget {
  min-height: 400px;
  width: 350px;
}
&lt;/style&gt;

&lt;!-- Paste wherever you want to render the card --&gt;
&lt;bsky-widget 
  data-handle="${handleValue}"${additionalProps}
&gt;
&lt;/bsky-widget&gt;

&lt;!-- Paste before end of body --&gt;
&lt;script 
  src="https://unpkg.com/bsky-widget@~0.0/dist/index.js" 
  type="module"
&gt;
&lt;/script&gt;`);
  code.removeAttribute("data-highlighted");
  setShare(handleValue);

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
        code.removeAttribute("data-highlighted");
        hljs.highlightBlock(document.querySelector("code"));
      }, 500);
    }
  }, 100);

  hljs.highlightBlock(document.querySelector("code"));
};

const copyCode = () => {
  var copyText = document.querySelector("code");
  const testIp = document.createElement("textarea");
  testIp.style.position = "fixed";
  testIp.style.top = "-10000px";
  document.body.append(testIp);
  testIp.value = copyText.innerText.replace(/\n/g, "\r\n");
  testIp.select();
  testIp.setSelectionRange(0, 99999);
  document.execCommand("copy");
};

document
  .querySelector("form#generator-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    setWidgetPreview();
    appendHandleParam(handle.value);
  });

document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    setWidgetPreview();
  });
});

handle.addEventListener("blur", () => {
  setWidgetPreview();
  appendHandleParam(handle.value);
});

document.querySelector("button.copy-button").addEventListener("click", () => {
  copyCode();
  document.querySelector("button.copy-button").innerText = "Copied";
  setTimeout(() => {
    document.querySelector("button.copy-button").innerText = "Copy";
  }, 2000);
});

hljs.initHighlightingOnLoad();
setWidgetPreview();

sdk.embedProjectId(
  "stackblitz-vanilla-project",
  "bsky-widget-vanilla-project",
  {
    forceEmbedLayout: true,
    openFile: "index.html",
    theme: "light",
    clickToLoad: true,
    hideExplorer: true,
    hideNavigation: true,
  }
);

sdk.embedProjectId("stackblitz-framework-project", "bsky-widget-vue", {
  forceEmbedLayout: true,
  openFile: "package.json,src/App.vue",
  theme: "light",
  clickToLoad: true,
  hideExplorer: true,
  hideNavigation: true,
});
