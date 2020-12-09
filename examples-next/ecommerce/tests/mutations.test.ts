import { KeystoneContext } from '@keystone-next/types';

const { multiAdapterRunners, setupFromConfig } = require('@keystonejs/test-utils');
const config = require('../keystone');

function setupKeystone(adapterName: string) {
  return setupFromConfig({ adapterName, config });
}

multiAdapterRunners('mongoose').map(
  ({ runner, adapterName }: { runner: any; adapterName: string }) =>
    describe(`Adapter: ${adapterName}`, () => {
      test(
        'Smoke test',
        runner(setupKeystone, async ({ context }: { context: KeystoneContext }) => {
          const users = await context.lists.User.findMany({ resolveFields: false });
          expect(users).toEqual([]);
        })
      );
    })
);
