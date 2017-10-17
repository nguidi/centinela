const assert = require('assert');
const app = require('../../src/app');

describe('\'uavs\' service', () => {
  it('registered the service', () => {
    const service = app.service('uavs');

    assert.ok(service, 'Registered the service');
  });
});
