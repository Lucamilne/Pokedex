import React from "react"

const Options = (props) => {
    const pokemon = props.pokemon.map(pokemon => {
        return <option
            key={pokemon.name}
            value={pokemon.name.toUpperCase()} />
    })

    return pokemon;
}

export default Options