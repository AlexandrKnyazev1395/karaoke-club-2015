$(document).ready(function($) {
	get_rules();
});

function get_rules () {
	$.ajax({
            url: '/php/get_rules.php',
            dataType: 'json',
            success: function(result) { //If all good
                $('#rules_info').append(result);
                $('#pay_order').on('click', '#open_sanctions_button', function(event) {
					$('#sanctions_table').toggle();
				});
            },
            error: function(log) { //If all bad
                $('#rules_info').append("Извините, правила временно недоступны");              
            },

    });
}
