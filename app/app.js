let lastScrollTop = 0;
let activeHeroSliderImage = 0;

const heroSliderImages = ['assets/images/group-of-people-gathering-inside-bar.jpg',
    'assets/images/people-drinking-liquor-and-talking-on-dining-table-close-up.jpg',
    'assets/images/clear-wine-glass-on-table.jpg'
];

function posY(elm) {
    var test = elm,
        top = 0;

    while (!!test && test.tagName.toLowerCase() !== "body") {
        top += test.offsetTop;
        test = test.offsetParent;
    }

    return top;
}

function viewPortHeight() {
    var de = document.documentElement;

    if (!!window.innerWidth) { return window.innerHeight; } else if (de && !isNaN(de.clientHeight)) { return de.clientHeight; }

    return 0;
}

function scrollY() {
    if (window.pageYOffset) { return window.pageYOffset; }
    return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
}

function isVisible(elm) {
    var vpH = viewPortHeight(), // Viewport Height
        st = scrollY(), // Scroll Top
        y = posY(elm);

    return !(y < (vpH + st) && (y > st));
}

function setActiveSections() {
    const sections = document.querySelectorAll('.section-break');
    for (section of sections) {
        if (isVisible(section)) {
            section.classList.remove('active-section');
        } else {
            section.classList.add('active-section');
        }
    }
}

function changeProgressCircleColor(progressCircle) {
    const progressCircleClassList = (document.querySelectorAll('.progress-circle')[progressCircle]).classList;
    if (progressCircleClassList.contains('primary-color')) {
        progressCircleClassList.remove('primary-color');
        progressCircleClassList.add('third-color');
    } else if (progressCircleClassList.contains('third-color')) {
        progressCircleClassList.remove('third-color');
        progressCircleClassList.add('primary-color');
    }
}

function changeHeroImage() {
    document.querySelector('#hero-img').style.backgroundImage = `url(${heroSliderImages[activeHeroSliderImage]})`;
    changeProgressCircleColor(activeHeroSliderImage);
}

function setHeroSliderEventListeners() {
    document.querySelector('#next-icon-1').addEventListener('click', function() {
        if (activeHeroSliderImage > 0) {
            changeProgressCircleColor(activeHeroSliderImage);
            activeHeroSliderImage -= 1;
            changeHeroImage();
        }
    });
    document.querySelector('#next-icon-2').addEventListener('click', function() {
        if (activeHeroSliderImage < (heroSliderImages.length - 1)) {
            changeProgressCircleColor(activeHeroSliderImage);
            activeHeroSliderImage += 1;
            changeHeroImage();
        }
    });
}

function setSideMenuEventListeners(sideMenuClassList) {
    document.querySelector('#nav-slide-button').addEventListener('click', function() {
        if (sideMenuClassList.contains('unactive-side-menu')) {
            sideMenuClassList.remove('unactive-side-menu');
            sideMenuClassList.add('active-side-menu');
        } else if (sideMenuClassList.contains('active-side-menu')) {
            sideMenuClassList.remove('active-side-menu');
            sideMenuClassList.add('unactive-side-menu');
        }
    });
}

function setMainLayoutEventListeners(sideMenuClassList) {
    document.querySelector('#main').addEventListener('click', function() {
        if (sideMenuClassList.contains('active-side-menu')) {
            sideMenuClassList.remove('active-side-menu');
            sideMenuClassList.add('unactive-side-menu');
        }
    });
}

function setDocumentEventListeners() {
    // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
    document.addEventListener('scroll', function() { // or window.addEventListener("scroll"....
        let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        const navBar = document.querySelector('#nav-bar');
        if (st > lastScrollTop) {
            // downscroll code
            navBar.style.top = '0px';
        } else {
            // upscroll code
            navBar.style.top = '-65px';
        }
        if (st === 0) {
            navBar.style.top = '0px';
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        setActiveSections();
    });
}

function setMenuElementListener(sideMenuClassList, menuElement) {
    menuElement.addEventListener('click', function() {
        sideMenuClassList.remove('active-side-menu');
        sideMenuClassList.add('unactive-side-menu');
    });
}

function createSideMenuElement(sideMenu, menuElement) {
    const listItem = document.createElement('li');
    listItem.classList.add('side-menu-button');

    const anchor = document.createElement('a');
    anchor.textContent = menuElement.name;
    anchor.setAttribute('href', menuElement.reference);
    anchor.classList.add('font-primary-color');
    listItem.appendChild(anchor);

    setMenuElementListener(sideMenu.classList, listItem);
    sideMenu.appendChild(listItem);
}

function buildSideMenu(sideMenu) {
    const menuElements = [{
            name: 'Start',
            reference: '#hero-slider-break'
        },
        {
            name: 'Cooking Program',
            reference: '#cooking-program-break'
        },
        {
            name: 'Day Promotions',
            reference: '#day-promotions-break'
        },
        {
            name: 'Day Event',
            reference: '#day-event-break'
        },
        {
            name: 'Social Media',
            reference: '#social-media-break'
        },
        {
            name: 'Find Us',
            reference: '#find-us-break'
        }
    ];

    let breakLine;
    createSideMenuElement(sideMenu, menuElements[0]);
    for (let i = 1; i < menuElements.length; i++) {
        breakLine = document.createElement('hr');
        breakLine.classList.add('sidemenu-break-line');
        sideMenu.appendChild(breakLine);
        createSideMenuElement(sideMenu, menuElements[i]);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setDocumentEventListeners();

    setHeroSliderEventListeners();

    const sideMenu = document.querySelector('#side-menu');
    buildSideMenu(sideMenu);
    setSideMenuEventListeners(sideMenu.classList);

    setMainLayoutEventListeners(sideMenu.classList);

    setActiveSections();
});