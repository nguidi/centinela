import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/list';
import connect from 'can-connect';
import feathersClient from './feathers-client';
import feathersServiceBehavior from 'can-connect-feathers/service';
import behaviors from './behaviors';
import set from 'can-set';

var	Organization
=	DefineMap
		.extend(
			{
				name: 'string'
      ,	cuit: 'string'
      , _id: 'any'
			}
		);

const Battery
= DefineMap
    .extend(
      'Dashboard'
    ,  {
        seal: false
      }
    , {
        _id: 'any'
      ,	users: 'number'
      ,	batteries: 'number'
      ,	equipments: 'number'
      ,	flights: 'number'
      ,	organization:
        {
          Type: Organization
        ,	value: Organization
        }
      }
  );

Battery.List
= DefineList
    .extend(
      {
        '#': Battery
      }
  );

const algebra = new set.Algebra(
  set.props.id('_id')
);

Battery.connection = connect(
	[
		feathersServiceBehavior
	,	...behaviors
	]
,	{
		Map: Battery
	,	List: Battery.List
	,	feathersService: feathersClient.service('/dashboard')
	,	name: 'dashboard'
	,	algebra
	}
);

Battery.algebra = algebra;

export default Battery;
