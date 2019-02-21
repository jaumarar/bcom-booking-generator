const ConstantsParser = require('./ConstantsParser');

let ast = ConstantsParser.read('./Conversion.php');

ConstantsParser.write('./conversion.php.ast.json', ast);

let avantio = {
    'amenity_ws': {
        phpNamespace: 'Avantio\\Connectivity\\Avantio',
        phpClass: 'AmenityWS',
        phpPath: '',
        phpSQL: {
            table: '',
            code: '',
            text: ''
        }
    }
}

let bcom = {
    'codes-hca': {
        'bcom_table': {
            phpNamespace: 'Av',
            phpClass: 'BComWS',
            phpPath: '',
        }
    }
};


let relations = {
    'amenity_ws': ['codes-hca']
};

/**
 * cargar todos los bcom de internet
 *
 * cargar amenities
 */