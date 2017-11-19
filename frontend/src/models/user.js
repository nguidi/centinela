import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/list';
import connect from 'can-connect';
import feathersClient from './feathers-client';
import feathersServiceBehavior from 'can-connect-feathers/service';
import behaviors from './behaviors';
import algebra from './algebra';

import moment from 'moment';

var	Contact
=	DefineMap
		.extend(
		    {
				country: 'string'
			,	state: 'string'
			,	city: 'string'
			,	postalcode: 'string'
			,	address: 'string'
			,	phone: 'string'
			}
		);

var	Organization
=	DefineMap
		.extend(
			{
				name: 'string'
			,	cuit: 'string'
			}
		);

var User
= DefineMap
		.extend(
			'User'
		,	{
				seal: false
			}
		,	{
				_id: 'any'
			,	email: 'string'
			,	password: 'string'
			,	confpassword: 'string'
			,	name: 'string'
			,	lastname: 'string'
			,	dni: 'string'
			,	birthday: 'string'
			,	contact:
				{
					value: Contact
				}
			,	contact:
				{
					value: Contact
				}
			,	organization:
				{
					value: Organization
				}
			,	readableBirthday: function()
				{
					return moment(this.person.birthday).format('DD/MM/YYYY');
				}
			}
		);

User.List
=	DefineList
		.extend(
			{
				'#': User
			}
		);

User.connection = connect(
	[
		feathersServiceBehavior
	,	...behaviors
	]
,	{
		Map: User
	,	List: User.List
	,	feathersService: feathersClient.service('/users')
	,	name: 'users'
	,	algebra
	}
);

User.algebra = algebra;

export default User;
