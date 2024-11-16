import cardStyles from "./styles.css?inline";
import cardTemplate from "./template.abell";
import { sanitizeInput as s } from "./utils";

const stylesNotDefinedValues = ["0px", "none"];

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
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot!.innerHTML = `
      <style>
      ${cardStyles}
      </style>
      <div class="widget-container"></div>
    `;
  }

  async connectedCallback(): Promise<void> {
    if (!this.dataset.handle) {
      return;
    }

    try {
      this.setCardDefaultBounds();
      const response = await fetchProfile(this.dataset.handle);
      if (response.error) {
        throw new Error(response.message);
      }
      this.render(response);
    } catch (error) {
      this.renderError(error as Error);
    }
  }

  static get observedAttributes(): string[] {
    return ["data-handle", "data-show-description", "data-show-banner", "theme"];
  }

  attributeChangedCallback(
    attr: string,
    oldValue: string,
    newValue: string
  ): void {
    if (
      ["data-handle", "data-show-description", "data-show-banner"].includes(
        attr
      ) &&
      oldValue !== newValue
    ) {
      this.connectedCallback();
    }
  }

  setStyleIfNotDefined(prop: string, value: string): void {
    const computedValue = getComputedStyle(this)[prop as any];
    if (
      !this.style[prop as any] &&
      stylesNotDefinedValues.includes(computedValue)
    ) {
      this.style[prop as any] = value;
    }
  }

  setCardDefaultBounds(): void {
    this.setStyleIfNotDefined("width", "350px");
    this.setStyleIfNotDefined("maxWidth", "100%");
    this.setStyleIfNotDefined("minHeight", "170px");
    this.style.display = "inline-block";
  }

  setHeight(value: string): void {
    this.style.minHeight = value;
  }

  render(profile: Profile): void {
    const container = this.shadowRoot!.querySelector(
      ".widget-container"
    ) as HTMLElement;
    const showBanner = this.dataset.showBanner !== "false";
    const showDescription = this.dataset.showDescription !== "false";

    container.innerHTML = cardTemplate({
      displayName: s(profile.displayName),
      handle: s(profile.handle),
      description: showDescription ? s(profile.description) : undefined,
      avatar: s(profile.avatar),
      banner: showBanner ? s(profile.banner) : undefined,
      followersCount: s(profile.followersCount.toString()),
      followsCount: s(profile.followsCount.toString()),
    });

    const cardContentContainer = container.querySelector(
      ".card-content-container"
    ) as HTMLElement;
    cardContentContainer.offsetHeight;
    cardContentContainer.classList.add("show");
    this.setAttribute("data-rendered", "true");
  }

  renderError(error: Error): void {
    const container = this.shadowRoot!.querySelector(
      ".widget-container"
    ) as HTMLElement;
    container.innerHTML = `
      <div class="error">
        ${error.message}
      </div>
    `;
  }
}

export default ProfileCard;
