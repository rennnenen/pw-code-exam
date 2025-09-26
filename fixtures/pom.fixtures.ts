import { test as base } from "@playwright/test";
import { BugsFormPage } from "../pages/BugsFormPage";

type POMFixtures = {
  bugsFormPage: BugsFormPage;
};

export const test = base.extend<POMFixtures>({
  bugsFormPage: async ({ page }, use) => {
    const bugsFormPage = new BugsFormPage(page);
    await bugsFormPage.goto();
    await use(bugsFormPage);
  },
});

export { expect } from "@playwright/test";
