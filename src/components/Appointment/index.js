import React from "react";

import Header from "./Header";

import Show from "./Show";

import Empty from "./Empty";

import "./styles.scss";

export default function Appointment(props) {
  return (
    <main className="appointment">
      <article >
        {props.time ? <Header time={props.time} /> : "No Appointement"}
      </article>
      {props.interview ? ( 
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      ) : (
        <Empty />
      )}
    </main>
  );
}
