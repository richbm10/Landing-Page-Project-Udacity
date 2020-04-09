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

function setSideMenuListener(sideMenu) {
    document.querySelector('#nav-slide-button').addEventListener('click', function() {
        sideMenuClassList.toggle('unactive-side-menu', (sideMenu.classList.contains('active-side-menu')));
        sideMenuClassList.toggle('active-side-menu', (sideMenu.classList.contains('unactive-side-menu')));
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const sideMenu = document.querySelector('#side-menu');
    let listItem;
    let anchor;

    for (let menuElement of menuElements) {
        listItem = document.createElement('li');
        listItem.classList.add('side-menu-button');

        anchor = document.createElement('a');
        anchor.textContent = menuElement.name;
        anchor.setAttribute('href', menuElement.reference);
        anchor.classList.add('font-primary-color');

        listItem.appendChild(anchor);
        sideMenu.appendChild(listItem);
    }

    setSideMenuListener(sideMenu);
});