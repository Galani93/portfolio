$(document).ready(function(){
    // jQuery плавный скролл к якорю
    $("a[href^='#']").click(function(){
        //забираем идентификатор бока с атрибута href
        var _href = $(this).attr("href");
        //узнаем высоту от начала страницы до блока на который ссылается якорь и анимируем переход на расстояние - top за 1500 мс
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"}, 1500);
        return false;
    });

    // jQuery плавный скролл вверх
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('#scroller').fadeIn();
        } else {
            $('#scroller').fadeOut();
        }
    });
    $('#scroller').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

    // jQuery карусель сертификатов
    jQuery('#slider').tinycarousel({
        pager: true,
        controls: true
    });
});
