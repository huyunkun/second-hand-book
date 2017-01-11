function Ordelete() {
	$(".mid-tabs-bb").click(function () {
		var Ordata = $(this).children().attr("data-id");
		$.ajax({
			type:"post",
			url:"/Ordelete",
			data:{data:Ordata}
		});
	});

}