import { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import UserInfo from './UserInfo';
import UserAuth from './UserAuth';
import ReviewForm from './ReviewForm';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return ['User Auth', 'User Info', 'Review'];
}

function getStepContent(stepIndex: number, handleNext: () => void, data: any, setData: any, handleReset: () => void) {
  switch (stepIndex) {
    case 0:
      return <UserAuth handleNext={handleNext} data={data} setData={setData} />;
    case 1:
      return <UserInfo handleNext={handleNext} data={data} setData={setData} />;
    case 2:
      return <ReviewForm data={data} setData={setData} handleReset={handleReset} />;
    default:
      return 'Unknown stepIndex';
  }
}

export default function Form() {
  const classes = useStyles();
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    age: 0,
  });
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep, handleNext, data, setData, handleReset)}</Typography>
            {/* <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
