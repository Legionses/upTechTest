import {CHOOSE_CITY, ERASE_LIST, FETCH_CITY_DATA} from "../constatnts/searchConst";

const initialState = {
    searchRes: [],
    chosenCity: null,
};

export const search = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CITY_DATA:
            return {...state, searchRes: action.data};
        case CHOOSE_CITY:
            return {...state, chosenCity: action.city};
        case ERASE_LIST:
            return {...state, searchRes: []};
        default:
            return state;
    }
};