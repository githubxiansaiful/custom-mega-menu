(function($) {
    $(document).ready(function() {

        // Menu Toggle Button
        $(document).on('click', '.menu-toggle', function() {
            if (localStorage.getItem("mainNavigation") === null) {
                localStorage.setItem('mainNavigation', $('.nav_items_holder').html());
            }

            $('body').toggleClass('overlay_class');
            $('#procurementtactics-site-navigation').toggleClass('toggled');
        });

        // Close menu on overlay click
        $(document).on('click', '.mobile_overlay', function() {
            $('body').removeClass('overlay_class');
            $('#procurementtactics-site-navigation').removeClass('toggled');
        });

        // Scroll Effects
        $(window).scroll(function() {
            const header_top_height = 190;
            const scrollPos = $(window).scrollTop();
            
            $('body').toggleClass("scroll1_down", scrollPos > header_top_height);
            $('body').toggleClass("scroll_up", scrollPos <= header_top_height);
            $('body').toggleClass("scroll_down_mobile", scrollPos > 50);
        });

        // Desktop Version - Navigation Hover (removed click, used hover)
        $(document).on('mouseenter', '.main-new-navigation-item:not(.course-nav,.pricing-nav,.teams-nav)', function() {
            if ($(window).width() > 768) {  // Ensure this only works on desktop
                const $elem = $(this).closest('.main-new-navigation-item');
                const isActive = $elem.hasClass('active-nav-item');
                $elem.toggleClass('active-nav-item', !isActive).siblings().removeClass('active-nav-item');
                
                $('.subnav_items_holder').toggleClass('active-subnav-holder', !isActive);
                const index = $elem.index('.main-new-navigation-item');
                $('.subnav_items_holder .subnav_holder').eq(index).toggleClass('active-subnav-holder-item', !isActive).siblings().removeClass('active-subnav-holder-item');
            }
        });

        // Close navigation when the mouse leaves the #pro-main-header (only for desktop)
$(document).ready(function() {
    $('#pro-main-header').on('mouseleave', function() {
        if ($(window).width() > 768 && $('.subnav_items_holder').hasClass('active-subnav-holder')) {
            $('.main-new-navigation-item').removeClass('active-nav-item');
            $('.subnav_items_holder').removeClass('active-subnav-holder').find('.subnav_holder').removeClass('active-subnav-holder-item');
        }
    });
});

        // Mobile Navigation Clicks
        $(document).on('click', '.main-new-navigation-item.list_left:not(.course-nav,.pricing-nav)', function() {
            if ($(window).width() <= 768) {  // Ensure this only works on mobile
                updateMobileNavigation($(this));
            }
        });

        $(document).on('click', '.main-new-navigation-item.content_left', function() {
            if ($(window).width() <= 768) {  // Ensure this only works on mobile
                updateMobileNavigation($(this));
            }
        });

        // Back Button in Mobile Navigation
        $(document).on('click', '.back_main', function() {
            if ($(window).width() <= 768) {  // Ensure this only works on mobile
                $('.nav_items_holder').html(localStorage.getItem("mainNavigation"));
            }
        });

        // Mobile sub-navigation arrow clicks
        $(document).on('click', '.subnav-arrow, .nav_left_column > a', function(e) {
            e.preventDefault();
            const $parent = $(this).closest('.nav_left_column');
            const index = $parent.closest('.nav_items_holder').find('.before_list').attr('index-val');
            const listIndex = $parent.index();
            updateSubNavigationContent(index, listIndex, $parent.hasClass('get_team_license_item'));
        });

        // Back Button in Sub Navigation
        $(document).on('click', '.back_sub', function() {
            const index = $(this).closest('.before_list').attr('index-val');
            const content = buildMainContent(index);
            $('.nav_items_holder').html(content);
        });

        // Initialize Sub Menu Toggles
        $('.nav_items_holder .menu-main-menu-container ul > .menu-item-has-children').prepend('<i class="next-level-button"></i>');

        $(document).on('click', '.menu-main-menu-container > ul > li > i', function() {
            const $elem = $(this).closest('.menu-item-has-children');
            $elem.toggleClass('toggle_subnav').children('.sub-menu').slideToggle();
        });
    });

    // Helper functions
    function updateMobileNavigation($element) {
        const index = $element.index('.main-new-navigation-item');
        const subItemText = $element.text();
        const $content = buildMobileContent(index, subItemText);
        $('.nav_items_holder').html($content);
    }

    function updateSubNavigationContent(index, listIndex, isTeamLicense) {
        const subItemText = $('.sub_item').text() + ': ' + $(this).closest('.nav_left_column').find('a').text();
        const content = buildSubContent(index, listIndex, isTeamLicense, subItemText);
        $('.nav_items_holder').html(content);
    }

    function buildMobileContent(index, subItemText) {
        const backButton = '<div class="back_main"><i class="fa-solid fa-chevron-left"></i>Back</div>';
        const subItem = `<div class="sub_item">${subItemText}</div>`;
        const beforeList = `<div class="before_list" index-val="${index}">${backButton}${subItem}</div>`;
        return beforeList + $('.subnav_items_holder .subnav_holder').eq(index).html();
    }

    function buildSubContent(index, listIndex, isTeamLicense, subItemText) {
        const backButton = '<div class="back_sub"><i class="fa-solid fa-chevron-left"></i>Back</div>';
        const beforeList = `<div class="before_list" index-val="${index}">${backButton}<div class="sub_item">${subItemText}</div></div>`;
        const content = $('.subnav_items_holder .subnav_holder').eq(index).find('.nav_right_column_top .nav_right_column').eq(listIndex).html();
        const buttonsBottom = isTeamLicense ? '' : '<div class="after_list">' + $('.nav_right_column_bottom').html() + '</div>';
        return beforeList + '<div class="list_holder">' + content + '</div>' + buttonsBottom;
    }

    function buildMainContent(index) {
        const backButton = '<div class="back_main"><i class="fa-solid fa-chevron-left"></i>Back</div>';
        const subItem = `<div class="sub_item">${index == 1 ? 'Courses' : 'For Teams'}</div>`;
        const beforeList = `<div class="before_list" index-val="${index}">${backButton}${subItem}</div>`;
        return beforeList + $('.subnav_items_holder .subnav_holder').eq(index).find('.nav_left_holder').html();
    }

})(jQuery);