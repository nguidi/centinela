import F from 'funcunit';
import QUnit from 'steal-qunit';

import 'centinela/models/test';

import 'centinela/app/login/login-test';

import 'centinela/login/login-test';

import 'centinela/app/components/user/login/login-test';

import 'centinela/components/user/login/login-test';

import 'centinela/components/user/recover-password/recover-password-test';

import 'centinela/components/user/register/register-test';

F.attach(QUnit);

QUnit.module('centinela functional smoke test', {
  beforeEach() {
    F.open('./development.html');
  }
});

QUnit.test('centinela main page shows up', function() {
  F('title').text('centinela', 'Title is set');
});
