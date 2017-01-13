$('.bookadd').click(function () {
        var sum = 1;
        sum = sum + Number($('.bookamount').val());
        $('.bookamount').val(sum);
        
    });
    $('.bookminus').click(function () {
        var sum = 1;
        var a = Number($('.bookamount').val()) - sum;
        if (a > 1) {
            $('.bookamount').val(a);
        } else {
            $('.bookamount').val(1);
        }
    });

    $('.J-minwarp').hover(function () {
        var imgsrc = $(this).children().attr("src");
        // console.log( $(this).children());
        $(".bigimg").attr("src",imgsrc);
    });