$(function() {

    // wrap all
    //$('.chops-details-grp ul li').each(function(){
        //var $this = $(this);
        //$this.html( $this.text().replace(/(^\w+)/,'<span class="skill-dots">$1</span>') );
      //});
    //

    $('.chops-tldr ul li').on('mouseover', function() {
        $(".chops-details-grp").addClass('hide');
        $(".chops-details-grp[data-details='" + $(this).data('tldr') + "']").removeClass('hide');
    }).on('mouseout', function() {
        // TODO: actually just start timer
        //$(".chops-details-grp[data-details='" + $(this).data('tldr') + "']").addClass('hide');
    });

    // init controller
    $(window).scroll(function() {
        $(".chops-details-grp").addClass('hide');
    });


});
