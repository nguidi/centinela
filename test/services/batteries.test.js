const assert = require('assert');
const app = require('../../src/app');

describe('\'batteries\' service', () => {
  it('registered the service', () => {
    const service = app.service('batteries');

    assert.ok(service, 'Registered the service');
  });
});
