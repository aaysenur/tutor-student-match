import {getAllTutors, filterTutorsByCity, setTutors} from '../actions';
import * as tutorConstants from '../constants/index';

it('should create an action to filter tutors by city', () => {
  expect(filterTutorsByCity([]).payload.sort()).toEqual([].sort())
});

describe('actions', () => {
  it('should get all tutors and sort by Name as default', () => {
    const expectedPayload = [
      {
        "name": "Aysenur",
        "surname": "Surname",
        "city": "London",
        "studentsSoFar": 4
      },
      {
        "name": "Turkoglu",
        "surname": "Surname",
        "city": "London",
        "studentsSoFar": 4
      }
    ]

    const expectedAction = {
      type: tutorConstants.GET_ALL_TUTORS,
      payload: expectedPayload
    }

    let tutorList = [
      {
        "name": "Turkoglu",
        "surname": "Surname",
        "city": "London",
        "studentsSoFar": 4
      },
      {
        "name": "Aysenur",
        "surname": "Surname",
        "city": "London",
        "studentsSoFar": 4
      }
    ]

    expect(setTutors(tutorList).payload.sort())
      .toEqual(expectedAction.payload.sort())
  })
})

describe('actions', () => {
  it('should get tutors and pass to action as it is', () => {
    const expectedPayload = [
      {
        "name": "Turkoglu",
        "surname": "Surname",
        "city": "London",
        "studentsSoFar": 4
      },
      {
        "name": "Aysenur",
        "surname": "Surname",
        "city": "London",
        "studentsSoFar": 4
      }
    ]

    const expectedAction = {
      type: tutorConstants.FILTER_TUTOR_LIST,
      payload: expectedPayload
    }

    let tutorList = [
      {
        "name": "Turkoglu",
        "surname": "Surname",
        "city": "London",
        "studentsSoFar": 4
      },
      {
        "name": "Aysenur",
        "surname": "Surname",
        "city": "London",
        "studentsSoFar": 4
      }
    ]

    expect(filterTutorsByCity(tutorList).payload.sort())
      .toEqual(expectedAction.payload.sort())
  })
})
