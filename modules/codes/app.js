const cheerio = require('cheerio');
const request = require("request");
const BComCodesUtils = require("../utils/BComCodesUtils");
const BComExtractor = require("./BComExtractor");

/**
 * Obtiene todas las urls que tienen que ver con códigos
 */
function getCodeUrls() {
    return new Promise((resolve, reject) => {
        let urls = [];
        request(BComCodesUtils.URL_BCOM_DOCUMENTATION() + 'api-reference/', (error, response, body) => {

            if (error) {
                reject(urls);
                return;
            }

            const $ = cheerio.load(body, { ignoreWhitespace: true });

            $('#APIReference a').each((aIndex, a) => {
                let relativeUrl = $(a).attr('href');
                let text = $(a).text();

                if (!relativeUrl.startsWith('../codes-')) {
                    return;
                }

                let urlCode = BComCodesUtils.getUrlCode(relativeUrl);
                console.log(urlCode);
                urls.push({
                    'text': text,
                    'code': urlCode,
                    'url': BComCodesUtils.getAbsoluteUrl(urlCode),
                });
            });

            resolve(urls);
        });
    });
}

/*
Deberiamos exponer las funciones que se les pasa la url y sacab los nombres de tablas etc
getCodeUrls().then((urls) => {
    console.log(urls);
}).catch((error) => {
});*/


let tablesConfig = {
    'codes-hac': {
        'hac_hotel_amenity_codes_ota_2014b_implemented': {
            phpClass: 'HotelAmenityOTA',
            phpNamespace: '',
            phpFolder: __dirname + '/tmp'
        },
        'bookingcom_extended_ota_codes': {
            phpClass: 'HotelAmenityExtended',
            phpNamespace: '',
            phpFolder: __dirname + '/tmp'
        },
        'special_service_codes': {
            phpClass: 'HotelAmenitySpecial',
            phpNamespace: '',
            phpFolder: __dirname + '/tmp'
        }
    },
    'codes-rma': {
        'ota_amenities': {
            phpClass: 'RoomAmenityTypeAmenities',
            phpNamespace: '',
            phpFolder: __dirname + '/tmp'
        }
    },
    'codes-err': {
        'err_error_codes_ota_2014b_implemented': {
            phpClass: 'ErrorCodes',
            phpNamespace: '',
            phpFolder: __dirname + '/tmp'
        }
    }
};

BComExtractor.execute(tablesConfig);


