let activeHeroSliderImage = 0;
const heroSliderImages = ['assets/images/group-of-people-gathering-inside-bar.jpg',
    'assets/images/people-drinking-liquor-and-talking-on-dining-table-close-up.jpg',
    'assets/images/clear-wine-glass-on-table.jpg'
];

function createSideMenuElement(sideMenu, menuElement) {
    const listItem = document.createElement('li');
    listItem.classList.add('side-menu-button');

    const anchor = document.createElement('a');
    anchor.textContent = menuElement.name;
    anchor.setAttribute('href', menuElement.reference);
    anchor.classList.add('font-primary-color');
    listItem.appendChild(anchor);

    sideMenu.appendChild(listItem);
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

document.addEventListener('DOMContentLoaded', function() {
    const menuElements = [{
            name: 'Start',
            reference: '#hero-slider'
        },
        {
            name: 'Cooking Program',
            reference: '#cooking-program-card'
        },
        {
            name: 'Day Promotions',
            reference: '#day-promotions'
        },
        {
            name: 'Day Event',
            reference: '#day-event-card'
        },
        {
            name: 'Social Media',
            reference: '#social-media-card'
        },
        {
            name: 'Find Us',
            reference: '#find-us'
        }
    ];

    const sideMenu = document.querySelector('#side-menu');
    let breakLine;
    createSideMenuElement(sideMenu, menuElements[0]);
    for (let i = 1; i < menuElements.length; i++) {
        breakLine = document.createElement('hr');
        breakLine.classList.add('sidemenu-break-line');
        sideMenu.appendChild(breakLine);
        createSideMenuElement(sideMenu, menuElements[i]);
    }

    setMainLayoutEventListeners(sideMenu.classList);
    setHeroSliderEventListeners();
    setSideMenuEventListeners(sideMenu.classList);
});