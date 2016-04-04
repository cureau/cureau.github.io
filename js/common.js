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

    $(window).scroll(function() {
        var wScroll = $(window).scrollTop(),
            adjScroll = (wScroll + 600) * 1.25; //adjusted for right logos to show
            //h1Scroll = wScroll/3 - 1400;

        $('.logos-wrapper').css('background-position', 'center -' + adjScroll + 'px');

        $('.down-arrow').fadeOut();

        //$('#timeline-section h1').css('bottom', h1Scroll + 'px');

        drawLine();

        if (wScroll > 3297) {
            $('#bw-pic').addClass('reached');
        } else {
            $('#bw-pic').removeClass('reached');
        }

        if (wScroll > 3932) {
            $('#lza-pic').addClass('reached');
        } else {
            $('#lza-pic').removeClass('reached');
        }

        if (wScroll > 4577) {
            $('#sf-pic').addClass('reached');
        } else {
            $('#sf-pic').removeClass('reached');
        }



        var showcase = $('#showcase');
        var chops = $('#chops-section');

        var chopsDiff = chops.offset().top - wScroll;
        if (chopsDiff <= 0 && chopsDiff >= -2100) {
            showcase.removeClass('positioned').addClass('floating');
            if (chopsDiff <= -1920) {
              showcase.css('top', (1950 + chopsDiff) + 'px');
            } else {
                showcase.css('top', '30px');
            }
        } else {
            showcase.removeClass('floating').addClass('positioned');
            showcase.css('top', '30px');
        }
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
