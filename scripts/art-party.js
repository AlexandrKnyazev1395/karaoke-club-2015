$(document).ready(function($) {
	load_party();
});
function load_party () {
	$.ajax({
            url: '/php/get_art-party.php',
            dataType: 'json',
            success: function(result) { //If all good
                //вставка мероприятий из бд на страницу
                for(var i =0; i<result.length; i++){
                	$('.art-party_photos').append('<li><img rel="group1" class="myphotos"\
                											src="about_rest_events/art-party/mini/'+result[i]+
                											'" data-glisse-big="about_rest_events/art-party/full/'+result[i]+'">\
                									</li>');
                }
                $('.myphotos').glisse({speed: 350, changeSpeed: 350, effect:'roll', fullscreen: false});
            },
            error: function(log) { //If all bad
                             
            },

    });
}