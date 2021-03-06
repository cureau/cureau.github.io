$(function() {

    // go through and set the images for all the porfolio thumbnails
    $('.portfolio-square .proj-img').each(function(index){

        var $this = $(this),
            prefix = '/img/portfolio/',
            postfix = '175.jpeg',
            bwpostfix = '175-bw.jpeg';

        var imgID = $this.attr('data-imgID');


        $this.css('background-image', 'url("' + prefix + imgID + bwpostfix + '")');

         //preload image so there's no flicker on mouseover
        //(new Image()).src = prefix + imgID + postfix;

         //no good way AFAIK to set pseudoclass :hover background-image state dynamically
        $this.mouseenter(function(){
            var $obj = $this;
            //$obj.css('background-image', 'url("' + prefix + imgID + postfix + '")');
            $(".chops-details-grp").removeClass('show');
            $(".chops-details-grp[data-details='" + imgID + "']").addClass('show');
        }).mouseleave(function(){
            var $obj = $this;
            //$obj.css('background-image', 'url("' + prefix + imgID + bwpostfix + '")');
            $(".chops-details-grp[data-details='" + imgID + "']").removeClass('show');
        });


    });

    //$("#showcase").pin({containerSelector: "section#chops-section", padding: {top: 30, right: 0}});
    //$('#hero .down-arrow').on('click', function() {
        //var scrollHeight = $(window).height();
        //$('html, body').stop().animate({scrollTop:scrollHeight}, '1500', 'swing', function() {
            //$('#hero .down-arrow').hide();
        //});
    //});
    // wrap all
    //$('.chops-details-grp ul li').each(function(){
        //var $this = $(this);
        //$this.html( $this.text().replace(/(^\w+)/,'<span class="skill-dots">$1</span>') );
      //});
    //

    $('.chops-tldr ul li a').on('mouseover', function() {
        $(".chops-details-grp").removeClass('show');
        $(".chops-details-grp[data-details='" + $(this).parent().data('tldr') + "']").addClass('show');
    }).on('mouseout', function() {
        // TODO: actually just start timer
        if (!$(this).is(":focus")) {
            console.log('a');
            $(".chops-details-grp[data-details='" + $(this).parent().data('tldr') + "']").removeClass('show');
        }
        //$(".chops-details-grp[data-details='" + $(this).data('tldr') + "']").addClass('hide');
    }).on('click', function(){
        $(".chops-details-grp").removeClass('show');
        $(".chops-details-grp[data-details='" + $(this).parent().data('tldr') + "']").addClass('show');
    });

    // init controller
    $(window).scroll(function() {
        $(".chops-details-grp").removeClass('show');
        var wScroll = $(window).scrollTop(),
            adjScroll = (wScroll + 600) * 1.25, //adjusted for right logos to show
            h1Scroll = wScroll/3 - 1400;

            console.log((wScroll-3400)/4);
        $('.logos-wrapper').css('background-position', 'center -' + adjScroll + 'px');

        console.log(h1Scroll);
        $('#timeline-section h1').css('bottom', h1Scroll + 'px');
        drawLine();

        var showcase = $('#showcase');
        var chops = $('#chops-section');

        //console.log(wScroll);
        var chopsDiff = chops.offset().top - wScroll;
        if (chopsDiff <= 0 && chopsDiff >= -2100) {
            showcase.removeClass('positioned').addClass('floating');
            if (chopsDiff <= -1920) {
              showcase.css('top', (1950 + chopsDiff) + 'px');
            } else {
                showcase.css('top', '40px');
            }
        } else {
            showcase.removeClass('floating').addClass('positioned');
            showcase.css('top', '40px');
        }
    });

    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var $target = $(href + '-section');
        console.log($target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 1200, 'swing');
    });
    // init the line length
    drawLine(  );

    //draw the line
    function drawLine(){
        var line = document.getElementById('timeline-line'),
        tsPos = $('#timeline-section').offset().top,
        fromBottom = $(window).scrollTop() - tsPos + ($(window).height()/2),
        tHeight = $('#tvector').height();

        var percentDone = fromBottom / tHeight,
        pathLength = line.getTotalLength(),
        length = (0.15 + (percentDone*0.85)) * pathLength;

        line.style.strokeDasharray = [length, pathLength].join(' ');

        var whiteLine = document.getElementById('timeline-tail-line'),
            wPathLength = whiteLine.getTotalLength(),
            lengthDiff = length - 3075,
            wPercDone = lengthDiff > 0 ? lengthDiff / 250 : 0,
            wLength = wPercDone * 250;

        whiteLine.style.strokeDasharray = [wLength, wPathLength].join(' ');

    }

    //var $tl = $("path#timeline-line");

    //// prepare SVG
    //pathPrepare($tl);

    //// init controller
    //var controller = new ScrollMagic.Controller();

    //// build tween
    //var tween = new TimelineMax()
        //.add(TweenMax.to($tl, 15.9, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw word for 0.9
        //.add(TweenMax.to("path", 1, {stroke: "#33629c", ease:Linear.easeNone}), 0);			// change color during the whole thing

    //// build scene
    //var scene = new ScrollMagic.Scene({triggerElement: "#timeline-section", duration: 200, tweenChanges: true})
        //.setTween(tween)
        //.addTo(controller);
        ////.addIndicators() // add indicators (requires plugin)

});
