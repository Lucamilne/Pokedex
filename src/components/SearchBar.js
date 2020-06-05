import "./searchbar.css"
import React from "react";

class SearchBar extends React.Component {
    state = { term: "" }

    onFormSubmit = (event) => {
        event.preventDefault();

        this.props.pokemonSubmit(this.state.term)
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="field">
                    <label>Pokemon Search</label>
                    <input
                        spellCheck="false"
                        maxLength="11"
                        value={this.state.term}
                        onChange={e => this.setState({ term: e.target.value })}
                        placeholder="Enter Name"
                        list="pokemon" />
                </div>
            </form>
        )
    }
}

export default SearchBar;