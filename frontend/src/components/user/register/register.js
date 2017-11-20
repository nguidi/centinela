import Component from 'can-component';
import DefineMap from 'can-define/map/';
import route from 'can-route';
import './register.less';
import view from './register.stache';

import User from 'centinela/models/user'

import 'bootstrap/dist/js/bootstrap';
import 'formvalidation';
import 'bootstrap-notify';
import 'bootstrap-datepicker';
import 'node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.es.min.js';
import 'node_modules/formvalidation/dist/css/formvalidation.css';

let userToRegister = new User({profile: {type: 1, name: 'Administrador', description: 'Administrador de la organización'}});

export const ViewModel
=	DefineMap
		.extend(
			{
				//	Istancia del usuario a registrarse
				user:
				{
					value:	userToRegister
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
					//	Obtengo el paso activo y a partir de el me muevo al anterior
					var $active = $('.wizard .nav-tabs li.active');
					$active.prev().find('a[data-toggle="tab"]').click();
				}

				//	Registrar el nuevo usuario
			,	register: function()
				{
					// Pongo el boton a cargar
					$('.register-user').button('loading');
					
					//	Intento registrar el usuario
					this.user.save()
						.then(
						  function()
						  {
							//	Si el registro fue satisfactorio

							// Reseteo el boton
							$('.register-user').button('reset');

							// Muestro el registro satisfactorio
							$('.panel-wrapper')
								.addClass('wd-xl')
								.removeClass('wd-xlg');
							
							$('.wizard').hide()
							$('.register-success').show()
			
						  }
						, function(error){
							console.log(error)

							//  Ocurrio un error al crear
							//  Volvemos el boton a su estado normal
							$('.register-user').button('reset');
			
							//  Mostramos un aviso en pantalla
							$.notify(
							  {
								message: 'Ocurrio un error al registrar el usuario, por favor intentelo de nuevo.' 
							  }
							, {
								type: 'danger'
							  , placement: {
								  from: 'bottom'
								, align: "right"
								}
							  }
							);
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

				//  Datepickers
				$('.datepicker').datepicker({
					format: 'dd/mm/yyyy'
				, language: 'es'
				}).on('changeDate', function(e) {
					userToRegister.person.birthday = e.date.toJSON()
					$('form').data('formValidation').validateField('birthday')
				});;
			}
		}
	}
);