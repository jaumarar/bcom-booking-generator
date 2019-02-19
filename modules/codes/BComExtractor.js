'use strict';
const BComCodesUtils = require("../utils/BComCodesUtils");
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

const PHP_FILE_TEMPLATE = './templates/php-file.template';
const PHP_CONSTANT_TEMPLATE = './templates/php-constant.template';

class BComExtractor {

    /**
     * @param {Object} tablesConfig
     */
    static execute(tablesConfig) {
        let templateFile = fs.readFileSync(PHP_FILE_TEMPLATE, 'utf8');
        let templateConstant = fs.readFileSync(PHP_CONSTANT_TEMPLATE, 'utf8');

        Object.keys(tablesConfig).forEach((codeUrl) => {
            this.processTablesAndCodes(tablesConfig[codeUrl], codeUrl)
                .then((codes) => {
                    // For each table of codes
                    Object.keys(tablesConfig).forEach((tableId) => {
                        if (typeof codes.tables_found[tableId] === 'undefined') {
                            return;
                        }
                        let phpNamespace = tablesConfig[codeUrl][tableId].phpNamespace;
                        let phpClass     = tablesConfig[codeUrl][tableId].phpClass;
                        let phpFolder    = tablesConfig[codeUrl][tableId].phpFolder || '.';

                        phpFolder = phpFolder.replace(/[\/]+$/g, '');

                        let codesInTable = codes.tables_found[tableId];
                        let fileName = phpClass + '.php';
                        let constants = '';

                        Object.keys(codesInTable).forEach((code) => {
                            constants += templateConstant.replace('%text%', codesInTable[code]).replace('%code%', code);
                        });

                        let fileContent = templateFile
                            .replace('%phpNamespace%', phpNamespace ? 'namespace ' + phpNamespace : '')
                            .replace('%phpClass%', phpClass)
                            .replace('%constants%', constants);

                        fs.writeFileSync(phpFolder + '/' + fileName, fileContent);
                    });
                })
                .catch((error) => {
                    console.log('ERROR 1', error);
                });
        });
    };

    /**
     *
     * @param {Object<string,Object>} configAppliedToThisHTML
     * @param codeUrl
     * @returns {Promise<Object>}
     */
    static processTablesAndCodes(configAppliedToThisHTML, codeUrl) {
        return new Promise((resolve, reject) => {
            this.tables(codeUrl)
                .then((tables) => {
                let codes = {
                    tables_found: {},
                    tables_not_found: [],
                    tables_new: [],
                };

                Object.keys(tables).forEach((tableId) => {

                    // Is a new table
                    if (typeof configAppliedToThisHTML[tableId] === 'undefined') {
                        console.info(codeUrl, 'Table NOT found in config:', tableId);
                        codes.tables_new.push(tableId);
                        return;
                    }

                    // Table found
                    console.info(codeUrl, 'Table found in config:', tableId);
                    codes.tables_found[tableId] = {};

                    let codeColumnIndex = configAppliedToThisHTML[tableId].codeColumnIndex || 1;
                    let textColumnIndex = configAppliedToThisHTML[tableId].textColumnIndex || 3;

                    this.codes(tables[tableId], codeColumnIndex, textColumnIndex, codeUrl, tableId)
                        .then((codesFound) => {

                            codes.tables_found[tableId] = codesFound;

                            // Tables not found
                            Object.keys(configAppliedToThisHTML).forEach((tId) => {
                                if (typeof codes.tables_found[tId] === 'undefined') {
                                    console.info(codeUrl, 'BComExtractor.processTablesAndCodes() #', 'Table found in config but not in HTML:', tId);
                                    codes.tables_not_found.push(tId);
                                }
                            });

                            resolve(codes);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    /**
     * Given an url code like 'codes-hac' extract all the tables and the leading title
     * * TODO Not all cases for table names explored
     * @static
     * @param {string} codeUrl
     * @returns {Promise<Object<string, Object>>}
     */
    static tables(codeUrl) {
        return new Promise((resolve, reject) => {
            let tables = {};

            request(BComCodesUtils.getAbsoluteUrl(codeUrl), (error, response, body) => {
                if (error) {
                    reject(tables);
                    return;
                }

                const $ = cheerio.load(body, { ignoreWhitespace: true });

                $('table').each((tableIndex, table) => {
                    let tableId = BComCodesUtils.getTableId($(table).prev().text());
                    tables[tableId] = $(table);
                });

                console.info(codeUrl, 'Tables in ' + codeUrl + ':', Object.keys(tables).toString());

                resolve(tables);
            });
        });
    };

    /**
     * Given a cherrio table extract the codes and values.
     * @static
     * @param {Object} $table
     * @param {number} codeColumnIndex
     * @param {number} textColumnIndex
     * @param {string} codeUrl The url where the table was extracted
     * @param {string} tableId The table id where was extracted
     * @returns {Promise<Object<number, string>>}
     */
    static codes($table, codeColumnIndex, textColumnIndex, codeUrl, tableId) {
        return new Promise((resolve, reject) => {
            const $ = cheerio;
            let codes = {};
            let $rows = $table.find('tbody > tr');
            $rows.each((trIndex, tr) => {
                if (typeof tr.children[codeColumnIndex] === 'undefined' || typeof tr.children[textColumnIndex] === 'undefined') {
                    return;
                }

                let code = BComCodesUtils.getCodeValue($(tr.children[codeColumnIndex]).text());
                codes[code] = BComCodesUtils.getTextValue($(tr.children[textColumnIndex]).text());
            });

            console.info(codeUrl, 'Rows parsed in ' + tableId,  Object.keys(codes).length + '/' + $rows.length);
            //console.log('\x1b[36m', 'sometext' ,'\x1b[0m');
            resolve(codes);
        });
    };
}

/**
 * @type {BComExtractor}
 */
module.exports = BComExtractor;
