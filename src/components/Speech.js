import "./speech.css"
import React from "react";

class Speech extends React.Component {
    openInformation() {
        this.props.openInformation()
    }

    render() {
        const fetched = this.props.fetched ? "show" : "hide";

        return (
            <div className={"nes-balloon from-left nes-pointer " + fetched} onClick={ this.openInformation.bind(this) }>
                <p className="quotation">
                    <i className="nes-pokeball"></i>
                </p>
            </div>
        )
    }
}

export default Speech;