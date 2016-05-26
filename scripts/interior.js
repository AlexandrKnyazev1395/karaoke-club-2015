$(document).ready(function($) {
	load_interior_photos();
});
function load_interior_photos() {
	$.ajax({
            url: '/php/get_interior.php',
            dataType: 'json',
            success: function(result) { //If all good
                //вставка мероприятий из бд на страницу
                for(var i =0; i<result.length; i++){
                	$('.interior_photos').append('<li><img src="interior/'+result[i]+ '">\
                                                    </li>');
                }
            },
            error: function(log) { //If all bad
                             
            },

    });
}