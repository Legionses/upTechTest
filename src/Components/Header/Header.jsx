import React from "react";
import "./headerStyles.css"
import {Link} from "react-router-dom";

export const Header = ({}) => {
    return(
        <header className="header">
            <div>
                <span>Selected City:</span>
                <span>POP</span>
            </div>
            <div className="header__links">
                <Link to="/">
                    First page
                </Link>
                <Link to="/second">
                    Second page
                </Link>
            </div>
        </header>
    )
};

