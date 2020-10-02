import {getCityData} from "../rest/searchREST";
import {CHOOSE_CITY, ERASE_LIST, FETCH_CITY_DATA} from "../constatnts/searchConst";

export const fetchCityData = query => dispatch => {
    if (query.length === 0) return dispatch(eraseSearchedResults());
    
    return getCityData(query)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            return dispatch({type: FETCH_CITY_DATA, data})
        }).catch(({message}) => console.error(message))
};

export const chooseCity = cityData => ({type: CHOOSE_CITY, city: cityData});

export const eraseSearchedResults = () => ({type: ERASE_LIST})