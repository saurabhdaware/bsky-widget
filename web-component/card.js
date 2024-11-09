import cardStyles from "./styles.css?inline";
import cardTemplate from "./template.abell";

const stylesNotDefinedValues = ["0px", "none"];

class ProfileCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
      ${cardStyles}
      </style>
      <div class="widget-container"></div>
    `;
  }

  async connectedCallback() {
    if (!this.dataset.handle) {
      return;
    }

    try {
      this.setCardDefaultBounds();
      const response = await this.fetchProfile();
      if (response.error) {
        throw new Error(response.message);
      }
      this.render(response);
    } catch (error) {
      this.renderError(error);
    }
  }

  static get observedAttributes() {
    return ["data-handle", "data-show-description", "data-show-banner"];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (
      ["data-handle", "data-show-description", "data-show-banner"].includes(
        attr
      ) &&
      oldValue != newValue
    ) {
      this.setCardDefaultBounds();
      this.connectedCallback();
    }
  }

  setStyleIfNotDefined(prop, value) {
    const computedValue = getComputedStyle(this)[prop];
    if (!this.style[prop] && stylesNotDefinedValues.includes(computedValue)) {
      this.style[prop] = value;
    }
  }

  setCardDefaultBounds() {
    this.setStyleIfNotDefined("width", "350px");
    this.setStyleIfNotDefined("maxWidth", "100%");
    this.setStyleIfNotDefined("minHeight", "170px");
    this.style.display = "inline-block";
  }

  setHeight(value) {
    this.style.minHeight = value;
  }

  async fetchProfile() {
    // Using JSONPlaceholder as a mock API
    const response = await fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${this.dataset.handle}`
    );
    const data = await response.json();

    // Transform the response to match our expected format
    return data;
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  render(profile) {
    const container = this.shadowRoot.querySelector(".widget-container");
    const showBanner = this.dataset.showBanner === "false" ? false : true;
    const showDescription =
      this.dataset.showDescription === "false" ? false : true;

    container.innerHTML = cardTemplate({
      displayName: profile.displayName,
      handle: profile.handle,
      description: showDescription ? profile.description : undefined,
      avatar: profile.avatar,
      banner: showBanner ? profile.banner : undefined,
      followersCount: profile.followersCount,
      followsCount: profile.followsCount,
    });

    const cardContentContainer = container.querySelector(
      ".card-content-container"
    );
    cardContentContainer.offsetHeight;
    cardContentContainer.classList.add("show");
    this.setAttribute("data-rendered", "true");
  }

  renderError(error) {
    const container = this.shadowRoot.querySelector(".widget-container");
    container.innerHTML = `
      <div class="error">
        ${error}
      </div>
    `;
  }
}

export default ProfileCard;
