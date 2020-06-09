import "./evolutions.css"
import React from "react";

class Evolutions extends React.Component {
    constructor(props) {
        super(props);

        this.state = { evoDataFetched: false }
    }

    componentDidUpdate(prevProps) {
        if (this.props.evolution_chain !== prevProps.evolution_chain) {
            this.setState({ evoDataFetched: true })
        }
    }

    evolvesIntoList = (basePokemon) => {
        const baseImgURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

        const evolvesIntoList = basePokemon.evolves_to.map(evolvedPokemon => {
            return (
                <div key={evolvedPokemon.species.name} className="evolution-row">
                    <div className="thumbnail">
                        <img
                            alt={basePokemon.species.name}
                            src={`${baseImgURL}${this.idFromPokemon(basePokemon)}.png`}>
                        </img>
                        <span className="evolution-row__label">{basePokemon.species.name}</span>
                    </div>
                    <div className="arrow"></div>
                    <div className="thumbnail">
                        <img
                            alt={evolvedPokemon.species.name}
                            src={`${baseImgURL}${this.idFromPokemon(evolvedPokemon)}.png`}>
                        </img>
                        <span className="evolution-row__label">{evolvedPokemon.species.name}</span>
                    </div>
                </div>
            )

        });
        return evolvesIntoList;
    }

    idFromPokemon = (input) => {
        return input.species.url.slice(42, -1)
    }

    render() {
        const basePokemon = this.props.evolution_chain;


        return (
            <div>
                {!this.state.evoDataFetched &&
                    <div>Loading Evolution Chain...</div>
                    //before fetched data updates the component
                }
                {this.state.evoDataFetched && !basePokemon.evolves_to.length &&
                    <div><span>{this.props.name}</span> does not Evolve.</div>
                    //if pokemon has no evolutions
                }
                {this.state.evoDataFetched && basePokemon.evolves_to.length > 0 && !basePokemon.evolves_to[0].evolves_to.length &&
                    <div>{this.evolvesIntoList(basePokemon)}</div>
                    // if the pokemon evolves once
                }
                {this.state.evoDataFetched && basePokemon.evolves_to.length > 0 && basePokemon.evolves_to[0].evolves_to.length > 0 &&
                    <div>
                            {this.evolvesIntoList(basePokemon)}
                            {this.evolvesIntoList(basePokemon.evolves_to[0])}
                    </div>
                    //if the pokemon evolves twice
                }
            </div>
        )
    }
}

export default Evolutions;