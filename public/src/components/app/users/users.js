import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './users.less';
import view from './users.stache';

import 'bootstrap/dist/js/bootstrap';
import 'formvalidation';
import 'node_modules/formvalidation/dist/js/framework/bootstrap.js';
import 'node_modules/formvalidation/dist/css/formvalidation.css';

import User from 'centinela/models/user'

export const ViewModel = DefineMap.extend({
  instances:{
    get () {
      return User.getList()
    }
  },
  instance: User,
  setToEdit: function(instanceToEdit)
  {
    this.instance = instanceToEdit;
    $('#editUser').modal('toggle');
  },
  setToRemove: function(instanceToRemove)
  {
    this.instance = instanceToRemove;
    $('#removeUser').modal('toggle');
  },
  create: function()
  {
    this.instance.save()
  },
  update: function()
  {
    this.instance.save()
  },
  destroy: function()
  {
    this.instance.destroy()
  }
});

export default Component.extend({
  tag: 'app-users',
  ViewModel,
  view,
  events:
  {
    inserted: function()
    {
      //	Validador de Formularios
      $('.modal').modal({ show: false })
    }
  }
});
