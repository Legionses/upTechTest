import React from "react";
import "./headerStyles.css"
import {Link} from "react-router-dom";
import {connect} from "react-redux";

 const HeaderComp = ({chosenCity}) => {
    return(
        <header className="header">
            <div>
                <span>Selected City:</span>
                <span>{chosenCity?.displayName || ""}</span>
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

export const Header = connect(state => ({
    chosenCity: state.search.chosenCity
}))(HeaderComp)