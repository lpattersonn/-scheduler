import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  // obejct destructure to define children of DayListItem

  // Declare variable that will be passed in ul
  const listItems = props.days.map((items) => {
    return (
      // Array of DayListItem
      <DayListItem
        key={items.id}
        name={items.name}
        spots={items.spots}
        selected={items.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  // Render the new day list item inside a ul tag
  return <ul>{listItems}</ul>;
}
