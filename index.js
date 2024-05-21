const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";   

const boton=document.getElementById('boton')
const cardError=document.getElementById('cardError')
const cardPokemon=document.getElementById('cardPokemon')


const encontrarPokemon = async (idPokemon) => {
    try {
        const response = await fetch(BASE_URL + idPokemon);
        const data = await response.json();
        return data;
    } catch (error) {
        mostrarError("No existe una pokemon con ese número. Vuelva a intentar.")
    }
};



function clickButton(){
    const numeroIngresado=parseInt(document.getElementById('pokemon').value)
    if (!isNaN(numeroIngresado)) {
        let pokemonEncontrado= encontrarPokemon(numeroIngresado)
        if (pokemonEncontrado === undefined){
            mostrarError("No existe una pokemon con ese número. Vuelva a intentar.")
        } 
        else{
            mostrarPokemon(numeroIngresado)
        }
    }
    else{
        mostrarError("Ingresa el número del pokemon que deseas buscar")
    }
}

boton.addEventListener('click', () => {
    clickButton()
})

function mostrarError(mensaje){
    cardPokemon.style.display = 'none'
    const mensajeError=document.getElementById('mensajeError')
    mensajeError.textContent=mensaje
    cardError.style.display = 'block'
}

const contenedor = document.querySelector(".contenedor")

const mostrarPokemon = async (idPokemon) => {
    const pokemonEncontrado = await encontrarPokemon(idPokemon)
    const { name, sprites, types, height, weight } = pokemonEncontrado;
    
    cardError.style.display = "none"
    const fotoPokemon=document.getElementById('fotoPokemon')
    fotoPokemon.src=sprites.other.dream_world.front_default 

    const nombrePokemon=document.getElementById('nombrePokemon')
    nombrePokemon.textContent=name.charAt(0).toUpperCase() + name.slice(1);

    const tipos=document.getElementById('tipos')
    tipos.textContent=types.map(typeInfo => typeInfo.type.name).join(', ');

    const altura=document.getElementById('altura')
    altura.textContent="Altura: " + height/10 + "m"

    const peso=document.getElementById('peso')
    peso.textContent="Peso: " + weight/10 + "kg" 

    cardPokemon.style.display = 'block'

};
