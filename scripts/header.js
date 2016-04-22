$(document).ready(function($) {
	paste_header();
	paste_menu();
	if ($(window).width() > '800') {
   		rotate_icons();
		menu_hover();
	}
	$(window).resize(function(){
  		if ($(window).width() <= '800') {
   			$('body').off('mouseover', '.main_menu');
   			$('body').off('mouseout', '.main_menu');
   			$('.main_menu').removeClass('hover_elem');
		}
		if ($(window).width() > '800') {
   			rotate_icons();
			menu_hover();
		}
	});
	paralax_background();
});

function rotate_icons(){
	$("body").on('mouseover','.main_menu',function (){
		$(this).addClass('hover_elem');
	});
}

function menu_hover(){
	$("body").on('mouseover','.main_menu',function (){
		$(this).children('ul').show();
	});
	$("body").on('mouseout','.main_menu',function (){
		$(this).children('ul').hide();
	});
}

function paste_header(){
	$('header').load('/elems/header.html');
}

function paste_menu(){
	$('nav').load('/elems/app_bar.html');
}
function paralax_background(){
	
}