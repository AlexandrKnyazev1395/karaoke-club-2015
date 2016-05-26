$(document).ready( function() {
    
	
});
$('body').on('mouseover', '#our_team li', function(event) {
    $(this).children('.first_portret').hide();
    $(this).children('.second_portret').show();
    $(this).children('img').css('borderRadius', '100%');
});
$('body').on('mouseleave', '#our_team li', function(event) {
    $(this).children('.first_portret').show();
    $(this).children('.second_portret').hide();
    $(this).children('img').css('borderRadius', '0%');
});