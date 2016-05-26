$(document).ready(function($) {
	paste_header();
	paste_menu();
	if ($(window).width() > '800') {
   		rotate_icons();
		menu_hover();
	}
	$(window).resize(function(){
  		if ($(window).width() <= '800') {
   			$('body').off('mouseover', '.main_menu');
   			$('body').off('mouseout', '.main_menu');
   			$('.main_menu').removeClass('hover_elem');
		}
		if ($(window).width() > '800') {
   			rotate_icons();
			menu_hover();
		}
	});
	paralax_background();
	paste_footer();
});

function rotate_icons(){
	$("body").on('mouseover','.main_menu',function (){
		$(this).addClass('hover_elem');
	});
}

function menu_hover(){
	$("body").on('mouseover','.main_menu, .events_menu',function (){
		if($(this).children('ul').is(':hidden')){
			$(this).children('ul').show();
		}
	});
	$("body").on('mouseout','.main_menu, .events_menu',function (){
		if($(this).children('ul').is(':visible')){
			$(this).children('ul').hide();
		}
	});
	$("body").on('mouseover','.events_menu ul',function (){
		$(this).parent().children('a').css({
			backgroundColor: 'rgb(206,53,44)'
		});
	});
	$("body").on('mouseout','.events_menu ul',function (){
		$(this).parent().children('a').css({
			backgroundColor: 'rgba(0, 0, 0, 0.5)'
		});
	});
	
}

function paste_header(){
	$('header').load('/elems/header.html');
}

function paste_menu(){
	$('nav').load('/elems/app_bar.html');
}
function paralax_background(){
	
}
function paste_footer () {
	var contacts_mozart = {};
	if(document.getElementsByTagName('footer') !=0){
		
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
               	$('footer').load('/elems/footer.html', function() {
                    var block_for_contact = $('footer');
                    block_for_contact.find('.mozart_adress').text(contacts_mozart.adress);
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
				});
            },
            error: function(log) { //If all bad
                               
            },

    	});  
	}  
}