import React , { useContext, useEffect} from 'react';
import { AuthContext } from "../../context/AuthState";
import {PlatformContext} from "../../context/PlatformState";
import { ProfileContext } from '../../context/ProfileState';
import QuizPageContent from "./QuizPageContent";
import QuizComments from "./QuizComments";
import QuizReport from "./QuizReport";
import M from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";

export default function QuizPage(){
    const {isAuthenticated, user} = useContext(AuthContext);
    const {updateProfile, getProfile} = useContext(ProfileContext);
    const {getPlatform} = useContext(PlatformContext);

    useEffect(()=>{
        console.log(user.status)
        if(user.status){
            window.location = '/suspended';
        }
    })

    useEffect(() => {
        var elem = document.querySelector('#reportModal')
        var options = {
            preventScrolling: false,
        };
        M.Modal.init(elem, options);
        
    })
    return(
        <div>
            <div>
                <div>
                    <br/>
                    <a className="waves-effect waves-light btn red modal-trigger" style={{marginRight:"5%", float:"right"}} href="#reportModal"><i className="material-icons right">report</i>Report</a>
                    <div id="reportModal" className="modal">
                        {isAuthenticated ? (
                        <div>
                            <div className="modal-content">
                                <h4>Report a Problem</h4>
                                <QuizReport userId={user.profile} userName={user.name}/>
                            </div>
                        </div>) :
                        (<div>
                            <div className="modal-content">
                                <h4>Please login first</h4>
                            </div>
                            <div className="modal-footer">
                                <a className="modal-close waves-effect waves-blue btn-flat">OK</a>
                            </div>
                        </div>)
                        }
                    </div>
                    <br/> 
                    {isAuthenticated ? <QuizPageContent getPlatform={getPlatform} userId={user.profile} updateProfile={updateProfile} getProfile={getProfile}/> 
                    : <QuizPageContent getPlatform={getPlatform} userId="" updateProfile={updateProfile} getProfile={getProfile}/>}
                </div>
            </div>
            {isAuthenticated ? <QuizComments userName={user.name} userId={user.profile} passedFunc={updateProfile}/>
            : <QuizComments userName="" userId="" passedFunc={updateProfile}/>
        }
        </div>
        )
}