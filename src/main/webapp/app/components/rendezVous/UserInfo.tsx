import { Container, TextField, Box, Button } from '@material-ui/core';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import React from 'react';

export default function UserInfo({ handleNext, data, setData }: { handleNext: () => void; data: any; setData: any }) {
  return (
    <Container maxWidth="lg">
      <Formik
        initialValues={data}
        onSubmit={values => {
          setData(values);
          handleNext();
        }}
      >
        <Form>
          <Box m={2}>
            <Field fullWidth type="text" as={TextField} variant="outlined" label="Name" name="name" id="name" />
            <ErrorMessage name="name" />
          </Box>
          <Box m={2}>
            <Field fullWidth type="number" as={TextField} label="Age" variant="outlined" name="age" id="age" />
            <ErrorMessage name="age" />
          </Box>
          <Box m={2}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Box>
        </Form>
      </Formik>
    </Container>
  );
}
