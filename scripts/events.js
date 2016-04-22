//sizes in parts of screen (maximum=12)
var big_screen_events_block = 7;
var small_screen_events_block = 11;

var big_screen_menu_events_block = 4;
var small_screen_menu_events_block = 11;
var today = new Date();
var months = ["Январь", "Фефраль", "Март", "Апрель", "Май",
             "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
$(document).ready(function($) {
    if ($(window).width() > '800') {
        load_html_event_big_screen();
    }
    else{
        load_html_event_little_screen();
    }
    $(window).resize(function(){
        if ($(window).width() <= '800') {
            load_html_event_little_screen();    
        }
        if ($(window).width() > '800') {
            load_html_event_big_screen();
        }
    });

});
var  menu_events = '<div class="menu_events cell colspan'+ small_screen_events_block +'">\
                        <h4>Календарь мероприятий</h4>\
                        <span class="mif-chevron-thin-left change_month month_prev"></span>\
                        <p class="month">'+ months[today.getMonth()] + ' , ' + today.getFullYear()+'</p>\
                        <span class="mif-chevron-thin-right change_month month_next"></span>\
                        <div id="calendar"></div>\
                    </div>';

function load_html_event_big_screen(){
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
function load_html_event_little_screen(){
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
    //$('.menu_events').

}

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
            if(d.getDate()%3==0){
                table += '<td>' + d.getDate() + '</td>';
            }
            else{
                table += '<td class="evented_date">' + d.getDate() + '</td>';
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
    evented_dates_colors();

    var count_month = now_date.getMonth();
    var count_years = 0;
    $('.menu_events').on('click', '.change_month', function(event) {

        if($(this).hasClass('month_next')){
            $('.change_month').css({
                opacity: '1'
            });
            count_month++;
        }
        else{
            if(now_date.getMonth()==count_month && count_years==0){
                $(this).css({
                    opacity: '0.4'
                });
                return;
            }
            else{
                count_month--;
            }
            
        }
        
        $('#calendar').empty();
        if(count_month==12){
            count_month=0;
            count_years ++;
            generateCalendar("calendar", now_date.getFullYear() +count_years, count_month);
        }
        else{

            generateCalendar("calendar", now_date.getFullYear() +count_years, count_month);
        }
        
        $('.month').text(months[count_month] + ' , ' + (now_date.getFullYear()+count_years));
        
        evented_dates_colors();
    });
}

/*function randomInteger(min, max) {
  var rand = min + Math.random() * (max - min)
  rand = Math.round(rand);
  return rand;
}
*/

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




