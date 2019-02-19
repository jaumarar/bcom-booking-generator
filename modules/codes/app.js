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
        request(BComCodesUtils.URL_BCOM_DOCUMENTATION + 'api-reference/', (error, response, body) => {

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

/*getCodeUrls().then((urls) => {
    console.log(urls);
}).catch((error) => {
});
*/



/*getTables('codes-hac').then((tables) => {
    console.log(tables);
}).catch((error) => {

});*/


let tablesConfig = {
    'codes-hac': {
        'hac_hotel_amenity_codes_ota_2014b_implemented': {
            phpClass: 'HotelAmenityOTA',
            phpNamespace: '',
            phpFolder: './tmp'
        },
        'bookingcom_extended_ota_codes': {
            phpClass: 'HotelAmenityExtended',
            phpNamespace: '',
            phpFolder: './tmp'
        },
        'special_service_codes': {
            phpClass: 'HotelAmenitySpecial',
            phpNamespace: '',
            phpFolder: './tmp'
        }
    },
    'codes-rma': {
        'ota_amenities': {
            phpClass: 'RoomAmenityTypeAmenities',
            phpNamespace: '',
            phpFolder: './tmp'
        }
    }
};

BComExtractor.execute(tablesConfig);


