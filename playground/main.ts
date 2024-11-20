import { handleCopy, setPreview } from "./preview";
import { appendHandleParam, initStackblitzExamples } from "./utils";
import { initHighlight } from "./highlightCode";

const handle = document.querySelector<HTMLInputElement>("input#handle")!;
const themeSelect = document.querySelector<HTMLSelectElement>('select#theme')!;
const copyButton =
  document.querySelector<HTMLButtonElement>("button.copy-button")!;
const showDescriptionEl = document.querySelector<HTMLInputElement>(
  "input#show-description"
)!;
const showBannerEl =
  document.querySelector<HTMLInputElement>("input#show-banner")!;

const searchParams = new URLSearchParams(window.location.search);
const handleParam = searchParams.get("handle");
if (handleParam) {
  handle.value = handleParam;
}

const setWidgetPreview = ({
  shouldAppendParam,
}: {
  shouldAppendParam?: boolean;
} = {}) => {
  setPreview({
    handle: handle.value,
    showDescription: showDescriptionEl.checked,
    showBanner: showBannerEl.checked,
    theme: themeSelect.value
  });

  if (shouldAppendParam) {
    appendHandleParam(handle.value);
  }
};

document
  .querySelector<HTMLFormElement>("form#generator-form")!
  .addEventListener("submit", (e) => {
    e.preventDefault();
    setWidgetPreview({ shouldAppendParam: true });
  });

document.querySelectorAll('input[type="checkbox"],select#theme').forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    setWidgetPreview();
  });
});

handle.addEventListener("blur", () => {
  setWidgetPreview({ shouldAppendParam: true });
});

copyButton.addEventListener("click", handleCopy);

setWidgetPreview();
initHighlight();
initStackblitzExamples();
