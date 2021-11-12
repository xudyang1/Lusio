import React, { Component, createRef, useEffect, useState } from "react";
import { ACHIEVEMENT_CARD, QUIZ_CARD, SUB_PLAT_CARD, SUB_USER_CARD } from "../../types/cardTypes";
import AchievementCard from "./AchievementCard";
import QuizCardWraper from "./QuizCardWraper";
import QuizCards from "../frontpage/QuizCard";
import "../../css/frontpage.css"
import M from 'materialize-css';

function getCards(t, index, element) {
    // console.log("called getCards with type: ", t)
    switch (t) {
        case ACHIEVEMENT_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><AchievementCard key={index} id={index} name={element.name} desc={element.description} /></div>
        case QUIZ_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><QuizCards key={index} id={index} name={element.name} desc={element.description} /></div>
        case SUB_PLAT_CARD:
            break;
        case SUB_USER_CARD:
            break;
    }
}

export default function GeneralSections(props) {


    const items = props.items ? props.items :[
        { id: '1', name: 'Q1', description: 'Description for Q1', author: 'Qwert', platform_id: '1', likes: 4, created: new Date('2010/01/22') },
        { id: '2', name: 'Q2', description: 'Description for Q2', author: 'qazx', platform_id: '2', likes: 1, created: new Date('2010/01/21') },
        { id: '3', name: 'Q3', description: 'Description for Q3', author: 'sktop', platform_id: '2', likes: 10, created: new Date('2021/10/22') },
        { id: '4', name: 'Qtop', description: 'Description for Q4', author: 'desktop', platform_id: '3', likes: 0, created: new Date('2021/01/22') },
        { id: '5', name: 'Q25', description: 'Description for Q25', author: 'shinetop', platform_id: '3', likes: 200, created: new Date('2021/01/22') }
    ]

    var name = props.name ? props.name : "SectionName"
    var type = props.type ? props.type : "quiz"

    const Section = createRef();

    const pageUp = (e) => {
        Section.current.scrollBy(-1000, 0)
    }

    const pageDown = (e) => {
        Section.current.scrollBy(1000, 0)
    }

    return (
        <div>
            <div className="row z-depth-3">
                <div style={{ margin: "10px" }}>
                    <div>
                        <h4>{name}</h4>
                        {props.profilepage? <div></div> : <a href={"/platform/"+props.id}>more{">"}{">"}</a>}
                    </div>
                    <div className="valign-wrapper">
                        <a className="left" onClick={pageUp}><i className="material-icons">chevron_left</i></a>
                        <div className="GSection" ref={Section}>
                            {
                                items.map((element, index) => (
                                    getCards(type, index, element)
                                ))
                            }
                        </div>
                        <a className="right" onClick={pageDown}><i className="material-icons">chevron_right</i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
