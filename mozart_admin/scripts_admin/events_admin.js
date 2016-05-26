$(document).ready(function($) {
	
});

$('body').on('click', '#to_next_string', function(event) {
    $('#description_event').val($('#description_event').val() + '<br>');
});