$(document).ready( function() {
	load_kinds_menu(); //загрузка видов меню
	add_arrow_up(); // стрелка вверх при прокрутке страницы вниз
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

	$(window).resize(function(){
		fill_menu_book();
   	});


}

function load_kinds_menu () {
	$.ajax({
            url: '/php/get_kinds_menu.php',
            dataType: 'json',
            success: function(result) { //If all good
                //вставка мероприятий из бд на страницу
                for(var i =0; i<result.length; i++){
                	$('#list_menu').append('<li class="kinds_menu"'+
                		'data-folder = "'+ result[i].folder + '"' +
                		'data-amount_images = "'+ result[i].amount_images + '"' + 
                		'id = "'+result[i].id_kind+'"><a>'+ 
                		result[i].title_kind +'</a></li>');
                }
                fill_menu_book();
            },
            error: function(log) { //If all bad
                alert("Извините, но что-то на сайте пошло не так, исправим!")                   
            },

    });
}

$('body').on('click', '.kinds_menu', function(event) {
	var choosed_menu = $('.choosed_menu');
	choosed_menu.empty();
	var folder_with_images = $(this).attr('data-folder');
	var amount_images = +$(this).attr('data-amount_images');
	for(var i=1; i<=amount_images; i++){
		choosed_menu.append('\
			<img src="../menu/'+ folder_with_images  +'/'+i+'_little.jpg" alt="menu">\
		');
	}
	
	var destination = choosed_menu.first().offset().top;
	$("html,body").animate({scrollTop: destination}, 'slow');
	
});
function add_arrow_up () {
    var top_show = 350; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
    var delay = 1000; // Задержка прокрутки
    $(window).scroll(function () { // При прокрутке попадаем в эту функцию
        /* В зависимости от положения полосы прокрукти и значения top_show, скрываем или открываем кнопку "Наверх" */
        if ($(this).scrollTop() > top_show) $('#top').fadeIn();
        else $('#top').fadeOut();
    });
    $('#top').click(function () { // При клике по кнопке "Наверх" попадаем в эту функцию
      /* Плавная прокрутка наверх */
      $('body, html').animate({
        scrollTop: 200
      }, delay);
    });
}