$(document).ready(function(){           
    
    $('#main-menu .menu').clone().prependTo('.mobile-menu');
    
    
    /* =============================================================================
     *   Side Menu
     * ========================================================================== */

        $('.burger').click(function(){
            $('#side-menu-wrapper').addClass('open');
        });

        $('.side-menu-close-button').click(function () {
            $('#side-menu-wrapper').removeClass('open');
        });

        $( window ).resize(function () {
            if($(document.activeElement).attr('type') === 'text') {
                // Logic for while keyboard is shown
             } else {
                $('#side-menu-wrapper').removeClass('open');
             }

        });

        $("#side-menu-wrapper").click(function(){
            $('#side-menu-wrapper').removeClass('open');
        }).children().click(function(e) {
            e.stopPropagation();
        });
        $('.mobile-menu .menu li a').click(function(){
            $('#side-menu-wrapper').removeClass('open');
        });

        /* Replace Google Search Placeholder Text */
        $('#side-menu-wrapper .block-search input[type="search"]').attr('placeholder', 'Search...');

    
    $(window).scroll(function(){

        var scrollVal = getScrollTop();
            
        if(scrollVal > 1){
            $('body').addClass('fixed-header');
        }else{
            $('body').removeClass('fixed-header');
        }
    });
    
});

function getScrollTop(){
    if(typeof pageYOffset!= 'undefined'){
        //most browsers except IE before #9
        return pageYOffset;
    }
    else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return D.scrollTop;
    }
}  