'use strict';
const parser = require('php-parser');
const unparser = require('php-unparser');

class Parser {

    static ASTtoPHP(astObject) {
        return unparser(astObject, this._unparserOptions());
    }

    static PHPtoAST(phpFileContentString) {
        let engine = new parser(this._parserOptions());
        return engine.parseCode(phpFileContentString);
    }

    /**
     * @private
     */
    static _unparserOptions() {
        return {
            indent: false,
            dontUseWhitespaces: false,
            shortArray: false,
            bracketsNewLine: false,
            forceNamespaceBrackets: false
        }
    }

    /**
     * @private
     */
    static _parserOptions() {
        return {
            parser: {
                php7: true,
                debug: false,
                locations: false,
                extractDoc: false,
                suppressErrors: false
            },
            lexer: {
                all_tokens: false,
                comment_tokens: false,
                mode_eval: false,
                asp_tags: false,
                short_tags: false
            }
        }
    }
}

module.exports = Parser;