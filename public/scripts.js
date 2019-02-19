$(function() {

    $('[data-clone-from]').on('click', function() {
        let $this = $(this);
        let cloneFromSelector = $this.attr('data-clone-from');
        let cloneFrom = $this.closest(cloneFromSelector);

        let cloneToSelector   = $this.attr('data-clone-to') ? $this.attr('data-clone-to') : cloneFrom.parent();

        cloneFrom.clone(true, true).appendTo(cloneToSelector);
    });

    $('[data-remove]').on('click', function() {
        let $this = $(this);
        let removeSelector = $this.attr('data-remove');
        let removeFrom = $this.closest(removeSelector);

        removeFrom.remove();
    });

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

    $('[data-bcom-codes]').each(function(index) {
        let $this = $(this);
        let codeType = $this.attr('data-bcom-codes');

        let codes = getBookingCodes(codeType);

        $.each(codes, function(code, text) {
            $this.append($('<option>', {'value': code, 'text': code + ' - ' + text}));
        });
    });


    function getBookingCodes(type){
        switch (type) {
            case 'ServiceInventoryCode':
                return getBookingCodeServiceInventoryCode();
        }

        return [];
    }

});

function getBookingCodeServiceInventoryCode()
{
    return {
        1: 'Breakfast',
        2: 'Continental breakfast',
        3: 'American breakfast',
        4: 'Buffet breakfast',
        5: 'Full english breakfast',
        6: 'Lunch',
        7: 'Dinner',
        8: 'Half board',
        9: 'Full board',
        11: 'Breakfast for Children',
        12: 'Continental breakfast for Children',
        13: 'American breakfast for Children',
        14: 'Buffet breakfast for Children',
        15: 'Full english breakfast for Children',
        16: 'Lunch for Children',
        17: 'Dinner for Children',
        18: 'Half board for Children',
        19: 'Full board for Children',
        20: 'WiFi',
        21: 'Internet',
        22: 'Parking space',
        23: 'Extra bed',
        24: 'Baby cot'
    };
}


