import React, {useCallback, useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {chooseCity, eraseSearchedResults, fetchCityData} from "../../actions/searchActions";
import {debounce, useOutsideHandle} from "../../conf/utils";
import "./firstPageStyles.css";

const Page = ({
                  fetchCityData,
                  searchRes,
                  chooseCity,
                  eraseSearchedResults
              }) => {

    const debouncedFetch = useCallback(
        debounce(fetchCityData, 300),
        [],
    );
    const inputWrapRef = useRef(null);

    const [inputFocusStatus, setInputFocusStatus] = useState(false);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = ({target: {value}}) => {
        setSearchValue(value);
        debouncedFetch(value)
    };

    // Erasing searched data and results on CWU;
    useEffect(() => {
        return () => {
            if (searchRes) eraseSearchedResults();
            if (searchValue) setSearchValue("")
        }
    }, []);

    const handleListItemClick = (city) => {
        chooseCity(city);
        return setInputFocusStatus(false);
    };

    useOutsideHandle(inputWrapRef, () => setInputFocusStatus(false));
    return (
        <div
            className="inputWrap"
            ref={inputWrapRef}
        >
            <input
                onFocus={() => setInputFocusStatus(true)}
                value={searchValue}
                onChange={handleInputChange}
            />
            {inputFocusStatus && searchRes.length > 0 && (<div>
                <ul className="searchList">
                    {searchRes.map((city) => {
                        const {positionId, displayName} = city;
                        return (
                            <li
                                className="searchList__item"
                                key={positionId}
                                onClick={() => handleListItemClick(city)}
                            >
                                {displayName}
                            </li>
                        )
                    })}
                </ul>
            </div>)}
        </div>
    );

};

export const FirstPage = connect(state => ({
    searchRes: state.search.searchRes,
}), ({
    fetchCityData,
    chooseCity,
    eraseSearchedResults
}))(Page);