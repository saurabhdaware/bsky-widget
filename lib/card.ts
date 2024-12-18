import cardStyles from "./styles.css?inline";
import cardTemplate from "./template.abell";
import { sanitizeInput as s } from "./utils";

type Profile = {
  displayName: string;
  handle: string;
  description?: string;
  avatar: string;
  banner?: string;
  followersCount: number;
  followsCount: number;
};

type ProfileResponse = {
  error?: boolean;
  message?: string;
  displayName: string;
  handle: string;
  description: string;
  avatar: string;
  banner: string;
  followersCount: number;
  followsCount: number;
};

const fetchProfile = async (handle: string): Promise<ProfileResponse> => {
  const response = await fetch(
    `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${handle}`
  );
  return await response.json();
};

class ProfileCard extends HTMLElement {
  props: {
    handle?: string;
    showDescription?: string;
    showBanner?: string;
  } = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.props = {};
    this.shadowRoot!.innerHTML = `
      <style>
      ${cardStyles}
      </style>
      <div class="widget-container"></div>
    `;
  }

  async connectedCallback(): Promise<void> {
    this.props = {
      handle: this.getAttribute("handle") ?? this.dataset.handle,
      showDescription:
        this.getAttribute("show-description") ?? this.dataset.showDescription,
      showBanner: this.getAttribute("show-banner") ?? this.dataset.showBanner,
    };

    if (!this.props.handle) {
      return;
    }

    this.setAttribute("data-rendered", "false");

    try {
      const response = await fetchProfile(this.props.handle);
      if (response.error) {
        throw new Error(response.message);
      }
      this.render(response);
    } catch (error) {
      this.renderError(error as Error);
    }
  }

  static get observedAttributes(): string[] {
    return [
      "data-handle",
      "data-show-description",
      "data-show-banner",
      "handle",
      "show-description",
      "show-banner",
    ];
  }

  attributeChangedCallback(
    attr: string,
    oldValue: string,
    newValue: string
  ): void {
    if (
      [
        "data-handle",
        "data-show-description",
        "data-show-banner",
        "handle",
        "show-description",
        "show-banner",
      ].includes(attr) &&
      oldValue !== newValue
    ) {
      this.connectedCallback();
    }
  }

  render(profile: Profile): void {
    const container = this.shadowRoot!.querySelector(
      ".widget-container"
    ) as HTMLElement;
    const showBanner = this.props.showBanner !== "false";
    const showDescription = this.props.showDescription !== "false";

    container.innerHTML = cardTemplate({
      displayName: s(profile.displayName),
      handle: s(profile.handle),
      description: showDescription ? s(profile.description) : undefined,
      avatar: s(profile.avatar),
      banner: showBanner ? s(profile.banner) : undefined,
      followersCount: s(profile.followersCount.toString()),
      followsCount: s(profile.followsCount.toString()),
    });

    this.classList.add("show");
    this.setAttribute("data-rendered", "true");
  }

  renderError(error: Error): void {
    const container = this.shadowRoot!.querySelector(
      ".widget-container"
    ) as HTMLElement;

    container.innerHTML = `
    <div class="error-content-container">
      <p>${error.message}</p>
    </div>
    `;
    this.classList.add("show");
  }
}

export default ProfileCard;
