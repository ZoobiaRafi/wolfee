/**
* Template Name: BizLand - v3.7.0
* Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    const navbarlinks = select('#navbar .scrollto', true);

    // Define styles for the navbar when it's not fixed
    const defaultStyles = {
        logoImage: 'assets/images/favicon.png',
        backgroundColor: 'transparent',
        textColor: '#0E8BA1',
    };

    // Define styles for the navbar when it's fixed
    const fixedStyles = {
        logoImage: 'assets/images/fav-icon.png',
        backgroundColor: '#0E8BA1',
        textColor: '#FFFFFF',
    };

    const updateNavbarStyles = (fixed) => {
        const header = select('#header');
        const logoImage = select('#header .logo img');
        const navbarLinks = select('#navbar .scrollto', true);
        const navbarSimpleLinks = select('#header nav.navbar ul li a.nav-link', true);
        const navSymbols = select('#header .navbar-user i', true);
    
        // Update the logo image
        logoImage.src = fixed ? fixedStyles.logoImage : defaultStyles.logoImage;
    
        // Update the background color and text color for all navbar links
        header.style.backgroundColor = fixed ? fixedStyles.backgroundColor : defaultStyles.backgroundColor;
    
        navbarLinks.forEach(navbarLink => {
            navbarLink.style.color = fixed ? fixedStyles.textColor : defaultStyles.textColor;
        });
    
        navbarSimpleLinks.forEach(simpleLink => {
            simpleLink.style.color = fixed ? fixedStyles.textColor : defaultStyles.textColor;
        });
    
        // Update the color of each .navbar-user i element
        navSymbols.forEach(symbol => {
            symbol.style.color = fixed ? fixedStyles.textColor : defaultStyles.textColor;
        });
    };
    
    const navbarlinksActive = () => {
        let position = window.scrollY + 50;
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return;
            let section = select(navbarlink.hash);
            if (!section) return;
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active');
            } else {
                navbarlink.classList.remove('active');
            }
        });
    };

    window.addEventListener('load', () => {
        navbarlinksActive();
        updateNavbarStyles(false); // Initially, use default styles
    });

    onscroll(document, () => {
        navbarlinksActive();
        updateNavbarStyles(select('#header').classList.contains('fixed-top'));
    });

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        if (!header.classList.contains('header-scrolled')) {
            offset -= 16
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Header fixed top on scroll
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        let headerOffset = selectHeader.offsetTop
        let nextElement = selectHeader.nextElementSibling
        const headerFixed = () => {
            if ((window.scrollY) >= 60) {
                //console.log(headerOffset - window.scrollY);
                selectHeader.classList.add('fixed-top')
                nextElement.classList.add('scrolled-offset')
            } else {
                selectHeader.classList.remove('fixed-top')
                nextElement.classList.remove('scrolled-offset')
            }
        }
        window.addEventListener('load', headerFixed)
        onscroll(document, headerFixed)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function (e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Preloader
     */
    // let preloader = select('#preloader');
    // if (preloader) {
    //     window.addEventListener('load', () => {
    //         preloader.remove()
    //     });
    // }

})()