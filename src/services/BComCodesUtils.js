const URL_BCOM_DOCUMENTATION = 'https://connect.booking.com/user_guide/site/en-US/';

module.exports = {
    URL_BCOM_DOCUMENTATION: URL_BCOM_DOCUMENTATION,
    getTableName: (tableName) => {
        return tableName
            .toLowerCase()
            .replace(/[\s]/g, '_') // Convert spaces to _
            .replace(/[\W]+/g, '') // Remove not alphanumeric and _ chars
            .replace(/_{2,}/g, '_') // Join duplicated _
            .replace(/^[_]+|[_]+$/g, ''); // Trim _ char
    },

    getCodeValue: (code) => {
        return code.replace(/[^\d_]+/g, '');
    },

    getTextValue: (text) => {
        text = text.toUpperCase().replace(/[\W]+/g, '_');
        if (text.match(/^\d/)) {
            text = '_' + text;
        }

        return text;
    },
    getUrlCode: (relativeUrl) => {
        return relativeUrl.replace(/[\.\/]/g, '');
    },
    getAbsoluteUrl: (urlCode) => {
        return URL_BCOM_DOCUMENTATION + urlCode + '/';
    }
};
