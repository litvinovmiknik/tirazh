$(function() {
    $('.help__icon').on('click', function() {
        $help = $(this).parent();
        $helpPointer = $help.find('.help__pointer');
        $helpPopup = $help.find('.help__popup');

        let display = $helpPopup.css('display');

        if (display === 'block') {
            $helpPopup.hide();
        } else if (display === 'none') {
            let helpLeft = $help.position().left;
            let helpPointerLeft = Math.round(helpLeft) + 10;
            $helpPointer.css('left', helpPointerLeft);

            let helpTop = $help.position().top;
            let helpPopupTop = Math.round(helpTop) + 26;
            $helpPopup.css('top', helpPopupTop).show();
        } 
    });
    $('html, body')
        .on('click', function() {
            $('.help__popup').hide();
        })
        .on('click', '.help', function(e) {
            e.stopPropagation();
        });
});