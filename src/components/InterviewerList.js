import React from "react";

import "components/InterviewerList.scss";

import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
 // const { interviewers, setInterviewer, interviewer } = props;
  const listItems = props.interviewers.map((items) => {
    return (
      // Array of DayListItem
      <InterviewerListItem
        key={items.id}
        name={items.name}
        avatar={items.avatar}
        selected={items.id === props.interviewer}
        {...items}
        setInterviewer={props.setInterviewer}
      />
    );
  });
  // Render the new day list item inside a ul tag
  return <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{listItems}</ul>
</section>
}


