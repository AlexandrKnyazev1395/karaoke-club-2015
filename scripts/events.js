//sizes in parts of screen (maximum=12)
var big_screen_events_block = 7;
var small_screen_events_block = 11;
var big_screen_menu_events_block = 4;
var small_screen_menu_events_block = 11;

var today = new Date();
var months = ["Январь", "Фефраль", "Март", "Апрель", "Май",
             "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

var all_events_dates = [];  //здесь хранятся даты всех мероприятий из бд

$(document).ready(function($) {
    load_content_page();
    load_events_dates();
    load_events();
    add_arrow_up(); // стрелка вверх при прокрутке страницы вниз
});



function load_content_page(){
    if ($(window).width() > '800') {
        load_html_event_menu_big_screen();
    }
    else{
        load_html_event_menu_little_screen();
    }
    $(window).resize(function(){
        if ($(window).width() <= '800') {
            load_html_event_menu_little_screen();    
        }
        if ($(window).width() > '800') {
            load_html_event_menu_big_screen();
        }
    });
}

function load_events_dates(){
    $.ajax({
            url: '/php/all_events_dates.php',
            dataType: 'json',
            success: function(result) { //If all good
                //вставка мероприятий из бд на страницу
                for(var i =0; i<result.length; i++){
                    all_events_dates.push(result[i]);
                }
                create_calendar();
            },
            error: function(log) { //If all bad
                                
            },

    });
}
//по url определяем - есть ли в нем айди ( для подгрузки мероприятий согласно айди или если его нет - в хрон. порядке)
function def_send_id(){
    var current_url = location.href;
    var event_id = current_url.search('=');
    if(event_id!=-1){
        return current_url.substr(event_id + 1);
    }
    else{
        return false;
    }
}
function load_events(){
    var event_basic = $('.event_basic').clone();
    event_basic.removeClass('event_basic');
    $.ajax({
            url: '/php/events.php',
            type : 'post',
            dataType: 'json',
            data: {'id_event': def_send_id()},
            success: function(result) { //If all good
                //проверка для "хлебной крошки"
                if(result[result.length-1].check ==0){

                }
                else{
                    $('#event_header').children('span').empty();
                    $('#event_header').children('span').append('' + result[result.length-1].check + '');
                }
                //вставка мероприятий из бд на страницу, -1 потому что в последнем элементе - прост переменная check
                for(var i =0; i<result.length-1; i++){
                    var current_event = event_basic.clone();
                    //заголовок ивента
                    current_event.children('.tittle_event').append(result[i].title_event);
                    //описание ивента
                    current_event.children('.description_event').append(result[i].desc_event);
                    //дата ивента и время
                    var date_ev = new Date(result[i].date_event);
                    var day_ev =  date_ev.getDate();
                    if(day_ev<10)
                        day_ev = "0" + day_ev;
                    var month_ev = (date_ev.getMonth()+1);
                    if(month_ev<10)
                        month_ev = "0" +month_ev;
                    current_event.children('div').children('.event_date').append("" + day_ev +"-"+ month_ev +
                        "-" + date_ev.getFullYear() + " , " + 
                        result[i].time_event.substr(0, result[i].time_event.length - 3));
                    current_event.children('.poster_event').attr('src', '/posters/'+ result[i].poster_event + '');
                    $('.events').append(current_event);
                }
            },
            error: function(log) { //If all bad
                                 
            },

    });
}

var  menu_events = '<div class="menu_events cell colspan'+ small_screen_events_block +'">\
                        <h4>Календарь мероприятий</h4>\
                        <span class="mif-chevron-thin-left change_month month_prev"></span>\
                        <p class="month">'+ months[today.getMonth()] + ' , ' + today.getFullYear()+'</p>\
                        <span class="mif-chevron-thin-right change_month month_next"></span>\
                        <div id="calendar"></div>\
                    </div>';

function load_html_event_menu_big_screen(){
    $('#show_calendar_button').remove();
    $('.menu_events').remove();
    $('.events').after(menu_events);
    $('.menu_events').show();

    $('.menu_events').removeClass('colspan' + small_screen_menu_events_block +'');
    $('.menu_events').addClass('colspan' + big_screen_menu_events_block +'');

    $('.events').removeClass('colspan' + small_screen_events_block +'');
    $('.events').addClass('colspan' + big_screen_events_block +'');
    create_calendar();
}
function load_html_event_menu_little_screen(){
    $('.menu_events').remove();
    $('.events').before(menu_events);

    $('.menu_events').removeClass('colspan' + big_screen_menu_events_block  +'');
    $('.menu_events').addClass('colspan' + small_screen_menu_events_block +'');

    $('.menu_events').hide();
    if(!$('*').is('#show_calendar_button')){
        $('.menu_events').before('<button class="button" id="show_calendar_button">Показать календарь мероприятий</button>');
    }
    $('#events_block').on('click', '#show_calendar_button', function(event) {
        $('.menu_events').slideDown('fast');
    });
    $('.events').removeClass('colspan' + big_screen_events_block +'');
    $('.events').addClass('colspan' + small_screen_events_block +'');
    create_calendar();

}

//создание календаря

function create_calendar(){
    function generateCalendar(id, year, month) {
        var elem = document.getElementById(id);
        var d = new Date(year, month);
        var table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>\
                    чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

      // заполнить первый ряд от понедельника
      // и до дня, с которого начинается месяц
      // * * * | 1  2  3  4
        for (var i = 0; i < getDay(d); i++) {
            table += '<td></td>';
        }

      // ячейки календаря с датами
        while (d.getMonth() == month) {
            var day_ev =  d.getDate();
            if(day_ev<10)
                day_ev = "0" + day_ev;
            var month_ev = (d.getMonth()+1);
            if(month_ev<10)
                month_ev = "0" +month_ev;
            var current_calendar_date = (d.getFullYear() + "-" + month_ev+ "-"  + day_ev);

            if(all_events_dates.indexOf(current_calendar_date)==-1)
            {
                table += '<td>' + d.getDate() + '</td>';
            }    
            else{
                table += '<td id="'+ current_calendar_date +'" class="evented_date"><a>' + d.getDate() + '</a></td>';
            }
            
            if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
                table += '</tr><tr>';
            }
            d.setDate(d.getDate() + 1);
        }

      // добить таблицу пустыми ячейками, если нужно
        if (getDay(d) != 0) {
            for (var i = getDay(d); i < 7; i++) {
                table += '<td></td>';
            }
        }
      // закрыть таблицу
        table += '</tr></table>';

        // только одно присваивание innerHTML
        elem.innerHTML = table;
    }


    function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
        var day = date.getDay();
        if (day == 0) day = 7;
        return day - 1;
    }


    var now_date = new Date();
    generateCalendar("calendar", now_date.getFullYear(), now_date.getMonth());
    evented_dates_colors(); // окрасить даты, в которые будут мероприятия, разными цветами в календаре

    //счетчики для перелистывания календаря
    var count_month = now_date.getMonth(); 
    var count_years = 0;
    
    //клик на стрелке влево или вправо в календаре
    $('.menu_events').on('click', '.change_month', function(event) {

        if($(this).hasClass('month_next')){
            if(count_month==11 && count_years==1){
                $(this).css({
                    opacity: '0.4'
                });
                return;
            }
            $('.change_month').css({
                opacity: '1'
            });
            if(count_month==11){
                count_month=0;
                count_years ++;
            }
            else{
                count_month++; 
            }
            
        }
        else{
            //условие не позволяет прокучивать календарь на прошедшие месяцы
            if(now_date.getMonth()==count_month && count_years==0){
                $(this).css({
                    opacity: '0.4'
                });
                return;
            }
            else{
                if(count_month==0){
                    count_month = 11;
                    count_years--;
                }
                else{
                   count_month--; 
                }
                
            }
            
        }
        $('#calendar').empty();
        generateCalendar("calendar", now_date.getFullYear() +count_years, count_month);
        
        $('.month').text(months[count_month] + ' , ' + (now_date.getFullYear()+count_years));
        
        evented_dates_colors();
    });
}


function evented_dates_colors(){
    var arr_colors = [];
    opacity_calendar_dates = 0.7;
    var calendar_blocks = $('#calendar th');
    for(var i=0; i<calendar_blocks.length;i++){
        var color = randomColor({luminosity:'bright'});
        calendar_blocks.eq(i).css({
            backgroundColor: color
        });
    }
    var evented_dates = $('.evented_date'); 
    evented_dates.each(function(index, el) {
        var color_date = randomColor({
           luminosity: 'bright',
           format: 'rgbArray'
        });
        arr_colors.push(color_date);
        $(this).css({
            backgroundColor: 'rgba(' + arr_colors[index].toString() + ',' + opacity_calendar_dates+')'
        });

        $(this).hover(function() {
            $(this).css({
                backgroundColor: 'rgba(' + arr_colors[index].toString() + ',1)'
            });
        }, function() {
             $(this).css({
                backgroundColor: 'rgba(' + arr_colors[index].toString() + ',' + opacity_calendar_dates+')'
            });
        });

    });
    
}



$('body').on('click', '.evented_date', function(event) {
    var id_event = $(this).attr('id');
    window.location.href = "events.html?id_event="+id_event+"";
});

function add_arrow_up () {
    var top_show = 750; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
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