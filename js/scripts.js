var input = document.getElementById('hero-search-bar');
var imageContainer = document.getElementById('image-container');
var getHeroButton = document.querySelector('button');
var herosList = document.getElementById('heros-list');


// const [timestamp, apiKey, hashValue] = ['1686423592710', 'b50e934cfc89a09d28eaa94dd93d1f40', 'b1532e622bfdbb892f6f179a82f8c0c5'];
// var url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

window.onload = function(){
  localStorage.clear();
}

function fetchHero(inputValue, keyCode) 
{
  if (inputValue.length > 0) {
    console.log('https://www.superheroapi.com/api.php/1358348604650444/search/' + inputValue);

    fetch(`https://www.superheroapi.com/api.php/1358348604650444/search/${inputValue}`)
    .then(function (response) {
      return response.json();
    })
    .then(function(data) {
      
      var herosArray = data.results;
      if (keyCode == 13 && inputValue.length >= 4) {
        let path = `${window.location.pathname} + /../hero-stats.html#id=${herosArray[0].id}`;
        window.open(path);
      } 

     if (data.response === 'success') {
        herosList.innerHTML = "";
        getHeros(herosArray, inputValue);
      }
      return data;

    })

  }  else {
    herosList.innerHTML = '';
  }

  herosList.innerHTML = "";
  return;
}


function getHeros(hero, searchText) {
  let local_Storage = favouriteHeros();
  // console.log("searchText", searchText);
  for(let i=0;i<hero.length;i++){
      displayHeros(hero[i]);
  }
  return; 
}


function displayHeros(hero) 
{
  let li = document.createElement('li');
    li.innerHTML = `
      <h4 class="hero-name">${hero.name}</h4>
      <img class="hero-image" alt="${hero.name}" src="${hero.image.url}"/>
      <p class="hero-link" id="${hero.id}" >Hero Details</p>
      <div > 
        <span class="fav-text">Add to Favourites >> </span>
        <i class="fas fa-solid fa-heart"></i>
      </div>
    `;
    li.className = 'hero-card';
  
    herosList.appendChild(li);
    
    // fav hero icon
    var favHeart = document.querySelectorAll('i');
    let favText = document.getElementsByClassName('fav-text');
    favHeart[favHeart.length - 1].setAttribute('id', hero.id);
    let text = favText[favHeart.length - 1];
    text.setAttribute('id', hero.d);
    favHeart[favHeart.length - 1].addEventListener("click", function(e) {
      let heroId = e.target.id;
      let heart = e.target;
      let HerosInFav = favouriteHeros();
      if (!HerosInFav.includes(heroId)) {
        heart.style.color = "d4142a";
        HerosInFav.push(heroId);
      } else {
        heart.style.color = "fff";
        HerosInFav.pop(heroId);
        localStorage.setItem('FavouriteHeros', JSON.stringify(HerosInFav));
        alert("Removed From Favourite!");
      }

      localStorage.setItem('FavouriteHeros', JSON.stringify(HerosInFav));
      console.log(localStorage.getItem('FavouriteHeros'));
    });

    ViewHeroStats(li, );
    return;
}


//  viewing hero page
function ViewHeroStats(li){
  var element = li.getElementsByTagName('p')[0];
  console.log("element -------->",element);
  element.addEventListener('click',function(e){
      //console.log("location __>" ,window.location.pathname+"/hero-stats.html#id="+e.target.id);
      let way1 = `${window.location.pathname} + /../hero-stats.html#id=${e.target.id}`;
      // console.log("way1 ----> ", way1);
      window.open(way1);
  });
}


function favouriteHeros() {
  var hero;
  if (!localStorage.getItem('FavouriteHeros')) {
      hero = [];
      console.log("no hero ", hero);
  }
  else {
      hero = JSON.parse(localStorage.getItem('FavouriteHeros'));
      console.log("hero",hero);
  }
  return hero;
}

input.addEventListener('keyup', function(e) {
  console.log(e.target.value, e.keyCode);
  fetchHero(e.target.value, e.keyCode);
});

