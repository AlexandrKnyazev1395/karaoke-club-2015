$(document).ready(function($) {
	get_rules();
});

function get_rules () {
	var ul_clients_can = $('#client_can');
	var ul_clients_must = $('#client_must');
	var ul_rest_must = $('#rest_must');
	var ul_rest_can = $('#rest_can');
	var sanctions_description = $('#sanctions_description');
	var fors_major = $('#fors-major ul');
	var sanctions_table = $('#sanctions_table');
	var karaoke_rules = $('#karaoke_rules');
	$.getJSON('json_data/rules.json', function(data) {
		$.each(data.rights_and_duties.client_can, function(index, el) {
			ul_clients_can.append('<li>' + el + '</li>')
		});
		$.each(data.rights_and_duties.client_must, function(index, el) {
			ul_clients_must.append('<li>' + el + '</li>')
		});
		$.each(data.rights_and_duties.rest_must, function(index, el) {
			ul_rest_must.append('<li>' + el + '</li>')
		});
		$.each(data.rights_and_duties.rest_can, function(index, el) {
			ul_rest_can.append('<li>' + el + '</li>')
		});
		$('#pay_order_header').append(data.pay_order.pay_order_header);
		$(sanctions_description).before(data.pay_order.sanctions);
		$.each(data.pay_order.sanctions_description, function(index, el) {
			sanctions_description.append('<li>' + el + '</li>')
		});
		$.each(data.fors_major, function(index, el) {
			fors_major.append('<li>' + el + '</li>');
		});
		$.each(data.pay_order.fines, function(index, el) {
			sanctions_table.children('tbody')
							.append('<tr>\
                                        <td class="">'+ el.if +'</th>\
                                        <td class="">' + el.result+'</th>\
                                    </tr>')
		});

		$('#pay_order').on('click', '#open_sanctions_table', function(event) {
			$('#sanctions_table').toggle();
		});
		$.each(data.songs_rules, function(index, el) {
			karaoke_rules.append('<li>' + el + '</li>');
		});
	});

}