'use strict';
const Parser = require('./Parser');
const fs = require('fs');


class ConstantsParser {

    static read(fileAbsolutePath) {
        let constantsContent = fs.readFileSync(fileAbsolutePath, 'utf8');


        let ast = Parser.PHPtoAST(constantsContent);

        return ast;

        this._findBody(ast);
    }

    static write(fileAbsolutePath, astObject) {
        fs.writeFileSync(fileAbsolutePath, JSON.stringify(astObject));
    }

    static _findBody(ast) {
        for (let i in ast) {

        }
    }
}

module.exports = ConstantsParser;