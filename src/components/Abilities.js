import "./abilities.css"
import React from "react";

const Abilities = (props) => {
    const abilities = props.abilities.map(ability => {
        return <div key={ability.name}>
            <h3>{ability.name}</h3>
            <p>{ability.effect}</p>
        </div>
    })

    return abilities;
}

export default Abilities; 