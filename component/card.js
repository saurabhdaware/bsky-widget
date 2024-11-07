import cardStyles from "./styles.css?raw";
import cardTemplate from "./template.abell";
import blueSkySvg from "./bluesky-logo.svg";
import { testData } from "./testResponse";

// import CardTemplate from "./card.template.jsx";

const loadingScreenHeightMap = {
  ["banner:false,description:false"]: "205px", // default height without description and banner
  ["banner:true,description:false"]: "270px",
  ["banner:false,description:true"]: "170px", // we don't know the height of card when user has description enabled so we make a good guess
  ["banner:true,description:true"]: "170px",
};

const stylesNotDefinedValues = ["0px", "none"];

class ProfileCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // const existingStyles = getComputedStyle(this);
    // console.log({ v1: existingStyles.maxWidth, v2: this.style.maxWidth });
    const showDescription =
      this.dataset.showDescription === "false" ? false : true;
    const showBanner = this.dataset.showBanner === "false" ? false : true;

    const userDefinedStyles = getComputedStyle(this);
    if (
      !this.style.maxWidth &&
      stylesNotDefinedValues.includes(userDefinedStyles.maxWidth)
    ) {
      this.style.maxWidth = "340px";
    }
    this.style.display = "block";

    this.shadowRoot.innerHTML = `
      <style>
      ${cardStyles}
      </style>
      <div class="widget-container">
        <div class="loading-container">
          <img width="40px" src="${blueSkySvg}" alt="Bluesky Widget Loading" />
        </div>
      </div>
    `;

    console.log(userDefinedStyles.minHeight);

    if (
      !this.style.minHeight &&
      stylesNotDefinedValues.includes(userDefinedStyles.minHeight)
    ) {
      this.setHeight(
        loadingScreenHeightMap[
          `banner:${showBanner},description:${showDescription}`
        ]
      );
      console.log(
        "setHeight",
        loadingScreenHeightMap[
          `banner:${showBanner},description:${showDescription}`
        ]
      );
    }

    console.log(this.dataset);
  }

  async connectedCallback() {
    try {
      const response = await this.fetchProfile();
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
      this.connectedCallback();
    }
  }

  setHeight(value) {
    this.style.minHeight = value;
    this.shadowRoot.querySelector(".widget-container").style.minHeight = value;
  }

  async fetchProfile() {
    // if (true) {
    //   await sleep(1000);
    //   return testData;
    // }

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
  }

  renderError(error) {
    const container = this.shadowRoot.querySelector(".profile-container");
    console.log(error);
    container.innerHTML = `
      <div class="error">
        Failed to load profile data
      </div>
    `;
  }
}

customElements.define("bsky-widget", ProfileCard);
