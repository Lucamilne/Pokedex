import "./statistics.css"
import React from "react";

const Statistics = (props) => {
    const stats = props.stats.map(index => {
        return <div className="stat-container" key={index.stat.name}>
            <div className="stat-label">
                <span>{index.stat.name}</span>
                <span>{index.base_stat}</span>
            </div>
            <progress className="nes-progress is-success" value={index.base_stat} max="200"></progress>
        </div>

    })

    return stats;
}

export default Statistics;