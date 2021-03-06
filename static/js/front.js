/* global $this: true */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "animationsSlider" }] */

(function () {
  if ($.cookie('themeCSSpath')) {
    $('link#theme-stylesheet').attr('href', $.cookie('themeCSSpath'))
  }
  if ($.cookie('themeLayout')) {
    $('body').addClass($.cookie('themeLayout'))
  }

  var options = {
    tabletBreakpoint: 480
  }

  var state = {
    isMobile: false,
    modalIsOpen: false
  }

  $(function () {
    detectViewport()
    sliderHomepage()
    sliders()
    fullScreenContainer()
    productDetailGallery(4000)
    menuSliding()
    productDetailSizes()
    utils()
    animations()
    counters()
    demo()
    contactForm()
    speakersModal()
    programmeTabs()
    programmeModal()
  })

  var lastFocusedElement;

  function speakersModal() {
    var speakerButtons = $('[data-speaker-button]');

    speakerButtons.each(function () {
      var $this = $(this);
      var bio = $this.find('[data-bio]')[0].innerHTML;
      var imgUrl = $this.find('[data-speaker-img]')[0].src;
      var name = $this.find('[data-speaker-name]')[0].innerText;

      $this.click(function () {
        openSpeakersModal(bio, imgUrl, name);
      })
    })

    $('[data-speaker-overlay]').on('click', function () {
      closeSpeakersModal();
    })

    $('[data-speaker-close]').on('click', function () {
      closeSpeakersModal();
    })
  }

  function programmeTabs() {
    var tabs = $('[data-programme-tab]')

    tabs.each(function () {
      var $this = $(this)
      var day = $this[0].dataset.programmeTab
      var dayContent = $('.programme-' + day)

      $this.click(function () {
        var activeTab = $('.programme__tab-container.is-active')
        var activeTabContent = $('.programme__item.is-active')

        activeTab.removeClass('is-active')
        activeTabContent.removeClass('is-active')

        $this.addClass('is-active')
        dayContent.addClass('is-active')

        programmeModal();
      })
    })
  }

  function programmeModal() {
    var programmeButtons = $('[data-programme-button]');

    programmeButtons.each(function () {
      var $this = $(this);
      var name = $this.find('[data-programme-name]')[0].innerText;
      var description = $this.find('[data-programme-description]')[0].innerHTML;
      var participants = $this.find('[data-programme-participants]')[0].innerText;

  
      $this.unbind('click.modal');
      $this.bind('click.modal', function () {
        openProgrammeModal(name, description, participants);
      })
    })

    $('[data-programme-overlay]').off('click').on('click', function () {
      closeProgrammeModal();
    })

    $('[data-programme-close]').off('click').on('click', function () {
      closeProgrammeModal();
    })
  }


  $(document).keyup(function (e) {
    if (e.keyCode == 27) {
      closeSpeakersModal();
      closeProgrammeModal();
    }
  });


  function openSpeakersModal(bio, imgUrl, name) {
    state.modalIsOpen = true;

    lastFocusedElement = document.activeElement;

    $('body').addClass('overflow-hidden');

    $('[data-speaker-modal]').addClass('animated fadeIn').removeClass('display__none');
    $('[data-speaker-overlay]').removeClass('display__none');
    $('[data-speaker-close]').focus();

    $('[data-speaker-modal-img]').attr('src', imgUrl);
    $('[data-speakers-modal-bio]').html(bio);
    $('[data-speaker-modal-title]').text(name);
  }

  function openProgrammeModal(name, description, participants, label) {
    state.modalIsOpen = true;

    lastFocusedElement = document.activeElement;

    $('body').addClass('overflow-hidden');

    $('[data-programme-modal]').addClass('animated fadeIn').removeClass('display__none');
    $('[data-programme-overlay]').removeClass('display__none');
    $('[data-programme-close]').focus();
    $('[data-programme-modal-name]').text(name);
    $('[data-programme-modal-description]').html(description);
    $('[data-programme-modal-participants]').text(participants);
    $('[data-programme-modal-label]').text(label);

  }

  function closeSpeakersModal() {
    state.modalIsOpen = false;

    lastFocusedElement.focus();

    $('body').removeClass('overflow-hidden');
    $('[data-speaker-modal]').addClass('display__none');
    $('[data-speaker-overlay]').addClass('display__none');

    $('[data-speaker-modal-img]').attr('src', "");
    $('[data-speakers-modal-bio]').text("");
    $('[data-speaker-modal-title]').text("");
  }

  function closeProgrammeModal() {
    state.modalIsOpen = false;

    lastFocusedElement.focus();

    $('body').removeClass('overflow-hidden');
    $('[data-programme-modal]').addClass('display__none');
    $('[data-programme-overlay]').addClass('display__none');

    $('[data-programme-modal-name]').text("");
    $('[data-programme-modal-description]').text("");
    $('[data-programme-modal-participants]').text("");
    $('[data-programme-modal-type]').text("");
  }

  function detectViewport() {
    return state.isMobile = window.innerWidth < options.tabletBreakpoint
  }

  // Ajax contact
  function contactForm() {
    var form = $('.contact-form')
    form.submit(function () {
      $this = $(this)
      $.post($(this).attr('action'),
        $this.serialize(),
        function () {
          $this[0].reset() // clear form

          $('#contact-message')
            .html('<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>Thank you for getting in touch. We will get back to you soon!</div>')
            .fadeIn()
        }
        , 'json')
      return false
    })
  }

  /* for demo purpose only - can be deleted */
  function demo() {
    if ($.cookie('themeCSSpath')) {
      $('link#theme-stylesheet').attr('href', $.cookie('themeCSSpath'))
    }

    $('#colour').change(function () {
      if ($(this).val() !== '') {
        var themeCSSpath = 'css/style.' + $(this).val() + '.css'

        $('link#theme-stylesheet').attr('href', themeCSSpath)

        $.cookie('themeCSSpath', themeCSSpath, { expires: 365, path: '/' })
      }

      return false
    })

    $('#layout').change(function () {
      if ($(this).val() !== '') {
        var themeLayout = $(this).val()

        $('body').removeClass('wide')
        $('body').removeClass('boxed')

        $('body').addClass(themeLayout)

        $.cookie('themeLayout', themeLayout, { expires: 365, path: '/' })
      }

      return false
    })
  }

  /* slider homepage */
  function sliderHomepage() {
    if ($('#slider').length) {
      // var owl = $('#slider')

      $('#slider').owlCarousel({
        autoPlay: 3000,
        items: 4,
        itemsDesktopSmall: [900, 3],
        itemsTablet: [600, 3],
        itemsMobile: [500, 2]
      })
    }
  }

  /* sliders */
  function sliders() {
    if ($('.owl-carousel').length) {
      if (state.isMobile) {
        $('.testimonials').owlCarousel({
          items: 4,
          itemsDesktopSmall: [990, 3],
          itemsTablet: [768, 2],
          itemsMobile: [480, 1]
        })
      } else {
        $('.testimonials')
          .trigger('destroy.owl.carousel')
          .removeClass('owl-carousel')
      }

      $('.project').owlCarousel({
        navigation: true, // Show next and prev buttons
        navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        slideSpeed: 300,
        paginationSpeed: 400,
        autoPlay: true,
        stopOnHover: true,
        singleItem: true,
        afterInit: '',
        lazyLoad: true
      })

      $('.homepage').owlCarousel({
        navigation: false, // Show next and prev buttons
        navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        slideSpeed: 2000,
        paginationSpeed: 1000,
        autoPlay: true,
        stopOnHover: true,
        singleItem: true,
        lazyLoad: false,
        addClassActive: true,
        afterInit: function () {
          // animationsSlider()
        },
        afterMove: function () {
          // animationsSlider()
        }
      })
    }
  }

  /* menu sliding */
  function menuSliding() {
    $('.dropdown').on('show.bs.dropdown', function () {
      if ($(window).width() > 750) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown()
      } else {
        $(this).find('.dropdown-menu').first().stop(true, true).show()
      }
    })

    $('.dropdown').on('hide.bs.dropdown', function () {
      if ($(window).width() > 750) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp()
      } else {
        $(this).find('.dropdown-menu').first().stop(true, true).hide()
      }
    })
  }

  /* animations */
  function animations() {
    var delayTime = 0
    $('[data-animate]').css({ opacity: '0' })
    $('[data-animate]').waypoint(function () {
      delayTime += 150
      $(this).delay(delayTime).queue(function (next) {
        $(this).toggleClass('animated')
        $(this).toggleClass($(this).data('animate'))
        delayTime = 0
        next()
        // $(this).removeClass('animated')
        // $(this).toggleClass($(this).data('animate'))
      })
    }, {
        offset: '90%',
        triggerOnce: true
      })

    $('[data-animate-hover]').hover(function () {
      $(this).css({ opacity: 1 })
      $(this).addClass('animated')
      $(this).removeClass($(this).data('animate'))
      $(this).addClass($(this).data('animate-hover'))
    }, function () {
      $(this).removeClass('animated')
      $(this).removeClass($(this).data('animate-hover'))
    })
  }

  function animationsSlider() {
    var delayTimeSlider = 400

    $('.owl-item:not(.active) [data-animate-always]').each(function () {
      $(this).removeClass('animated')
      $(this).removeClass($(this).data('animate-always'))
      $(this).stop(true, true, true).css({ opacity: 0 })
    })

    $('.owl-item.active [data-animate-always]').each(function () {
      delayTimeSlider += 500

      $(this).delay(delayTimeSlider).queue(function () {
        $(this).addClass('animated')
        $(this).addClass($(this).data('animate-always'))
      })
    })
  }

  /* counters */
  function counters() {
    $('.counter').counterUp({
      delay: 10,
      time: 1000
    })
  }

  /* picture zoom */
  function pictureZoom() {
    $('.product .image, .post .image, .photostream div').each(function () {
      var imgHeight = $(this).find('img').height()
      $(this).height(imgHeight)
    })
  }

  /* full screen intro */
  function fullScreenContainer() {
    var screenWidth = $(window).width() + 'px'
    var screenHeight = '500px'

    if ($(window).height() > 500) {
      screenHeight = $(window).height() + 'px'
    }

    $('#intro, #intro .item').css({
      width: screenWidth,
      height: screenHeight
    })
  }

  function utils() {
    /* tooltips */
    $('[data-toggle="tooltip"]').tooltip()

    /* click on the box activates the radio */
    $('#checkout').on('click', '.box.shipping-method, .box.payment-method', function () {
      var radio = $(this).find(':radio')
      radio.prop('checked', true)
    })

    /* click on the box activates the link in it */
    $('.box.clickable').on('click', function () {
      window.location = $(this).find('a').attr('href')
    })

    /* external links in new window */
    $('.external').on('click', function (e) {
      e.preventDefault()
      window.open($(this).attr('href'))
    })

    /* animated scrolling */
    $('.scroll-to, .scroll-to-top').click(function (event) {
      var fullUrl = this.href
      var parts = fullUrl.split('#')

      if (parts.length > 1) {
        scrollTo(fullUrl)
        event.preventDefault()
      }
    })

    function scrollTo(fullUrl) {
      var parts = fullUrl.split('#')
      var trgt = parts[1]
      var targetOffset = $('#' + trgt).offset()
      var targetTop = targetOffset.top - 100

      if (targetTop < 0) {
        targetTop = 0
      }

      $('html, body').animate({
        scrollTop: targetTop
      }, 1000)
    }
  }

  /* product detail gallery */
  function productDetailGallery(confDetailSwitch) {
    $('.thumb:first').addClass('active')
    var timer = setInterval(autoSwitch, confDetailSwitch)

    $('.thumb').click(function (e) {
      switchImage($(this))
      clearInterval(timer)
      timer = setInterval(autoSwitch, confDetailSwitch)
      e.preventDefault()
    })

    $('#mainImage').hover(function () {
      clearInterval(timer)
    }, function () {
      timer = setInterval(autoSwitch, confDetailSwitch)
    })

    function autoSwitch() {
      var nextThumb = $('.thumb.active').closest('div').next('div').find('.thumb')
      if (nextThumb.length === 0) {
        nextThumb = $('.thumb:first')
      }
      switchImage(nextThumb)
    }

    function switchImage(thumb) {
      $('.thumb').removeClass('active')
      var bigUrl = thumb.attr('href')
      thumb.addClass('active')
      $('#mainImage img').attr('src', bigUrl)
    }
  }

  /* product detail sizes */
  function productDetailSizes() {
    $('.sizes a').click(function (e) {
      e.preventDefault()
      $('.sizes a').removeClass('active')
      $('.size-input').prop('checked', false)
      $(this).addClass('active')
      $(this).next('input').prop('checked', true)
    })
  }

  $.fn.alignElementsSameHeight = function () {
    $('.same-height-row').each(function () {
      var maxHeight = 0
      var children = $(this).find('.same-height')
      children.height('auto')

      if ($(window).width() > 768) {
        children.each(function () {
          if ($(this).innerHeight() > maxHeight) {
            maxHeight = $(this).innerHeight()
          }
        })
        children.innerHeight(maxHeight)
      }

      maxHeight = 0
      children = $(this).find('.same-height-always')
      children.height('auto')
      children.each(function () {
        if ($(this).height() > maxHeight) {
          maxHeight = $(this).innerHeight()
        }
      })
      children.innerHeight(maxHeight)
    })
  }

  var windowWidth
  $(function () {
    windowWidth = $(window).width()

    $(this).alignElementsSameHeight()
    pictureZoom()
  })

  $(window).resize(function () {
    var newWindowWidth = $(window).width()

    if (windowWidth !== newWindowWidth) {
      setTimeout(function () {
        $(this).alignElementsSameHeight()
        fullScreenContainer()
        pictureZoom()
      }, 205)
      windowWidth = newWindowWidth
    }
  })

})();
