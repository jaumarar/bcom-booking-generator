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

        return this.processObject(object);
    }

    static processObject(object) {
        let objectStr = JSON.stringify(object);

        let matches = objectStr.match(/\#[a-zA-Z0-9-_]+\:[a-zA-Z0-9-_]+/g);

        if (!matches) {
            return objectStr;
        }

        matches.forEach((element) => {

            let analisys = MockUtils.analisys(element);

            if (!analisys.valid) {
                return;
            }

            let re = new RegExp('"' + element + '"',"g");

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

let string2XML = MockString.processObject({
    "HotelReservations": [
        {
            "HotelReservation": [
                {
                    "RoomStays": [
                        "#RoomStay:basic"
                    ]
                }
        ]
        }
        ]
});

let xml = Mock._js2xml(
    JSON.parse(string2XML)
);

console.log(xml);
return;
Mock._xml2js('<OTA_HotelResNotifRQ  xmlns=\'http://www.opentravel.org/OTA/2003/05\' xmlns:xsi=\'http://www.w3.org/2001/XMLSchema-instance\' xsi:schemaLocation=\'http://www.opentravel.org/OTA/2003/05 OTA_HotelResNotifRQ.xsd\' TimeStamp=\'2012-11-13T10:06:51-00:00\' Target=\'Production\' Version=\'2.001\'>\n' +
    '    <HotelReservations>\n' +
    '        <HotelReservation>\n' +
    '            <RoomStays>\n' +
    '                <RoomStay IndexNumber=\'111\'>\n' +
    '                    <RoomTypes><RoomType RoomTypeCode=\'28656731\'><RoomDescription Name=\'Deluxe Double Room - General\'><Text>This double room comes with 1 extra large double bed.</Text><MealPlan>No meal is included in this room rate.</MealPlan><MaxChildren>0</MaxChildren></RoomDescription><Amenities><Amenity>Shower</Amenity><Amenity>Toilet</Amenity><Amenity>Bathroom</Amenity></Amenities></RoomType></RoomTypes>\n' +
    '                    <RatePlans><RatePlan><Commission><CommissionPayableAmount Amount=\'648\' DecimalPlaces=\'1\' CurrencyCode=\'EUR\'/></Commission></RatePlan></RatePlans>\n' +
    '                    <RoomRates>\n' +
    '                        <RoomRate EffectiveDate=\'2021-01-01\' RatePlanCode=\'997364\'><Rates><Rate><Total AmountAfterTax=\'1200\' DecimalPlaces=\'2\' CurrencyCode=\'EUR\'/></Rate></Rates></RoomRate>\n' +
    '                        <RoomRate EffectiveDate=\'2021-01-02\' RatePlanCode=\'11290621\'><Rates><Rate><Total AmountAfterTax=\'1200\' DecimalPlaces=\'2\' CurrencyCode=\'EUR\'/></Rate></Rates></RoomRate>\n' +
    '                        <!-- Non refundable 19875 -->\n' +
    '                        <RoomRate EffectiveDate=\'2021-01-03\' RatePlanCode=\'997364\'><Rates><Rate><Total AmountAfterTax=\'1000\' DecimalPlaces=\'2\' CurrencyCode=\'EUR\'/></Rate></Rates></RoomRate>\n' +
    '                    </RoomRates>\n' +
    '                    <GuestCounts><GuestCount Count=\'2\'/></GuestCounts>\n' +
    '                    <Total AmountAfterTax=\'3400\' DecimalPlaces=\'2\' CurrencyCode=\'EUR\'/>\n' +
    '                    <BasicPropertyInfo HotelCode=\'286567\'/>\n' +
    '                    <ResGuestRPHs><ResGuestRPH RPH=\'1\'/></ResGuestRPHs>\n' +
    '                    <SpecialRequests><SpecialRequest Name=\'smoking preference\'><Text>Non-Smoking</Text></SpecialRequest></SpecialRequests>\n' +
    '                </RoomStay>\n' +
    '                <!--<RoomStay IndexNumber=\'222\'>\n' +
    '                    <RoomTypes><RoomType RoomTypeCode=\'28656732\'><RoomDescription Name=\'Deluxe Double Room - General\'><Text>This double room comes with 1 extra large double bed.</Text><MealPlan>No meal is included in this room rate.</MealPlan><MaxChildren>0</MaxChildren></RoomDescription><Amenities><Amenity>Shower</Amenity><Amenity>Toilet</Amenity><Amenity>Bathroom</Amenity></Amenities></RoomType></RoomTypes>\n' +
    '                    <RatePlans><RatePlan><Commission><CommissionPayableAmount Amount=\'648\' DecimalPlaces=\'1\' CurrencyCode=\'EUR\'/></Commission></RatePlan></RatePlans>\n' +
    '                    <RoomRates>\n' +
    '                        <RoomRate EffectiveDate=\'2021-01-10\' RatePlanCode=\'997364\'><Rates><Rate><Total AmountAfterTax=\'1200\' DecimalPlaces=\'2\' CurrencyCode=\'EUR\'/></Rate></Rates></RoomRate>\n' +
    '                        <RoomRate EffectiveDate=\'2021-01-11\' RatePlanCode=\'11290621\'><Rates><Rate><Total AmountAfterTax=\'1200\' DecimalPlaces=\'2\' CurrencyCode=\'EUR\'/></Rate></Rates></RoomRate>\n' +
    '                        <RoomRate EffectiveDate=\'2021-01-12\' RatePlanCode=\'997364\'><Rates><Rate><Total AmountAfterTax=\'1000\' DecimalPlaces=\'2\' CurrencyCode=\'EUR\'/></Rate></Rates></RoomRate>\n' +
    '                    </RoomRates>\n' +
    '                    <GuestCounts><GuestCount Count=\'2\'/></GuestCounts>\n' +
    '                    <Total AmountAfterTax=\'3400\' DecimalPlaces=\'2\' CurrencyCode=\'EUR\'/>\n' +
    '                    <BasicPropertyInfo HotelCode=\'286567\'/>\n' +
    '                    <ResGuestRPHs><ResGuestRPH RPH=\'1\'/></ResGuestRPHs>\n' +
    '                    <SpecialRequests><SpecialRequest Name=\'smoking preference\'><Text>Non-Smoking</Text></SpecialRequest></SpecialRequests>\n' +
    '                </RoomStay>-->\n' +
    '            </RoomStays>\n' +
    '            <ResGuests>\n' +
    '                <ResGuest ResGuestRPH=\'1\'><Profiles><ProfileInfo><Profile><Customer><PersonName><Surname>Jaume Martí</Surname></PersonName></Customer></Profile></ProfileInfo></Profiles></ResGuest>\n' +
    '                <ResGuest ResGuestRPH=\'2\'><Profiles><ProfileInfo><Profile><Customer><PersonName><Surname>Jaume Martí 2</Surname></PersonName></Customer></Profile></ProfileInfo></Profiles></ResGuest>\n' +
    '            </ResGuests>\n' +
    '            <ResGlobalInfo>\n' +
    '                <Comments><Comment><Text>Comentario de reserva de prueba</Text></Comment></Comments>\n' +
    '                <Guarantee><GuaranteesAccepted><GuaranteeAccepted>\n' +
    '                    <!--<PaymentCard CardCode=\'MC\' CardNumber=\'4111111111111111\' SeriesCode=\'123\' ExpireDate=\'0128\'>-->\n' +
    '                    <PaymentCard CardCode=\'\' CardNumber=\'\' SeriesCode=\'\' ExpireDate=\'\'>\n' +
    '                        <CardHolderName>Jaume Martí</CardHolderName></PaymentCard></GuaranteeAccepted></GuaranteesAccepted></Guarantee>\n' +
    '                <Total AmountAfterTax=\'3000\' DecimalPlaces=\'2\' CurrencyCode=\'EUR\'/>\n' +
    '                <HotelReservationIDs><HotelReservationID ResID_Value=\'400000001\' ResID_Date=\'2019-10-28T20:38:02\'/></HotelReservationIDs>\n' +
    '                <Profiles>\n' +
    '                    <ProfileInfo>\n' +
    '                        <Profile>\n' +
    '                            <Customer>\n' +
    '                                <PersonName><GivenName>Jaume</GivenName><Surname>Martí</Surname></PersonName>\n' +
    '                                <Telephone PhoneNumber=\'+34200000000\'/>\n' +
    '                                <Email>jmarti+bcom-reservas@avantio.com</Email>\n' +
    '                                <Address><AddressLine>Calle</AddressLine><CityName>Valencia</CityName><PostalCode>46110</PostalCode><CountryName Code=\'ES\'/><CompanyName/></Address>\n' +
    '                            </Customer>\n' +
    '                        </Profile>\n' +
    '                    </ProfileInfo>\n' +
    '                </Profiles>\n' +
    '            </ResGlobalInfo>\n' +
    '        </HotelReservation>\n' +
    '    </HotelReservations>\n' +
    '</OTA_HotelResNotifRQ>')
    .then((r) => {
        console.log(JSON.stringify(r));
    });

