import { test, expect } from '../fixtures/pom.fixtures';
import { GenerateBugFormData } from '../helpers/GenerateBugFormData';

test.describe(
  'Bugs Form Page Form Submission',
  { tag: ['@bugs-form', '@bugs-form-submission'] },
  () => {
    test('should submit form with complete valid data successfully', async ({
      bugsFormPage,
    }) => {
      const testData = GenerateBugFormData.validAllData();
      await bugsFormPage.filloutForm(testData);
      await bugsFormPage.submitForm();
      await bugsFormPage.shouldDisplayAlertSuccessMessage();
      await bugsFormPage.shouldDisplayCorrectFormResultData(testData);
    });

    test('should submit form with required data successfully', async ({
      bugsFormPage,
    }) => {
      const testData = GenerateBugFormData.validRequiredData();
      await bugsFormPage.filloutForm(testData);
      await bugsFormPage.submitForm();
      await bugsFormPage.shouldDisplayAlertSuccessMessage();
      await bugsFormPage.shouldDisplayCorrectFormResultData(testData);
    });

    test('should show error for invalid phone number (numeric)', async ({
      bugsFormPage,
    }) => {
      const testData = GenerateBugFormData.withInvalidNumericPhoneNumber();
      await bugsFormPage.filloutForm(testData);
      await bugsFormPage.submitForm();
      await bugsFormPage.shouldDisplayAlertErrorMessage(
        'The phone number should contain at least 10 characters!'
      );
    });

    test('should show error for invalid phone number (alpha)', async ({
      bugsFormPage,
    }) => {
      const testData = GenerateBugFormData.withInvalidAlphaPhoneNumber();
      await bugsFormPage.filloutForm(testData);
      await bugsFormPage.submitForm();
      await bugsFormPage.shouldDisplayAlertErrorMessage(
        'The phone number should be a valid number!'
      );
    });

    test('should show error for invalid email address', async ({
      bugsFormPage,
    }) => {
      const testData = GenerateBugFormData.withInvalidEmailAddress();
      await bugsFormPage.filloutForm(testData);
      await bugsFormPage.submitForm();
      await bugsFormPage.shouldDisplayAlertErrorMessage(
        'The email address should be a email address!'
      );
    });

    test('should show error for short password', async ({ bugsFormPage }) => {
      const testData = GenerateBugFormData.withShortPassword();
      await bugsFormPage.filloutForm(testData);
      await bugsFormPage.submitForm();
      await bugsFormPage.shouldDisplayAlertErrorMessage(
        'The password should contain between [6,20] characters!'
      );
    });

    test('should show error for long password', async ({ bugsFormPage }) => {
      const testData = GenerateBugFormData.withLongPassword();
      await bugsFormPage.filloutForm(testData);
      await bugsFormPage.submitForm();
      await bugsFormPage.shouldDisplayAlertErrorMessage(
        'The password should contain between [6,20] characters!'
      );
    });
  }
);

test.describe(
  'Bugs Form Page should form layout',
  { tag: ['@bugs-form', '@bugs-form-ui'] },
  () => {
    test('should display all form elements correctly', async ({
      bugsFormPage,
    }) => {
      await bugsFormPage.expectPageToLoad();
      await bugsFormPage.shouldDisplayExpectedFormFields;
      await bugsFormPage.shouldDisplayExpectedFormFieldLabels();
      await bugsFormPage.shouldHaveTermsCheckboxVisibleAndEnabled();
      await bugsFormPage.shouldHaveRegisterButtonDisabledInitially();
    });
  }
);
