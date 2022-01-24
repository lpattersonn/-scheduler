import React from "react";

import "components/InterviewerListItem.scss";

import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerList = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  let name = props.selected ? props.name : " ";

  return (
    <li className={interviewerList} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
  // return (
  //   <li
  //     onClick={() => props.setInterviewer(props.id)}
  //     className={interviewerList}
  //   >
  //     <img
  //       className="interviewers__item-image"
  //       src={props.avatar}
  //       alt={props.name}
  //     />
  //     {name}
  //   </li>
  // );
}
