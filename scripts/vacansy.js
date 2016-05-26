$(document).ready(function($) {
	get_vacansy();
});

function get_vacansy () {
	$.ajax({
            url: '/php/get_vacansy.php',
            dataType: 'json',
            success: function(result) { //If all good
                $('#vacansy_info').append(result);
            },
            error: function(log) { //If all bad
                $('#vacansy_info').append("Извините, вакансии временно недоступны");                   
            },

    }); 
}