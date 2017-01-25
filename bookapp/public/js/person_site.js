//弹出隐藏层
        function ShowDiv(show_div,bg_div){
            document.getElementById(show_div).style.display='block';
            document.getElementById(bg_div).style.display='block' ;
            var bgdiv = document.getElementById(bg_div);
            bgdiv.style.width = document.body.scrollWidth;
            // bgdiv.style.height = $(document).height();
            $("#"+bg_div).height($(document).height());
        };
        //关闭弹出层
        function CloseDiv(show_div,bg_div) {
            document.getElementById(show_div).style.display='none';
            document.getElementById(bg_div).style.display='none';
        };

        function Baocun() {
            document.site.action = "/addsite";
            document.site.submit();
        }

       
            
            $(".J-delete").click(function () {
                $(this).parent().parent().addClass('Site');
                document.site.action = "/delete";
                var data = $(".Site div:eq(0)").attr("data-id");
                console.log(data);
                
                
                  $.ajax({
                        type:"post",
                        url:"/delete",
                        data:{data:data},
                        success:function (data) {
                            $('.Site').remove();
                        }
                    });
            });
              
            
           
      