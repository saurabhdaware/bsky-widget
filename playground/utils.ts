import sdk from "@stackblitz/sdk";

export const setShare = (handle: string): void => {
  const shareText = encodeURIComponent(
    `I just created my Bluesky Widget Profile Card 🦋. Check it out and create yours at https://bsky-widget.saurabhdaware.in/?handle=${handle}`
  );
  document.querySelector<HTMLAnchorElement>(
    "#bsky-share-button"
  )!.href = `https://bsky.app/intent/compose?text=${shareText}`;
};

export const appendHandleParam = (handleValue: string): void => {
  // Get the current URL
  const url = new URL(window.location.href);

  // Set or update the 'handle' parameter
  url.searchParams.set("handle", handleValue);

  // Update the URL in the address bar without reloading the page
  window.history.pushState({}, "", url);
};

export const dedent = (text: string): string => {
  const lines = text.split("\n");

  const indentLevel = Math.min(
    ...lines
      .filter((line) => line.trim())
      .map((line) => line.match(/^(\s*)/)?.[0].length ?? 0)
  );

  // Remove the common indentation from each line
  return lines
    .map((line) => line.slice(indentLevel)) // Remove leading whitespace
    .join("\n") // Join lines back together
    .trim(); // Trim any leading or trailing whitespace
};

export const copyCode = (text: string): void => {
  const testIp = document.createElement("textarea");
  testIp.style.position = "fixed";
  testIp.style.top = "-10000px";
  document.body.append(testIp);
  testIp.value = text.replace(/\n/g, "\r\n");
  testIp.select();
  testIp.setSelectionRange(0, 99999);
  document.execCommand("copy");
};

export const initStackblitzExamples = () => {
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
};
