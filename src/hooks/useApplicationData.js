// Imports
import React, { useState } from "react";

import axios from "axios";

// useApplicationData custom help for Application.js
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // spots for day
  // const getSpotsForDay = function (day, appointments) {
  //   let spots = 0;
  //   get the day
  //   const dayObj = state.days.find((day) => day.name === state.days);
  //  iterate the day's appintment id
  //   for (const id of dayObj.appointments) {
  //     const appointment = appointments[id];
  //     if (!appointment.interview) {
  //       spots++;
  //     }
  //   }
  //   return spots;
  // };

  // updateSpots
  // function updateSpots(state, appointments, id) {
  //   get the day
  //   const dayObj = state.days.find((day) => day.name === state.days);
  //   const spots = getSpotsForDay(dayObj, appointments);
  //   const day = { ...dayObj, spots };
  //   const newDays = state.days.map((d) => (d.name === state.day ? day : d));
  //   return days array
  //   return newDays;
  // }

  const spotUpdate = (weekday, day, variable) => {
    let spot = day.spots;
    if (weekday === day.name && variable === "REMOVE_SPOT") {
      return spot - 1;
    } else if (weekday === day.name && variable === "ADD_SPOT") {
      return spot + 1;
    } else {
      return spot;
    }
  };
  const updateSpots = (weekday, days, variable) => {
    if (variable === "REMOVE_SPOT") {
      const updatedStateDayArray = days.map((day) => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable),
        };
      });
      return updatedStateDayArray;
    }
    if (variable === "ADD_SPOT") {
      const updatedStateDayArray = days.map((day) => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable),
        };
      });
      return updatedStateDayArray;
    }
  };

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

    // const spots = updateSpots;
    
    setState({
      ...state,
      appointments,
    });
    
return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
  //updateSpots(state, state.appointments, id, "bookInterview");
  const spotUpdate = updateSpots(state.day, state.days, "REMOVE_SPOT");
  setState({
    ...state,
    days: spotUpdate,
    appointments,
  });
  //console.log("RESSS", state);
});
  };

  // cancelInterview function
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      //updateSpots(state, state.appointments, id, "cancelInterview");
      const spotUpdate = updateSpots(state.day, state.days, "ADD_SPOT");
      setState({
        ...state,
        days: spotUpdate,
        appointments,
      });
      //console.log("RESSS", state);
    });
  }

  const setDay = (day) => setState({ ...state, day });

  return { state, setState, setDay, bookInterview, cancelInterview };
}
