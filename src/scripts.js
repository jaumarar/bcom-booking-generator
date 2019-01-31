$(function() {
    $('#th-companies').typeahead({
        onSelect: function(item) {
            console.log(item);
        },
        ajax: {
            url: "./api/companies.json",
            timeout: 500,
            displayField: "name",
            triggerLength: 1,
            method: "get",
            loadingClass: "loading-circle",
            preDispatch: function (query) {
                // mostrar spinner
                return {
                    search: query
                }
            },
            preProcess: function (data) {
                // ocultar spinner
                if (data.success === false) {
                    return false;
                }
                // We good!
                return data;
            }
        }
    });
});
