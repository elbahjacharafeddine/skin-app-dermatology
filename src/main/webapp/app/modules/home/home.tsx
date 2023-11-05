import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <div className="home">
      {/* <span className="hipster rounded" /> */}
      <img src="/content/images/background.jpg" className="img-fluid w-100 h-100" alt="Responsive image"></img>
    </div>
  );
};

export default Home;
