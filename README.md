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
<bsky-widget data-handle="patak.dev"></bsky-widget>

<!-- Paste before end of body -->
<script
  src="https://unpkg.com/bsky-widget@~0.0/dist/index.js"
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

<bsky-widget data-handle="saurabhd.bsky.social"></bsky-widget>;
```

## Props

| Prop                  | Description                                                    | Example value               |
| :-------------------- | :------------------------------------------------------------- | :-------------------------- |
| data-handle           | handle of your bluesky account                                 | "saurabhd.bsky.social"      |
| data-show-description | hide / show your description / bio from profile                | "true" (default) or "false" |
| data-show-banner      | hide / show your banner (only applicable if you have a banner) | "true" (default) or "false" |
| theme                 | theme of the card (`dark`, `dim`, `auto`, `auto-dim`, `light`) | "light"                     |


## CONTRIBUTING

The project is open for contributions, you can check [CONTRIBUTING.md](./CONTRIBUTING.md) for more information on local setup and commands.

---

Like my work? You can star this repo or you can sponsor me from [GitHub Sponsors @saurabhdaware](https://github.com/sponsors/saurabhdaware) ⭐️
