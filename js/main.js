$(function() {
    $('.preloader__content').addClass('active');
    setTimeout(function (){
        $('.preloaderText').addClass('active');
    },200)

    let burger = $('.header__burger')
    let nav = $('.header__nav')

    burger.on('click', (e) => {
        e.preventDefault()

        nav.toggleClass('active')
        burger.toggleClass('active')
    })

//    PRELOADER AUTO-TEXT
    let preloaderTextInfo = $('#preloaderTextInfo')

    function animateText(text) {
        const string = text.text()
        let n = 80;
        if(text === preloaderTextInfo) n=40;
        return text.each(function () {
            const $text = $(this)
            $text.html(string.replace(/./g, '<span class="new">$&</span>'))
            $text.find('span.new').each(function (i, el) {
                setTimeout(function () {
                    $(el).addClass('div_opacity');
                }, n * i)
            })
        })
    }

    function showPreloaderTextInfo(){
        preloaderTextInfo.css('opacity', '1')
        animateText(preloaderTextInfo)
    }

    setTimeout(function (){
        showPreloaderTextInfo();
    },1000)


    $("[data-scroll]").on('click', function (event) {
        event.preventDefault()

        let elementID = $(this).data('scroll')
        let elementOffset = $(elementID).offset().top

        if (burger.hasClass('active')) {
            nav.removeClass('active')
            burger.removeClass('active')
        }

        $('html, body').animate({
            scrollTop: elementOffset,
        }, 700)
    })
});