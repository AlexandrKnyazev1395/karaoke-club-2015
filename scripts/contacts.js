$(document).ready(function($) {
	load_adaprtive_page();
    load_contact_info(); //загрузка контактной информации
});

function load_adaprtive_page () {
	if ($(window).width() < '800') {
    	$('#yandex_map').removeClass('colspan6');
    	$('#yandex_map').addClass('colspan10');
    	$('#con_contact').removeClass('colspan6');
    	$('#con_contact').addClass('colspan11');
    }
    else{
    	$('#yandex_map').removeClass('colspan10');
    	$('#yandex_map').addClass('colspan6');
    	$('#con_contact').removeClass('colspan11');
    	$('#con_contact').addClass('colspan5');
    }
    $(window).resize(function(){
        load_adaprtive_page();
    });
}

function load_contact_info(){
    var contacts_mozart = {};
    $.ajax({
        url: '/php/get_contacts.php',
        dataType: 'json',
        success: function(result) { //If all good
            for(var i =0; i<result.length; i++){
                if(result[i]['title_contact'] == 'phone'){
                    contacts_mozart.phone = result[i].content_contact;
                }
                if(result[i]['title_contact'] == 'adress'){
                    contacts_mozart.adress = result[i].content_contact;
                }
                if(result[i]['title_contact'] == 'mail'){
                    contacts_mozart.mail = result[i].content_contact;
                }
                if(result[i]['title_contact'] == 'group_vk'){
                    contacts_mozart.group_vk = result[i].content_contact;
                }
                if(result[i]['title_contact'] == 'group_ok'){
                    contacts_mozart.group_ok = result[i].content_contact;
                }
                if(result[i]['title_contact'] == 'group_inst'){
                    contacts_mozart.group_inst = result[i].content_contact;
                }
            }
            //load contacts_info_in_block
            //adress
            var block_for_contact = $('#con_contact');
            block_for_contact.find('.mozart_adress').empty();
            block_for_contact.find('.mozart_adress').append(contacts_mozart.adress);
            //phone
            block_for_contact.find('.mozart_phone').attr('href', 'tel:'+ contacts_mozart.phone);
            block_for_contact.find('.mozart_phone').find('.cont_text').text(contacts_mozart.phone);
            //mail
            block_for_contact.find('.mozart_mail').attr('href', 'mailto:'+contacts_mozart.mail+'?subject=Здравствуйте');
            block_for_contact.find('.mozart_mail').find('.cont_text').text(contacts_mozart.mail);
            //social_groups
            block_for_contact.find('.mozart_vk').attr('href', contacts_mozart.group_vk);
            block_for_contact.find('.mozart_ok').attr('href', contacts_mozart.group_ok);
            block_for_contact.find('.mozart_inst').attr('href', contacts_mozart.group_inst);
        },
        error: function(log) { //If all bad
                           
        },

    });
}