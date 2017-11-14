import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './home.less';
import view from './home.stache';
import Session from '~/models/session';

export const ViewModel = DefineMap.extend(
  {
    setOption: function(el)
    {
      $('ul.sidebar-menu li.active').removeClass('active');
      $(el).parents('.menu-option').addClass('active');
      if (!$(el).hasClass('tree-option') && $('ul.treeview-menu').hasClass('active'))
        this.toggleTree($('ul.treeview-menu'))
    }
  , toggleTree: function(el)
    {
      $(el).parent().find('ul.treeview-menu').toggleClass('active');
      $(el).parent().find('i.tree-marker').toggleClass('fa-angle-down fa-angle-up')
    }
  , logout: function()
    {
      console.log("logout")
      //Session.current.destroy();
    }
  , page: 'string'
  }
);

export default Component.extend({
  tag: 'app-home',
  ViewModel,
  view
});
