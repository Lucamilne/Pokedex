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
        //closes keyboard on mobile
        this.inputFocusRef.current.blur()
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
                        list="pokemon"
                        ref={this.inputFocusRef}
                    />
                </div>
            </form>
        )
    }
}

export default SearchBar;

// input.blur() on form submit
// error handling (.catch())