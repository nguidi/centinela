import F from 'funcunit';
import QUnit from 'steal-qunit';

import 'centinela/models/test';

F.attach(QUnit);

QUnit.module('centinela functional smoke test', {
  beforeEach() {
    F.open('./development.html');
  }
});

QUnit.test('centinela main page shows up', function() {
  F('title').text('centinela', 'Title is set');
});
