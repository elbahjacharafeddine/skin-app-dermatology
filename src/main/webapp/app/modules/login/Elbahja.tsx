import React, { Fragment, useRef, useState } from 'react';
// import Scheduler from "react-mui-scheduler"

import { Scheduler } from '@aldabil/react-scheduler';
import type { SchedulerRef } from '@aldabil/react-scheduler/types';
import { Button } from 'reactstrap';

function Elbahja(isAuthenticate) {
  const calendarRef = useRef<SchedulerRef>(null);
  const [state] = useState({
    options: {
      transitionMode: 'zoom',
      startWeekOn: 'mon',
      defaultMode: 'month',
      minWidth: 540,
      maxWidth: 540,
      minHeight: 540,
      maxHeight: 540,
    },
    alertProps: {
      open: true,
      color: 'info', // info | success | warning | error
      severity: 'info', // info | success | warning | error
      message: "🚀 Let's start with awesome react-mui-scheduler 🔥 🔥 🔥",
      showActionButton: true,
      showNotification: true,
      delay: 1500,
    },
    toolbarProps: {
      showSearchBar: true,
      showSwitchModeButtons: true,
      showDatePicker: true,
    },
  });

  const events = [
    {
      event_id: 1,
      title: 'Event 1',
      start: new Date('2023/11/18 09:00'),
      end: new Date('2023/11/18 10:00'),
      allDay: true,
    },
    {
      event_id: 2,
      title: 'Event 2',
      start: new Date('2023/11/19 10:00'),
      end: new Date('2023/11/19 11:30'),
    },
  ];

  const handleCellClick = (event, row, day) => {
    // Do something...
  };

  const handleEventClick = (event, item) => {
    // Do something...
  };

  const handleEventsChange = item => {
    // Do something...
  };

  const handleAlertCloseButtonClicked = item => {
    // Do something...
  };

  return (
    <Fragment>
      <Scheduler
        month={{
          weekDays: [0, 1, 2, 3, 4, 5],
          weekStartOn: 6,
          startHour: 9,
          endHour: 20,
        }}
        ref={calendarRef}
        // month={month}
        events={events}
        //...
      />
    </Fragment>
  );
}

export default Elbahja;
