import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/list';
import connect from 'can-connect';
import feathersClient from './feathers-client';
import feathersServiceBehavior from 'can-connect-feathers/service';
import behaviors from './behaviors';
import algebra from './algebra';

const UAV
= DefineMap
    .extend(
      'UAV'
    ,  {
        seal: false
      }
    , {
        _id: 'any'
      ,	brand: 'string'
      ,	model: 'string'
      ,	size: 'number'
      ,	height: 'number'
      ,	width: 'number'
      ,	length: 'number'
      ,	weight: 'number'
      }
  );

UAV.List
= DefineList
    .extend(
      {
        '#': UAV
      }
  );

UAV.connection = connect(
	[
		feathersServiceBehavior
	,	...behaviors
	]
,	{
		Map: UAV
	,	List: UAV.List
	,	feathersService: feathersClient.service('/uavs')
	,	name: 'uavs'
	,	algebra
	}
);

UAV.algebra = algebra;

export default UAV;
