import React, { useState } from "react";
import styled, { css } from "styled-components";

const CalendarPicker = () => {
  const calendarDates = Array(31)
    .fill(0)
    .map((_, i) => i);

  const [chosenType, setChosenType] = useState("start");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

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

  const checkInBetween = (day) => {
    // if (!startDate && !endDate) return false;
    if (startDate && !endDate) return day > startDate && day < hoverDate;
    return day > startDate && day < endDate;
  };

  return (
    <div className="calendar-picker">
      <DateChoser>
        <DateChooserButton
          onClick={() => setChosenType("start")}
          isChosen={chosenType === "start"}
        >
          Start Date <span>{startDate}</span>
        </DateChooserButton>
        <DateChooserButton
          className="date-chooser-button"
          onClick={() => setChosenType("end")}
          isChosen={chosenType === "end"}
        >
          End Date <span>{endDate}</span>
        </DateChooserButton>
      </DateChoser>

      <div className="calendar">
        {calendarDates.map((day, index) => {
          const calendarDay = day + 1;
          let isSelected = calendarDay === startDate || calendarDay === endDate;
          let isInBetween = checkInBetween(calendarDay);

          return (
            <CalendarDayButton
              isSelected={isSelected}
              key={index}
              onClick={() => updateDate(calendarDay)}
              isInBetween={isInBetween}
              onMouseOver={() => setHoverDate(calendarDay)}
            >
              {calendarDay}
            </CalendarDayButton>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarPicker;

const DateChoser = styled.div`
  margin: 0 auto 15px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  height: 90px;
`;

const DateChooserButton = styled.button`
  background-color: ${(props) =>
    props.isChosen ? "rgb(188, 187, 214)" : "transparent"};
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 18px;
  color: black;
  transition: all 0.2s ease;
  padding: 10px 10px 0;
  border-radius: 5px;
  text-transform: uppercase;

  span {
    display: block;
    font-size: 45px;
  }
`;

const CalendarDayButton = styled.button`
  color: rgb(129, 110, 182);
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  align-self: center;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 15px 0;
  transition: all 0.2s ease;
  ${(props) =>
    props.isSelected &&
    css`
      color: rgb(203, 194, 229);
      background-color: rgb(27, 11, 51) !important;
    `}
  ${(props) =>
    props.isInBetween &&
    css`
      color: rgb(203, 194, 229);
      background-color: rgb(47, 18, 152);
    `}
  &:hover {
    color: rgb(203, 194, 229);
    background: rgb(47, 18, 152);
  }
`;
