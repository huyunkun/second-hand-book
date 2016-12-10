
$('.left').click(function () {
	roll_prve();
})

$('.right').click(function () {
	roll_next();
})

$main = $('.main');


function roll_next() {
	$('li:eq(0)').addClass('active');

	var i = $('li:eq(0)').attr('data-img');

	$main.animate({"left":"-200px"},1000,function () {
		$main.css("left","0")
		$('.active').remove();
		$main.append("<li class='img' data-img='"+i+"'><img src='../img/0"+i+".jpg'></li>");
	})
	
}

function roll_prve() {
    $('li:eq(4)').addClass('active');

    var i = $('li:eq(4)').attr('data-img');
    $main.prepend("<li class='img' data-img='"+i+"'><img src='../img/0"+i+".jpg'></li>");

    $main.css({'left':'-200px'})
	$main.animate({"left":"0"},1000,function () {
		$('.active').remove();
	})

}


	var autoTimer = setInterval(roll_next,3000);


$('.right').hover(function () {
	clearInterval(autoTimer);
},function () {
	autoTimer = setInterval(roll_next, 3000);
})

$('.left').hover(function () {
	clearInterval(autoTimer);
},function () {
	autoTimer = setInterval(roll_next, 3000);
})




