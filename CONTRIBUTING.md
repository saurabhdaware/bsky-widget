# CONTRIBUTING 🤗

bsky-widget is an open-source project and welcomes contributions from external contributors.

> [!TIP]
>
> If you have any feature requests, or major enhancements in your mind, do create a GitHub Issue first so that the feature and its approach can be discussed before you spend your time in creating PR


### Local Setup

#### 1. Installing Dependencies

_We use [pnpm](https://pnpm.io/) to manage dependencies. Make sure you have the latest pnpm installed_

```sh
pnpm install
```

#### 2. Common Commands

##### Local Development

```sh
pnpm dev # Runs the playground with your local version of bsky-widget component from `lib` directory
```

##### Local Builds

```sh
pnpm build:lib # Builds library in `dist`
pnpm build:playground # Builds playground in `static`
pnpm build # Builds both
```


##### Tests

_This project uses [playwright](https://playwright.dev/) image snapshots tests. You can run the test using following command_

```sh
pnpm test:e2e # Runs the playwright e2e test
```


---

For any help, just create a github issue in this repo and I can help out.