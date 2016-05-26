saved_kinds = 0;
$(document).ready( function() {	
    load_kinds_menu(); //загрузка видов меню
    load_contact_info(); //загрузка контактной информации
	add_arrow_up(); // стрелка вверх при прокрутке страницы вниз
});

function load_kinds_menu () {
	$.ajax({
            url: '/php/get_kinds_menu.php',
            dataType: 'json',
            success: function(result) { //If all good
                //вставка мероприятий из бд на страницу
                for(var i =0; i<result.length; i++){
                	$('#list_menu').append('<li title="Щелкните, чтобы открыть меню" class="kinds_menu"'+
                		'data-folder = "'+ result[i].folder + '"' +
                		'data-amount_images = "'+ result[i].amount_images + '"' + 
                		'id = "'+result[i].id_kind+'">'+ 
                		result[i].title_kind +' <a title="Скачать в формате PDF" target="blank"  href = "../menu/' + result[i].folder +
                        '/big_images/images.pdf"><span class="mif-file-download"></span></a> </li>');
                }
                saved_kinds = $('#list_menu').clone();
            },
            error: function(log) { //If all bad
                               
            },

    });
}
function load_contact_info () {
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
            var block_for_contact = $('#menu_contacts_block');
            block_for_contact.find('.mozart_adress').empty();
            block_for_contact.find('.mozart_adress').append(contacts_mozart.adress + '<br>');
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

$('body').on('click', '.kinds_menu:not(span)', function(event) {
	var choosed_menu = $('.choosed_menu ul');
	choosed_menu.empty();
	var folder_with_images = $(this).attr('data-folder');
	var amount_images = +$(this).attr('data-amount_images');
	for(var i=1; i<=amount_images; i++){
		choosed_menu.append('\
			<li><img src="../menu/'+ folder_with_images  +'/'+i+'_little.jpg" alt="menu"></li>\
		');
	}
	
	var destination = choosed_menu.first().offset().top+100;
	$("html,body").animate({scrollTop: destination}, 'slow');
});
function add_arrow_up () {
    var top_show = 650; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
    var delay = 1000; // Задержка прокрутки
    $(window).scroll(function () { // При прокрутке попадаем в эту функцию
        /* В зависимости от положения полосы прокрукти и значения top_show, скрываем или открываем кнопку "Наверх" */
        if ($(this).scrollTop() > top_show) $('#top').fadeIn();
        else $('#top').fadeOut();
    });
    $('#top').click(function () { // При клике по кнопке "Наверх" попадаем в эту функцию
      /* Плавная прокрутка наверх */
      $('body, html').animate({
        scrollTop: 200
      }, delay);
    });
}