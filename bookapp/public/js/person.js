
	$(".sum-6").click(function () {
		$(this).parent().parent().addClass("Order");
		var Ordata = $(".Order").children().attr("data-id");
        
		$.ajax({
			type:"post",
			url:"/ordelete",
			data:{data:Ordata},
			success:function (data) {
				$('.Order').remove();
			}
		});
	});

