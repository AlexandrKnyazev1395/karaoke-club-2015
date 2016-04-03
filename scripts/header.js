$(document).ready(function($) {
	rotate_icons();
	menu_hover();
});

function rotate_icons(){
	$('.main_menu').mouseover(function(event) {
		$(this).addClass('hover_elem');
	});
}

function menu_hover(){
	$('.main_menu').mouseover(function(event) {
		$(this).children('ul').show();
	});
	$('.main_menu').mouseout(function(event) {
		$(this).children('ul').hide();
	});
}