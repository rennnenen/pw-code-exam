import { faker } from '@faker-js/faker';
import { BugFormData } from '../interfaces/BugFormData';

export class GenerateBugFormData {
  static validAllData(): BugFormData {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      emailAddress: faker.internet.email(),
      phoneNumber: faker.string.numeric(10),
      country: faker.location.country(),
      password: faker.internet.password({ length: 8 }),
    };
  }

  static validRequiredData(): BugFormData {
    return {
      lastName: faker.person.lastName(),
      emailAddress: faker.internet.email(),
      phoneNumber: faker.string.numeric(10),
      password: faker.internet.password({ length: 8 }),
    };
  }

  static withInvalidNumericPhoneNumber(): BugFormData {
    const initData = GenerateBugFormData.validRequiredData();
    return { ...initData, phoneNumber: faker.string.numeric(8) };
  }

  static withInvalidAlphaPhoneNumber(): BugFormData {
    const initData = GenerateBugFormData.validRequiredData();
    return { ...initData, phoneNumber: faker.person.firstName() };
  }

  static withInvalidEmailAddress(): BugFormData {
    const initData = GenerateBugFormData.validRequiredData();
    return { ...initData, emailAddress: 'invalid-email' };
  }

  static withShortPassword(): BugFormData {
    const initData = GenerateBugFormData.validAllData();
    return { ...initData, password: faker.internet.password({ length: 4 }) };
  }

  static withLongPassword(): BugFormData {
    const initData = GenerateBugFormData.validAllData();
    return { ...initData, password: faker.internet.password({ length: 21 }) };
  }
}
