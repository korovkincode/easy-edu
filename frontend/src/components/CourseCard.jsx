import React from "react";

const CourseCard = ({card}) => {
    console.log(card);
    return (
        <div className="course__card">
            <h3>{card.name}</h3>
            <h5>{card.teacher}</h5>
        </div>
    )
} 

export default CourseCard;