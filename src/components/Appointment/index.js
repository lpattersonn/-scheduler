import React, { useEffect } from "react";

import Header from "./Header";

import Show from "./Show";

import Empty from "./Empty";

import Form from "./Form";

import Confirm from "./Confirm";

import Status from "./Status";

import "./styles.scss";

import useVisualMode from "hooks/useVisualMode";

import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";

const SHOW = "SHOW";

const CREATE = "CREATE";

const SAVING = "SAVING";

const DELETING = "DELETING";

const CONFIRM = "CONFIRM";

const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // useEffect(() => {
  //   if (props.interview && mode === EMPTY) {
  //     transition(SHOW);
  //   }
  //   if (props.interview === null && mode === SHOW) {
  //     transition(EMPTY);
  //   }
  // });

  // bookInterview
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then((res) => {
        transition(SHOW);
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  }

  // cancelInterview
  function cancel() {
    transition(DELETING);
    props
      .cancelInterview(props.id)
      .then((res) => {
        transition(EMPTY);
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={() => back()}
          onConfirm={cancel}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
    </article>
  );
}
