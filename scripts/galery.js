var images_events = {};

function Event_images_and_folder(folder, images) {
  this.folder = folder;
  this.images_names = images;
}

$(document).ready(function($) {
	
	//Загрузка из бд разделов галереи
	load_galery();
	add_arrow_up(); // стрелка вверх при прокрутке страницы вниз
});

function load_galery () {
	$('.all_events').empty();
	$.ajax({
            url: '/php/galery.php',
            dataType: 'json',
            success: function(result) { //If all good
                //вставка мероприятий из бд на страницу
                for(var i =0; i<result.length; i++){
                	if(!result[i].title_event){
                		result[i].title_event = "";
                	}
                	$('.all_events').append('<li>\
												<div class="main_photo" id='+ result[i].id_event+'></div>\
												<h3>'+result[i].date_event + ' ' + result[i].title_event+ '</h3>  \
											</li>');
                	$('#'+ result[i].id_event+'').css({
						backgroundImage: 'URL(photos/'+result[i].folder+'/mini/'+ result[i].images_name[0] + ')',
					});
					images_events[''+result[i].id_event+''] = new Event_images_and_folder(result[i].folder ,result[i].images_name);
                }
            },
            error: function(log) { //If all bad
                             
            },

    });
}


$('body').on('click', '.all_events li', function(event) {
	$('.to_main_galery').show();
	$('.all_events').empty();
	$('#galery_header').empty();
	$('#galery_header').append('<a href="/photo-galery.html">Фото-галерея</a> / <span>'+
		$(this).children('h3').text()+'</span>')
	var id_event = +$(this).children('.main_photo').attr('id');
	var amount_images_event = images_events[''+id_event +'']['images_names'].length;
	var folder = images_events[''+id_event +'']['folder'];
	
	for(var i = 0; i< amount_images_event; i++){
		$('.one_event_photos').append('<li><img src="photos/'+ folder +'/mini/'+ 
			images_events[''+id_event +'']['images_names'][i] +'" rel="group1" class="myphotos"\
			data-glisse-big="photos/'+ folder +'/full/'+ 
			images_events[''+id_event +'']['images_names'][i] +'" title="" /></li>')
	}
	//использование приблуды для создания галереи
	$('.myphotos').glisse({speed: 350, changeSpeed: 350, effect:'roll', fullscreen: false});
});
$('body').on('click', '.to_main_galery', function(event) {
	$('.to_main_galery').hide();
	$('.one_event_photos').empty();
	load_galery();
});

function add_arrow_up () {
    var top_show = 750; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
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