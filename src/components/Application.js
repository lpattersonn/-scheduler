import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "helpers/selectors";
import { getInterview, getInterviewersForDay } from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       },
//     },
//   },
//   {
//     id: 5,
//     time: "4pm",
//   },
// ];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // bookInterview function
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState({
      ...state,
      appointments,
    });
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        console.log(state);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // cancelInterview function
  function cancelInterview(id) {
    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => console.log(state));
  }

  const setDay = (day) => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewersItem = getInterviewersForDay(state, state.day);

  const scheduleList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersItem}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {scheduleList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
