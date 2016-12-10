
$('.btn-prev').click(function () {
	roll_prve();
})

$('.btn-next').click(function () {
	roll_next();
})

$back = $('.back');


function roll_next() {
	$('.back li:eq(0)').addClass('active');

	var i = $('.back li:eq(0)').attr('data-img');

	$back.animate({"left":"-1349px"},1000,function () {
		$back.css("left","0")
		$('.active').remove();
		$back.append("<li class='back_img' data-img='"+i+"'><img src='/img/"+i+".jpg'></li>");
	})
	
}

function roll_prve() {
    $('.back li:eq(4)').addClass('active');

    var i = $('.back li:eq(4)').attr('data-img');
   $back.prepend("<li class='back_img' data-img='"+i+"'><img src='/img/"+i+".jpg'></li>");

    $back.css({'left':'-1349px'})
	$back.animate({"left":"0"},1000,function () {
		$('.active').remove();
	})

}


	var autoTimer = setInterval(roll_next,3000);


$('.btn-next').hover(function () {
	clearInterval(autoTimer);
},function () {
	autoTimer = setInterval(roll_next, 3000);
})

$('.btn-prev').hover(function () {
	clearInterval(autoTimer);
},function () {
	autoTimer = setInterval(roll_next, 3000);
})



