var xml2js = require('xml2js');
const fs = require('fs');

const MOCK_FOLDER = './../OTA_objects/';

class MockUtils {
    static mock(object, key) {
        let file = MOCK_FOLDER + object + '.json';

        if (!fs.existsSync(file)) {
            return false;
        }

        file = JSON.parse(fs.readFileSync(file, 'utf8'));

        if (typeof key !== 'undefined' && typeof file[key] === 'undefined') {
            return null;
        } else if (typeof key !== 'undefined') {
            return file[key];
        }

        return file;
    }

    static analisys(value) {
        if (!this._isMockObject(value)) {
            return value;
        }
        let analysis = this._analysisMockObject(value);

        if (!analysis.valid) {
            return value;
        }

        return analysis;
    }

    static _isMockObject(value) {
        return value.startsWith('#') && value.includes(':');
    }

    static _analysisMockObject(value) {
        let result = {
            valid: false,
            object: '',
            key: ''
        };

        let v = value.split('#');

        if (v.length !== 2) {
            return result;
        }

        v = v[1].split(':');

        if (!v[0] || !v[1]) {
            return result;
        }

        result.valid = true;
        result.object = v[0];
        result.key = v[1];

        return result;
    }
}

class MockString {
    static process(mock, key) {
        let object = MockUtils.mock(mock, key);

        if (!object) {
            return '';
        }

        let objectStr = JSON.stringify(object);

        let matches = objectStr.match(/\#\w+\:\w+/g);

        if (!matches) {
            return objectStr;
        }

        matches.forEach((element) => {

            let analisys = MockUtils.analisys(element);

            if (!analisys.valid) {
                return;
            }

            var re = new RegExp('"' + element + '"',"g");

            objectStr = objectStr.replace(re, MockString.process(analisys.object, analisys.key));
        });
        return objectStr;
    }
}

class Mock {
    static load(mockName, mockKey) {
        let file = MockUtils.load(mockName, mockKey);

        console.log({
            'function': 'Mock.load()',
            'msg': 'FILE',
            'data': {
                'mockName': mockName,
                'mockKey': mockKey,
                'file': file
            }
        });

        let xml = this._js2xml(file);

        console.log({
            'function': 'Mock.load()',
            'msg': 'XML',
            'data': {
                'mockName': mockName,
                'mockKey': mockKey,
                'xml': xml
            }
        });

        return this._xml2js(xml);
    }

    static _js2xml(object) {
        var builder = new xml2js.Builder({
            xmldec: {},
            headless: true,
        });
        return builder.buildObject(object);
    }

    static async _xml2js(xml) {
        return new Promise((resolve, reject) => {
            xml2js.parseString(xml, {
                explicitRoot: false,
                valueProcessors: [
                    Mock._processValue
                ]
            },(err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    }

    static async _processValue(value) {
        let analysis = MockUtils.analisys(value);

        if(!analysis.valid) {
            return value;
        }

        let mock = await Mock.load(analysis.object, analysis.key);

        if (!mock) {
            return value;
        } else if (typeof mock.root !== 'undefined') {
            return mock.root;
        }
        return mock;
    }




}

let string2XML = MockString.process('Customer', 'jaume');

let xml = Mock._js2xml(
    JSON.parse(string2XML)
);

console.log(xml);