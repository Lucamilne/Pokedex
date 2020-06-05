import React from "react"

class Description extends React.Component {
    render(){
        return(
            <div>
            <h3>{this.props.genera}</h3>
            <p>{this.props.description}</p>
        </div>
        )
    }
}

export default Description;
