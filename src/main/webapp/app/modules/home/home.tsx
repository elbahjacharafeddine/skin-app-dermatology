// import './home.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';
// import { FaUser, FaHospital, FaClipboardList } from 'react-icons/fa'; // Import Font Awesome icons
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { faBiohazard } from '@fortawesome/free-solid-svg-icons';

import { useAppSelector } from 'app/config/store';

import { LineChart, AreaChart, ScatterChart, ColumnChart, PieChart } from 'react-chartkick';
import 'chartkick/chart.js';

const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  // Dummy data for statistics
  const doctorsCount = 25;
  const hospitalsCount = 10;
  const appointmentsCount = 150;
  const maladies = 7;

  return (
    <div className="home" style={{ overflow: 'auto' }}>
      <div className="m-4">
        <div className="card m-4">
          <div className="card-header m-1">Dashboard</div>
          <div className="card-body">
            <Row>
              <Col md="3">
                <div className="card">
                  <div className="card-header">
                    <FontAwesomeIcon icon={faUserMd} className="mr-2" />
                    Doctors
                  </div>
                  <div className="card-body">
                    <h3>{doctorsCount}</h3>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="card">
                  <div className="card-header">
                    <FontAwesomeIcon icon={faUserTie} className="mr-2" />
                    Secretary
                  </div>
                  <div className="card-body">
                    <h3>{hospitalsCount}</h3>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="card">
                  <div className="card-header">
                    <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" /> Appointments
                  </div>
                  <div className="card-body">
                    <h3>{appointmentsCount}</h3>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="card">
                  <div className="card-header">
                    <FontAwesomeIcon icon={faBiohazard} className="mr-2" /> Diseases
                  </div>
                  <div className="card-body">
                    <h3>{maladies}</h3>
                  </div>
                </div>
              </Col>

              <Row>
                <Col md="12" style={{ marginTop: '50px' }}>
                  <LineChart
                    title="Appointment by month"
                    data={{ '2021-12-01': 11, '2021-12-02': 6, '2021-12-03': 4, '2021-12-04': 6, '2021-12-05': 1, '2021-12-06': 8 }}
                  />
                </Col>
              </Row>
              {/*<AreaChart data={{"2021-01-01": 11, "2021-01-02": 6}} />*/}

              {/*<PieChart data={[["Blueberry", 44], ["Strawberry", 23]]} />*/}
              {/*<ColumnChart data={[["Sun", 32], ["Mon", 46], ["Tue", 28]]} />*/}
              {/*<ScatterChart data={[[174.0, 80.0], [176.5, 82.3]]} xtitle="Size" ytitle="Population" />*/}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
