import React from "react";
import {connect} from "react-redux";

export const Page = ({chosenCity}) => {
    return (
        <div>
            {chosenCity?.defaultName || ""}
        </div>
    );

};

export const SecondPage = connect(state => ({
    chosenCity: state.search.chosenCity
}))(Page);
