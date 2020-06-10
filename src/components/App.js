import "swiper/css/swiper.min.css"
import "./app.css"
import React from 'react';
import Pokedex from "./Pokedex"
import pokeapi from "../api/pokeapi";
import Information from "./Information";
import Axios from "axios";

class App extends React.Component {
  state = this.intialState;

  get intialState() {
    return {
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
      evolution_chain: {},
      abilities: []
    }
  }

  async componentDidMount() {
    let gen = {
      I: 151,
      II: 251,
      III: 386
    }


    //generates a full list of all pokemon available from the api
    const pokemonListResponse = await pokeapi.get(`/pokemon/?limit=${gen.II}`)
    const pokemon = [];

    pokemonListResponse.data.results.forEach(indivualPokemon => pokemon.push(indivualPokemon.name))

    this.setState({ pokemon: pokemon })

    this.submitRandomPokemon()
  }

  submitRandomPokemon = () => {
    const max = this.state.pokemon.length;
    const randomIndex = Math.floor(Math.random() * Math.floor(max));

    this.onSearchSubmit(this.state.pokemon[randomIndex])
  }

  onSearchSubmit = async (term) => {
    try {
      const pokemonResponse = await pokeapi.get(`/pokemon/${term.toLowerCase()}/`)
      const pokedexResponse = await pokeapi.get(`/pokemon-species/${term.toLowerCase()}/`)

      if (pokemonResponse.status === 200 && pokedexResponse.status === 200) {
        const types = [];
        pokemonResponse.data.types.forEach(type => types.push(type.type.name))

        //not all pokemon have a habitat
        const habitat = pokedexResponse.data.habitat ? pokedexResponse.data.habitat.name : "Unknown"

        this.buildAbilityArray(pokemonResponse)
        this.buildEvolutionArray(pokedexResponse)
        this.setState({
          fetched: true,
          isError: false,
          image: pokemonResponse.data.sprites.front_default,
          name: pokemonResponse.data.name,
          id: pokemonResponse.data.id,
          types: types,
          stats: pokemonResponse.data.stats,
          genera: pokedexResponse.data.genera[this.engLangIndex(pokedexResponse.data.genera)].genus,
          description: pokedexResponse.data.flavor_text_entries[this.engLangIndex(pokedexResponse.data.flavor_text_entries)].flavor_text.replace("", " "),
          height: `${pokemonResponse.data.height / 10}m`,
          weight: `${pokemonResponse.data.weight / 10}kg`,
          colour: pokedexResponse.data.color.name,
          shape: pokedexResponse.data.shape.name,
          growth: pokedexResponse.data.growth_rate.name,
          habitat: habitat
        })
      }
    } catch (e) {
      this.setState({ isError: true, image: "" })
      console.log(e)
    }
  }

  buildAbilityArray = async (pokemonResponse) => {
    const abilities = [];
    
    pokemonResponse.data.abilities.forEach(async (ability) => {
      const abilityResponse = await pokeapi.get(`/ability/${ability.ability.name}/`);
      //access the actual description or effect
      const effectEntries = abilityResponse.data.effect_entries;
      //save the eng language entry by looping through until language.name = eng
      const engEffectEntry = effectEntries[this.engLangIndex(effectEntries)].short_effect

      //push the ability and the effect, as an object, to an array
      abilities.push({ name: ability.ability.name, effect: engEffectEntry })
      //this setState is seperate because it must run asynchronously 
      this.setState({ abilities: abilities })
    })
  }

  buildEvolutionArray = async (pokedexResponse) => {
    const response = await Axios.get(pokedexResponse.data.evolution_chain.url)
    const evolutionChain = response.data.chain

    this.setState({ evolution_chain: evolutionChain })
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

  render() {
    return (
      <div className="App" >
        <header className="navbar">
          <h1>Pokédex</h1>
          <div className="random-pokemon">
            <i className="nes-pokeball is-small nes-pointer"
              title="Random Pokémon"
              onClick={this.submitRandomPokemon}
            ></i>
            <span role="img" aria-label="Random Pokemon">&#128256;</span>
          </div>

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
                onSearchSubmit={this.onSearchSubmit}
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
                evolution_chain={this.state.evolution_chain}
              />
            }
            {
              this.state.isError &&
              <div className="nes-container is-rounded" style={{ backgroundColor: "#eee" }}>
                <h1 className="nes-text is-error">Pokemon not found!</h1>
              </div>
            }
            {
              !this.state.isError && !this.state.fetched &&
              <div className="nes-container is-rounded" style={{ backgroundColor: "#eee" }}>
                <h1 className="nes-text">Loading...</h1>
              </div>
            }
          </section>
        </main>
        <footer>
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