import React, { useEffect } from 'react';
import "materialize-css/dist/css/materialize.min.css";
import EditQuizContent from './EditQuizContent';
import { QuizzesContext } from '../../context/QuizState';
import { AuthContext } from '../../context/AuthState';
import { ProfileContext } from '../../context/ProfileState';
import { useParams } from 'react-router';
import { useState, useContext } from 'react';


export default function EditQuizPage(){
  //TODO: discuss whether to set
  //auth mode on the server side or control from the client side
  //two mode types if on server: PLAYER_VIEW (can play) | OWNER_VIEW (can edit, can play)
  const { getQuiz } = useContext(QuizzesContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const { updateProfile } = useContext(ProfileContext);
  
  const [ isOwner, setMode ] = useState(false);
  const { id } = useParams();
  
  const checkMode = async () => {
    const quizContent = await getQuiz(id, false);
    const quiz = quizContent.data;
    const owner = quiz.author;

    if(isAuthenticated && owner == user.name){
        setMode(true);
    }
  }
  useEffect(()=> {
      checkMode();
  })

  useEffect(()=>{
    console.log(user.status)
    if(user.status){
        window.location = '/suspended';
    }
})

  return(
    <div>
      {isOwner ? <EditQuizContent updateProfile={updateProfile}/> 
      : 
      <div className="container" style={{background:"white", height: "700px", marginBottom:0}}><h6>You do not have access to this page.<i className="small material-icons" >lock_outline</i></h6></div>}
    </div>
    )
}