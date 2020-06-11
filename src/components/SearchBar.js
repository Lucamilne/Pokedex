import "./searchbar.css"
import React from "react";

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { term: "" }
        this.inputFocusRef = React.createRef()
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        this.props.pokemonSubmit(this.state.term)
        //prevent mobile keyboard from remaining open
        this.inputFocusRef.current.blur()
        this.setState({ term: "" })
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} style={{position: "fixed"}}>
                    <label>Pokemon Search</label>
                    <input
                        spellCheck="false"
                        maxLength="11"
                        value={this.state.term}
                        onChange={e => this.setState({ term: e.target.value })}
                        placeholder="Enter Name"
                        list="pokemon"
                        ref={this.inputFocusRef}
                    />
            </form>
        )
    }
}

export default SearchBar;