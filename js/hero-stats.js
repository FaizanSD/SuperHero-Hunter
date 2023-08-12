var appearence = document.getElementById('appearence');
var heroImg = document.getElementById('image');
var profession = document.getElementById('profession');
var imgDiv = document.getElementsByClassName('img-card')[0];
let h1 = document.getElementById('hero-name');


window.onload = function(){
    let winurl = window.location.href;
    console.log(winurl);
    let ShId = winurl.substring(winurl.lastIndexOf('=') + 1);
    console.log(ShId);
    retriveHero(ShId);    
}

function retriveHero (ShId) {
  fetch('https://www.superheroapi.com/api.php/1358348604650444/'+ShId)
        .then(function (e) {
            return e.json();
        })
        .then(function (hero) {
            console.log("hero", hero);
            // console.log(hero.image.url);
            printHeroStats(hero);
            return hero;
        })
}


const printHeroStats = (hero) => {
    h1.innerHTML = `${hero.name}`;

    var ulAppearance = document.createElement('ul');
    var ulProfession = document.createElement('ul');

    heroImg.src = hero.image.url;
    ulAppearance.innerHTML = 
        `  
            <li><strong class="strong">Gender:&nbsp;</strong>${hero.appearance.gender}</li>
            <li><strong>Race:&nbsp;</strong>${hero["appearance"]["race"]}</li>
            <li><strong>Hair-Color :&nbsp;</strong>${hero['appearance']['hair-color']}</li>
            <li><strong>Height:&nbsp;</strong>${hero.appearance.height}</li>
            <li><strong>Eye-Color:&nbsp;</strong>${hero["appearance"]["eye-color"]}</li>
            <li><strong>Weight:&nbsp;</strong>${hero.appearance.weight}</li>
            
            <li><strong>Aliases: </strong>[${hero["biography"]["aliases"]}]</li>
            <li><strong>Alignment: </strong>${hero.biography.alignment}</li>
            <li><strong>Alter-Egos: </strong>${hero["biography"]["alter-egos"]}</li>
            <li><strong>First-Appearance: </strong>${hero["biography"]["first-appearance"]}</li>
            <li><strong>Full-Name: </strong>${hero["biography"]["full-name"]}</li>
            <li><strong>Place-Of-Birth: </strong>${hero["biography"]["place-of-birth"]}</li>
            <li><strong>Publisher: </strong>${hero["biography"]["publisher"]}</li>
         `
    ;
    appearence.appendChild(ulAppearance);

    ulProfession.innerHTML = 
        `
        <li id="combat"> <strong>Combat: </strong>${hero.powerstats.combat}</li>
        <li id="durability"> <strong>Durability: </strong>${hero.powerstats.durability}</li>
        <li id="intellgence"> <strong>Intelligence: </strong>${hero.powerstats.intelligence}</li>
        <li id="power"> <strong>Power: </strong>${hero.powerstats.power}</li>
        <li id="strenght"> <strong>Strenght: </strong>${hero.powerstats.strenght}</li>
        <li id="group-affiliation"> <strong>Aliases: </strong>${hero.connections.grouaffiliation}</li>
        <li id="relatives"> <strong>Aliases: </strong>${hero.connections.relatives}</li>
        <li id="occupation"> <strong>Aliases: </strong>${hero.work.occupation}</li>
        <li id="base"> <strong>Aliases: </strong>${hero.work.base}</li>
         `
    ;
    profession.appendChild(ulProfession);
}

/* 
    
    
                
                :hover{
                    background: rgba(0,118,255,0.9);
                    box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
                }
                
*/