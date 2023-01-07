const pokemonName = document.querySelector('.pokeNome');
const pokemonNumber = document.querySelector('.pokeNumber');
const pokeImage = document.querySelector('.pokemonImage');
const form = document.querySelector('.formulario');
const input = document.querySelector('.pesquisa');
const prev = document.querySelector('.bt-prev');
const next = document.querySelector('.bt-next');

let pesquisaPokemon = 1;

const fetchPokemon = async (pokemon) => {
	const APIResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

	if (APIResponse.status === 200){

	const data = await APIResponse.json ();

	return data;}
}

const renderPokemon = async (pokemon) => {

	pokemonName.innerHTML = 'Loading...';
	pokemonNumber.innerHTML = '';
	const data = await fetchPokemon(pokemon);

	if (data){
	pokeImage.style.display = 'block';
	pokemonName.innerHTML = data.name;
	pokemonNumber.innerHTML = data.id;
	pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
	input.value = ' ';
	pesquisaPokemon = data.id;
	} else {
		pokeImage.style.display = 'none';
		pokemonName.innerHTML = 'Not Found :C';
		pokemonNumber.innerHTML = '';
	}

}

form.addEventListener('submit',(event) => {
	event.preventDefault();
	renderPokemon(input.value.toLowerCase());
	});

prev.addEventListener('click',() => {
	if (pesquisaPokemon > 1) {
	pesquisaPokemon -= 1;
	renderPokemon(pesquisaPokemon);
	}
});


next.addEventListener('click',() => {
	pesquisaPokemon += 1;
	renderPokemon(pesquisaPokemon);
	});

renderPokemon (pesquisaPokemon);