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

const Equipment
= DefineMap
    .extend(
      'Equipment'
    ,  {
        seal: false
      }
    , {
        _id: 'any'
      ,	brand: 'string'
      ,	model: 'string'
      ,	type: 'string'
      ,	height: 'number'
      ,	width: 'number'
      ,	length: 'number'
      ,	weight: 'number'
      ,	organization:
        {
          Type: Organization
        ,	value: Organization
        }
      }
  );

Equipment.List
= DefineList
    .extend(
      {
        '#': Equipment
      }
  );

const algebra = new set.Algebra(
  set.props.id('_id')
);

Equipment.connection = connect(
	[
		feathersServiceBehavior
	,	...behaviors
	]
,	{
		Map: Equipment
	,	List: Equipment.List
	,	feathersService: feathersClient.service('/equipments')
	,	name: 'equipments'
	,	algebra
	}
);

Equipment.algebra = algebra;

export default Equipment;
