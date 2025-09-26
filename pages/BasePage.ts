import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly sideBarButton: Locator;
    readonly sideBarContainer: Locator;
    readonly navBarButton: Locator;
    readonly navBarContainer: Locator;
    readonly navHomeLink: Locator;
    readonly navContactLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sideBarButton = page.locator('button#sidebarCollapse');
        this.sideBarContainer = page.locator('#sidebar');
        this.navBarButton = page.locator('button[data-target="#navbarSupportedContent"]');
        this.navBarContainer = page.locator('#navbarSupportedContent');
        this.navHomeLink = page.locator('a', { hasText: 'Home' });
        this.navContactLink = page.locator('a', { hasText: 'Contact' });
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async expandSideBar() {
        await this.sideBarButton.click();
        await expect(this.sideBarContainer).toBeVisible();
    }

    async collapseSideBar() {
        await this.sideBarButton.click();
        await expect(this.sideBarContainer).not.toBeVisible();
    }

    async expandNavBar() {
        if(await this.navBarContainer.isVisible()) {
            return;
        }
        await this.navBarButton.click();
        await expect(this.navBarContainer).toHaveClass(/show/);
    }

    async collapseNavBar() {
        if(!await this.navBarContainer.isVisible()) {
            return;
        }
        await this.navBarButton.click();
        await expect(this.navBarContainer).not.toHaveClass(/show/);
    }

    async navigateToHome() {
        await this.expandNavBar();
        await this.navHomeLink.click();
        await expect(this.page).toHaveURL(/\.app$/);
    }

    async navigateToContact() {
        await this.expandNavBar();
        await this.navContactLink.click();
        await expect(this.page).toHaveURL(/\/contact-us$/);
    }
}