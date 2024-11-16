// Thanks chatgpt
export const formatParagraph = (text: string): string => {
  // Regular expression to match URLs (http, https, www, or just a domain)
  const urlPattern =
    /\b((?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._~:/?#\[\]@!$&'()*+,;=%-]*)?)|@[a-zA-Z0-9._]+/gi;

  // Replace URLs with anchor tags
  let formattedText = text.replace(urlPattern, (url) => {
    if (url.startsWith("@")) {
      if (!url.includes(".")) {
        // Probably just random tag and not bsky profile
        return url;
      }

      const href = `https://bsky.app/profile/${url.slice(1)}`;
      // its a bluesky handle!!
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    } else {
      let href = url.startsWith("http") ? url : `https://${url}`;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${
        url.length > 24 ? `${url.slice(0, 24)}...` : url
      }</a>`;
    }
  });

  // Replace line breaks with <br /> tags
  formattedText = formattedText.replace(/\n/g, "<br />");

  return formattedText;
};

export const formatFollowCount = (num: number): string => {
  const formatter = new Intl.NumberFormat('en', {
    notation: "compact", // Enables compact formatting
    compactDisplay: "short", // Use short format (e.g., 1.5K)
    maximumFractionDigits: 1, // Control decimal places
  });
  return formatter.format(num);
}

export const sanitizeInput = (input: string | undefined) => {
  if (!input) {
    return input;
  }

  const element = document.createElement("div");
  element.textContent = input;
  return element.innerHTML;
};
