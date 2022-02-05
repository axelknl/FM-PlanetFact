//recuperation des container des images
var overview = document.getElementById('overview');
var internal = document.getElementById('internal');
var surface = document.getElementById('surface');

//recuperation des images
var imgOverview = document.getElementById('overview-img');
var imgInternal = document.getElementById('internal-img');
var imgSurface = document.getElementById('surface-img');


//recuperation du titre, description et de la source
var title = document.getElementById('p-title');
var description = document.getElementById('p-desc');
var source = document.getElementById('p-link');

//recuperation des keypoint
var rotation = document.getElementById('p-rotation');
var revolution = document.getElementById('p-revolution');
var radius = document.getElementById('p-radius');
var temp = document.getElementById('p-temp');

var dataTab;
var colorTab = ['#419EBB','#EDA249','#6f2ed6','#D14C32','#D83A34','#CD5120','#1ec2a4','#2d68f0'];

var actualPlanet = 0;

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        dataTab = data;
        })


function changeView(option) {

    if (option == 1) {
        overview.style.display = 'unset'
        internal.style.display = 'none'
        surface.style.display = 'none'

        description.innerHTML = dataTab[actualPlanet].overview.content;
        source.setAttribute("href", dataTab[actualPlanet].overview.source);
    } else if (option == 2) {
        overview.style.display = 'none'
        internal.style.display = 'unset'
        surface.style.display = 'none'

        description.innerHTML = dataTab[actualPlanet].structure.content;
        source.setAttribute("href", dataTab[actualPlanet].structure.source);
    } else {
        overview.style.display = 'unset'
        internal.style.display = 'none'
        surface.style.display = 'unset'

        description.innerHTML = dataTab[actualPlanet].geology.content;
        source.setAttribute("href", dataTab[actualPlanet].geology.source);
    }
}

var tab = document.getElementsByClassName('menu--item')

for (var i = 0; i < tab.length; i++) {
    tab[i].addEventListener('click', changeData);
}


function changeData(value) {
    var planet;
    if (window.innerWidth > 650) {
        planet = this.innerHTML;
    } else {
        planet = value;
        openMenu();
    }
    var root = document.documentElement;
    for (var i = 0; i < dataTab.length; i++) {
        if (planet == dataTab[i].name) {
            root.style.setProperty('--button-active', colorTab[i]);
            actualPlanet = i;

            title.innerHTML = dataTab[i].name;
            title.style.textTransform = 'uppercase';

            description.innerHTML = dataTab[i].overview.content;
            source.setAttribute("href", dataTab[i].overview.source);

            imgOverview.setAttribute("src", dataTab[i].images.planet)
            imgInternal.setAttribute("src", dataTab[i].images.internal)
            imgSurface.setAttribute("src", dataTab[i].images.geology)

            rotation.innerHTML = dataTab[i].rotation;
            revolution.innerHTML = dataTab[i].revolution;
            radius.innerHTML = dataTab[i].radius;
            temp.innerHTML = dataTab[i].temperature;

        }
    }
}

var menu = false;

function openMenu() {
    if (menu == false) {
        menu = true;
        document.getElementById('m-menu').style.display = 'block';
        document.getElementById('mobileButton').style.opacity = '0.25';
        document.getElementById('m-view').style.display = 'none';
        document.getElementById('container').style.display = 'none';
    } else {
        menu = false;
        document.getElementById('m-menu').style.display = 'none';
        document.getElementById('mobileButton').style.opacity = '1';
        document.getElementById('m-view').style.display = 'flex';
        document.getElementById('container').style.display = 'block';
    }
}
    