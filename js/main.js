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


    //    Modal

    const close = $('.js-close-popup');
    const modalOverlay = $('.overlay');
    const popup = $('.js-popup');
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const mail = document.getElementById('phone');


    function closeModal(close,object) {
        close.click(function (){
            object.removeClass('active')
        })
    }


    function closeModalOverlay(popup,object){
        $(document).mousedown(function (e) {
            if (e.target !== popup[0] && popup.has(e.target).length === 0) {
                object.removeClass('active')
            }
        })
    }

$('.toForm').click(function (e){
    e.preventDefault();
    modalOverlay.addClass('active');
})



    closeModal(close,modalOverlay)
    closeModalOverlay(popup,modalOverlay)

    form.addEventListener('submit',(e)=>{

        e.preventDefault()

        checkInputs()
    })

    function checkInputs(){
        let msg = $('#form').serialize();
        //    get values from inputs
        const usernameValue = username.value.trim();
        const mailValue = phone.value.trim();

        let error = false;

        if(usernameValue === ''){
            setErrorFor(username, 'Введите ваше имя')
            error = true;

        } else{
            setSuccessFor(username)
        }


        if(phoneValue === ''){
            setErrorFor(phone, 'Введите ваш номер телефона');
            error = true;

        }
        else{
            setSuccessFor(phone);
        }

        if(!error){
            $.ajax({
                type: "POST",
                url: "../mail.php", //Change
                data: msg
            }).done(function() {
                alert("Сообщение отправлено");
                setTimeout(function() {
                    form.reset()
                    document.location.replace("index.php");
                    form.trigger("reset");
                }, 1000);
            });
            return false;

        }
    }

    function setErrorFor(input,message){
        const formControl = input.parentElement // .form__control
        const small = formControl.querySelector('small')

        // add error message
        small.innerText = message
        // add error class
        formControl.classList.add('error')
    }

    function setSuccessFor(input){
        const formControl = input.parentElement // .form__control
        formControl.classList.remove('error')
    }



});