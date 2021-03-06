import React, { Component, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import '../../css/profilepage.css'
import { AuthContext } from '../../context/AuthState';
import { ProfileContext } from '../../context/ProfileState';


export default function ProfileSidebar(props) {
    const { loadUser, isAuthenticated, user } = useContext(AuthContext)
    const { profile, updateProfile } = useContext(ProfileContext)

    const s = {
        lineHeight: "20px"
    }

    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
    })

    async function clearHistory(){
        const qList = profile.quizzesTaken;     
        //Clear Quiz History
        for (let i=0; i < qList.length; i++){
            await updateProfile({
                mode: "DELETE",
                profile: {
                    owner: user.profile,
                    quizzesTaken: qList[i]
                }
            });
        }
        
    }

    return (
        <div>
            <ul id="slide-out" className="sidenav">
                <li style={s}><div className="user-view">
                    <div className="background">
                    </div>
                    <a><img className="circle" src={props.profileIconURI ? props.profileIconURI : "https://static.thenounproject.com/png/363633-200.png"} width='65%' height='300px' /></a>
                    <a><span className="name">{profile.name}</span></a>
                    <a>Level: {profile.level}</a>
                    <div>
                        <a><progress id="exp" value={profile.currentExp} max={profile.maxExp}> </progress></a>
                    </div>
                    <a>EXP: {profile.currentExp}/{profile.maxExp}</a>
                    {/* <a href="#email"><span className="email">{user ? user.email : ""}</span></a> */}
                </div></li>
                <li><Link to={props.path}><i className="material-icons">home</i>Home</Link></li>
                <li><Link to={props.path + "/allquiz"}><i className="material-icons">library_books</i>My Quizzes</Link></li>
                <li><Link to={props.path + "/allplatforms"}><i className="material-icons">business</i>My Platforms</Link></li>
                <li><Link to={props.path + "/subplats"}><i className="material-icons">subscriptions</i>Subscribed Platforms</Link></li>
                <li><Link to={props.path + "/achievements"}><i className="material-icons">emoji_events</i>My Achievements</Link></li>
                <li><Link to={props.path + "/liked"}><i className="material-icons">thumb_up</i>Liked Quizzes</Link></li>
                <li><Link to={props.path + "/history"}><i className="material-icons">history</i>Quiz History</Link><span style={{marginLeft:"88px", color:"darkred"}}>Clear All History</span><button className="btn-floating btn-small waves-effect waves-light red" style={{ margin: "5px" }} onClick={clearHistory}><i className="material-icons tiny">clear_all</i></button></li>
                {/* <li><Link to={props.path + "/subusers"}><i className="material-icons">contact_page</i>Subscribed User</Link></li> */}
                <li><Link to={props.path + "/accountsetting"}><i className="material-icons">settings</i>Account Setting</Link></li>
            </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons" style={{ position: 'fixed', fontSize: '3em' }}>menu</i></a>
        </div>
    );
}

