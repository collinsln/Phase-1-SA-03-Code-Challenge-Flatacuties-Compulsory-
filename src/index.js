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
