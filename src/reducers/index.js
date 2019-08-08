import {combineReducers} from 'redux';
import tutorList from './tutor-list-reducer';

const rootReducer = combineReducers({
    tutors: tutorList
});

export default rootReducer;

