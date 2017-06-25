import Component from 'can-component';
import DefineMap from 'can-define/map/';
import route from 'can-route';
import './register.less';
import view from './register.stache';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-datepicker';
import 'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.css';

export const ViewModel
=	DefineMap
		.extend(
			{
				nextStep: function()
				{
					var $active = $('.wizard .nav-tabs li.active');
					$active.next().removeClass('disabled');
					$active.next().find('a[data-toggle="tab"]').click();
				}
			,	prevStep: function()
				{
					var $active = $('.wizard .nav-tabs li.active');
					$active.prev().find('a[data-toggle="tab"]').click();
				}
			,	register: function()
				{
					$('.panel-wrapper')
						.addClass('wd-xl')
						.removeClass('wd-xlg');
					$('.wizard').hide()
					$('.register-success').show()
				}
			}
		);

export default Component.extend(
	{
		tag: 'user-register'
	,	ViewModel
	,	view
	,	events:
		{
			inserted: function()
			{
			//Wizard
			$('a[data-toggle="tab"]')
				.on(
					'show.bs.tab'
				,	function(e)
					{

						var $target = $(e.target);

						if ($target.parent().hasClass('disabled')) {
							return false;
						}
					}
				);
			}
		}
	}
);