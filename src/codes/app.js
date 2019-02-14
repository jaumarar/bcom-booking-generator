const cheerio = require('cheerio');
const $ = cheerio.load('<!DOCTYPE html>\n' +
    '<!--\n' +
    ' __   __   __               __    __   __            __   __             ___  __  ___          ___\n' +
    '|__) /  \\ /  \\ |__/ | |\\ | / _`  /  ` /  \\  |\\/|    /  ` /  \\ |\\ | |\\ | |__  /  `  |  | \\  / |  |  \\ /\n' +
    '|__) \\__/ \\__/ |  \\ | | \\| \\__> .\\__, \\__/  |  |    \\__, \\__/ | \\| | \\| |___ \\__,  |  |  \\/  |  |   |\n' +
    '\n' +
    '-->\n' +
    '<html>\n' +
    '    <head>\n' +
    '      <meta charset="utf-8">\n' +
    '      <title>RMA (Room Amenity Type) - Booking.com Connectivity API documentation</title>\n' +
    '      <link rel="stylesheet" href="https://bstatic.com/libs/bui/4.5.2/bui.min.css" />\n' +
    '      <link rel="stylesheet" type="text/css" href="../css/style.css">\n' +
    '      <!-- link rel="stylesheet" type="text/css" href="../css/pygments.css" -->\n' +
    '      <!-- <link rel="stylesheet" type="text/css" href="../css/shCore.css"> -->\n' +
    '\n' +
    '      <link rel="stylesheet" type="text/css" href="../css/booking-iconset.css">\n' +
    '\n' +
    '      <link rel="stylesheet" type="text/css" href="../css/prism.css" />\n' +
    '\n' +
    '      <!-- <script src="../scripts/clipboard.min.js"></script> -->\n' +
    '      <script src="../scripts/prism.js"></script>\n' +
    '      <!-- <script src="../scripts/dblclick_highlight.js"></script> -->\n' +
    '\n' +
    '      <script src="../scripts/shCore.js"></script>\n' +
    '      <script src="../scripts/shBrushXml.js"></script>\n' +
    '      <script src="../scripts/jquery-1.10.2.min.js"></script>\n' +
    '      <script type="text/javascript" src="/javascripts/jquery.cookie.js"></script>\n' +
    '\n' +
    '      <script>var base_url = \'..\';</script>\n' +
    '      <script data-main="../mkdocs/js/search.js" src="../mkdocs/js/require.js"></script>\n' +
    '\n' +
    '      <script>\n' +
    '        function showSearch() {\n' +
    '          $( "#mainContent" ).fadeTo( "fast" , 0.5, function() {\n' +
    '            document.getElementById(\'searchBox\').style.display = \'block\';\n' +
    '          });\n' +
    '          console.log("Show search");\n' +
    '          ga("send", "event", "Documentation", "Show search");\n' +
    '        }\n' +
    '        function hideSearch() {\n' +
    '          $( "#mainContent" ).fadeTo( "fast" , 1, function() {\n' +
    '            document.getElementById(\'searchBox\').style.display = \'none\';\n' +
    '          });\n' +
    '          console.log("Hide search");\n' +
    '          ga("send", "event", "Documentation", "Hide search");\n' +
    '        }\n' +
    '\n' +
    '        /* set style for deactivating all submenus */\n' +
    '        function showSubMenu(a) {\n' +
    '          \n' +
    '            /* hide all submenu */\n' +
    '            document.getElementById(\'Home\').style.display = \'none\';\n' +
    '            /* remove highlight on active mein menu */\n' +
    '            document.querySelector(\'#main_Home\').classList.remove("current");\n' +
    '          \n' +
    '            /* hide all submenu */\n' +
    '            document.getElementById(\'Content\').style.display = \'none\';\n' +
    '            /* remove highlight on active mein menu */\n' +
    '            document.querySelector(\'#main_Content\').classList.remove("current");\n' +
    '          \n' +
    '            /* hide all submenu */\n' +
    '            document.getElementById(\'PhotoAPI\').style.display = \'none\';\n' +
    '            /* remove highlight on active mein menu */\n' +
    '            document.querySelector(\'#main_PhotoAPI\').classList.remove("current");\n' +
    '          \n' +
    '            /* hide all submenu */\n' +
    '            document.getElementById(\'Rates\').style.display = \'none\';\n' +
    '            /* remove highlight on active mein menu */\n' +
    '            document.querySelector(\'#main_Rates\').classList.remove("current");\n' +
    '          \n' +
    '            /* hide all submenu */\n' +
    '            document.getElementById(\'Reservations\').style.display = \'none\';\n' +
    '            /* remove highlight on active mein menu */\n' +
    '            document.querySelector(\'#main_Reservations\').classList.remove("current");\n' +
    '          \n' +
    '            /* hide all submenu */\n' +
    '            document.getElementById(\'Promotions\').style.display = \'none\';\n' +
    '            /* remove highlight on active mein menu */\n' +
    '            document.querySelector(\'#main_Promotions\').classList.remove("current");\n' +
    '          \n' +
    '            /* hide all submenu */\n' +
    '            document.getElementById(\'MessagingAPI\').style.display = \'none\';\n' +
    '            /* remove highlight on active mein menu */\n' +
    '            document.querySelector(\'#main_MessagingAPI\').classList.remove("current");\n' +
    '          \n' +
    '            /* hide all submenu */\n' +
    '            document.getElementById(\'ReviewAPI\').style.display = \'none\';\n' +
    '            /* remove highlight on active mein menu */\n' +
    '            document.querySelector(\'#main_ReviewAPI\').classList.remove("current");\n' +
    '          \n' +
    '            /* hide all submenu */\n' +
    '            document.getElementById(\'ReviewIframe\').style.display = \'none\';\n' +
    '            /* remove highlight on active mein menu */\n' +
    '            document.querySelector(\'#main_ReviewIframe\').classList.remove("current");\n' +
    '          \n' +
    '            /* hide all submenu */\n' +
    '            document.getElementById(\'OpportunityAPI\').style.display = \'none\';\n' +
    '            /* remove highlight on active mein menu */\n' +
    '            document.querySelector(\'#main_OpportunityAPI\').classList.remove("current");\n' +
    '          \n' +
    '            /* hide all submenu */\n' +
    '            document.getElementById(\'Services\').style.display = \'none\';\n' +
    '            /* remove highlight on active mein menu */\n' +
    '            document.querySelector(\'#main_Services\').classList.remove("current");\n' +
    '          \n' +
    '            /* hide all submenu */\n' +
    '            document.getElementById(\'APIReference\').style.display = \'none\';\n' +
    '            /* remove highlight on active mein menu */\n' +
    '            document.querySelector(\'#main_APIReference\').classList.remove("current");\n' +
    '          \n' +
    '\n' +
    '          /* show active submenu */\n' +
    '          document.getElementById(a).style.display = \'block\';\n' +
    '          document.querySelector(\'#main_\' + a).classList.add("current");\n' +
    '          /* @wveeken: scroll active TOC item into view */\n' +
    '          document.getElementById(\'subMenuTitle\').innerHTML = document.querySelector(\'#main_\' + a + \' .sidebar-item__title\').innerText;\n' +
    '          /* @wveeken: scroll active TOC item into view */\n' +
    '          $(".secondary-sidebar-item.current")[0].scrollIntoView();\n' +
    '          /* enable syntax highlightning of pre and code elements */\n' +
    '          SyntaxHighlighter.all();\n' +
    '        }\n' +
    '      </script>\n' +
    '      <script type="text/javascript">\n' +
    '        SyntaxHighlighter.defaults.toolbar = false;\n' +
    '      </script>\n' +
    '\n' +
    '    \n' +
    '<script type="text/javascript">\n' +
    'var allowed_href_map = { %s };\n' +
    'var allowed_group_headings_map = { %s };\n' +
    'var is_anchor_or_parent = function(str){\n' +
    '    if (str===\'..\'||str===\'../\'||str===\'.\'||str===\'./\') return true;\n' +
    '    if (str.length>0 && str.charAt(0)===\'#\' && str.indexOf(\'/\')<0) return true;\n' +
    '    return false;\n' +
    '};\n' +
    'allowed_group_headings_map[\'Document Notes\'] = 1;\n' +
    '$(document).on(\'ready\', function(){\n' +
    '    $("ul.subnav li span").each(function(){\n' +
    '        var htmlcontent = $(this).html();\n' +
    '        if (!allowed_group_headings_map[htmlcontent]) {\n' +
    '            //console.log( "setting-display-none1="+htmlcontent );\n' +
    '            $(this).css(\'display\', \'none\');\n' +
    '        }\n' +
    '    });\n' +
    '    $("div").find("[data-spy=\'affix\']").each(function(){\n' +
    '        $(this).find("a").each(function(){\n' +
    '            var hrefstr = $(this).attr("href");\n' +
    '            if (is_anchor_or_parent(hrefstr)) return;\n' +
    '            //var hrefstr1 = hrefstr;\n' +
    '            //console.log( "hrefstr1="+hrefstr );\n' +
    '            var hrefstr_splitteded = hrefstr.split(\'/\');\n' +
    '            for (var i in hrefstr_splitteded) {\n' +
    '                hrefstr = hrefstr_splitteded[i];\n' +
    '                if (hrefstr!=="..") break;\n' +
    '            }\n' +
    '            //console.log( "hrefstr2="+hrefstr );\n' +
    '            if (!allowed_href_map[hrefstr]) {\n' +
    '                //console.log( "setting-display-none="+hrefstr+", "+hrefstr1 );\n' +
    '                $(this).css(\'display\', \'none\');\n' +
    '            }\n' +
    '        });\n' +
    '    });\n' +
    '});\n' +
    '</script>\n' +
    '\n' +
    '</head>\n' +
    '  <body style="background-color: black" >\n' +
    '\n' +
    '    <div class="main" id="mainContent">\n' +
    '      <div class="main-inner">\n' +
    '        <div class="sidebar collapsed">\n' +
    '            <a class="sidebar-item" href="#" onClick="showSearch();" id="main_Search">\n' +
    '              <span class="sidebar-item__icon bicon-search"></span>\n' +
    '              <span class="sidebar-item__title">Search</span>\n' +
    '            </a>\n' +
    '            <a class="sidebar-item" href="#" onClick="showSubMenu(\'Home\')" id="main_Home">\n' +
    '              <span class="sidebar-item__icon bicon-home"></span>\n' +
    '              <span class="sidebar-item__title">Home</span>\n' +
    '            </a>\n' +
    '            <!-- <a class="sidebar-item" href="#" onClick="showSubMenu(\'GettingStarted\')" id="main_GettingStarted">\n' +
    '              <span class="sidebar-item__icon bicon-arrowcircleright"></span>Getting started\n' +
    '            </a> -->\n' +
    '            <a class="sidebar-item" href="#" onClick="showSubMenu(\'Content\')" id="main_Content">\n' +
    '              <span class="sidebar-item__icon bicon-paintbrush"></span>\n' +
    '              <span class="sidebar-item__title">Content API</span>\n' +
    '            </a>\n' +
    '            <a class="sidebar-item" href="#" onClick="showSubMenu(\'PhotoAPI\')" id="main_PhotoAPI">\n' +
    '              <span class="sidebar-item__icon bicon-accamera"></span>\n' +
    '              <span class="sidebar-item__title">Photo API</span>\n' +
    '              <span class="sidebar-item__tag">New!</span>\n' +
    '            </a>\n' +
    '            <a class="sidebar-item" href="#" onClick="showSubMenu(\'Rates\')" id="main_Rates">\n' +
    '              <span class="sidebar-item__icon bicon-calendar"></span>\n' +
    '              <span class="sidebar-item__title">Rates & Availability API</span>\n' +
    '            </a>\n' +
    '            <a class="sidebar-item" href="#" onClick="showSubMenu(\'Reservations\')" id="main_Reservations">\n' +
    '              <span class="sidebar-item__icon bicon-menu"></span>\n' +
    '              <span class="sidebar-item__title">Reservations API</span>\n' +
    '            </a>\n' +
    '            <a class="sidebar-item" href="#" onClick="showSubMenu(\'Promotions\')" id="main_Promotions">\n' +
    '              <span class="sidebar-item__icon bicon-dealsbadge"></span>\n' +
    '              <span class="sidebar-item__title">Promotions API</span>\n' +
    '            </a>\n' +
    '            <a class="sidebar-item" href="#" onClick="showSubMenu(\'MessagingAPI\')" id="main_MessagingAPI">\n' +
    '              <span class="sidebar-item__icon bicon-speech"></span>\n' +
    '              <span class="sidebar-item__title">Messaging API</span>\n' +
    '                <span class="sidebar-item__tag">New!</span>\n' +
    '\n' +
    '            </a>\n' +
    '            <a class="sidebar-item" href="#" onClick="showSubMenu(\'ReviewAPI\')" id="main_ReviewAPI">\n' +
    '              <span class="sidebar-item__icon bicon-reviewtimeline"></span>\n' +
    '              <span class="sidebar-item__title">Guest Review API</span>\n' +
    '              <span class="sidebar-item__tag">New!</span>\n' +
    '            </a>\n' +
    '            <a class="sidebar-item" style="display: none" href="#" onClick="showSubMenu(\'ReviewIframe\')" id="main_ReviewIframe">\n' +
    '              <span class="sidebar-item__icon bicon-reviewtimeline"></span>\n' +
    '              <span class="sidebar-item__title">Review Iframe (beta)</span>\n' +
    '            </a>\n' +
    '            <a class="sidebar-item" href="#" onClick="showSubMenu(\'OpportunityAPI\')" id="main_OpportunityAPI">\n' +
    '              <span class="sidebar-item__icon bicon-graph"></span>\n' +
    '              <span class="sidebar-item__title">Opportunity API</span>\n' +
    '              <span class="sidebar-item__tag">New!</span>\n' +
    '            </a>\n' +
    '            <a class="sidebar-item" href="#" onClick="showSubMenu(\'Services\')" id="main_Services">\n' +
    '              <span class="sidebar-item__icon bicon-settings"></span>\n' +
    '              <span class="sidebar-item__title">Services</span>\n' +
    '            </a>\n' +
    '            <a class="sidebar-item" href="#" onClick="showSubMenu(\'APIReference\')" id="main_APIReference">\n' +
    '              <span class="sidebar-item__icon bicon-book"></span>\n' +
    '              <span class="sidebar-item__title">API reference</span>\n' +
    '            </a>\n' +
    '            <!-- <a class="sidebar-item" href="#" onClick="showSubMenu(\'OTAcodes\')" id="main_OTAcodes">\n' +
    '              <span class="sidebar-item__icon bicon-alert"></span>OTA codes\n' +
    '            </a> -->\n' +
    '            <!--\n' +
    '            <a class="sidebar-item" href="#" onClick="showSubMenu(\'Glossary\')" id="main_glossary">\n' +
    '              <span class="sidebar-item__icon bicon-book"></span>Glossary\n' +
    '            </a>\n' +
    '            -->\n' +
    '            <!--\n' +
    '\n' +
    '            <a class="sidebar-item" href="#" onClick="showSubMenu(\'Help\')" id="main_Help">\n' +
    '              <span class="sidebar-item__icon bicon-questionmark"></span>Help\n' +
    '            </a>\n' +
    '            -->\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="secondary-sidebar" style="overflow: auto;">\n' +
    '          <div class="secondary-sidebar-inner commercial">\n' +
    '            <div class="secondary-sidebar__header" id="subMenuTitle">Home</div>\n' +
    '              \n' +
    '                  <div id="Home" style="display: none;">\n' +
    '                  \n' +
    '\n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href=".." >About the Connectivity APIs</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../authentication/" >Authentication</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../curl_request/" >Curl Requests</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../glossary_of_terms/" >Glossary</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    <div class="secondary-sidebar__header">Getting started</div>\n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tut-ready-to-check/" >Tutorial: Create a test property</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tut-ready-to-check/step-0/" >Prologue – Hello, World!</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tut-ready-to-check/step-1/" >Step 1 – Create property</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tut-ready-to-check/step-2/" >Step 2 – Retrieve property details</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tut-ready-to-check/step-3/" >Step 3 – Create room type</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tut-ready-to-check/step-4/" >Step 4 – Create rate plan</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tut-ready-to-check/step-5/" >Step 5 – Create product</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tut-ready-to-check/step-6/" >Step 6 – Push availability</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tut-ready-to-check/step-7/" >Step 7 – Checks</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tut-ready-to-check/epilogue/" >Epilogue – Whats next?</a>\n' +
    '                        \n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                  \n' +
    '                  </div>\n' +
    '              \n' +
    '                  <div id="Content" style="display: none;">\n' +
    '                  \n' +
    '\n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../content/" >Content API overview</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../property-statuses/" >Property statuses</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../licence-requirements/" >Licence requirements per region</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../supportingcalls/" >Supporting calls</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    <div class="secondary-sidebar__header">Managing rooms & rates</div>\n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../managing-rooms-and-rates/" >Section overview</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-create-room/" >Create room</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-create-multi-bedroom-setup/" >Create multi-bedroom setup</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-modify-room-amenities/" >Modify room amenities</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-modify-room-photos/" >Modify room photos</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-deactivate-room/" >Deactivate room</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-activate-room/" >Activate room</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-create-rate/" >Create rate</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-rename-rate/" >Rename rate</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-deactivate-rate/" >Deactivate rate</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-activate-rate/" >Activate rate</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-create-product/" >Create product</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-modify-product/" >Modify product</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-delete-product/" >Delete product</a>\n' +
    '                        \n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    <div class="secondary-sidebar__header">Managing properties</div>\n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../managing-properties/" >Section overview</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-create-property/" >Create property</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-create-independent-property/" >Create independent property</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-modify-property-contact-info/" >Modify property contact details</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-modify-property-photos/" >Modify property photos</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-modify-property-facilities/" >Modify property facilities</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-modify-property-policies/" >Modify property policies</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-modify-special-bed-options/" >Modify property special bed options</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-check-property/" >Check property content</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-open-property/" >Open property</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-close-property/" >Close property</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-retrieve-property/" >Retrieve property details</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-retrieve-property-status/" >Retrieve property status</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../license_helper/" >Retrieve regional licence requirements</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../get-house-rules/" >Retrieve house rules</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../set-house-rules/" >Set house rules</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../tsk-specify-meal-plans/" >Specify property mealplans</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../property-profile-api/" >Property Profile API</a>\n' +
    '                        \n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    <div class="secondary-sidebar__header">API endpoints</div>\n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../ota-hoteldescriptivecontentnotif/" >/ota/OTA_HotelDescriptiveContentNotif</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../ota-hoteldescriptiveinfo/" >/ota/OTA_HotelDescriptiveInfo</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../ota-hotelinvnotif/" >/ota/OTA_HotelInvNotif</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../ota-hotelproductnotif/" >/ota/OTA_HotelProductNotif</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../ota-hotelrateplannotif/" >/ota/OTA_HotelRatePlanNotif</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../ota-hotelsearch/" >/ota/OTA_HotelSearch</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../ota-hotelsummarynotif/" >/ota/OTA_HotelSummaryNotif</a>\n' +
    '                        \n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                  \n' +
    '                  </div>\n' +
    '              \n' +
    '                  <div id="PhotoAPI" style="display: none;">\n' +
    '                  \n' +
    '\n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../photo-api/" >Photo API overview</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../photo-api/upload-photos/" >Upload photos</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../photo-api/retrieve-photos/" >Retrieve photos</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../photo-api/retrieve-modify-galleries/" >Retrieve/modify galleries</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../photo-api/photo-API-self-assessment-tutorial/" >Self-assessment tutorial</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                  \n' +
    '                  </div>\n' +
    '              \n' +
    '                  <div id="Rates" style="display: none;">\n' +
    '                  \n' +
    '\n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../ari/" >Rates & Availability API overview</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../pricing-models/" >Pricing models</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    <div class="secondary-sidebar__header">B.XML endpoints</div>\n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../b_xml-availability/" >Create/update inventory, rates, restrictions</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../b_xml-derivedprices/" >Create/update rates (Derived pricing)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../b_xml-derivedprices-self-assessment-tutorial/" >Self-assessment tutorial (Derived pricing)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    <div class="secondary-sidebar__header">OTA endpoints</div>\n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../ota-hotelavailnotif/" >Create/update inventory, restrictions</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../ota-rateamountnotif/" >Create/update rates</a>\n' +
    '                        \n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    <div class="secondary-sidebar__header">CSV endpoints</div>\n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../csv-los_pricing/" >Create/update rates (LOS pricing)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                  \n' +
    '                  </div>\n' +
    '              \n' +
    '                  <div id="Reservations" style="display: none;">\n' +
    '                  \n' +
    '\n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../res/" >Reservations API overview</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../reservations_services_addons/" >Reservations API Services/Addons</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    <div class="secondary-sidebar__header">B.XML endpoints</div>\n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../b_xml-reservations/" >Retrieve new/modified/cancelled reservations</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../b_xml-reservationssummary/" >Retrieve reservations summary</a>\n' +
    '                        \n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    <div class="secondary-sidebar__header">OTA endpoints</div>\n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../ota-resnotif/" >Retrieve/confirm new reservations</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../ota-resmodifynotif/" >Retrieve confirm modified/cancelled reservations</a>\n' +
    '                        \n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                  \n' +
    '                  </div>\n' +
    '              \n' +
    '                  <div id="Promotions" style="display: none;">\n' +
    '                  \n' +
    '\n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../promotions/" >Promotions API overview</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-promotions/" >Create/update a promotion</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-getpromotions/" >Retrieve promotion details</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../promotions-API-self-assessment-tutorial/" >Self-assessment tutorial</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../con-faq-promotions/" >FAQ</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                  \n' +
    '                  </div>\n' +
    '              \n' +
    '                  <div id="MessagingAPI" style="display: none;">\n' +
    '                  \n' +
    '\n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../messaging-api/" >Messaging API overview</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../messaging-api/reply-options/" >Reply options</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    <div class="secondary-sidebar__header">Sample requests</div>\n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../messaging-api/json-messaging-auth/" >Retrieve authorisation tokens</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../messaging-api/tsk-get-pending-threads/" >Get pending threads</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../messaging-api/tsk-get-threads/" >Get threads</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../messaging-api/tsk-get-messages/" >Get messages</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../messaging-api/tsk-send-message/" >Send message</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../messaging-api/tsk-mark-as-read/" >Mark message as read</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../messaging-api/tsk-mark-as-no-reply-needed/" >Mark message as no reply needed</a>\n' +
    '                        \n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                  \n' +
    '                  </div>\n' +
    '              \n' +
    '                  <div id="ReviewAPI" style="display: none;">\n' +
    '                  \n' +
    '\n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../review-api/" >Guest Review API overview</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    <div class="secondary-sidebar__header">Sample requests</div>\n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../review-api/retrieve-reviews/" >Retrieve reviews</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../review-api/reply-to-review/" >Reply to a review</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../review-api/retrieve-scores/" >Retrieve property scores</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../review-api/review-api-self-assessment-tutorial/" >Self-assessment tutorial</a>\n' +
    '                        \n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                  \n' +
    '                  </div>\n' +
    '              \n' +
    '                  <div id="ReviewIframe" style="display: none;">\n' +
    '                  \n' +
    '\n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../review-api/access-reviews-iframe/" >Access reviews iframe</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                  \n' +
    '                  </div>\n' +
    '              \n' +
    '                  <div id="OpportunityAPI" style="display: none;">\n' +
    '                  \n' +
    '\n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../opportunity-api/" >Opportunity API overview</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    <div class="secondary-sidebar__header">Sample requests</div>\n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../opportunity-api/retrieve-opportunities/" >Retrieve opportunities</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../opportunity-api/action-opportunities/" >Implement/dismiss opportunities</a>\n' +
    '                        \n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                  \n' +
    '                  </div>\n' +
    '              \n' +
    '                  <div id="Services" style="display: none;">\n' +
    '                  \n' +
    '\n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../sysinfo/" >Overview</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-codegroups/" >Code Groups (Added 2017-08-08)</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-countries/" >Country Codes/Names</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-countrycurrencies/" >Country Codes/Currency Codes</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-creditcards/" >Credit Card Names/OTA codes</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-currencies/" >Currency Codes/Names</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-getlegalentities/" >Get Legal Entities</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-getcommissionoverride/" >Get Property Commission</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-rates/" >Rate IDs/Names</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-reporting/" >Reporting</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-roomname/" >Room Names</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-citytaxcategory/" >City Tax Categories</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-rooms/" >Room IDs/Names</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-roomrateavailability/" >Room Rate Availability</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../b_xml-roomrates/" >Room/Rate IDs/Names/Policies</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                  \n' +
    '                  </div>\n' +
    '              \n' +
    '                  <div id="APIReference" style="display: none;">\n' +
    '                  \n' +
    '\n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                      <a class="secondary-sidebar-item " href="../api-reference/" >Overview</a>\n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    <div class="secondary-sidebar__header">Booking.com codes</div>\n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-bcbt/" >BCBT (Breakfast Type)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-bccp/" >BCCP (Cancellation Policies)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-bcio/" >BCIO (Check-In/Out Times)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-bcjt/" >BCJT (Job Titles)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-bcl/" >BCL  (Language)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-bcpt/" >BCPT (Payment Type)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-bcrt/" >BCRT (Room Type)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    <div class="secondary-sidebar__header">OTA codes</div>\n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-acc/" >ACC (Attraction Category Code)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-chg/" >CHG (Charge Type)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-cui/" >CUI (Main Cuisine Code)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-err/" >ERR (Error Codes)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-ftt/" >FTT (Fee Tax Type)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-hac/" >HAC (Hotel Amenity)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-itt/" >ITT (Image Tag Type)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-mpt/" >MPT (Meal Plan Type)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-otc/" >OTC (Option Type)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-pct/" >PCT (Property Class Type)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-ptt/" >PTT (Phone Technology Type)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item current" href="./" >RMA (Room Amenity Type)</a>\n' +
    '                        \n' +
    '                          <div>\n' +
    '                            \n' +
    '                              \n' +
    '                                <a class="tertiary-sidebar-item" href="#ota-amenities">OTA amenities</a>\n' +
    '                               \n' +
    '                                <a class="tertiary-sidebar-item" href="#ota-bed-types">OTA bed types</a>\n' +
    '                               \n' +
    '                                <a class="tertiary-sidebar-item" href="#bookingcom-extended-amenities">Booking.com extended amenities</a>\n' +
    '                               \n' +
    '                            \n' +
    '                          </div>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-trp/" >TRP (Transportation Code)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../codes-uit/" >UIT (Unique ID Type)</a>\n' +
    '                        \n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                    <div class="secondary-sidebar__header">OTA objects</div>\n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/AcceptedPayment/" >AcceptedPayment</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/AcceptedPayments/" >AcceptedPayments</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/AdditionalDetail/" >AdditionalDetail</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/AdditionalDetails/" >AdditionalDetails</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Address/" >Address</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Addresses/" >Addresses</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/AffiliationInfo/" >AffiliationInfo</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Ambiance/" >Ambiance</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Ambiances/" >Ambiances</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Amenities/" >Amenities</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Amenity/" >Amenity</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/AreaInfo/" >AreaInfo</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Attraction/" >Attraction</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Attractions/" >Attractions</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Award/" >Award</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Awards/" >Awards</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/BasicPropertyInfo/" >BasicPropertyInfo</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/BookingRule/" >BookingRule</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/BookingRules/" >BookingRules</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/CancelPenalty/" >CancelPenalty</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/CancelPolicy/" >CancelPolicy</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/CategoryCodes/" >CategoryCodes</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Charge/" >Charge</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Comment/" >Comment</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Comments/" >Comments</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Commission/" >Commission</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/CommissionPayableAmount/" >CommissionPayableAmount</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/CompanyName/" >CompanyName</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Condition/" >Condition</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Conditions/" >Conditions</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ContactInfo/" >ContactInfo</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ContactInfos/" >ContactInfos</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Criteria/" >Criteria</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Criterion/" >Criterion</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/CuisineCode/" >CuisineCode</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/CuisineCodes/" >CuisineCodes</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Customer/" >Customer</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Departure/" >Departure</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Description/" >Description</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Descriptions/" >Descriptions</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/DescriptiveText/" >DescriptiveText</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/DetailDescription/" >DetailDescription</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/DietaryOption/" >DietaryOption</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/DietaryOptions/" >DietaryOptions</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Email/" >Email</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Emails/" >Emails</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Error/" >Error</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Errors/" >Errors</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/FacilityInfo/" >FacilityInfo</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Feature/" >Feature</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Features/" >Features</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Fee/" >Fee</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/FeePolicies/" >FeePolicies</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/FeePolicy/" >FeePolicy</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Fees/" >Fees</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Guarantee/" >Guarantee</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/GuaranteeAccepted/" >GuaranteeAccepted</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/GuaranteePayment/" >GuaranteePayment</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/GuaranteePaymentPolicy/" >GuaranteePaymentPolicy</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/GuaranteesAccepted/" >GuaranteesAccepted</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/GuestCount/" >GuestCount</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/GuestCounts/" >GuestCounts</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/GuestInformation/" >GuestInformation</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/GuestRoom/" >GuestRoom</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/GuestRoomInfo/" >GuestRoomInfo</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/GuestRooms/" >GuestRooms</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelCategory/" >HotelCategory</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelCrossRef/" >HotelCrossRef</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelCrossRefs/" >HotelCrossRefs</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelDescriptiveContent/" >HotelDescriptiveContent</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelDescriptiveContents/" >HotelDescriptiveContents</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelDescriptiveInfo/" >HotelDescriptiveInfo</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelDescriptiveInfos/" >HotelDescriptiveInfos</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelInfo/" >HotelInfo</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelProduct/" >HotelProduct</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelProducts/" >HotelProducts</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelRef/" >HotelRef</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelResModifies/" >HotelResModifies</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelResModify/" >HotelResModify</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelReservation/" >HotelReservation</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelReservationID/" >HotelReservationID</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelReservationIDs/" >HotelReservationIDs</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelReservations/" >HotelReservations</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelSummaryMessage/" >HotelSummaryMessage</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelSummaryMessages/" >HotelSummaryMessages</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/HotelierMessage/" >HotelierMessage</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ImageFormat/" >ImageFormat</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ImageItem/" >ImageItem</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ImageItems/" >ImageItems</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ImageTag/" >ImageTag</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ImageTags/" >ImageTags</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/InternetFeePolicy/" >InternetFeePolicy</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/InventoryCrossRef/" >InventoryCrossRef</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/InventoryCrossRefs/" >InventoryCrossRefs</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/InvoiceDetails/" >InvoiceDetails</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/JourneyTime/" >JourneyTime</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Junction/" >Junction</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Language/" >Language</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Languages/" >Languages</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Leg/" >Leg</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/LicenseInfo/" >LicenseInfo</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/LicenseInfos/" >LicenseInfos</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Line/" >Line</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/MealPlan/" >MealPlan</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Motorway/" >Motorway</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/MultimediaDescription/" >MultimediaDescription</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/MultimediaDescriptions/" >MultimediaDescriptions</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Name/" >Name</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Names/" >Names</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/NoShowPolicy/" >NoShowPolicy</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelDescriptiveContentNotifRQ/" >OTA_HotelDescriptiveContentNotifRQ</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelDescriptiveContentNotifRS/" >OTA_HotelDescriptiveContentNotifRS</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelDescriptiveInfoRQ/" >OTA_HotelDescriptiveInfoRQ</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelDescriptiveInfoRS/" >OTA_HotelDescriptiveInfoRS</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelInvNotifRQ/" >OTA_HotelInvNotifRQ</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelInvNotifRS/" >OTA_HotelInvNotifRS</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelProductNotifRQ/" >OTA_HotelProductNotifRQ</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelProductNotifRS/" >OTA_HotelProductNotifRS</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelRatePlanNotifRQ/" >OTA_HotelRatePlanNotifRQ</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelRatePlanNotifRS/" >OTA_HotelRatePlanNotifRS</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelResModifyNotifRQ/" >OTA_HotelResModifyNotifRQ</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelResModifyNotifRS/" >OTA_HotelResModifyNotifRS</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelResNotifRQ/" >OTA_HotelResNotifRQ</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelResNotifRS/" >OTA_HotelResNotifRS</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelSearchRQ/" >OTA_HotelSearchRQ</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelSearchRS/" >OTA_HotelSearchRS</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelSummaryNotifRQ/" >OTA_HotelSummaryNotifRQ</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OTA_HotelSummaryNotifRS/" >OTA_HotelSummaryNotifRS</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Occupancy/" >Occupancy</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OperationSchedule/" >OperationSchedule</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OperationSchedules/" >OperationSchedules</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OperationTime/" >OperationTime</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OperationTimes/" >OperationTimes</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Option/" >Option</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Options/" >Options</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OwnershipManagementInfo/" >OwnershipManagementInfo</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/OwnershipManagementInfos/" >OwnershipManagementInfos</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ParkingFeePolicy/" >ParkingFeePolicy</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/PaymentCard/" >PaymentCard</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/PersonName/" >PersonName</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/PetsPolicies/" >PetsPolicies</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/PetsPolicy/" >PetsPolicy</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Phone/" >Phone</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Phones/" >Phones</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Policies/" >Policies</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Policy/" >Policy</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/PolicyInfo/" >PolicyInfo</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Position/" >Position</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/PrepaymentPolicy/" >PrepaymentPolicy</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Price/" >Price</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/PricingType/" >PricingType</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Profile/" >Profile</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ProfileInfo/" >ProfileInfo</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Profiles/" >Profiles</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Properties/" >Properties</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Property/" >Property</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/PropertyManagedBy/" >PropertyManagedBy</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/PropertyTaxInfo/" >PropertyTaxInfo</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Rate/" >Rate</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/RatePlan/" >RatePlan</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/RatePlanCrossRef/" >RatePlanCrossRef</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/RatePlans/" >RatePlans</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Rates/" >Rates</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/RelativePosition/" >RelativePosition</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/RelativePositions/" >RelativePositions</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ResGlobalInfo/" >ResGlobalInfo</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ResGuest/" >ResGuest</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ResGuestRPH/" >ResGuestRPH</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ResGuestRPHs/" >ResGuestRPHs</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ResGuests/" >ResGuests</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Restaurant/" >Restaurant</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Restaurants/" >Restaurants</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Room/" >Room</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/RoomDescription/" >RoomDescription</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/RoomRate/" >RoomRate</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/RoomRates/" >RoomRates</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/RoomStay/" >RoomStay</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/RoomStays/" >RoomStays</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/RoomType/" >RoomType</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/RoomTypes/" >RoomTypes</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Route/" >Route</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/SellableProduct/" >SellableProduct</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/SellableProducts/" >SellableProducts</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/SellMealsThroughBooking/" >SellMealsThroughBooking</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Service/" >Service</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ServiceDetails/" >ServiceDetails</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ServiceRPH/" >ServiceRPH</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ServiceRPHs/" >ServiceRPHs</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Services/" >Services</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/SpecialRequest/" >SpecialRequest</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/SpecialRequests/" >SpecialRequests</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/StandardPhrase/" >StandardPhrase</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/StandardPhrases/" >StandardPhrases</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Start/" >Start</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/SubRoom/" >SubRoom</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/SubRooms/" >SubRooms</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/TPA_Extensions/" >TPA_Extensions</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/TaxPolicies/" >TaxPolicies</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/TaxPolicy/" >TaxPolicy</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Telephone/" >Telephone</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Text/" >Text</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/TextItem/" >TextItem</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/TextItems/" >TextItems</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/TimeSpan/" >TimeSpan</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Total/" >Total</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/TransportType/" >TransportType</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Transportation/" >Transportation</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Transportations/" >Transportations</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Type/" >Type</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/TypeOfResidence/" >TypeOfResidence</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Types/" >Types</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/UniqueID/" >UniqueID</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/ValueAddInclusions/" >ValueAddInclusions</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Warning/" >Warning</a>\n' +
    '                        \n' +
    '                      \n' +
    '                        <a class="secondary-sidebar-item " href="../api-reference/Warnings/" >Warnings</a>\n' +
    '                        \n' +
    '                      \n' +
    '                    \n' +
    '                    \n' +
    '                    \n' +
    '                  \n' +
    '                  </div>\n' +
    '              \n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="content" id="_page">\n' +
    '          <div class="content-inner">\n' +
    '            <!--<div class="js-feedback">\n' +
    '    <div class="b-card js-feedback-card">\n' +
    '\t\t<div class="text-featured">Is this page helpful?&nbsp;&nbsp;&nbsp;\n' +
    '          <a target="_blank" href="#" class="js-feedback-card__action" data-track-ga="Page Vote, Yes, RMA (Room Amenity Type)">Yes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;\n' +
    '          <a target="_blank" href="#" class="js-feedback-card__action" data-track-ga="Page Vote, No, RMA (Room Amenity Type)">No</a>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="b-card js-feedback-response" style="display: none;">\n' +
    '\t\t<div class="text-featured"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="24" height="24"><title>act_review_great</title><g id="_8x" data-name="8x"><path id="act_review_great" d="M64,8a56,56,0,1,0,56,56A56,56,0,0,0,64,8Zm0,104a48,48,0,1,1,48-48A48.05,48.05,0,0,1,64,112ZM44,64a8,8,0,1,1,8-8A8,8,0,0,1,44,64Zm48-8a8,8,0,1,1-8-8A8,8,0,0,1,92,56ZM87.22,77.62a4,4,0,0,1,.61,3.55C86.14,86.65,79,97,64,97c-9.71,0-15.66-4.23-18.94-7.79a22.68,22.68,0,0,1-4.88-8A4,4,0,0,1,44,76H84A4,4,0,0,1,87.22,77.62Z"/></g></svg>\n' +
    '\t\tThanks for your feedback!\n' +
    '\t\t</div>\n' +
    '    </div>\n' +
    '  </div> -->\n' +
    '\n' +
    '\n' +
    '            <h1 id="rma-room-amenity-type-codes-ota-2014b-implemented">(RMA) Room Amenity Type Codes (OTA 2014B) — Implemented<a class="headerlink" href="#rma-room-amenity-type-codes-ota-2014b-implemented" title="Permanent link">&para;</a></h1>\n' +
    '<p>Used in:</p>\n' +
    '<ul>\n' +
    '<li><a href="../ota-hotelinvnotif/">/ota/OTA_HotelInvNotif</a> call</li>\n' +
    '<li><a href="../api-reference/Amenity/">Amenity</a> object</li>\n' +
    '</ul>\n' +
    '<h2 id="ota-amenities">OTA amenities<a class="headerlink" href="#ota-amenities" title="Permanent link">&para;</a></h2>\n' +
    '<table>\n' +
    '<thead>\n' +
    '<tr>\n' +
    '<th>Code</th>\n' +
    '<th>Description</th>\n' +
    '<th>Type</th>\n' +
    '</tr>\n' +
    '</thead>\n' +
    '<tbody>\n' +
    '<tr>\n' +
    '<td>2</td>\n' +
    '<td>Air conditioning</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>3</td>\n' +
    '<td>Alarm clock</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5</td>\n' +
    '<td>AM/FM radio</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>8</td>\n' +
    '<td>Barbeque grills</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>9</td>\n' +
    '<td>Bath tub with spray jets</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>10</td>\n' +
    '<td>Bathrobe</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>11</td>\n' +
    '<td>Bathroom amenities (free toiletries)</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>13</td>\n' +
    '<td>Bathtub</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>14</td>\n' +
    '<td>Bathtub only</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>15</td>\n' +
    '<td>Bath or Shower</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>16</td>\n' +
    '<td>Bidet</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>18</td>\n' +
    '<td>Cable television</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>19</td>\n' +
    '<td>Coffee/Tea maker</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>20</td>\n' +
    '<td>Color television</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>21</td>\n' +
    '<td>Computer</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>22</td>\n' +
    '<td>Connecting rooms</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>25</td>\n' +
    '<td>Cordless phone</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>28</td>\n' +
    '<td>Desk</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>29</td>\n' +
    '<td>Desk with lamp</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>32</td>\n' +
    '<td>Dishwasher</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>38</td>\n' +
    '<td>Fax machine</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>41</td>\n' +
    '<td>Fireplace</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>46</td>\n' +
    '<td>Free movies/video</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>47</td>\n' +
    '<td>Full kitchen</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>49</td>\n' +
    '<td>Grecian tub</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>50</td>\n' +
    '<td>Hairdryer</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>54</td>\n' +
    '<td>Internet access</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>55</td>\n' +
    '<td>Iron (ironing facilities)</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>56</td>\n' +
    '<td>Ironing board</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>57</td>\n' +
    '<td>Whirpool</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>59</td>\n' +
    '<td>Kitchen</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>60</td>\n' +
    '<td>Kitchen supplies</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>61</td>\n' +
    '<td>Kitchenette</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>63</td>\n' +
    '<td>Laptop</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>64</td>\n' +
    '<td>Large desk</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>68</td>\n' +
    '<td>Microwave</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>69</td>\n' +
    '<td>Minibar</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>72</td>\n' +
    '<td>Multi-line phone</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>77</td>\n' +
    '<td>Oven</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>78</td>\n' +
    '<td>Pay per view movies on TV</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>80</td>\n' +
    '<td>Phone in bathroom</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>81</td>\n' +
    '<td>Plates and bowls</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>85</td>\n' +
    '<td>Private bathroom</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>88</td>\n' +
    '<td>Refrigerator</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>89</td>\n' +
    '<td>Refrigerator with ice maker</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>92</td>\n' +
    '<td>Safe</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>94</td>\n' +
    '<td>Separate closet</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>97</td>\n' +
    '<td>Shower only</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>98</td>\n' +
    '<td>Silverware/utensils</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>99</td>\n' +
    '<td>Sitting area</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>103</td>\n' +
    '<td>Speaker phone</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>105</td>\n' +
    '<td>Stove</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>108</td>\n' +
    '<td>Telephone for hearing impaired</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>115</td>\n' +
    '<td>VCR movies</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>117</td>\n' +
    '<td>Video games</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>119</td>\n' +
    '<td>Wake-up calls</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>123</td>\n' +
    '<td>Wireless internet connection</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>126</td>\n' +
    '<td>Air conditioning individually controlled in room</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>127</td>\n' +
    '<td>Bathtub &amp;whirlpool separate</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>129</td>\n' +
    '<td>CD  player</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>133</td>\n' +
    '<td>Desk with electrical outlet</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>138</td>\n' +
    '<td>Marble bathroom</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>139</td>\n' +
    '<td>List of movie channels available</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>141</td>\n' +
    '<td>Oversized bathtub</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>142</td>\n' +
    '<td>Shower</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>144</td>\n' +
    '<td>Soundproofed room</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>146</td>\n' +
    '<td>Tables and chairs</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>147</td>\n' +
    '<td>Two-line phone</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>149</td>\n' +
    '<td>Washer/dryer</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>155</td>\n' +
    '<td>Separate tub and shower</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>157</td>\n' +
    '<td>Ceiling fan</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>158</td>\n' +
    '<td>CNN available</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>162</td>\n' +
    '<td>Closets in room</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>163</td>\n' +
    '<td>DVD player</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>164</td>\n' +
    '<td>Mini-refrigerator</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>166</td>\n' +
    '<td>Self-controlled heating/cooling system</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>167</td>\n' +
    '<td>Toaster</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>193</td>\n' +
    '<td>Shared bathroom</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>194</td>\n' +
    '<td>Telephone TDD/Textphone</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>210</td>\n' +
    '<td>Satellite television</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>214</td>\n' +
    '<td>iPod docking station</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>217</td>\n' +
    '<td>Satellite radio</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>218</td>\n' +
    '<td>Video on demand</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>220</td>\n' +
    '<td>Gulf view</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>223</td>\n' +
    '<td>Mountain view</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>224</td>\n' +
    '<td>Ocean view</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>228</td>\n' +
    '<td>Slippers</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>230</td>\n' +
    '<td>Chair provided with desk</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>234</td>\n' +
    '<td>Luxury linen type</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>245</td>\n' +
    '<td>Private pool</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>246</td>\n' +
    '<td>High Definition (HD) Flat Panel Television  - 32 inches or greater</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>251</td>\n' +
    '<td>TV</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>254</td>\n' +
    '<td>Video game player:</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>256</td>\n' +
    '<td>Dining room seats</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>258</td>\n' +
    '<td>Mobile/cellular phones</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>259</td>\n' +
    '<td>Movies</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>260</td>\n' +
    '<td>Multiple closets</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>262</td>\n' +
    '<td>Safe large enough to accommodate a laptop</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>265</td>\n' +
    '<td>Bluray player</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>268</td>\n' +
    '<td>Non-allergenic room</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>270</td>\n' +
    '<td>Seating area with sofa/chair</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>271</td>\n' +
    '<td>Separate toilet area</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>273</td>\n' +
    '<td>Widescreen TV</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>276</td>\n' +
    '<td>Separate tub or shower</td>\n' +
    '<td>boolean</td>\n' +
    '</tr>\n' +
    '</tbody>\n' +
    '</table>\n' +
    '<h2 id="ota-bed-types">OTA bed types<a class="headerlink" href="#ota-bed-types" title="Permanent link">&para;</a></h2>\n' +
    '<table>\n' +
    '<thead>\n' +
    '<tr>\n' +
    '<th>Code Value</th>\n' +
    '<th>Booking.com type</th>\n' +
    '<th>Booking.com description</th>\n' +
    '</tr>\n' +
    '</thead>\n' +
    '<tbody>\n' +
    '<tr>\n' +
    '<td>33</td>\n' +
    '<td>Double (Bed)</td>\n' +
    '<td>\'131-150 cm (52-59 inches) wide\'</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>200</td>\n' +
    '<td>Futon Mat</td>\n' +
    '<td>\'Variable\'</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>58</td>\n' +
    '<td>Extra large Double</td>\n' +
    '<td>\'181-210 cm (71-82 inches) wide\'</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>86</td>\n' +
    '<td>Large Double</td>\n' +
    '<td>\'151-180 cm (60-70 inches) wide\'</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>102</td>\n' +
    '<td>Sofa Bed</td>\n' +
    '<td>\'Variable\'</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>113</td>\n' +
    '<td>Twin (bed)*</td>\n' +
    '<td>\'90-130 cm (35-51 inches) wide\'</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>203</td>\n' +
    '<td>Single (bed)</td>\n' +
    '<td>\'90-130 cm (35-51 inches) wide\'</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>4001</td>\n' +
    '<td>Bunk bed</td>\n' +
    '<td>\'Variable\'</td>\n' +
    '</tr>\n' +
    '</tbody>\n' +
    '</table>\n' +
    '<p>* Please load one twin bed per person.</p>\n' +
    '<h2 id="bookingcom-extended-amenities">Booking.com extended amenities<a class="headerlink" href="#bookingcom-extended-amenities" title="Permanent link">&para;</a></h2>\n' +
    '<table>\n' +
    '<thead>\n' +
    '<tr>\n' +
    '<th>Code</th>\n' +
    '<th>Description</th>\n' +
    '<th>Type</th>\n' +
    '<th>Date</th>\n' +
    '</tr>\n' +
    '</thead>\n' +
    '<tbody>\n' +
    '<tr>\n' +
    '<td>5001</td>\n' +
    '<td>Coffee/Tea maker</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5002</td>\n' +
    '<td>Internet facilities</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5003</td>\n' +
    '<td>Mini-bar</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5004</td>\n' +
    '<td>Shower</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5005</td>\n' +
    '<td>Bath</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5006</td>\n' +
    '<td>Safe Deposit Box</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5007</td>\n' +
    '<td>Pay-per-view Channels</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5008</td>\n' +
    '<td>TV</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5009</td>\n' +
    '<td>Telephone</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5010</td>\n' +
    '<td>Fax</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5011</td>\n' +
    '<td>Airconditioning</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5012</td>\n' +
    '<td>Hair Dryer</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5013</td>\n' +
    '<td>Wake Up Service/Alarm-clock</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5014</td>\n' +
    '<td>Hot Tub</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5015</td>\n' +
    '<td>Clothing Iron</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5016</td>\n' +
    '<td>Kitchenette</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5017</td>\n' +
    '<td>Balcony</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5018</td>\n' +
    '<td>Trouser Press</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5019</td>\n' +
    '<td>Bath-robe</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5020</td>\n' +
    '<td>Spa Bath</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5021</td>\n' +
    '<td>Radio</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5022</td>\n' +
    '<td>Refrigerator</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5023</td>\n' +
    '<td>Desk</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5024</td>\n' +
    '<td>Shared Bathroom</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5025</td>\n' +
    '<td>Ironing facilities</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5026</td>\n' +
    '<td>Seating area</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5027</td>\n' +
    '<td>Free Toiletries</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5028</td>\n' +
    '<td>DVD-Player</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5029</td>\n' +
    '<td>CD-Player</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5030</td>\n' +
    '<td>Fan</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5031</td>\n' +
    '<td>Toilet</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5032</td>\n' +
    '<td>Microwave</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5033</td>\n' +
    '<td>Dishwasher</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5034</td>\n' +
    '<td>Washing machine</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5035</td>\n' +
    '<td>Video</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5036</td>\n' +
    '<td>Video Games</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5037</td>\n' +
    '<td>Patio</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5038</td>\n' +
    '<td>Bathroom</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5039</td>\n' +
    '<td>Extra long beds (&gt; 2 meter)</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5040</td>\n' +
    '<td>Heating</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5041</td>\n' +
    '<td>Dressing room</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5042</td>\n' +
    '<td>Guest toilet</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5043</td>\n' +
    '<td>Slippers</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5044</td>\n' +
    '<td>Satellite Channels</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5045</td>\n' +
    '<td>Kitchen</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5046</td>\n' +
    '<td>Wireless internet</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5068</td>\n' +
    '<td>Cable channels</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5069</td>\n' +
    '<td>Bath or Shower</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5070</td>\n' +
    '<td>Carpeted Floor</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5071</td>\n' +
    '<td>Fireplace</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5072</td>\n' +
    '<td>Additional Toilet</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5073</td>\n' +
    '<td>Interconnecting Room(s) available</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5074</td>\n' +
    '<td>Laptop Safe Box</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5075</td>\n' +
    '<td>Flat-screen TV</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5076</td>\n' +
    '<td>Private Entrance</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5077</td>\n' +
    '<td>Sofa</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5079</td>\n' +
    '<td>Soundproofing</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5080</td>\n' +
    '<td>Tiled / Marble floor</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5081</td>\n' +
    '<td>View</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5082</td>\n' +
    '<td>Wooden / Parquet floor</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5083</td>\n' +
    '<td>Wake Up Service</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5084</td>\n' +
    '<td>Alarm Clock</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5085</td>\n' +
    '<td>Dining Area</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5086</td>\n' +
    '<td>Electric Kettle</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5087</td>\n' +
    '<td>Executive Lounge Access</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5088</td>\n' +
    '<td>iPod Docking Station</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5089</td>\n' +
    '<td>Kitchenware</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5090</td>\n' +
    '<td>Mosquito Net</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5091</td>\n' +
    '<td>Towels/Linens at surcharge</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5092</td>\n' +
    '<td>Sauna</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5093</td>\n' +
    '<td>Private Pool</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5094</td>\n' +
    '<td>Tumble dryer (machine)</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5095</td>\n' +
    '<td>Wardrobe/Closet</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5096</td>\n' +
    '<td>Oven</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5097</td>\n' +
    '<td>Stove</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5098</td>\n' +
    '<td>Toaster</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5099</td>\n' +
    '<td>Barbecue</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5100</td>\n' +
    '<td>Bidet</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5101</td>\n' +
    '<td>Computer</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5102</td>\n' +
    '<td>iPad</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5103</td>\n' +
    '<td>Game Console</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5104</td>\n' +
    '<td>Game Console - Xbox 360</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5105</td>\n' +
    '<td>Game Console - PS2</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5106</td>\n' +
    '<td>Game Console - PS3</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5107</td>\n' +
    '<td>Game Console - Nintendo Wii</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5108</td>\n' +
    '<td>Sea View</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5109</td>\n' +
    '<td>Lake View</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5110</td>\n' +
    '<td>Garden View</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5111</td>\n' +
    '<td>Pool View</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5112</td>\n' +
    '<td>Mountain View</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5113</td>\n' +
    '<td>Landmark View</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5114</td>\n' +
    '<td>Laptop</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5115</td>\n' +
    '<td>Allergy-Free</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5116</td>\n' +
    '<td>Cleaning products</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5117</td>\n' +
    '<td>Electric blankets</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5118</td>\n' +
    '<td>Additional Bathroom</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5119</td>\n' +
    '<td>Blu-ray player</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5120</td>\n' +
    '<td>Coffee Machine</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5121</td>\n' +
    '<td>City View</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5122</td>\n' +
    '<td>River View</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5123</td>\n' +
    '<td>Terrace</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5124</td>\n' +
    '<td>Towels</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5125</td>\n' +
    '<td>Linen</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5126</td>\n' +
    '<td>Dining table</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5127</td>\n' +
    '<td>Children highchair</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5129</td>\n' +
    '<td>Outdoor furniture</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5130</td>\n' +
    '<td>Outdoor dining area</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5131</td>\n' +
    '<td>Entire property on ground floor</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5132</td>\n' +
    '<td>Upper floor reachable by lift</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5133</td>\n' +
    '<td>Upper floor reachable by stairs only</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5134</td>\n' +
    '<td>Entire unit wheelchair accessible</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5135</td>\n' +
    '<td>Detached</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5136</td>\n' +
    '<td>Semi-detached</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5137</td>\n' +
    '<td>Private flat in block of flats</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5138</td>\n' +
    '<td>Clothes Rack</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5139</td>\n' +
    '<td>Rollaway bed</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5140</td>\n' +
    '<td>Clothes drying rack</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5141</td>\n' +
    '<td>Toilet paper</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5142</td>\n' +
    '<td>Child safety socket covers</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5143</td>\n' +
    '<td>Board games/puzzles</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5144</td>\n' +
    '<td>Book/DVD/Music library for children</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5145</td>\n' +
    '<td>Baby safety gates</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5146</td>\n' +
    '<td>Sofa bed</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2016-01-01</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5147</td>\n' +
    '<td>toilet with grab rails</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5148</td>\n' +
    '<td>adapted bath</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5149</td>\n' +
    '<td>roll in shower</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5150</td>\n' +
    '<td>walk in shower</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5151</td>\n' +
    '<td>higher level toilet</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5152</td>\n' +
    '<td>low bathroom sink</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5153</td>\n' +
    '<td>bathroom emergency pull cord</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5154</td>\n' +
    '<td>shower chair</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5157</td>\n' +
    '<td>rooftop pool</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5158</td>\n' +
    '<td>infinity pool</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5159</td>\n' +
    '<td>pool with view</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5160</td>\n' +
    '<td>heated pool</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5161</td>\n' +
    '<td>salt-water pool</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5162</td>\n' +
    '<td>plunge pool</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5163</td>\n' +
    '<td>pool towels</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5164</td>\n' +
    '<td>shallow end</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5165</td>\n' +
    '<td>pool cover</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5166</td>\n' +
    '<td>wine/champagne</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5167</td>\n' +
    '<td>bottle of water</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5168</td>\n' +
    '<td>fruits</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5169</td>\n' +
    '<td>chocolate/cookies</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5170</td>\n' +
    '<td>Trash cans</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5171</td>\n' +
    '<td>Wine glasses</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5172</td>\n' +
    '<td>Game console - Xbox One</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5173</td>\n' +
    '<td>Game console - Wii U</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5174</td>\n' +
    '<td>Game console - PS4</td>\n' +
    '<td>boolean</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5175</td>\n' +
    '<td>Children crib/cots</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5176</td>\n' +
    '<td>toothbrush</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5177</td>\n' +
    '<td>shampoo</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5178</td>\n' +
    '<td>conditioner</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5179</td>\n' +
    '<td>body soap</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5180</td>\n' +
    '<td>shower cap</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5181</td>\n' +
    '<td>pajamas</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td>5182</td>\n' +
    '<td>yukata</td>\n' +
    '<td><strong>@Value</strong> required</td>\n' +
    '<td>2017-02-04</td>\n' +
    '</tr>\n' +
    '</tbody>\n' +
    '</table>\n' +
    '<!-- Links and references -->\n' +
    '\n' +
    '<!-- API names -->\n' +
    '\n' +
    '<!-- Inclusions -->\n' +
    '\n' +
    '<!-- Content API -->\n' +
    '\n' +
    '<!-- Messaging API -->\n' +
    '\n' +
    '<!-- Promotions API -->\n' +
    '\n' +
    '<!-- Rates & availability API -->\n' +
    '\n' +
    '<!-- Reporting API -->\n' +
    '\n' +
    '<!-- Reservations API -->\n' +
    '\n' +
    '<!-- Photo API -->\n' +
    '\n' +
    '<!-- Supporting -->\n' +
    '\n' +
    '<!-- OTA codes -->\n' +
    '\n' +
    '<!-- B.com codes -->\n' +
    '\n' +
    '<!-- Other -->\n' +
    '\n' +
    '<!-- Swagger/OpenAPI sites -->\n' +
    '\n' +
    '<!-- Partner Help -->\n' +
    '\n' +
    '<!-- Glossary links -->\n' +
    '\n' +
    '<!-- OTA XML objects -->\n' +
    '\n' +
    '<!-- Other --><div class="js-feedback">\n' +
    '    <div class="b-card js-feedback-card">\n' +
    '\t\t<div class="text-featured">Is this page helpful?&nbsp;&nbsp;&nbsp;\n' +
    '          <a target="_blank" href="#" class="js-feedback-card__action" data-track-ga="Page Vote, Yes, RMA (Room Amenity Type)">Yes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;\n' +
    '          <a target="_blank" href="#" class="js-feedback-card__action" data-track-ga="Page Vote, No, RMA (Room Amenity Type)">No</a>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="b-card js-feedback-response" style="display: none;">\n' +
    '\t\t<div class="text-featured"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="24" height="24"><title>act_review_great</title><g id="_8x" data-name="8x"><path id="act_review_great" d="M64,8a56,56,0,1,0,56,56A56,56,0,0,0,64,8Zm0,104a48,48,0,1,1,48-48A48.05,48.05,0,0,1,64,112ZM44,64a8,8,0,1,1,8-8A8,8,0,0,1,44,64Zm48-8a8,8,0,1,1-8-8A8,8,0,0,1,92,56ZM87.22,77.62a4,4,0,0,1,.61,3.55C86.14,86.65,79,97,64,97c-9.71,0-15.66-4.23-18.94-7.79a22.68,22.68,0,0,1-4.88-8A4,4,0,0,1,44,76H84A4,4,0,0,1,87.22,77.62Z"/></g></svg>\n' +
    '\t\tThanks for your feedback!\n' +
    '\t\t</div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '          </div>\n' +
    '        </div>\n' +
    '\n' +
    '\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="content-inner" id="searchBox" style="background-color: #EEEEEE; margin: auto; z-index: 1000; display: none; height: 80vh; width: 100%; top: 5vh; padding: 1em;"> <div style="float: left; width: 100%; height: 8vh;">\n' +
    '    <div style="float: left;">\n' +
    '        <span class="icon-item2 bicon-search" onClick="hideSearch()"></span>\n' +
    '    </div>\n' +
    '    <div style="width: 90%; float: left;">\n' +
    '        <form>\n' +
    '            <div>\n' +
    '                <input type="text" placeholder="Search..." id="mkdocs-search-query" autofocus="autofocus" autocomplete="off">\n' +
    '            </div>\n' +
    '        </form>\n' +
    '        \n' +
    '    </div>\n' +
    '    <div style="float: left; position: absolute; top: 0.2em; right: 0.2em;">\n' +
    '        <span class="icon-item bicon-close" onClick="hideSearch()"></span>\n' +
    '    </div>\n' +
    ' </div>\n' +
    '\n' +
    ' <div id="mkdocs-search-results" style="float: left; overflow: scroll; overflow-x: hidden; width: 100%; height: 72vh;"></div>\n' +
    '\n' +
    '  </div>\n' +
    '\n' +
    '  <script>\n' +
    '    \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '    \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '    \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '    \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '    \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '    \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '    \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '    \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '    \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '    \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '    \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '    \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '          showSubMenu(\'APIReference\');\n' +
    '        \n' +
    '      \n' +
    '        \n' +
    '      \n' +
    '    \n' +
    '  </script>\n' +
    '\n' +
    '  <script type="text/javascript">\n' +
    '    $(document).ready(function(){\n' +
    '      $("h1").first().after($(".js-feedback").html());\n' +
    '      $( ".js-feedback-card__action" ).click(function(event) {\n' +
    '        event.preventDefault();\n' +
    '        $( ".js-feedback-card" ).hide();\n' +
    '        $( ".js-feedback-response").show();\n' +
    '        $.cookie(\'survey_docs_vote_RMA (Room Amenity Type)\', \'1\', { expires: 14, path: \'/\' });\n' +
    '      });\n' +
    '      if ($.cookie(\'survey_docs_vote_RMA (Room Amenity Type)\')) {\n' +
    '          $(".js-feedback-card").hide();\n' +
    '      }\n' +
    '      // @wveeken Added this to make external links open in a new tab.\n' +
    '      $(\'a\').each(function() {\n' +
    '        var a = new RegExp(\'/\' + window.location.host + \'/\');\n' +
    '        if(!a.test(this.href)) {\n' +
    '          $(this).click(function(event) {\n' +
    '            event.preventDefault();\n' +
    '            event.stopPropagation();\n' +
    '            window.open(this.href, \'_blank\');\n' +
    '          });\n' +
    '        }\n' +
    '      });\n' +
    '    });\n' +
    '  </script>\n' +
    '\n' +
    '  \n' +
    '    \n' +
    '    <!-- Analytic scripts -->\n' +
    '    <script>\n' +
    '      (function(i,s,o,g,r,a,m){\n' +
    '        i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||\n' +
    '        []).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n' +
    '        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;\n' +
    '        m.parentNode.insertBefore(a,m)\n' +
    '      })(window, document,\n' +
    '        "script", "https://www.google-analytics.com/analytics.js", "ga");\n' +
    '\n' +
    '      /* General initialization */\n' +
    '      ga("create",\n' +
    '        "UA-6284728-8",\n' +
    '        "auto");\n' +
    '      ga("set", "anonymizeIp", true);\n' +
    '      ga("send", "pageview");\n' +
    '\n' +
    '      /* Track outbound links */\n' +
    '      var links = document.getElementsByTagName("a");\n' +
    '      Array.prototype.map.call(links, function(item) {\n' +
    '        if (item.host != document.location.host) {\n' +
    '          item.addEventListener("click", function() {\n' +
    '            var action = item.getAttribute("data-md-action") || "follow";\n' +
    '            ga("send", "event", "outbound", action, item.href);\n' +
    '          });\n' +
    '        }\n' +
    '      });\n' +
    '\n' +
    '      /* Register handler to log search on blur */\n' +
    '      var query = document.getElementById(\'mkdocs-search-query\');\n' +
    '      query.addEventListener("blur", function() {\n' +
    '        if (this.value) {\n' +
    '          var path = document.location.pathname;\n' +
    '          // ga("send", "pageview", path + "?q=" + this.value);\n' +
    '          console.log(path + "?q=" + this.value);\n' +
    '          ga(\'send\', {\n' +
    '            hitType: \'event\',\n' +
    '            eventCategory: \'Documentation\',\n' +
    '            eventAction: \'Search\',\n' +
    '            eventLabel: this.value\n' +
    '          });\n' +
    '        }\n' +
    '      });\n' +
    '    </script>\n' +
    '    <!-- Default Analytics settings -->\n' +
    '    <script>\n' +
    '      var gaUser = null;\n' +
    '      var gaDimensions = null;\n' +
    '    </script>\n' +
    '    <!-- Support for Google Analytics custom events -->\n' +
    '    <script type="text/javascript" src="/javascripts/ga.js"></script>\n' +
    '    \n' +
    '  \n' +
    '</body>\n' +
    '</html>', { ignoreWhitespace: true });

let config = {
    urls: {
        'codes-rma': {
            'ota-amenities': {
                php: 'RoomAmenityTypeAmenities.php'
            }
        }
    }
}

$('table').each((tbodyIndex, table) => {
    if (tbodyIndex > 0) {return;}

    let h2 = $(table).prev().text().toLowerCase().replace(/[\W_\ ]+/g, '');

    console.log(h2);

    let codes = {};

    $(table).find('tbody > tr').each((trIndex, tr) => {

        if (trIndex > 0) {return;}

        let code = $(tr.children[1]).text();
        let text = $(tr.children[3]).text();

        codes[code] = text;
    });

    console.log(codes);
});