class BComCodesUtils {

    static URL_BCOM_DOCUMENTATION() {
        return 'https://connect.booking.com/user_guide/site/en-US/';
    }

    static getTableId(tableName) {
        tableName = tableName
        .toLowerCase()
        .replace(/[\s]/g, '_') // Convert spaces to _
            .replace(/[-\/]/g, '_') // Convert certain characters to _
        .replace(/[\W]+/g, '') // Remove not alphanumeric and _ chars
        .replace(/_{2,}/g, '_') // Join duplicated _
        .replace(/^[_]+|[_]+$/g, ''); // Trim _ char

        if (tableName.match(/^\d/)) {
            tableName = '_' + tableName;
        }

        return tableName;
    }

    static getCodeValue(code) {
        return code.replace(/[^\d_]+/g, '');
    }

    static getTextValue(text) {
        return this.getTableId(text).toUpperCase();
    }

    static getUrlCode(relativeUrl) {
        return relativeUrl.replace(/[\.\/]/g, '');
    }

    static getAbsoluteUrl(urlCode) {
        return this.URL_BCOM_DOCUMENTATION() + urlCode + '/';
    }
}

module.exports = BComCodesUtils;
