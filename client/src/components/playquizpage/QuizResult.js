import React, { useContext } from 'react';
import "materialize-css/dist/css/materialize.min.css";
import { QuizzesContext } from '../../context/QuizState';
import M from 'materialize-css';

export default function QuizResult() {
    var elem = document.querySelector('#quizResultModal')
    var opt = { preventScrolling: false };
    M.Modal.init(elem, opt);

    const { isPlaying, score } = useContext(QuizzesContext);

    return (
        <div>
            <a className="waves-effect waves-light btn modal-trigger" href="#quizResultModal">
                Results
            </a>
            <div id="quizResultModal" className="modal black-text">
                {!isPlaying ?
                    (<div>
                        <div className="modal-content">
                            <h6>You finished taking the quiz</h6>
                            <h3>Your Score {score}</h3>
                        </div>
                        <div className="modal-footer">
                            <a className="modal-close waves-effect waves-green btn-flat">Return</a>
                        </div>
                    </div>)
                    :
                    (<div>
                        <div className="modal-content">
                            <h6>You have to finish your quiz to see the results.</h6>
                        </div>
                        <div className="modal-footer">
                            <a className="modal-close waves-effect waves-green btn-flat">Return</a>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}