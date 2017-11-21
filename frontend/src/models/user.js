import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/list';
import connect from 'can-connect';
import feathersClient from './feathers-client';
import feathersServiceBehavior from 'can-connect-feathers/service';
import behaviors from './behaviors';
import set from 'can-set';

import moment from 'moment';

var	Person
=	DefineMap
		.extend(
		    {
				name: 'string'
			,	lastName: 'string'
			,	dni: 'string'
			,	birthday: 'string'
			}
		);

var	Organization
=	DefineMap
		.extend(
			{
				name: 'string'
			,	cuit: 'string'
			, _id: 'any'
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
			,	person:
				{
					Type: Person
				,	value: Person
				}
			,	organization:
				{
					Type: Organization
				,	value: Organization
				}
			,	readableBirthday: function()
				{
					return moment(this.person.birthday).format('DD/MM/YYYY');
				}
			,	readableLicenseExpirationDate: function()
				{
					return moment(this.person.license.expirationDate).format('DD/MM/YYYY');
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

const algebra = new set.Algebra(
	set.props.id('_id')
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
