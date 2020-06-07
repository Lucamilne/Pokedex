import "./abilities.css"
import React from "react";

const Abilities = (props) => {
    const abilities = props.abilities.map(ability => {
        return <div key={ability.name} className="nes-container is-rounded ability">
            <h3 className="label">{ability.name}</h3>
            <p>{ability.effect}</p>
        </div>
    })

    return abilities;
}

export default Abilities; 