import "./abilities.css"
import React from "react";

const Abilities = (props) => {
    return (
        <>
            {props.abilities &&
                props.abilities.map(ability => (
                    <div key={ability.name} className="nes-container is-rounded ability">
                        <h3 className="label">{ability.name}</h3>
                        <p>{ability.effect}</p>
                    </div>
                ))
            }
        </>
    )
}

export default Abilities; 