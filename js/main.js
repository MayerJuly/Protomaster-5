$(function() {
    $(".footer").fadeOut()
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



    let scrollableElement = document.body,
        n = 0;
    const main = document.querySelector('.main');
    const mainList = main.children;




    $('.header__logo').click((e)=>{
        e.preventDefault();
        if(n!==0){
            mainList[n].classList.remove('opened')
            for(let j=0;j<3;j++){
                if(mainList[j].classList.contains('hidden')) mainList[j].classList.remove('hidden');
            }

            n=0;
            setTimeout(function(){mainList[n].classList.add('opened');},500)
            $(".button__down").fadeIn();
        }



    })

    function animationDown(){
        if(n!==3){
            // $(".button__down").fadeOut();
            mainList[n].classList.remove('opened');
                mainList[n].classList.add('hidden');

            n++;
            setTimeout(function(){mainList[n].classList.add('opened');},500)

            if(mainList[n].classList.contains('hidden')) mainList[n].classList.add('hidden');
            if(n!==3) $(".button__down").fadeIn();
            else{
                $(".button__down").fadeOut(400);
                $(".footer").fadeIn(1000)
            }
        }



    }

    function animationUp(){
        if(n!==0){
            $(".footer").fadeOut()
            $(".button__down").fadeIn(1000);
            mainList[n].classList.remove('opened');
            n--;
        }
        console.log(n)
        if (n<0) {
            n++;
        }

        setTimeout(function(){mainList[n].classList.add('opened');
            if(mainList[n].classList.contains('hidden')) mainList[n].classList.remove('hidden');},500)



    }


    scrollableElement.addEventListener('wheel', checkScrollDirection);




    function checkScrollDirection(event) {

            if (checkScrollDirectionIsUp(event)) {
                console.log('UP');
                animationUp(n);
                scrollableElement.removeEventListener("wheel", checkScrollDirection);
                setTimeout(function (){
                    scrollableElement.addEventListener('wheel', checkScrollDirection);
                },600)
            } else {
                console.log('DOWN');
                animationDown(n);
                scrollableElement.removeEventListener("wheel", checkScrollDirection);
                setTimeout(function (){
                    scrollableElement.addEventListener('wheel', checkScrollDirection);
                },600)
            }
        }

    function checkScrollDirectionIsUp(event) {
        if (event.wheelDelta) {
            return event.wheelDelta > 0;
        }
        return event.deltaY < 0;
    }




    mainList[n].classList.add('opened');


    $(".button__down").click((e)=>{
        e.preventDefault();
        animationDown();
    })




    //    Modal

    const close = $('.js-close-popup');
    const modalOverlay = $('.overlay');
    const popup = $('.js-popup');
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const mail = document.getElementById('mail');


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
        const mailValue = mail.value.trim();

        let error = false;

        if(usernameValue === ''){
            setErrorFor(username, 'Введите ваше имя')
            error = true;

        } else{
            setSuccessFor(username)
        }


        if(mailValue === ''){
            setErrorFor(mail, 'Введите Ваш адрес электронной почты');
            error = true;

        }
        else{
            setSuccessFor(mail);
        }

        if(!error){
            $.ajax({
                type: "POST",
                url: "../mail.php", //Change
                data: msg
            }).done(function() {
                popup.css('display','none');
                $(".modal__success").fadeIn();
                $(".success__close").click(()=>{
                    $(".modal__success").fadeOut();
                    popup.css('display','flex')
                })
                setTimeout(function() {

                    form.reset();
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