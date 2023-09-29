$(document.body).ready(function (e) {
    var notification = localStorage.getItem('notification');
    if(notification == null){
        $('.notification').removeClass('hide');
    }
});

$(document.body).on('click', '.mobile-nav-toggler', function (e) {
    $('.right-sidebar').toggle();
    if ($(document.body).hasClass('disabled')) {
        $(document.body).addClass('enabled').removeClass('disabled');
        $(e.currentTarget).find('.fa').addClass('fa-bars').removeClass('fa-close');
    }
    else {
        $(document.body).addClass('disabled').removeClass('enabled');
        $(e.currentTarget).find('.fa').removeClass('fa-bars').addClass('fa-close');
    }
});

$(document).on('click', '.close', function (e) {
    $(this).closest('.notification').remove();
    localStorage.setItem('notification', false);
});

$(document.body).on('click', '.mobile-nav-toggler', function(e){
    $('.right-sidebar').toggle();
    if($(document.body).hasClass('disabled')){
        $(document.body).addClass('enabled').removeClass('disabled');
        $(e.currentTarget).find('.fa').addClass('fa-bars').removeClass('fa-close');
    }
    else{
        $(document.body).addClass('disabled').removeClass('enabled');
        $(e.currentTarget).find('.fa').removeClass('fa-bars').addClass('fa-close');
    }
});

$(document.body).on('click', '.close', function(e){
    var target = $(e).currentTarget;
    target.find('.notification').remove();
});