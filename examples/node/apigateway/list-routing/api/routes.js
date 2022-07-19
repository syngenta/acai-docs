exports.routes = {
    'GET::org': 'api/org/orgEndpoint.js',
    'POST::org': 'api/org/orgEndpoint.js',
    'GET::grower': 'api/grower/growerEndpoint.js',
    'POST::grower': 'api/grower/growerEndpoint.js',
    'GET::grower/{growerId}': 'api/grower/growerIdEndpoint.js',
    'PATCH::grower/{growerId}': 'api/grower/growerIdEndpoint.js',
    'DELETE::grower/{growerId}': 'api/grower/growerIdEndpoint.js',
    'GET::farm': 'api/farm/farmEndpoint.js',
    'POST::farm': 'api/farm/farmEndpoint.js',
    'GET::farm/{farmId}': 'api/farm/farmIdEndpoint.js',
    'PATCH::farm/{farmId}': 'api/farm/farmIdEndpoint.js',
    'DELETE::farm/{farmId}': 'api/farm/farmIdEndpoint.js',
    'GET::farm/{farmId}/field': 'api/field/fieldEndpoint.js',
    'GET::farm/{farmId}/field/{fieldId}': 'api/field/fieldIdEndpoint.js',
    'PUT::farm/{farmId}/field/{fieldId}': 'api/field/fieldIdEndpoint.js',
    'DELETE::farm/{farmId}/field/{fieldId}': 'api/field/fieldIdEndpoint.js'
}
