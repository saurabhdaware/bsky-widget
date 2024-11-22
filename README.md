# Bluesky Widget

Unofficial Bluesky Profile Cards for Bluesky Friends 🦋

**Card Generator UI: https://bsky-widget.srbh.dev/**

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


## Override Styles

You can go ahead and override any of these styles to customize your card further, create custom themes, or adjust the card in your website's layout

```css
bsky-widget {
  --bsky-background: #fff;
  --bsky-primary: #1185fe;
  --bsky-primary-hover: #4ca2fe;
  --bsky-text-on-primary: #fff;
  --bsky-text-on-background: #0b0f14;
  --bsky-text-on-background-subtle: #42576c;
  --bsky-text-large: 1.4rem;
  --bsky-text-large-line-height: 1.8rem;
  --bsky-text-medium: 1rem;
  --bsky-text-small: 0.9rem;

  font-family: Arial, Helvetica, sans-serif, -apple-system, sans-serif;
  width: 350px;
  max-width: 100%;
  min-height: 170px;
  display: inline-block;
  box-shadow: 1px 1px 8px 1px #0002;
  border-radius: 8px;
}
```

## Migration from v0.0 -> v0.1

> [!Note]
>
> You are using v0.0 already? no worries! It's a no breaking change release. Click the link below to see how you can migrate to new version and enjoy new features 🚀

Check out the release notes at [v0.1 Release Notes](https://github.com/saurabhdaware/bsky-widget/releases/tag/v0.1.0)


## CONTRIBUTING

The project is open for contributions, you can check [CONTRIBUTING.md](./CONTRIBUTING.md) for more information on local setup and commands.

---

Like my work? You can star this repo or you can sponsor me from [GitHub Sponsors @saurabhdaware](https://github.com/sponsors/saurabhdaware) ⭐️
