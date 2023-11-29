import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './patient.reducer';
import $ from 'jquery';
import 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-responsive-dt/js/responsive.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Patient = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [adress, setAdress] = useState('');
  const [gender, setGender] = useState('');
  const [dateToModal, setDate] = useState('');

  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => {
    setVisible(false);
    setUpdate(false);
  };

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const patientList = useAppSelector(state => state.patient.entities);
  const loading = useAppSelector(state => state.patient.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };
  useEffect(() => {
    if (patientList.length > 0) {
      const table = $('#myTable').DataTable();
      return () => {
        table.destroy();
      };
    }
  }, [patientList]);
  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  const extractBirthdate = date => {
    var birthDate = new Date(date);
    var year = birthDate.getFullYear();
    var month = birthDate.getMonth() + 1;
    var day = birthDate.getDate();
    return `${year}-${month}-${day}`;
  };
  const viewPatient = id => {
    setVisible(true);
    console.log(id + ' patient id');
    const element = patientList.find(e => e.id === id);
    if (element) {
      console.log(element);
      setFirstName(element.user.firstName);
      setLastName(element.user.lastName);
      setEmail(element.user.email);
      setAdress(element.adress);
      setDate(extractBirthdate(element.birthdate));
      setBirthdate(element.birthdate);
      setPhone(element.telephone);
      setGender(element.genre);
    } else {
      console.log('error');
    }
  };

  const [isupdate, setUpdate] = useState(false);
  const [id, setId] = useState(1);
  const editPatient = id => {
    setVisible(true);
    setUpdate(true);
    const patient = patientList.find(e => e.id === id);
    if (patient) {
      console.log(patient);
      setFirstName(patient.user.firstName);
      setLastName(patient.user.lastName);
      setEmail(patient.user.email);
      setAdress(patient.adress);
      setDate(extractBirthdate(patient.birthdate));
      setBirthdate(patient.birthdate);
      setPhone(patient.telephone);
      setGender(patient.genre);
      setId(id);
    } else {
      console.log('patient not found');
    }
  };

  const dataJson = {
    id: id,
    adress: adress,
    genre: gender,
    telephone: phone,
    birthdate: birthdate,
    user: {
      email: email,
      firstName: firstName,
      lastName: lastName,
    },
  };

  const sendUpdate = () => {
    axios
      .put('/api/patients/update/' + id, dataJson)
      .then(response => {
        console.log(response.data);
        getAllEntities();
        setVisible(false);
        setUpdate(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="p-2">
      <h2 id="patient-heading" data-cy="PatientHeading">
        <Translate contentKey="assistanteDermatologueApp.patient.home.title">Patients</Translate>
        <div className="d-flex justify-content-end">
          {/*<Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>*/}
          {/*  <FontAwesomeIcon icon="sync" spin={loading} />{' '}*/}
          {/*  <Translate contentKey="assistanteDermatologueApp.patient.home.refreshListLabel">Refresh List</Translate>*/}
          {/*</Button>*/}
          <Link to="/patient/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="assistanteDermatologueApp.patient.home.createLabel">Create new Patient</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive p-3">
        {patientList && patientList.length > 0 ? (
          <table className="table table-responsive" id="myTable">
            <thead>
              <tr>
                {/*<th className="hand" onClick={sort('id')}>*/}
                {/*  <Translate contentKey="assistanteDermatologueApp.patient.id">ID</Translate>{' '}*/}
                {/*  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />*/}
                {/*</th>*/}
                <th className="hand" onClick={sort('birthdate')}>
                  <Translate contentKey="assistanteDermatologueApp.patient.birthdate">Birthdate</Translate>{' '}
                  {/*<FontAwesomeIcon icon={getSortIconByFieldName('birthdate')} />*/}
                </th>
                <th className="hand" onClick={sort('adress')}>
                  <Translate contentKey="assistanteDermatologueApp.patient.adress">Adress</Translate>{' '}
                  {/*<FontAwesomeIcon icon={getSortIconByFieldName('adress')} />*/}
                </th>
                <th className="hand" onClick={sort('genre')}>
                  Gender
                  {/*<FontAwesomeIcon icon={getSortIconByFieldName('genre')} />*/}
                </th>
                <th className="hand" onClick={sort('telephone')}>
                  Phone
                  {/*<FontAwesomeIcon icon={getSortIconByFieldName('telephone')} />*/}
                </th>
                <th>Full name</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {patientList.map((patient, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  {/*<td>*/}
                  {/*  <Button tag={Link} to={`/patient/${patient.id}`} color="link" size="sm">*/}
                  {/*    {patient.id}*/}
                  {/*  </Button>*/}
                  {/*</td>*/}
                  {/*<td>{patient.birthdate ? <TextFormat type="date" value={patient.birthdate} format={APP_DATE_FORMAT} /> : null}</td>*/}
                  <td>{patient.birthdate ? new Date(patient.birthdate).toLocaleDateString() : null}</td>

                  <td>{patient.adress}</td>
                  <td>{patient.genre}</td>
                  <td>{patient.telephone}</td>
                  <td>{patient.user ? patient.user.firstName + ' ' + patient.user.lastName : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button onClick={() => viewPatient(patient.id)} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => editPatient(patient.id)}
                        // tag={Link} to={`/patient/${patient.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (location.href = `/patient/${patient.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="assistanteDermatologueApp.patient.home.notFound">No Patients found</Translate>
            </div>
          )
        )}
      </div>

      <Modal open={visible} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="card card-responsive">
            <div className="card-header">Patient data</div>
            <div className="row">
              <div className="col-2">
                <Avatar
                  className="m-1"
                  alt="User Image"
                  src="data:image/png;base64,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"
                  sx={{ width: 100, height: 100 }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <TextField
                  aria-readonly={true}
                  className="m-2"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={firstName}
                  {...(isupdate && { onChange: e => setFirstName(e.target.value) })}
                />
              </div>

              <div className="col-6">
                <TextField
                  className="m-2"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={lastName}
                  {...(isupdate && { onChange: e => setLastName(e.target.value) })}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-5">
                <TextField
                  className="m-2"
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  value={phone}
                  {...(isupdate && { onChange: e => setPhone(e.target.value) })}
                />
              </div>

              <div className="col-6">
                <TextField
                  className="m-2"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  {...(isupdate && { onChange: e => setEmail(e.target.value) })}
                />
              </div>
            </div>

            <div className="row">
              {!isupdate && (
                <div className="col-5">
                  <TextField className="m-2" label="Gender" variant="outlined" fullWidth value={gender} />
                </div>
              )}
              {isupdate && (
                <div className="col-5 mt-2" style={{ marginLeft: '10px' }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      label="Gender"
                      onChange={e => {
                        setGender(e.target.value);
                      }}
                    >
                      <MenuItem value="male" selected={gender === 'male'}>
                        Male
                      </MenuItem>
                      <MenuItem value="female" selected={gender === 'female'}>
                        Female
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}

              <div className="col-6">
                <TextField
                  className="m-2"
                  label="Birthdate"
                  variant="outlined"
                  fullWidth
                  value={dateToModal}
                  {...(isupdate && { onChange: e => setBirthdate(e.target.value) })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-11">
                <TextField
                  className="m-2"
                  label="Adress"
                  variant="outlined"
                  fullWidth
                  value={adress}
                  {...(isupdate && { onChange: e => setAdress(e.target.value) })}
                />
              </div>
            </div>
            {isupdate && (
              <div className="d-flex justufy-content-end">
                <button className="m-2 btn btn-primary" onClick={sendUpdate}>
                  Update
                </button>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Patient;
