import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { then, when } from '../helpers/BDDDecorator';
import { BugFormData } from '../interfaces/BugFormData';

export class BugsFormPage extends BasePage {
  readonly header: Locator;
  readonly registerFormContainer: Locator;
  readonly firstNameLabel: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameLabel: Locator;
  readonly lastNameInput: Locator;
  readonly phoneNumberLabel: Locator;
  readonly phoneNumberInput: Locator;
  readonly countryLabel: Locator;
  readonly countrySelect: Locator;
  readonly emailAddressLabel: Locator;
  readonly emailAddressInput: Locator;
  readonly passwordLabel: Locator;
  readonly passwordInput: Locator;
  readonly termsCheckbox: Locator;
  readonly registerButton: Locator;
  readonly alertMessage: Locator;
  readonly resultContainer: Locator;
  readonly firstNameResult: Locator;
  readonly lastNameResult: Locator;
  readonly phoneNumberResult: Locator;
  readonly countryResult: Locator;
  readonly emailAddressResult: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('h2');
    this.registerFormContainer = page.locator('#registerForm');
    this.firstNameLabel = page.locator('label[for="firstName"]');
    this.firstNameInput = page.locator('input#firstName');
    // this.lastNameLabel = page.locator('//label[for="lastName"]'); // bug other form label contains label[for="lastName"]
    this.lastNameLabel = page.locator(
      '//div[child::input[@id="lastName"]]/label'
    );
    this.lastNameInput = page.locator('input#lastName');
    this.phoneNumberLabel = page.locator(
      '//div[child::input[@id="phone"]]/label'
    ); // bug should be consistent with other form label
    this.phoneNumberInput = page.locator('input#phone');
    this.countryLabel = page.locator(
      '//div[child::select[@id="countries_dropdown_menu"]]/label'
    ); // bug should be consistent with other form label
    this.countrySelect = page.locator('select#countries_dropdown_menu');
    this.emailAddressLabel = page.locator('label[for="exampleInputEmail1"]'); // bug should be consistent with other form label
    this.emailAddressInput = page.locator('input#emailAddress');
    this.passwordLabel = page.locator('label[for="exampleInputPassword1"]'); // bug should be consistent with other form label
    this.passwordInput = page.locator('input#password');
    this.termsCheckbox = page.locator('input#exampleCheck1'); // bug should have proper element id
    this.registerButton = page.locator('button#registerBtn');
    this.alertMessage = page.locator('#message');
    this.resultContainer = page.locator('#results-section');
    this.firstNameResult = page.locator('#resultFn');
    this.lastNameResult = page.locator('#resultLn');
    this.phoneNumberResult = page.locator('#resultPhone');
    this.countryResult = page.locator('#country'); // bug should be consistent with other result element
    this.emailAddressResult = page.locator('#resultEmail');
  }

  @when('User navigates to Bugs Form Page')
  async goto() {
    await this.page.goto('/bugs-form');
    await this.expectPageToLoad();
  }

  @then('Bugs Form Page should load correctly')
  async expectPageToLoad() {
    await expect(this.page).toHaveURL(/\/bugs-form$/);
    await expect(this.header).toBeVisible();
    await expect(this.registerFormContainer).toBeVisible();
  }

  @when('User fills out the bug form with data')
  async filloutForm(formData: BugFormData) {
    const {
      firstName,
      lastName,
      phoneNumber,
      country,
      emailAddress,
      password,
    } = formData;
    if (firstName) {
      await this.firstNameInput.fill(firstName);
    }
    await this.lastNameInput.fill(lastName);
    await this.phoneNumberInput.fill(phoneNumber);
    if (country) {
      //to handle flaky select option issue
      expect(async () => {
        await this.countrySelect.selectOption({ value: country });
      }).toPass();
    }
    await this.emailAddressInput.fill(emailAddress);
    await this.passwordInput.fill(password);
  }

  @when('User submits the bug form')
  async submitForm() {
    // await this.termsCheckbox.check(); bug terms checkbox is disabled
    // await expect.soft(this.termsCheckbox).toBeChecked();
    // await expect.soft(this.registerButton).toBeEnabled(); bug already enabled before terms checked
    await this.registerButton.click();
    await expect(this.alertMessage).toBeVisible();
  }

  @then('User should see error message {string}')
  async shouldDisplayAlertErrorMessage(expectedText: string) {
    await expect(this.alertMessage).toHaveText(expectedText, { timeout: 1000 });
  }

  @then('User should see success message')
  async shouldDisplayAlertSuccessMessage() {
    await expect(this.alertMessage).toHaveText(
      'Successfully registered the following information'
    );
  }

  @then('User should NOT see form results')
  async shouldNotDisplayFormResults() {
    await expect.soft(this.firstNameResult).not.toBeVisible({ timeout: 1000 });
  }

  @then('User should see form results with correct data')
  async shouldDisplayCorrectFormResultData(formData: BugFormData) {
    if (formData.firstName) {
      await expect
        .soft(
          this.firstNameResult,
          `First Name result should be ${formData.firstName}`
        )
        .toContainText(formData.firstName);
    } else {
      await expect
        .soft(this.firstNameResult, 'First Name result should not be visible')
        .not.toBeVisible({ timeout: 1000 });
    }
    await expect
      .soft(
        this.lastNameResult,
        `Last Name result should be ${formData.lastName}`
      )
      .toContainText(formData.lastName);
    await expect
      .soft(
        this.phoneNumberResult,
        `Phone Number result should be ${formData.phoneNumber}`
      )
      .toContainText(formData.phoneNumber);
    if (formData.country) {
      await expect
        .soft(
          this.countryResult,
          `Country result should be ${formData.country}`
        )
        .toContainText(formData.country);
    } else {
      await expect
        .soft(this.countryResult, 'Country result should NOT be visible')
        .not.toBeVisible({ timeout: 1000 });
    }
    await expect
      .soft(
        this.emailAddressResult,
        `Email Address result should be ${formData.emailAddress}`
      )
      .toContainText(formData.emailAddress);
  }

  @then('Bugs Form should display expected form fields')
  async shouldDisplayExpectedFormFields() {
    await expect.soft(this.firstNameInput).toBeVisible();
    await expect.soft(this.lastNameInput).toBeVisible();
    await expect.soft(this.phoneNumberInput).toBeVisible();
    await expect.soft(this.countrySelect).toBeVisible();
    await expect.soft(this.emailAddressInput).toBeVisible();
    await expect.soft(this.passwordInput).toBeVisible();
  }

  @then('Bugs Form should display expected form field labels')
  async shouldDisplayExpectedFormFieldLabels() {
    await expect.soft(this.firstNameLabel).toHaveText('First Name');
    await expect.soft(this.lastNameLabel).toHaveText('Last Name*');
    await expect.soft(this.phoneNumberLabel).toHaveText('Phone number*');
    await expect.soft(this.countryLabel).toHaveText('Country');
    await expect.soft(this.emailAddressLabel).toHaveText('Email address*');
    await expect.soft(this.passwordLabel).toHaveText('Password*');
  }

  @then('User should see the terms checkbox visible and enabled')
  async shouldHaveTermsCheckboxVisibleAndEnabled() {
    await expect(this.termsCheckbox).toBeVisible();
    await expect(this.termsCheckbox).toBeEnabled();
  }

  @then('Register button should be disabled initially')
  async shouldHaveRegisterButtonDisabledInitially() {
    await expect(this.registerButton).toBeDisabled();
  }
}
