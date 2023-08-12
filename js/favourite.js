var favHero = document.getElementById("container");
console.log(favHero);


function displayFavHeroes(hero) {
     let div1 = document.createElement('div');
     console.log("DIV, " + div1);
     div1.setAttribute('id', `${hero.id}`);
     div1.className = `heroChild`;
     div1.innerHTML = `
          <div class="image-container">
              <img class="image" src="${hero.image.url}"/>
              <div class="caption">
               <h1> ${hero.name} </h1>
               <ul>
               <li id="power"> 
                    <img src="https://cdn-icons-png.flaticon.com/128/3100/3100127.png" alt="icon"/>
                    <strong>Power : </strong>${hero.powerstats.power}
               </li>
               <li id="combat"> 
                    <img src="https://cdn-icons-png.flaticon.com/128/2174/2174193.png" alt="icon"/>
                    <strong>Combat : </strong>${hero.powerstats.combat}
               </li>
               <li id="durability"> 
                    <img src="https://cdn-icons-png.flaticon.com/128/861/861377.png" alt="icon"/>
                    <strong>Durability : </strong>${hero.powerstats.durability}
               </li>
               <li id="intellgence"> 
                    <img src="https://cdn-icons-png.flaticon.com/128/900/900961.png" alt="icon"/>
                    <strong>Intelligence : </strong>${hero.powerstats.intelligence}
               </li>
               <li>
                    <img src="https://cdn-icons-png.flaticon.com/128/5769/5769416.png" alt="icon"/>
                    <strong>Race :&nbsp;</strong>${hero["appearance"]["race"]}
               </li>
               </ul>
              </div>
          </div>
	`;
     let removeHero = document.createElement('button');
     // add className to css
     removeHero.className = 'remove-fav button-4';
     let text = document.createTextNode("Remove");
     removeHero.appendChild(text);
     removeHero.addEventListener('click', removeFromFav);
     div1.appendChild(removeHero);
     favHero.appendChild(div1);
     console.log(div1);
}


// fetching data from api
async function fetchFavHeros() {
     let favHeroArray = favHeros();
     console.log("Hero Array: " + favHeroArray);
     for (let i = 0; i < favHeroArray.length; i++) {
          fetch('https://www.superheroapi.com/api.php/1358348604650444/' + favHeroArray[i])
               .then(function (response) {
                    return response.json();
               })
               .then(function (hero) {
                    displayFavHeroes(hero);
                    return hero;
               })
     }
}
fetchFavHeros(); // calling function

// checking hero array from localstorage
function favHeros() {
     let hero;
     if (localStorage.getItem('FavouriteHeros') === null) {
          hero = [];
          // console.log(hero);
     }
     else {
          hero = JSON.parse(localStorage.getItem('FavouriteHeros'));
     }
     return hero;
}


function removeFromFav(e) {
     let parentId = e.target.parentElement.id;
     console.log(parentId);
     let favHeroArr = favHeros();
     // using filter function to delete the target element
     let updatedFavHeros = favHeroArr.filter((id) => id != parentId);

     // updating localstroage & deleting from DOM
     localStorage.setItem('FavouriteHeros', JSON.stringify(updatedFavHeros));
     let heros = document.getElementsByClassName('heroChild');
     for (let i = 0; i < favHeroArr.length; i++) {
          if (heros[i].id == parentId) {
               favHero.removeChild(heros[i]);
               console.log("removed!!", heros[i], parentId);
               break;
          }
     }
}

