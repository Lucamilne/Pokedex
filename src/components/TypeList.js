import "./typelist.css"
import React from "react";

const TypeList = (props) => {
    const types = props.types.map(type => {
        return  <span key={type} className={type}>{type}</span>     
    })

    return types;
}

export default TypeList;