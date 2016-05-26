$(document).ready(function($) {
	get_contacts();
});

function get_contacts () {
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
                //load contacts_info_in_footer

                var block_for_contact = $('#contact_form');
                block_for_contact.find('#phone').val(contacts_mozart.phone);
                block_for_contact.find('#adress').val(contacts_mozart.adress);
                block_for_contact.find('#mail').val(contacts_mozart.mail);
                block_for_contact.find('#vk_group').val(contacts_mozart.group_vk);
                block_for_contact.find('#ok_group').val(contacts_mozart.group_ok);
                block_for_contact.find('#inst_group').val(contacts_mozart.group_inst);
            },
            error: function(log) { //If all bad
                               
            },

    });
	
}