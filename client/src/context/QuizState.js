import React, { createContext, useReducer } from 'react';
import QuizReducer from '../reducers/QuizReducer';
import {
    QUIZZES_LOADING,
    GET_QUIZZES,
    GET_QUIZ,
    UPDATE_QUIZ,
    ADD_QUIZ,
    DELETE_QUIZ,
    FINISH_QUIZ,
    GET_ERRORS
} from '../types/actionTypes';
import axios from 'axios';

// Initial state
const initialState = {
    // <<<<<<< LiuxinLi
    quizzes: [],
    quiz: {
        id: null,
        userId: null,
        //quizImgURI //Needs update
        //platformId: "", //Needs update
        name: "",
        author: "",
        description: "",
        timedOption: false,
        time: 0,
        retakeOption: false,
        questions: [{
            title: "",
            choices: [""],
            answerKey: 1, //correctAnswers
            score: 0
        }],
        likes: 0,
        plays: 0,
        //scoreboard: [], //Needsupdate
        isPublished: false
    },
    error: null,
    loading: true,
    isPlaying: true,
    score: 0
};

// Create context
export const QuizzesContext = createContext(initialState);

export const QuizzesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(QuizReducer, initialState);

    async function getQuizzes() {
        try {
            dispatch(setQuizzesLoading());
            const res = await axios.get('/api/quizzes');
            dispatch({
                type: GET_QUIZZES,
                payload: res.data
            });
            return res.data;
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };
    async function getQuiz(id, updateState = true) {
        try {
            if (updateState)
                dispatch(setQuizzesLoading());
            const res = await axios.get(`/api/quizzes/edit/${id}`);
            if (updateState)
                dispatch({
                    type: GET_QUIZ,
                    payload: id
                });
            return res.data;
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };

    async function addQuiz({ userId, name, author, description, timedOption, time, retakeOption, questions, title, choices, content, answerKey, score, likes, plays, isPublished }) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        //{ userId, name, author, description, questions, likes, isPublished }
        const body = JSON.stringify({ userId, name, author, description, timedOption, time, retakeOption, questions, title, choices, content, answerKey, score, likes, plays, isPublished });
        try {
            const res = await axios.post('/api/quizzes/edit', body, config);
            dispatch({
                type: ADD_QUIZ,
                payload: res.data
            });
            return res.data.quiz.id;
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    }

    async function updateQuiz({ id, userId, name, author, description, timedOption, time, retakeOption, questions, likes, plays, isPublished }) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ userId, name, author, description, timedOption, time, retakeOption, questions, likes, plays, isPublished });
        try {
            const res = await axios.put(`/api/quizzes/edit/${id}`, body, config);
            dispatch({
                type: UPDATE_QUIZ,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };
    async function deleteQuiz(id) {
        try {
            await axios.delete(`/api/quizzes/edit/${id}`);
            dispatch({
                type: DELETE_QUIZ,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    }
    function finishQuiz(score) {
        try {
            dispatch({
                type: FINISH_QUIZ,
                payload: score
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS
            });
        }
    }
    const setQuizzesLoading = () => {
        return {
            type: QUIZZES_LOADING
        };
    };
    return (<QuizzesContext.Provider value={{
        quizzes: state.quizzes,
        error: state.error,
        loading: state.loading,
        isPlaying: state.isPlaying,
        score: state.score,
        getQuizzes,
        getQuiz,
        addQuiz,
        updateQuiz,
        deleteQuiz,
        finishQuiz
    }}>
        {children}
    </QuizzesContext.Provider>);
};