import * as tutorConstants from '../constants/index';
import axios from 'axios';

export function getAllTutors() {
    return function (dispatch) {
        return axios.get(tutorConstants.getTutorsUrl)
            .then(({data}) => {
                dispatch(setTutors(data));
            });
    };
}

export function setTutors(_data) {
    let _newSortedList = _data.sort((a, b) => (a['name'] > b['name']) ? 1 : -1);
    return {
        type: tutorConstants.GET_ALL_TUTORS,
        payload: _newSortedList
    }
}

export function filterTutorsByCity(_list) {
    return {
        type: tutorConstants.FILTER_TUTOR_LIST,
        payload: _list
    }
}
