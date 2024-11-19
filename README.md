# Bluesky Widget

Unofficial Bluesky Profile Cards for Bluesky Friends 🦋

**Card Generator UI: https://bsky-widget.saurabhdaware.in/**

## Usage

<table>
<tr>
  <th>Code</th>
  <th>Preview</th>
</tr>
  
<tr>
<td>

```html
<!-- Paste in your CSS to avoid layout shift -->
<style>
  bsky-widget {
    min-height: 387px;
    width: 350px;
  }
</style>

<!-- Paste wherever you want to render the card -->
<bsky-widget handle="patak.dev"></bsky-widget>

<!-- Paste before end of body -->
<script
  src="https://unpkg.com/bsky-widget@~0.1/dist/index.js"
  type="module"
></script>
```

</td>

<td>
<img alt="Patak's Bluesky Profile Widget" src="/.github/repo-assets/card-preview.png" width="300px" />
</td>

</tr>
</table>

## Usage as NPM module

### Install

```sh
npm install bsky-widget@latest --save
```

### Import and Use

```jsx
import "bsky-widget";

<bsky-widget handle="srbh.dev"></bsky-widget>;
```

## Props

| Prop             | Description                                                    | Example value               |
| :--------------- | :------------------------------------------------------------- | :-------------------------- |
| handle           | handle of your bluesky account                                 | "srbh.dev"                  |
| show-description | hide / show your description / bio from profile                | "true" (default) or "false" |
| show-banner      | hide / show your banner (only applicable if you have a banner) | "true" (default) or "false" |
| theme            | theme of the card (`dark`, `dim`, `auto`, `auto-dim`, `light`) | "light"                     |

## Migration from v0.0 -> v0.1

<details>

<summary>You are using v0.0 already? no worries! It's a no breaking change release. Click to see how you can migrate to new version and enjoy new features</summary>

> [!NOTE]
>
> There's no breaking changes between v0.0 --> v0.1 apart from minor UI tweaks and some nice feature additions
>
> You can safely update the version in your script src as below or `npm install --save bsky-widget@latest` if you're using it as NPM package

Check out the release notes at [v0.1 Release Notes](https://github.com/saurabhdaware/bsky-widget/releases/tag/v0.1.0)

```diff
  <script
-   src="https://unpkg.com/bsky-widget@~0.0/dist/index.js"
+   src="https://unpkg.com/bsky-widget@~0.1/dist/index.js"
    type="module"
  ></script>
```

</details>

## CONTRIBUTING

The project is open for contributions, you can check [CONTRIBUTING.md](./CONTRIBUTING.md) for more information on local setup and commands.

---

Like my work? You can star this repo or you can sponsor me from [GitHub Sponsors @saurabhdaware](https://github.com/sponsors/saurabhdaware) ⭐️
