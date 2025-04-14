import { useState } from "react";
import "./styles.css";

export default function App() {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [view, setView] = useState(false);

  const [selectedDate, setSelectedDate] = useState([
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
  ]);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calculateCalendar = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const dayName = firstDay.getDay();
    const blankDays = Array(dayName).fill("");
    const days = Array.from({ length: lastDay.getDate() }, (_, i) => i + 1);
    return [...blankDays, ...days];
  };

  const corrDate = calculateCalendar();

  const [inp, setInp] = useState(
    date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
  );

  function onClickHandler(day) {
    let date = day + "-" + (month + 1) + "-" + year;
    setInp(date);
    setSelectedDate([day, month, year]);
  }

  function onSubmitHandler() {
    const dateVal = inp.split("-").map(Number);
    if (
      dateVal.length !== 3 ||
      isNaN(dateVal[0]) ||
      isNaN(dateVal[1]) ||
      isNaN(dateVal[2])
    ) {
      alert("Invalid date format. Please use DD-MM-YYYY.");
    }
    setMonth(dateVal[1] - 1);
    setYear(dateVal[2]);
    setSelectedDate([dateVal[0], dateVal[1] - 1, dateVal[2]]);
    setView(true);
  }

  function prevCal() {
    if (month > 0) {
      setMonth(month - 1);
    } else {
      setMonth(11);
      setYear(year - 1);
    }
  }

  function nextCal() {
    if (month < 11) {
      setMonth(month + 1);
    } else {
      setMonth(0);
      setYear(year + 1);
    }
  }

  function revertToSelected() {
    if (!view) {
      setMonth(selectedDate[1]);
      setYear(selectedDate[2]);
    }
  }
  return (
    <div className="App">
      <div>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter date here!"
            value={inp}
            onClick={() => {
              revertToSelected();
              setView(true);
            }}
            onChange={(e) => setInp(e.target.value)}
          />
          <button className="submit" onClick={onSubmitHandler}>
            Submit
          </button>
          <button className="close" onClick={() => setView(false)}>
            Close
          </button>
        </div>
        {view ? (
          <div>
            <h1>{monthNames[month] + " " + year}</h1>

            {view ? <button onClick={prevCal}>Prev</button> : ""}

            {view ? <button onClick={nextCal}>Next</button> : ""}

            <div className="weekC">
              {weekDays.map((name) => (
                <div key={name} className="weekName">
                  {name}
                </div>
              ))}
            </div>
            <div className="datesC">
              {corrDate.map((day, idx) => (
                <div
                  className={`dates ${
                    selectedDate[0] === day &&
                    selectedDate[1] === month &&
                    selectedDate[2] === year
                      ? "highlighted"
                      : ""
                  } ${day === "" ? "" : "valid"}`}
                  key={idx}
                  onClick={() => day && onClickHandler(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
