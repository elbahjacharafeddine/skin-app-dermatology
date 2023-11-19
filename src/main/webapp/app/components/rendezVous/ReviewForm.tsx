import { Container, Button } from '@material-ui/core';

import './Review.css';
import React from 'react';

interface formData {
  email: string;
  password: string;
  name: string;
  age: number;
}

const ReviewForm = ({ data, handleReset, setData }: { data: formData; handleReset: () => void; setData: (formData: formData) => void }) => {
  const finish = () => {
    handleReset();
    setData({
      email: '',
      password: '',
      name: '',
      age: 0,
    });
  };
  return (
    <Container>
      <div style={{ padding: '0px 10px' }}>
        <h2 className="reviewHeading  ">Review Details</h2>
        <p className="fieldList">
          <span className="fieldName">Email</span>: {data.email}
        </p>
        <p className="fieldList">
          <span className="fieldName">Password</span>: {data.password}
        </p>
        <p className="fieldList">
          <span className="fieldName">Name</span>: {data.name}
        </p>
        <p className="fieldList">
          <span className="fieldName">Age</span>: {data.age}
        </p>
        <Button color="primary" variant="contained" fullWidth type="submit" onClick={finish}>
          Submit
        </Button>
      </div>
    </Container>
  );
};

export default ReviewForm;
