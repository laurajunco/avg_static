(function ($, root, undefined) {
  const runScripts = () => {

    const circleTag = document.querySelector(".fixed-circle")
    const upBtnTag = document.querySelector(".subir")
    const navBarTag = document.querySelector(".site-branding-mobile")

    /* menu mobile */
    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        navBarTag.style.top = "0";
      } else if (window.pageYOffset > 59) {
        navBarTag.style.top = "-60px";
      }
      prevScrollpos = currentScrollPos;
    }

    /* Menu mobile */
    $('.burguer').on('click', function() {
      $('.main-navigation-mobile').show();
      return false;
    })

    $('.main-navigation-mobile, .close-mobile-menu').on('click', function() {
      $('.main-navigation-mobile').hide();
    })
 
    /* Modal */
    $('.open-modal').on('click', function() {
      $('.modal-img-content').html($(this).html());  
      $('footer').hide();
      $('.modal-img').show();
      $('html').css('overflow', 'hidden');
      if (window.innerWidth <= 767) {
        $('.site-branding-mobile').hide();
      }
      return false;
    })

    $('.open-modal-obj').on('click', function() {
      const currentHtml = $(this).html()
      $('.modal-img-content').html($(this).find("img")[0]);  
      $(this).html(currentHtml)
      $('.modal-img').show();
      $('footer').hide();
      $('html').css('overflow', 'hidden');
      if (window.innerWidth <= 767) {
        $('.site-branding-mobile').hide();
      }
      return false;
    })

    $('.modal-img-close, .modal-img-background, .modal-img-content').on('click', function() {
      $('.modal-img').hide();
      $('footer').show();
      $('html').css('overflow', 'auto');
      if (window.innerWidth <= 767){
        $('.site-branding-mobile').show();
      }
      return false;
    })

    /* Circulo odeón */
    if (circleTag) {
      document.addEventListener("scroll", function() {
        const pixels = Math.floor(window.pageYOffset)
        if (window.innerWidth > 767) {
          circleTag.style.transform = `translate(-50%, -50%) rotate(${pixels/10}deg)`
        } else {
          circleTag.style.transform = `translate(0, 0) rotate(-109deg)`
        }
      })
    }
    
    /* Subir */
    if (upBtnTag) {
      upBtnTag.addEventListener("click", function() {
        window.scrollTo({top: 0,behavior: "smooth"});
      })
    }
    
    /* VH */
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    /* galeria modal */
    $('.galeria').on('init', function() {
      const slickClones = document.querySelectorAll(".slick-slide")
      slickClones.forEach(clone => {
        $(clone).on('click', function() {
          $('.modal-img-content').html($(this).html());  
          $('footer').hide();
          $('.modal-img').show();
          $('html').css('overflow', 'hidden');
          if (window.innerWidth <= 767) {
            $('.site-branding-mobile').hide();
          }
          return false;
        })
      })
    });
    
    /* galeria carrousel */
    $('.galeria').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: $('#objetos-prev'),
      nextArrow: $('#objetos-next'),
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          }
        }
      ]
    });

    /* subir la gente */
    $('.la-gente-galeria').on('init', function() {
      const slickClones = document.querySelectorAll(".slick-slide")
      slickClones.forEach(clone => {
        const grupo = clone.querySelector(".grupo")
        const subirTag = clone.querySelector(".subir-gente")

        subirTag.addEventListener("click", () => {
          grupo.scrollTo({top: 0,behavior: "smooth"});
        })
      })
    });

    /* la gente carrousel */
    $('.la-gente-galeria').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      swipe: true, 
      touchMove: true,
      prevArrow: $('.left-arrow-la-gente'),
      nextArrow: $('.right-arrow-la-gente'),
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 767,
          settings: "unslick"
        }
      ]
    });

    /* acordeon la gente mobile */
    $('.la-gente-galeria .group-title').on('click', function() {
      const parent = $(this).parent();
      const content = parent.find('.group-content');

      if (parent.hasClass("open")) {
        parent.removeClass("open")
        content.animate({maxHeight: "0px"})
      } else {
        parent.addClass("open")
        content.animate({maxHeight: "8000px"})
      }
    });

    /* subir galeria la gente mobile */
    const gruposGaleria = document.querySelectorAll(".la-gente .grupo")
      gruposGaleria.forEach( grupo => {
        const subirTag = grupo.querySelector(".subir-gente")
        subirTag.addEventListener("click", () => {
          window.scrollTo({top: grupo.offsetTop ,behavior: "smooth"});
        })
      })
  }

  runScripts()

  /* BARBA */
  const bodyTag = document.querySelector("body")

  barba.use(barbaCss)

  barba.init({
    transitions: [
      {
        name: "fade",
        afterEnter() {
          runScripts()
          scrolltop()
        },
        beforeLeave({next})  {
          selectNav(next)
        },
        beforeEnter() {
          hideElems()
        }
      }
    ],
    views: [
      {
        namespace: "single",
        beforeEnter() {
          bodyTag.classList.add("single");
          bodyTag.classList.remove("blog");
        },
        beforeLeave() {
          bodyTag.classList.remove("single");
          bodyTag.classList.add("blog");
        }
      },
      {
        namespace: "gente",
        beforeEnter() {
          bodyTag.classList.add("single");
          bodyTag.classList.remove("blog");
          bodyTag.classList.add("page-id-297");
        },
        beforeLeave() {
          bodyTag.classList.remove("single");
          bodyTag.classList.add("blog");
          bodyTag.classList.add("page-id-297");
        }
      }
    ]
  })

  const scrolltop = () => {
    window.scrollTo({top: 0, behavior:"smooth"})
  }

  const selectNav = (next) => {

    const headerLinks = document.querySelectorAll(".menu .menu-item a")
    const href = next.url.href

    headerLinks.forEach(link => {
      if(link.getAttribute("href") === href) {
        link.parentNode.classList.add("current-menu-item")
      } else {
        link.parentNode.classList.remove("current-menu-item")
      }
    })
  }

  const hideElems = () => {
    const  hideSmall = document.querySelectorAll(".hide-on-small");
    const  showSmall = document.querySelectorAll(".show-on-small");
    
    hideSmall.forEach(tag => {
      if (window.innerWidth <= 992) {
        tag.style.display = "none"
      } else {
        tag.style.display = "block"
      }
    })

    showSmall.forEach(tag => {
      if (window.innerWidth <= 992) {
        tag.style.display = "block"
      } else {
        tag.style.display = "none"
      }
    })
  }

})(jQuery, this);  

