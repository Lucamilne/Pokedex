import "./information.css";
import React from "react";
import TypeList from "./TypeList"
import Statistics from "./Statistics"
import Description from "./Description"

class Information extends React.Component {

    render() {
        const displayed = this.props.showInformationPanel;
        let toggleDisplay = displayed ? "show" : "show"

        return (
            <div className={"nes-container " + toggleDisplay} id="information">
                <div className="bar">
                    <h3>Information</h3>
                    {/* <button onClick={this.props.close} className="close-btn nes-pointer">x</button> */}
                </div>
                <h3 className="pokemon-title">
                    <span>{this.props.name}</span>
                    <span>{`#${this.props.id}`}</span>
                </h3>
                <div className="type-container">
                    <TypeList types={this.props.types} />
                </div>
                <hr />
                <Description
                    genera={this.props.genera}
                    description={this.props.description}
                />
                <hr />
                <h3>Base Stats</h3>
                <Statistics 
                stats={this.props.stats}
                key={this.props.id}
                />
            </div>
        )
    }
}

export default Information;