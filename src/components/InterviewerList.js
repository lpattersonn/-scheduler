import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem.js";
import PropTypes from "prop-types";

export default function InterviewerList(props){

  const interviewersList = props.interviewers.map(interviewer => {
    return <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={props.interviewer === interviewer.id}
    setInterviewer={event => props.setInterviewer(interviewer.id)}
    />
  })

  return(
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          {interviewersList}
        </ul>
      </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

