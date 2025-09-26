import test from '@playwright/test';

function bddDecorator(pattern: string) {
  return function decorator<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Promise<Return>
  ) {
    async function replacementMethod(
      this: This,
      ...args: Args
    ): Promise<Return> {
      const formattedName = pattern.replace(/{(\d+)}/g, (match, index) => {
        const paramIndex = parseInt(index, 10);
        return args[paramIndex] !== undefined
          ? JSON.stringify(args[paramIndex])
          : match;
      });

      return test.step(formattedName, async () => target.call(this, ...args));
    }
    return replacementMethod;
  };
}

export function given(pattern: string) {
  return bddDecorator(`GIVEN ${pattern}`);
}

export function when(pattern: string) {
  return bddDecorator(`WHEN ${pattern}`);
}

export function then(pattern: string) {
  return bddDecorator(`THEN ${pattern}`);
}

export function and(pattern: string) {
  return bddDecorator(`AND ${pattern}`);
}
