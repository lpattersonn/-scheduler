export default function getAppointmentsForDay(state, day) {
  let app = [];
  let sessions = state.appointments;
  // Iterate through the elements in state.days
  for (let elements of state.days) {
    // Isolate the state.days.name that is equal to day
    if (elements.name === day) {
      // Loop through state.days.appointments
      for (let ele of elements.appointments) {
        // Iterate through state.appointments
        for (let key in sessions) {
          // Push the value of state.appointment.id to the app array
          if (Number(key) === ele) {
            app.push(sessions[key]);
          }
        }
      }
    }
  }
  // Return the app array
  return app;
}

// export function getInterview(state, interview) {
//   let result = {};
//   //console.log(interview)
//   if (!interview) {
//     return null;
//   }
//   for (let item in state.appointments) {
//     if (state.appointments[item].interview) {
//       let id = state.appointments[item].interview.interviewer;
//       for (let key in state.interviewers) {
//         if (state.interviewers[key].id === id) {
//           result.student = state.appointments[item].interview.student;
//           result.interviewer = state.interviewers[key];
//         }
//       }
//     }
//   }
// }
export function getInterview(state, interview) {
  let result = {};
  console.log("Interview data is", interview);
  if (!interview) {
    return null;
  }
  result.student = interview.student;
  result.interviewer = state.interviewers[interview.interviewer];
  return result;
}

export function getInterviewersForDay(state, dayName) {
  const filteredAppointments = state.days
    .filter((day) => day.name === dayName)
    .map((d) => d.interviewers)
    .flat();
  //console.log(filteredAppointments)
  const interviewer = [];
  for (const interviewerId of filteredAppointments) {
    // console.log(appointmentId)
    if (state.interviewers[interviewerId]) {
      interviewer.push(state.interviewers[interviewerId]);
    }
  }
  //console.log(interviewer)
  return interviewer;
}
