import React from "react";
import "./Tracklist.css";

import Track from "../Track/Track";

const Tracklist = (props) => {
    return (
        <div className="Tracklist">
            {props.tracks.map((track) => {
                return (
                    <Track 
                        track={track}

                    />
                );
            })
        }
        </div>
    );
};

export default Tracklist;