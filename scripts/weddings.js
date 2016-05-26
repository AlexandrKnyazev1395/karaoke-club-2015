var images_events = {};

function Event_images_and_folder(folder, images) {
  this.folder = folder;
  this.images_names = images;
}
$(document).ready(function($) {
	//Загрузка из бд мероприятия
	load_galery();
});
function load_galery () {
	$('.all_weddings').empty();
	$.ajax({
            url: '/php/get_weddings.php',
            dataType: 'json',
            success: function(result) { //If all good
                //вставка мероприятий из бд на страницу
                for(var i =0; i<result.length; i++){
                	$('.all_weddings').append('<li>\
												<div class="main_photo" id="'+ result[i].id_wedding+'""></div>\
												<h3>' + result[i].title_event+ '</h3>  \
											</li>');
                	$('#'+ result[i].id_wedding+'').css({
						backgroundImage: 'URL(about_rest_events/weddings/'+result[i].folder+'/mini/'+ result[i].images_name[0] + ')',
					});
					images_events[''+result[i].id_wedding+''] = new Event_images_and_folder(result[i].folder ,result[i].images_name);
                }
            },
            error: function(log) { //If all bad
                             
            },

    });
}

$('body').on('click', '.all_weddings li', function(event) {
	$('.to_main_galery').show();
	$('.all_weddings').empty();
	var id_wedding = +$(this).children('.main_photo').attr('id');
	var amount_images_event = images_events[''+id_wedding +'']['images_names'].length;
	var folder = images_events[''+id_wedding +'']['folder'];
	console.log(images_events);
	for(var i = 0; i< amount_images_event; i++){
		$('.one_wedding_photos').append('<li><img src="about_rest_events/weddings/'+ folder +'/mini/'+ 
			images_events[''+id_wedding +'']['images_names'][i] +'" rel="group1" class="myphotos"\
			data-glisse-big="about_rest_events/weddings/'+ folder +'/full/'+ 
			images_events[''+id_wedding +'']['images_names'][i] +'" title="" /></li>')
	}
	//использование приблуды для создания галереи
	$('.myphotos').glisse({speed: 350, changeSpeed: 350, effect:'roll', fullscreen: false});
});

$('body').on('click', '.to_main_galery', function(event) {
	$('.to_main_galery').hide();
	$('.one_wedding_photos').empty();
	load_galery();
});