/**
 * @see https://connect.booking.com/user_guide/site/en-US/api-reference/Address/
 */
class Address {
    /**
     * @private
     */
    _addressLine;


    _cityName;

    _countryName;

    _hotelName;

    _postalCode;

    _stateProv;

    get addressLine() {
        return this._addressLine;
    }

    set addressLine(addressLine) {
        this._addressLine = addressLine;
    }
}



let a = new Address();

a.addressLine