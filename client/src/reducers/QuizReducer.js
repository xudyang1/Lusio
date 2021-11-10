import { GET_QUIZZES, 
  GET_QUIZ,
  QUIZZES_LOADING, 
  ADD_QUIZ, 
  DELETE_QUIZ, 
  UPDATE_QUIZ,
  GET_ERRORS, 
  CLEAR_ERRORS } from "../types/actionTypes";

export default function QuizReducer (state, action) {
  switch (action.type) {
    case QUIZZES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_QUIZZES:
      return {
        ...state,
        loading: false,
        quizzes: action.payload
      };
    case GET_QUIZ:
      return {
        ...state,
        loading: false,
        quiz: state.quizzes.filter(quiz => quiz._id === action.payload)
      }
    case ADD_QUIZ:
      console.log("Inside ADD_QUIZ, : ", action.payload);
      return {
        ...state,
        quiz: action.payload
      };
    case DELETE_QUIZ:
      return {
        ...state,
        quiz: state.quizzes.filter(quiz => quiz._id !== action.payload)
      };
    case UPDATE_QUIZ:
      return {
        ...state,
        transactions: [...state.quizzes, action.payload]
      };
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};