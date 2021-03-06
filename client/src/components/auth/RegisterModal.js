import React, { useContext, useState, useEffect, useReducer, useRef } from "react";
import { AuthContext } from '../../context/AuthState';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "../../css/auth.css";
import Spinner from "../common/Spinner";
import { errorInitialState, ErrorReducer } from "../../reducers/ErrorReducer";
import { clearErrors } from "../../actions/ErrorActions";
import { register } from "../../actions/AuthActions";

const initialState = {
    modalInstance: null,
    name: null,
    email: null,
    password: null,
    loading: false
};

export const RegisterModal = () => {
    // normal flow
    const [state, setState] = useState(initialState);
    // error flow
    const [error, errorDispatch] = useReducer(ErrorReducer, errorInitialState);
    // auth flow
    const { authDispatch, isAuthenticated } = useContext(AuthContext);

    // modal init
    const registerModalRef = useRef(null);
    useEffect(() => {
        // clear errors before open and after close
        const options = {
            preventScrolling: false,
            onOpenStart: () => errorDispatch(clearErrors()),
            onCloseEnd: () => errorDispatch(clearErrors())
        };
        M.Modal.init(registerModalRef.current, options);
        // set modal instance
        state.modalInstance = M.Modal.getInstance(registerModalRef.current);
    }, []);

    // set username & email & password
    const handleOnChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    // register
    const handleOnSubmit = e => {
        e.preventDefault();

        const user = { name: state.name, email: state.email, password: state.password };
        // attempt to register
        setState({ ...state, loading: true });
        register(user)(authDispatch, errorDispatch);
    };

    // check for register error
    useEffect(() => {
        setState({ ...state, loading: false });
    }, [error]);

    // close modal if register success
    useEffect(() => {
        if (isAuthenticated && state.modalInstance.isOpen) {
            setState({ ...state, loading: false });
            state.modalInstance.close();
        }
    }, [isAuthenticated]);

    return (
        <div>
            <a className="modal-trigger" href="#registerModal">Register</a>
            <div id="registerModal" className="modal black-text " ref={registerModalRef}>
                <div className="modal-content">
                    <h3 className="modalHeader col s12">Register</h3>
                    <div className="row">
                        <div>
                            {error.msg && (<p className="deep-orange-text text-accent-4">{error.msg}</p>)}
                        </div>
                        <form className="col s12" onSubmit={handleOnSubmit}>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">face</i>
                                <input id="registerName" type="text" className="validate" name="name" autoComplete="username" onChange={handleOnChange} />
                                <label htmlFor="registerName">Name</label>
                                <span className="registerHelperText helper-text">
                                    {
                                        error.msg === 'Invalid name format!' &&
                                        <span className="registerWarningIcon material-icons deep-orange-text">
                                            warning_amber
                                        </span>
                                    }
                                    <ul>
                                        <li>1. Name must be between <b>3</b> and <b>10</b> characters long</li>
                                        <li>2. Valid characters are <b>alphanumeric</b> character and <b>special</b> character of -_</li>
                                        <li>3. Must contain at least <b>one alphabetic</b> character.</li>
                                    </ul>
                                </span>
                            </div>

                            <div className="input-field col s12">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="registerEmail" type="email" className="validate" name="email" autoComplete="email" onChange={handleOnChange} />
                                <label htmlFor="registerEmail">Email</label>
                            </div>

                            <div className="input-field col s12">
                                <i className="material-icons prefix">
                                    lock_open
                                </i>
                                <input id="registerPassword" type="password" className="active validate" name="password" autoComplete="new-password" onChange={handleOnChange} />
                                <label htmlFor="registerPassword">Password</label>
                                <span className="registerHelperText helper-text">
                                    {
                                        error.msg === 'Invalid password format!' &&
                                        <span className="registerWarningIcon material-icons deep-orange-text">
                                            warning_amber
                                        </span>
                                    }
                                    <ul>
                                        <li>Password must be between <b>8</b> and <b>40</b> characters long and must contain at least one character of the following types:</li>
                                        <li>1. <b>Uppercase</b> letter A to Z</li>
                                        <li>2. <b>Lowercase</b> letter a to z</li>
                                        <li>3. <b>Special</b> character of !@#$%^&*-_=,.?</li>
                                        <li>4. <b>Number</b> from 0 to 9</li>
                                    </ul>
                                </span>
                            </div>

                            {
                                state.loading ? <Spinner /> :
                                    (<button className="btn green sendBtn" type="submit" name="action">
                                        REGISTER<span className="material-icons right sendIcon">login</span>
                                    </button>)
                            }
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <a className="modal-close waves-effect waves-green btn-flat">Back</a>
                </div>
            </div >
        </div >
    );
};;


