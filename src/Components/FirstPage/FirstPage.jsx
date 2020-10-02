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
    const [focusedListItem, setFocusedListItem] = useState(null);

    const [missingLetters, setMissingLetters] = useState("");

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = ({target: {value}}) => {
        setSearchValue(value);
        debouncedFetch(value)
    };

    // Erasing searched data and results on CWU;
    useEffect(() => {
        return () => {
            if (searchRes) eraseSearchedResults();
            if (searchValue) setSearchValue("");
            if (missingLetters) setMissingLetters("");
        }
    }, []);

    const handleListItemClick = (city) => {
        chooseCity(city);
        setMissingLetters("");
        return setInputFocusStatus(false);
    };
    const handleListItemHover = cityName => {
        if (!cityName) return setMissingLetters("");
        const letterPos = cityName.toLowerCase().indexOf(searchValue);
        const searchedValLength = searchValue.length;

        return setMissingLetters(cityName.slice(letterPos + searchedValLength))
    };

    useOutsideHandle(inputWrapRef, () => setInputFocusStatus(false));
    return (
        <div
            className="inputWrap"
            ref={inputWrapRef}
        >
            <input
                type="text"
                onFocus={() => setInputFocusStatus(true)}
                value={`${searchValue}${missingLetters}`}
                onChange={handleInputChange}
                placeholder="Search the City"
            />
            {inputFocusStatus && searchRes.length > 0 && (<div>
                <ul className="searchList">
                    {searchRes.map((city, index) => {
                        const {positionId, defaultName} = city;
                        return (
                            <li
                                className="searchList__item"
                                key={positionId}
                                onClick={() => handleListItemClick(city)}
                                onMouseOver={() => handleListItemHover(city.defaultName)}
                                onMouseOut={() => handleListItemHover(null)}
                                tabIndex="0"
                                onFocus={() => setFocusedListItem(city)}
                                onBlur={() => setFocusedListItem(null)}
                            >
                                {defaultName}
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