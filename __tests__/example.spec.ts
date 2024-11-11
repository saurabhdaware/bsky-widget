// test.spec.ts
import { test, expect, Page } from "@playwright/test";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test.describe.parallel("bsky-widget - Image Snapshot Test", () => {
  test("should render the bsky-widget component", async ({
    page,
  }: {
    page: Page;
  }) => {
    await page.goto("/test.html"); // Update with your test page path

    await expect(page).toHaveTitle("E2E Test Page");

    // Locate the bsky-widget component
    const widgetElement = page.locator('bsky-widget[data-rendered="true"]');
    const followers = widgetElement.locator(".followers");

    // Check if the widget is visible
    await expect(widgetElement).toBeVisible();

    await sleep(2000);
    await expect(page).toHaveScreenshot("baseline.png", {
      mask: [followers],
    });
  });
});
