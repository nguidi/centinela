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

const Flight
= DefineMap
    .extend(
      'Flight'
    ,  {
        seal: false
      }
    , {
        _id: 'any'
      ,	name: 'string'
      ,	uav: 'any'
      ,	batteries: 'any'
      ,	equipments: 'any'
      ,	organization:
        {
          Type: Organization
        ,	value: Organization
        }
      }
  );

Flight.List
= DefineList
    .extend(
      {
        '#': Flight
      }
  );

Flight.connection = connect(
	[
		feathersServiceBehavior
	,	...behaviors
	]
,	{
		Map: Flight
	,	List: Flight.List
	,	feathersService: feathersClient.service('/flights')
	,	name: 'flights'
	,	algebra
	}
);

Flight.algebra = algebra;

export default Flight;
