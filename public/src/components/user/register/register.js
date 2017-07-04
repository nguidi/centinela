import Component from 'can-component';
import DefineMap from 'can-define/map/';
import route from 'can-route';
import './register.less';
import view from './register.stache';
import User from 'centinela/models/user'
import 'bootstrap/dist/js/bootstrap';
import 'formvalidation';
import 'node_modules/formvalidation/dist/js/framework/bootstrap.js';
import 'node_modules/formvalidation/dist/css/formvalidation.css';
import 'bootstrap-3-typeahead';

export const ViewModel
=	DefineMap
		.extend(
			{
				//	Istancia del usuario a registrarse
				user:
				{
					value:	User
				}

				//	Permite avanzar de paso si se cumplen
				//	todas las validaciones del formulario
			,	nextStep: function()
				{
					//	Obtengo el paso actual del wizard
					var FormValidator
					=	$('form').data('formValidation');

					//	Obtengo el paso actual del wizard
					var	$currentStep
					=	'#'+$('.tab-pane.active').attr('id');

					//	Fuerzo la validación el formulario
					//	Si algun campo no se valido, se mostrara el
					//	error de validación
					FormValidator.validateContainer($currentStep);

					//	Verifico que todo el formulario este OK
					if (FormValidator.isValidContainer($currentStep)) {

						//	Si el formulario se valido correctamente
						//	avanzo al siguiente paso del wizard
						var $active = $('.wizard .nav-tabs li.active');
						$active.next().removeClass('disabled');
						$active.next().find('a[data-toggle="tab"]').click();

					}
				}

				//	Permite volver al paso anterior
			,	prevStep: function()
				{
					var $active = $('.wizard .nav-tabs li.active');
					$active.prev().find('a[data-toggle="tab"]').click();
				}

				//	Registrar el nuevo usuario
			,	register: function()
				{
					//	Intento registrar el usuario
					this.user.save()
						.then(
							function()
							{
								//	Si el registro fue satisfactorio
								$('.panel-wrapper')
									.addClass('wd-xl')
									.removeClass('wd-xlg');
								$('.wizard').hide()
								$('.register-success').show()
								console.log(arguments)
							}
						,	function()
							{
								//	Si el registro fallo
								console.log(arguments)
							}
						);
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
				//	Wizard
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

				//	Validador de Formularios
				$('form').formValidation();

				//	Autocomplete de paies
				$('[name="country"]')
					.typeahead(
						{
							source:
							[
								{id: "arg", name: "Argentina"}, 
								{id: "bra", name: "Brasil"},
								{id: "per", name: "Peru"}
							]
						,	autoSelect: true
						,	minLength: 3
						,	delay: 1000
						,	afterSelect: function()
							{
								$('[name="state"]').attr('disabled',false)
								$('[name="city"]').attr('disabled',true)
								$('[name="state"]')
									.typeahead(
										{
											source:
												[
													{id: "ba", name: "Buenos Aires"}, 
													{id: "lr", name: "La Rioja"},
													{id: "tu", name: "Tucuman"}
												]
										,	autoSelect: true
										,	minLength: 3
										,	delay: 1000
										,	afterSelect: function()
											{
												$('[name="city"]').attr('disabled',false)
												$('[name="city"]')
													.typeahead(
														{
															source:
																[
																	{id: "ba", name: "Buenos Aires"},
																	{id: "ca", name: "Campana"},
																	{id: "za", name: "Zarate"}
																]
														,	autoSelect: true
														,	minLength: 3
														,	delay: 1000
														}
													);
											}
										}
									);
							}
						}
					);
			}
		}
	}
);