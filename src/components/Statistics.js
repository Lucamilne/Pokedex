import "./statistics.css"
import React from "react";

const Statistics = (props) => {
    const stats = props.stats.map(index => {
        return <div className="stat-container" key={index.stat.name}>
                    <div>{index.stat.name}</div>
                    <progress className="nes-progress is-success" value={index.base_stat} max="200"></progress>
                </div>
      
    }, )

    return stats;
}

export default Statistics;