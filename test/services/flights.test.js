const assert = require('assert');
const app = require('../../src/app');

describe('\'flights\' service', () => {
  it('registered the service', () => {
    const service = app.service('flights');

    assert.ok(service, 'Registered the service');
  });
});
