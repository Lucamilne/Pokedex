import "swiper/css/swiper.min.css"
import "./app.css"
import React from 'react';
import Pokedex from "./Pokedex"
import pokeapi from "../api/pokeapi";
import Information from "./Information";

const configOptions = {
  previewPokemon: "pikachu"
}

class App extends React.Component {
  state = {
    fetched: false,
    isError: false,
    pokemon: [],
    name: "",
    id: null,
    image: "",
    types: [],
    stats: [],
    genera: "",
    description: "",
    term: "",
    height: "",
    weight: "",
    colour: "",
    shape: "",
    growth: "",
    habitat: "",
    abilities: []
  }

  async componentDidMount() {
    this.onSearchSubmit(configOptions.previewPokemon)
    //generates a full list of all pokemon available from the api
    const pokemonListResponse = await pokeapi.get(`/pokemon/?limit=964`)
    const pokemon = [];

    pokemonListResponse.data.results.forEach(entry => pokemon.push(entry.name))

    this.setState({ pokemon: pokemon })
  }

  engLangIndex = (arr) => {
    //takes in an array of objects & loops through
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].language.name === "en") {
        // if the language key value pair is "en" return i (the index of the arr)
        return i;
      }
    }
  }

  //solving the language filter - log it.

  onSearchSubmit = async (term) => {
    try {
      this.setState({ isError: false })
      const pokemonEntryResponse = await pokeapi.get(`/pokemon/${term.toLowerCase()}/`)
      const pokedexEntryResponse = await pokeapi.get(`/pokemon-species/${term.toLowerCase()}/`)

      if (pokemonEntryResponse.status === 200 && pokedexEntryResponse.status === 200) {
        const types = [];
        pokemonEntryResponse.data.types.forEach(type => types.push(type.type.name))

        const abilities = [];
        pokemonEntryResponse.data.abilities.forEach(ability => abilities.push(ability.ability.name))

        //temp
        console.log(pokedexEntryResponse)

        this.setState({
          fetched: true,
          image: pokemonEntryResponse.data.sprites.front_default,
          name: pokemonEntryResponse.data.name,
          id: pokemonEntryResponse.data.id,
          types: types,
          stats: pokemonEntryResponse.data.stats,
          genera: pokedexEntryResponse.data.genera[this.engLangIndex(pokedexEntryResponse.data.genera)].genus,
          description: pokedexEntryResponse.data.flavor_text_entries[this.engLangIndex(pokedexEntryResponse.data.flavor_text_entries)].flavor_text.replace("", " "),
          height: `${pokemonEntryResponse.data.height / 10}m`,
          weight: `${pokemonEntryResponse.data.weight / 10}kg`,
          colour: pokedexEntryResponse.data.color.name,
          shape: pokedexEntryResponse.data.shape.name,
          growth: pokedexEntryResponse.data.growth_rate.name,
          habitat: pokedexEntryResponse.data.habitat.name,
          abilities: abilities,
        })
      }
    } catch (e) {
      this.setState({ isError: true })
    }
  }

  submitRandomPokemon = () => {
    const max = this.state.pokemon.length;
    const randomIndex = Math.floor(Math.random() * Math.floor(max));

    this.onSearchSubmit(this.state.pokemon[randomIndex])
  }


  render() {
    return (
      <div className="App">
        <header className="navbar">
          <h1>Pokédex</h1>
          <i className="nes-pokeball is-small nes-pointer"
            title="Random Pokémon"
            onClick={this.submitRandomPokemon}
          ></i>
        </header>
        <main id="app__container">
          <section className="section__container" id="pokedex">
            <Pokedex
              fetched={this.state.fetched}
              query={this.onSearchSubmit}
              image={this.state.image}
              pokemon={this.state.pokemon}
            />
          </section>
          <section className="section__container" id="information">
            {
              !this.state.isError && this.state.fetched &&
              <Information
                fetched={this.state.fetched}
                name={this.state.name}
                id={this.state.id}
                image={this.state.image}
                types={this.state.types}
                stats={this.state.stats}
                genera={this.state.genera}
                description={this.state.description}
                height={this.state.height}
                weight={this.state.weight}
                colour={this.state.colour}
                shape={this.state.shape}
                growth={this.state.growth}
                habitat={this.state.habitat}
                abilities={this.state.abilities}
              />
            }
            {
              this.state.isError &&
              <div className="nes-container is-rounded" style={{ backgroundColor: "#eee" }}>
                <h1 className="nes-text is-error">Pokemon not found!</h1>
              </div>
            }
          </section>
        </main>
        <footer>
          {/* <h1 title="Pokedex by Jh3y">@Jh3y</h1> */}
          <div className="contact-links">
            <a href="mailto:lucamilne@googlemail.com" title="Email">
              <i className="nes-icon gmail is-medium"></i>
            </a>
            <a href="https://www.linkedin.com/in/luca-milne/" title="Linkedin">
              <i className="nes-icon linkedin is-medium"></i>
            </a>
            <a href="https://github.com/Lucamilne/" title="Github">
              <i className="nes-icon github is-medium"></i>
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;


//problem with error handling
//problem with swiper sizing (rendering component after fetched state)
//english language translation 