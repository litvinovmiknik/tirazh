import '../blocks/nav/nav.js';
import '../blocks/catalog-nav/catalog-nav.js';
import '../blocks/banner/banner.js';
import '../blocks/portfolio-slider/portfolio-slider.js';
import '../blocks/reviews-slider/reviews-slider.js';
import '../blocks/news-slider/news-slider.js';
import '../blocks/help/help.js';
import '../blocks/paper/paper.js';
import '../blocks/product-slider/product-slider.js';
import '../blocks/file-upload/file-upload.js';

// Set current year
$(function() {
    const year = new Date().getFullYear();
    $('.year').text(year);
});

// Tabs
$(function() {
    $('ul.tabs__caption').each(function(i) {
        var storage = localStorage.getItem('tab' + i);
        if (storage) {
            $(this).find('li').removeClass('active').eq(storage).addClass('active')
            .closest('div.tabs').find('div.tabs__content').removeClass('active').eq(storage).addClass('active');
        }
    });
   
    $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
        $(this)
        .addClass('active').siblings().removeClass('active')
        .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
        var ulIndex = $('ul.tabs__caption').index($(this).parents('ul.tabs__caption'));
        localStorage.removeItem('tab' + ulIndex);
        localStorage.setItem('tab' + ulIndex, $(this).index());
    });
});
