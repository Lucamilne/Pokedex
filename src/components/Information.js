import React from "react";
import Swiper from "swiper"
import "./information.css";

import TypeList from "./TypeList"
import Statistics from "./Statistics"
import Description from "./Description"

class Information extends React.Component {

    componentDidMount() {
        this.swiper = new Swiper(".swiper-container")
    }

    render() {

        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="nes-container information-card swiper-slide">
                        <div className="bar">
                            <h3>Information</h3>
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
                    <div className="nes-container information-card swiper-slide">
                        <p>Hello mum</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Information;