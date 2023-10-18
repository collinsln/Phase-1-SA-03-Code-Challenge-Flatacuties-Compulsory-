const fetchCharacterData = async () => {
    const response = await fetch('db.json');
    const data = await response.json();
    return data.characters;
  };
 
  const characterBar = document.querySelector('#character-bar');

async function renderCharacterNames() {
  const characters = await fetchCharacterData();

  characters.forEach((character) => {
    const span = document.createElement('span');
    span.textContent = character.name;
    characterBar.appendChild(span);
  });
}

renderCharacterNames();

const detailedInfo = document.querySelector('#detailed-info');

characterBar.addEventListener('click', async (event) => {
  const characterName = event.target.textContent;

  // Get the character's ID from the character data.
  const characters = await fetchCharacterData();
  const character = characters.find((character) => character.name === characterName);

  // Display the character's details in the `detailed-info` element.
  detailedInfo.innerHTML = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="${character.name}">
    <p>${character.description}</p>
  `;
});

const votesForm = document.querySelector('#votes-form');


votesForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the number of votes from the input field.
  const numberOfVotes = Number(votesForm.querySelector('input').value);

  // Get the character's details from the `detailed-info` element.
  const characterName = detailedInfo.querySelector('h2').textContent;

  // Add the number of votes to the character's details.
  const characterDetails = {
    name: characterName,
    votes: numberOfVotes + (characterDetails?.votes ?? 0),
  };

  // Display the updated character details in the `detailed-info` element.
  detailedInfo.innerHTML = `
    <h2>${characterDetails.name}</h2>
    <p>${characterDetails.votes} votes</p>
  `;
});
// Create an image element for each character.
characters.forEach((character) => {
  const img = document.createElement('img');
  img.src = character.image;
  img.alt = character.name;

  // Append the image element to the `characterBar` element.
  document.querySelector('#character-bar').appendChild(img);
});