export default function getAppointmentsForDay(state, day) {
  let app = [];
  let appointments = state.days;
  let sessions = state.appointments;
  // Iterate through the elements in state.days
  for (let elements of appointments) {
    // Isolate the state.days.name that is equal to day
    if (elements.name === day) {
      // Loop through state.days.appointments
      for (let ele of elements.appointments) {
        // Iterate through state.appointments
        for (let key in sessions) {
          const number = Number(key);
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
