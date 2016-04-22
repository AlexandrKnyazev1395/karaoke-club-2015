$(document).ready( function() {
	fill_menu_book();
	$(window).resize(function(){
		fill_menu_book();
   	});

});

function fill_menu_book () {
	var width_book = $('#menu_book').width();
	var height_book = $('#menu_book').height();
	var position_book = $('#menu_book').offset();
	margin_x_right = width_book/2 + 20;
	var margin_y = height_book / $('#list_menu li').length;
	$('#list_menu').css({
		marginTop: margin_y,
		marginLeft: margin_x_right
	});
}