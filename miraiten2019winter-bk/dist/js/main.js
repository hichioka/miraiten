$(function() {
    $('.navToggle').click(function() {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.globalMenuSp').addClass('active');
        } else {
            $('.globalMenuSp').removeClass('active');
        }
    });
});
$(function(){
	var page=0;
	var lastPage =parseInt($("#slide img").length-1);

	$("#slide img").css("display","none");
	$("#slide img").eq(page).css("display","block");

	function changePage(){
		$("#slide img").fadeOut(1000);
		$("#slide img").eq(page).fadeIn(1000);
	};

	var Timer;
	function startTimer(){
		Timer =setInterval(function(){
			if(page === lastPage){
				page = 0;
				changePage();
			}else{
				page ++;
				changePage();
			};
		},5000);
	}

	function stopTimer(){
		clearInterval(Timer);
	}
	startTimer();
});

$("#nav-r a").click(function() {
	stopTimer();
	startTimer();
	if(page === lastPage){
		page = 0;
		changePage();
	}else{
		page ++;
		changePage();
	};
});
$("#nav-l a").click(function() {
	stopTimer();
	startTimer();
	if(page === 0){
		page = lastPage;
		changePage();
	}else{
		page --;
		changePage();
	};
});
