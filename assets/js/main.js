(function ($) {

    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)',
        'xlarge-to-max': '(min-width: 1681px)',
        'small-to-xlarge': '(min-width: 481px) and (max-width: 1680px)'
    });

    $(function () {

        var $window = $(window),
            $head = $('head'),
            $body = $('body');

        // PAGE LOAD
        $body.addClass('is-loading');

        $window.on('load', function () {
            setTimeout(function () {
                $body.removeClass('is-loading');
            }, 100);
        });

        // RESIZING
        var resizeTimeout;

        $window.on('resize', function () {

            $body.addClass('is-resizing');

            clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(function () {
                $body.removeClass('is-resizing');
            }, 100);

        });

        // SIDEBAR
        var $sidebar = $('#sidebar'),
            $sidebar_inner = $sidebar.children('.inner');

        // SIDEBAR OPEN & CLOSE
        skel
            .on('+large', function () {
                $sidebar.addClass('inactive');
            })
            .on('-large !large', function () {
                $sidebar.removeClass('inactive');
            });

        // CHROME / ANDROID
        if (skel.vars.os == 'android' &&
            skel.vars.browser == 'chrome')
            $('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
            .appendTo($head);

        // SIDEBAR TOGGLE
        if (skel.vars.IEVersion > 9) {

            $('<a href="#sidebar" class="toggle">Toggle</a>')
                .appendTo($sidebar)
                .on('click', function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    $sidebar.toggleClass('inactive');
                });
        }

        // PREVENT
        $sidebar.on('click touchend touchstart touchmove', function (event) {

            if (!skel.breakpoint('large').active)
                return;

            event.stopPropagation();

        });

        // HIDE
        $body.on('click touchend', function (event) {
            if (!skel.breakpoint('large').active)
                return;

            $sidebar.addClass('inactive');
        });

        // MENU
        $('#menu > ul > li').click(function (event) {
            if (false === $(event.target).is('.subMenu')) {
                if ($(this).hasClass('open')) {
                    //    $(this).removeClass('open');
                } else {
                    $(this).addClass('open');
                }
                $('.subMenu').parent().not(this).removeClass('open');
            }
        });

        // TABS
        $('.tabsNav li:first-child').addClass('active');
        $('.tabContent').hide();
        $('.tabContent:first').show();

        $('.tabsNav li').click(function () {
            $('.tabsNav li').removeClass('active');
            $(this).addClass('active');
            $('.tabContent').hide();

            var activeTab = $(this).find('a').attr('href');
            $(activeTab).show();
            return false;
        });

        /* JQUERY UI TEST // 테스트 용도이므로 지우셔도 됩니다 */

        $('#from, #to').datepicker();

        // JQUERY UI - DIALOG
        $("#dialog").dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                '1': {
                    id: 'close',
                    text: 'Close',
                    click: function () {
                        $(this).dialog('close');
                    },
                    "class": ''
                },
                '2': {
                    id: 'continue',
                    text: 'Continue',
                    click: function () {
                        $(this).dialog('close');
                    },
                    "class": 'point'
                }
            }
        });
        
        $('#openDialog').click(function () {
            $('#dialog').dialog('open');
        });

//        $body.append($.ui.dialog.overlay.create());

        /* END // JQUERY UI TEST */

    });

})(jQuery);

//FILEUPLOAD 
 $('#file').change(function() {
  var file = $(this).val().split("\\").pop();
    $('.input').text(file);
});

//MODAL
function openModal() {
    $('.modalOverlay').addClass('modalShow');
}

function hideModal() {
    $('.modalOverlay').removeClass('modalShow');
}

$('#modalAdd').on('click', function () {
    openModal();
    return false;
});

$('.modalClose').on('click', function () {
    hideModal();
    return false;
});
