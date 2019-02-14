const cheerio = require('cheerio');
var request = require("request");
var fs = require('fs');
const BComCodesUtils = require("../services/BComCodesUtils");

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

function getTables(urlCode) {
    return new Promise((resolve, reject) => {
        let tables = {};

        request(BComCodesUtils.getAbsoluteUrl(urlCode), (error, response, body) => {
            if (error) {
                reject(tables);
                return;
            }
            const $ = cheerio.load(body, { ignoreWhitespace: true });

            $('table').each((tableIndex, table) => {
                let tableName = BComCodesUtils.getTableName($(table).prev().text());
                tables[tableName] = $(table);
            });

            resolve(tables);
        });
    });
}

/*getTables('codes-hac').then((tables) => {
    console.log(tables);
}).catch((error) => {

});*/


let config = {
    'codes-hac': {
        'hac_hotel_amenity_codes_ota_2014b_implemented': {
            php: 'HotelAmenityOTA'
        },
        'bookingcom_extended_ota_codes': {
            php: 'HotelAmenityExtended'
        },
        'special_service_codes': {
            php: 'HotelAmenitySpecial'
        }
    },
    'codes-rma': {
        'ota_amenities': {
            php: 'RoomAmenityTypeAmenities'
        }
    }
};

var templateFile = fs.readFileSync('./php.template', 'utf8');
var templateConstant = fs.readFileSync('./php-const.template', 'utf8');

for (let codeUrl in config) {

    extractCodes(config[codeUrl], codeUrl)
        .then((codes) => {
            // For each table of codes
            for (let tableName in config[codeUrl]) {
                if (typeof codes.tables_found[tableName] === 'undefined') {
                    continue;
                }
                let codesInTable = codes.tables_found[tableName];
                let className = config[codeUrl][tableName].php;
                let fileName = className + '.php';
                let constants = '';

                for (let code in codesInTable) {
                    constants += templateConstant.replace('%text%', codesInTable[code]).replace('%code%', code);
                }

                let fileContent = templateFile.replace('%tablename%', className).replace('%constants%', constants);

                fs.writeFileSync('./' + fileName, fileContent);
            }
        })
        .catch((error) => {

        });
}

function getCodes(table, codeColumnIndex, textColumnIndex){
    return new Promise((resolve, reject) => {
        const $ = cheerio;
        let codes = {};
        table.find('tbody > tr').each((trIndex, tr) => {
            let code = BComCodesUtils.getCodeValue($(tr.children[codeColumnIndex]).text());
            let text = BComCodesUtils.getTextValue($(tr.children[textColumnIndex]).text());

            codes[code] = text;
        });

        resolve(codes);
    });
}

function extractCodes(configAppliedToThisHTML, codeUrl) {
    return new Promise((resolve, reject) => {
        getTables(codeUrl).then((tables) => {
            let codes = {
                tables_found: {},
                tables_not_found: [],
                tables_new: [],
            };

            for (let tableName in tables) {
                // Is a new table
                if (typeof configAppliedToThisHTML[tableName] === 'undefined') {
                    codes.tables_new.push(tableName);
                    return;
                }
                // Table found
                codes.tables_found[tableName] = {};

                let configAppliedToThisTable = configAppliedToThisHTML[tableName];

                let codeColumnIndex = typeof configAppliedToThisTable.codeColumnIndex === 'undefined' ? 1 : configAppliedToThisTable.codeColumnIndex;
                let textColumnIndex = typeof configAppliedToThisTable.textColumnIndex === 'undefined' ? 3 : configAppliedToThisTable.textColumnIndex;

                getCodes(tables[tableName], codeColumnIndex, textColumnIndex)
                    .then((codesFound) => {

                        codes.tables_found[tableName] = codesFound;

                        // Tables not found
                        for (let tName in configAppliedToThisHTML) {
                            if (typeof codes.tables_found[tName] === 'undefined') {
                                codes.tables_not_found.push(tName);
                            }
                        }

                        resolve(codes);
                    });
            }
        }).catch((error) => {
            reject(error);
        });
    });
}


