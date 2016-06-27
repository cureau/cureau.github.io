$(function() {

    var swapChopsGroup = function(jGroup) {
        $(".chops-details-grp").removeClass('show').css('z-index', '40');
        jGroup.addClass('show').css('z-index', 100);
    };

    $('.chops-tldr ul li a').on('click', function() {
      $('.portfolio-square').removeClass('focused');
      var group = $(".chops-details-grp[data-details='" + $(this).parent().data('tldr') + "']");
      swapChopsGroup(group);
    });

    $('.close-x').on('click', function() {
        $(".chops-details-grp").removeClass('show').css('z-index', '40');
    });

    // go through and set the images for all the porfolio thumbnails
    $('.portfolio-square .proj-img').each(function(index){

        var $this = $(this),
            bwpostfix = '175-bw';

        var imgID = $this.attr('data-imgID');

        //$this.css('background-image', 'url("' + prefix + imgID + bwpostfix + '")');
        $this.addClass(imgID + bwpostfix);

         //preload image so there's no flicker on mouseover
        //(new Image()).src = prefix + imgID + postfix;

         //no good way AFAIK to set pseudoclass :hover background-image state dynamically
        $this.on('click', function(e){
            $('.portfolio-square').removeClass('focused');
            $(this).parent().addClass('focused');
            var group = $(".chops-details-grp[data-details='" + imgID + "']");
            swapChopsGroup(group);
        });

    });

    var sfPic = $('#sf-pic'),
        lzaPic = $('#lza-pic'),
        bwPic = $('#bw-pic'),
        downArrow = $('.down-arrow');


    $(window).scroll(function() {
        var wScroll = $(window).scrollTop();
            //adjScroll1 = (wScroll + 0) * .5, //adjusted for right logos to show
            //adjScroll2 = (wScroll + 1400) * .5, //adjusted for right logos to show
            //adjScroll3 = (wScroll + 1000) * 1; //adjusted for right logos to show
            ////h1Scroll = wScroll/3 - 1400;

        //$('.logos-wrapper:nth-child(1)').css('background-position', 'center -' + adjScroll1 + 'px');
        //$('.logos-wrapper:nth-child(2)').css('background-position', 'center -' + adjScroll2 + 'px');
        //$('.logos-wrapper:nth-child(3)').css('background-position', 'center -' + adjScroll3 + 'px');

        downArrow.fadeOut();

        //$('#timeline-section h1').css('bottom', h1Scroll + 'px');

        drawLine();


        if (wScroll > 2) {
            bwPic.addClass('reached');
        } else {
            bwPic.removeClass('reached');
        }

        if (wScroll > 1) {
            lzaPic.addClass('reached');
        } else {
            lzaPic.removeClass('reached');
        }

        if (wScroll > 0) {
            sfPic.addClass('reached');
        } else {
            sfPic.removeClass('reached');
        }



        // NOTE: THIS SECTION ANCHORS THE SHOWCASE TAG TO THE TOP
        // BUT I'M TURNING IT OFF BECAUSE OPL GUY SAID TO AND
        // I'M A SHEEP
        //
        //var showcase = $('#showcase');
        //var chops = $('#chops-section');

        //var chopsDiff = chops.offset().top - wScroll;

        ////console.log($(window).width());
        //if ($(window).width() > 1024) {
            //if (chopsDiff <= 0 && chopsDiff >= -2100) {
                //showcase.removeClass('positioned').addClass('floating');
                //if (chopsDiff <= -1920) {
                  //showcase.css('top', (1950 + chopsDiff) + 'px');
                //} else {
                    //showcase.css('top', '30px');
                //}
            //} else {
                //showcase.removeClass('floating').addClass('positioned');
                //showcase.css('top', '30px');
            //}
        //}
    });

    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var $target = $(href + '-section');

        if (typeof $target.offset() !== 'undefined') {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 1200, 'swing');
        }
    });

    // init the line length
    drawLine();

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


});
