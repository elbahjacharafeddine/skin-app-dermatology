import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './dermatologue.reducer';
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

export const Dermatologue = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [codeEmp, setCodeEmpl] = useState('');
  const [gender, setGender] = useState('');
  const [dateToModal, setDate] = useState('');
  const [visible, setVisible] = useState(false);
  const [isupdate, setUpdate] = useState(false);
  const [id, setId] = useState(1);
  const handleClose = () => {
    setVisible(false);
    setUpdate(false);
  };

  const extractBirthdate = date => {
    var birthDate = new Date(date);
    var year = birthDate.getFullYear();
    var month = birthDate.getMonth() + 1;
    var day = birthDate.getDate();
    return `${year}-${month}-${day}`;
  };
  const viewDermatologue = id => {
    setVisible(true);
    console.log(id + ' dermatologue id');
    const element = dermatologueList.find(e => e.id === id);
    if (element) {
      console.log(element);
      setFirstName(element.user.firstName);
      setLastName(element.user.lastName);
      setEmail(element.user.email);
      setDate(extractBirthdate(element.birthdate));
      setPhone(element.telephone);
      setGender(element.genre);
      setCodeEmpl(element.codeEmp);
    } else {
      console.log('error');
    }
  };

  const editDermatologue = id => {
    setVisible(true);
    setUpdate(true);
    const dermatologue = dermatologueList.find(e => e.id === id);
    console.log(dermatologue);
    if (dermatologue) {
      console.log(dermatologue);
      setFirstName(dermatologue.user.firstName);
      setLastName(dermatologue.user.lastName);
      setEmail(dermatologue.user.email);
      setDate(extractBirthdate(dermatologue.birthdate));
      setPhone(dermatologue.telephone);
      setGender(dermatologue.genre);
      setCodeEmpl(dermatologue.codeEmp);
      setId(id);
    } else {
      console.log('patient not found');
    }
  };

  const dataJson = {
    id: id,
    codeEmp: codeEmp,
    genre: gender,
    telephone: phone,
    user: {
      email: email,
      firstName: firstName,
      lastName: lastName,
    },
  };

  const sendUpdate = () => {
    axios
      .put('/api/dermatologues/update/' + id, dataJson, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('jhi-authenticationToken')}`,
        },
      })
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

  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const dermatologueList = useAppSelector(state => state.dermatologue.entities);
  const loading = useAppSelector(state => state.dermatologue.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

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

  useEffect(() => {
    if (dermatologueList.length > 0) {
      const table = $('#myTable').DataTable();
      return () => {
        table.destroy();
      };
    }
  }, [dermatologueList]);

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

  const showData = () => {
    console.log(dermatologueList);
  };

  return (
    <div className="p-2">
      <h2 id="dermatologue-heading" data-cy="DermatologueHeading">
        Dermatologists
        <div className="d-flex justify-content-end">
          {/*<Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>*/}
          {/*  <FontAwesomeIcon icon="sync" spin={loading} />{' '}*/}
          {/*  <Translate contentKey="assistanteDermatologueApp.dermatologue.home.refreshListLabel">Refresh List</Translate>*/}
          {/*</Button>*/}
          <Link to="/dermatologue/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="assistanteDermatologueApp.dermatologue.home.createLabel">Create new Dermatologue</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive p-3">
        {dermatologueList && dermatologueList.length > 0 ? (
          <table className="table table-responsive p-2" id="myTable">
            <thead>
              <tr>
                <th className="hand" onClick={sort('codeEmp')}>
                  <Translate contentKey="assistanteDermatologueApp.dermatologue.codeEmp">Code Emp</Translate>{' '}
                </th>
                <th className="hand" onClick={sort('genre')}>
                  Gender
                </th>
                <th className="hand" onClick={sort('telephone')}>
                  Phone
                </th>
                <th>Full name</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dermatologueList.map((dermatologue, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>{dermatologue.codeEmp}</td>
                  <td>{dermatologue.genre}</td>
                  <td>{dermatologue.telephone}</td>
                  {/*<td>{dermatologue.user ? dermatologue.user : ''}</td>*/}
                  <td>{dermatologue.user ? dermatologue.user.firstName + ' ' + dermatologue.user.lastName : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        onClick={() => viewDermatologue(dermatologue.id)}
                        // tag={Link} to={`/dermatologue/${dermatologue.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => editDermatologue(dermatologue.id)}
                        // tag={Link} to={`/dermatologue/${dermatologue.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/dermatologue/all-patient/${dermatologue.id}`} color="warning" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline m-1">Patients info</span>
                      </Button>

                      <Button
                        onClick={() => (location.href = `/dermatologue/${dermatologue.id}/delete`)}
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
              <Translate contentKey="assistanteDermatologueApp.dermatologue.home.notFound">No Dermatologues found</Translate>
            </div>
          )
        )}
      </div>

      <Modal open={visible} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="card card-responsive">
            <div className="card-header">Dermatologist data</div>
            <div className="row">
              <div className="col-2">
                <Avatar
                  className="m-1"
                  alt="User Image"
                  src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
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
                  label="code Employee"
                  variant="outlined"
                  fullWidth
                  value={codeEmp}
                  {...(isupdate && { onChange: e => setCodeEmpl(e.target.value) })}
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

export default Dermatologue;
