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
			, 	_id: 'any'
			}
		);

var	Profile
=	DefineMap
		.extend(
			{
				name: 'string'
			,	description: 'string'
			,	type: 'number'
			, 	_id: 'any'
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
			,	profile:
				{
					Type: Profile
				,	value: Profile
				}
			,	pending: 'boolean'
			,	readableBirthday: function()
				{
					return moment(this.person.birthday).format('DD/MM/YYYY');
				}
			,	readableLicenseExpirationDate: function()
				{
					return moment(this.person.license.expirationDate).format('DD/MM/YYYY');
				}
			//	profile control
			,	canTouchUsers: function()
				{
					return (this.profile.type == 1)
				}
			,	canTouchEquipment: function()
				{
					return ([1,2].indexOf(this.profile.type) >= 0)
				}
			,	canTouchBatteries: function()
				{
					return ([1,2].indexOf(this.profile.type) >= 0)
				}
			,	canTouchUAVs: function()
				{
					return ([1,2].indexOf(this.profile.type) >= 0)
				}
			,	canTouchFlights: function()
				{
					return ([1,2].indexOf(this.profile.type) >= 0)
				}
			,	canSeeFlights: function()
				{
					return ([1,3].indexOf(this.profile.type) >= 0)
				}
			,	canCreateFlights: function()
				{
					return ([1,2].indexOf(this.profile.type) >= 0)
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
