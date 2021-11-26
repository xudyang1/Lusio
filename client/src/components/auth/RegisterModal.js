import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../context/AuthState';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
// import "materialize-css/dist/js/materialize.min.js";
import "../../css/auth.css";
import Spinner from "../common/Spinner";

export const RegisterModal = () => {
    const initialState = {
        modalInstance: null,
        name: null,
        email: null,
        password: null,
        msg: null,
        loading: false
    };
    const [state, setState] = useState(initialState);
    const { register, error, isAuthenticated, clearErrors } = useContext(AuthContext);

    useEffect(() => {
        // check for register error
        if (error && error.id === 'REGISTER_FAIL')
            setState({ ...state, msg: error.msg, loading: false });
        else
            setState({ ...state, msg: null, loading: false });
    }, [error]);

    // init modal & close modal if register success
    useEffect(() => {
        if (!isAuthenticated) {
            var elem = document.querySelector('#registerModal');
            // clear errors before open and after close
            var options = {
                preventScrolling: false,
                onOpenStart: clearErrors,
                onCloseEnd: clearErrors
            };
            M.Modal.init(elem, options);
            // set modal instance
            state.modalInstance = M.Modal.getInstance(elem);
        };
        if (isAuthenticated && state.modalInstance.isOpen) {
            setState({ ...state, loading: false });
            state.modalInstance.close();
        }
    }, [isAuthenticated]);

    // set email & password
    const handleOnChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    // register
    const handleOnSubmit = e => {
        e.preventDefault();

        const user = { name: state.name, email: state.email, password: state.password };

        setState({ ...state, loading: true });
        // attempt to register
        register(user);
    };
    useEffect(() => {
    }, [state.loading])

    return (
        <div>
            <a className="modal-trigger" href="#registerModal">Register</a>
            <div id="registerModal" className="modal black-text ">
                <div className="modal-content">
                    <h3 className="modalHeader col s12">Register</h3>
                    <div className="row">
                        <div>
                            {state.msg ? (<p className="deep-orange-text text-accent-4">{state.msg}</p>) : null}
                        </div>
                        <form className="col s12" onSubmit={handleOnSubmit}>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">face</i>
                                <input id="registerName" type="text" className="validate" name="name" onChange={handleOnChange} />
                                <label htmlFor="registerName">Name</label>
                            </div>

                            <div className="input-field col s12">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="registerEmail" type="email" className="validate" name="email" onChange={handleOnChange} />
                                <label htmlFor="registerEmail">Email</label>
                            </div>

                            <div className="input-field col s12">
                                <i className="material-icons prefix">
                                    lock_open
                                </i>
                                <input id="registerPassword" type="password" className="active validate" name="password" onChange={handleOnChange} />
                                <label htmlFor="registerPassword">Password</label>
                            </div>
                            {state.loading ? <Spinner /> :
                                (<button className="btn green sendBtn" type="submit" name="action">
                                    REGISTER<span className="material-icons right sendIcon">login</span>
                                </button>)}
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


