import * as tutorConstants from '../constants/index';
import _ from 'lodash';

const initialState = {
    tutorList: [],  // List from date.json
    filteredTutorList: [], // filtered list by city
    cityList: []  // city list for filtered
}

export default function (state = initialState, action) {
    let newState = {};
    switch (action.type) {
        case tutorConstants.GET_ALL_TUTORS:
            let filteringCityList = [];
            if (action.payload !== undefined && action.payload.length !== 0) {
                filteringCityList = getCityList(action.payload);
            }
            newState = {
                ...state,
                tutorList: action.payload,
                filteredTutorList: action.payload,
                cityList: filteringCityList
            }
            return newState;
        case tutorConstants.FILTER_TUTOR_LIST:
            newState = {...state, filteredTutorList: action.payload};
            return newState;
        default:
            return state;
    }
}

/**
 * For dynamic filter list
 * this method gets all data and find all of the cities to filter
 * @param tutorList
 * @returns {Array}
 */
function getCityList(tutorList) {
    let _cityList = [];
    for (let i = 0; i < tutorList.length; i++) {
        if (!(_.includes(_cityList, tutorList[i].city))){
            _cityList.push(tutorList[i].city);
        }
    }
    return _cityList;
}
