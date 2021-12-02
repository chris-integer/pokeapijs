const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener('DOMContentLoaded', ()=>{
    const random = getRandomInt(1, 151);
    fetchApi(random);
})

const fetchApi = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            hp: data.stats[0].base_stat,
            exp: data.base_experience,
            attack: data.stats[1].base_stat,
            special: data.stats[3].base_stat,
            def: data.stats[2].base_stat
        }

        pintarCard(pokemon);

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

const pintarCard = (pokemon) => {
    const template = document.getElementById('card').content;
    const flex = document.querySelector('.flex');
    const fragment = document.createDocumentFragment();
    const clone = template.cloneNode(true);

    clone.querySelector('.card-body-img').setAttribute('src', `${pokemon.img}`);
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name} <span>${pokemon.hp} hp</span>`;
    clone.querySelector('.card-body-text').textContent = pokemon.exp + ' Exp';
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.attack + ' K';
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.special + ' K';
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.def + ' K';
    fragment.appendChild(clone);
    flex.appendChild(fragment);

}
