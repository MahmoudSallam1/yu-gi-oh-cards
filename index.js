// get cards
const baseUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=";
const containerCard = document.getElementById("container-card");
const searchInput = document.getElementById("searchInput");
const filterCards = document.getElementById("filterCards");
let option = "Blue-Eyes";

filterCards.addEventListener("change", (e) => {
  const value = e.target.value;
  console.log(value);

  switch (value) {
    case "Blue-Eyes":
      option = "Blue-Eyes";
      break;
    case "Dark Magician":
      option = "Dark Magician";
      break;
  }
  console.log(baseUrl + option);
  getCards();
});

function createHtmlCard(cards) {
  let allCards = cards.data;
  let cardHtml = allCards
    .map((card) => {
      if (card.level) {
        return `
        <div class="card">
        <img class="card-img" src="${card.card_images[0].image_url}" alt="" />
        <div class="card-content">
          <h2 class="card-name">${card.name}</h2>
          <p class="card-body">
          ${card.type}
          </p>
    
          <p>Level:<span>${card.level}</span></p>
          <div class="card-footer">
            <p>ATK:<span>${card.atk}</span></p>
            <p>DEF:<span>${card.def}</span></p>
          </div>
        </div>
      </div>
        
        `;
      } else {
        return `
        <div class="card">
        <img class="card-img" src="${card.card_images[0].image_url}" alt="" />
        <div class="card-content">
          <h2 class="card-name">${card.name}</h2>
          <p class="card-body">
          ${card.type}
          </p>

          <div class="card-footer">
          <p>${card.race}</p>
        </div>
   
        </div>
      </div>
        
        `;
      }
    })
    .join("");

  return cardHtml;
}

async function getCards() {
  const cardsPromise = await fetch(baseUrl + option);
  const cards = await cardsPromise.json();
  // console.log(cards.data.length);
  let cardHtml = createHtmlCard(cards);
  containerCard.innerHTML = cardHtml;
}

getCards();

searchInput.addEventListener("keyup", function (event) {
  let searchQuery = event.target.value.toLowerCase();
  let allCards = document.querySelectorAll(".card");
  let allNamesDOMCollection = document.querySelectorAll(
    ".card .card-content .card-name"
  );
  // console.log(allNamesDOMCollection);
  // console.log(allCards);

  for (let i = 0; i < allNamesDOMCollection.length; i++) {
    const currentName = allNamesDOMCollection[i].textContent.toLowerCase();

    if (currentName.includes(searchQuery)) {
      allCards[i].style.display = "flex";
    } else {
      allCards[i].style.display = "none";
    }
    // console.log(currentName);
  }

  //   console.log(searchQuery);
});
