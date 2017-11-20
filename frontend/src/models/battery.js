import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/list';
import connect from 'can-connect';
import feathersClient from './feathers-client';
import feathersServiceBehavior from 'can-connect-feathers/service';
import behaviors from './behaviors';
import algebra from './algebra';

var	Organization
=	DefineMap
		.extend(
			{
				name: 'string'
			,	cuit: 'string'
			}
		);

const Battery
= DefineMap
    .extend(
      'Battery'
    ,  {
        seal: false
      }
    , {
        _id: 'any'
      ,	brand: 'string'
      ,	model: 'string'
      ,	configuration: 'string'
      ,	capacity: 'string'
      ,	height: 'number'
      ,	width: 'number'
      ,	length: 'number'
      ,	weight: 'number'
      ,	discharge: 'number'
      ,	dischargePeak: 'number'
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

Battery.connection = connect(
	[
		feathersServiceBehavior
	,	...behaviors
	]
,	{
		Map: Battery
	,	List: Battery.List
	,	feathersService: feathersClient.service('/batteries')
	,	name: 'batteries'
	,	algebra
	}
);

Battery.algebra = algebra;

export default Battery;
