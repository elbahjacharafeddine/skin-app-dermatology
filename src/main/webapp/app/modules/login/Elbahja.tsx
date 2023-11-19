import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { redirect } from 'react-router';
import PageNotFound from 'app/shared/error/page-not-found';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const today = new Date();
console.log('today is' + today);
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(today.getDate() + 2);

interface ElbahjaProps {
  isAuthenticated: boolean;
  role: string;
}

const Elbahja: React.FC<ElbahjaProps> = ({ isAuthenticated, role }) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios
      .get('/api/rendez-vous/dermatologue/6547cb2707c44a7f9323eaff')
      .then(response => {
        console.log(response.data);
        // se(response.data);
        const convertedData = response.data.map(item => {
          return {
            id: item.id,
            title: item.patients.adress,
            start: new Date(item.dateDebut),
            end: new Date(item.dateFin),
          };
        });

        setEvents([...events, ...convertedData]);
      })
      .catch(error => {
        console.log(error.data);
      });
  }, []);

  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
  });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert('CLASH');
        break;
      }
    }

    setAllEvents([...allEvents, newEvent]);
  }

  if (role == 'ROLE_DERMATOLOGUE') {
    return (
      <div className="App">
        <h1>Calendar</h1>
        {/*<h2>Add New Event</h2>*/}
        {/*<div>*/}
        {/*  <input*/}
        {/*      type="text"*/}
        {/*      placeholder="Add Title"*/}
        {/*      style={{ width: "20%", marginRight: "10px" }}*/}
        {/*      value={newEvent.title}*/}
        {/*      onChange={(e) =>*/}
        {/*          setNewEvent({ ...newEvent, title: e.target.value })*/}
        {/*      }*/}
        {/*  />*/}
        {/*  <DatePicker*/}
        {/*      placeholderText="Start Date"*/}
        {/*      style={{ marginRight: "10px" }}*/}
        {/*      selected={newEvent.start}*/}
        {/*      showTimeSelect*/}
        {/*      dateFormat="yyyy-MM-dd HH:mm:ss"*/}
        {/*      onChange={(start) => setNewEvent({ ...newEvent, start })}*/}
        {/*  />*/}
        {/*  <DatePicker*/}
        {/*      placeholderText="End Date"*/}
        {/*      selected={newEvent.end}*/}
        {/*      showTimeSelect*/}
        {/*      dateFormat="yyyy-MM-dd HH:mm:ss"*/}
        {/*      onChange={(end) => setNewEvent({ ...newEvent, end })}*/}
        {/*  />*/}
        {/*  <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>*/}
        {/*    Add Event*/}
        {/*  </button>*/}
        {/*</div>*/}
        <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, margin: '50px' }} />
      </div>
    );
  } else {
    return <PageNotFound />;
  }
};

export default Elbahja;
