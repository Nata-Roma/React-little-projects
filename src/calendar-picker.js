import React, { useState } from "react";

const CalendarPicker = () => {
  const calendarDates = Array(31)
    .fill(0)
    .map((_, i) => i);

  const [chosenType, setChosenType] = useState("start");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const updateDate = (chosenDay) => {
    if (startDate && chosenDay < startDate) {
      setStartDate(chosenDay);
      return setChosenType("end");
    }

    if (endDate && chosenDay > endDate) {
      setEndDate(chosenDay);
      return setChosenType("end");
    }

    if (chosenType === "start") {
      setStartDate(chosenDay);
      return setChosenType("end");
    }

    if (chosenType === "end") {
      setEndDate(chosenDay);
    }
  };

  return (
    <div className="calendar-picker">
      <div className="date-chooser">
        <button
          className="date-chooser-button"
          onClick={() => setChosenType("start")}
        >
          Start Date <span>{startDate}</span>
        </button>
        <button
          className="date-chooser-button"
          onClick={() => setChosenType("end")}
        >
          End Date <span>{endDate}</span>
        </button>
      </div>

      <div className="calendar">
        {calendarDates.map((day, index) => {
          const calendarDay = day + 1;
          let isSelected = calendarDay === startDate || calendarDay === endDate;

          return (
            <button
              className={`calendar-day ${isSelected ? "is-selected" : ""}`}
              key={index}
              onClick={() => updateDate(calendarDay)}
            >
              {calendarDay}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarPicker;
