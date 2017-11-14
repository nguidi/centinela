import F from 'funcunit';
import QUnit from 'steal-qunit';

import 'centinela/models/test';

import 'centinela/app/login/login-test';

import 'centinela/login/login-test';

import 'centinela/app/components/user/login/login-test';

import 'centinela/components/user/login/login-test';

import 'centinela/components/user/recover-password/recover-password-test';

import 'centinela/components/user/register/register-test';

import 'centinela/components/app/home/home-test';

import 'centinela/components/app/users/users-test';

import 'centinela/components/app/equipment/equipment-test';

import 'centinela/components/app/batteries/batteries-test';

import 'centinela/components/app/uavs/uavs-test';

import 'centinela/components/app/flights/flights-test';

import 'centinela/components/app/planification/planification-test';

import 'centinela/components/app/dashboard/dashboard-test';

import 'centinela/components/user/email-sent/email-sent-test';

F.attach(QUnit);

QUnit.module('centinela functional smoke test', {
  beforeEach() {
    F.open('./development.html');
  }
});

QUnit.test('centinela main page shows up', function() {
  F('title').text('centinela', 'Title is set');
});
