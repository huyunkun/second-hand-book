function Ordelete() {
	$(".mid-tabs-bb").click(function () {
		var Ordata = $(this).children().attr("data-id");
        $(this).addClass("Order");
		$.ajax({
			type:"post",
			url:"/ordelete",
			data:{data:Ordata},
			success:function (data) {
				$('.Order').remove();
			}
		});
	});

}