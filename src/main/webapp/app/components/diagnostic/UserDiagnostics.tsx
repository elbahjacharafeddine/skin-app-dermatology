import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import DiagnosticModel from '../../entities/diagnostic/DiagnosticModel';
import { getEntities, partialUpdateEntity } from '../../entities/diagnostic/diagnostic.reducer';
import $ from 'jquery';
import 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-responsive-dt/js/responsive.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
const chartstyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const validatestyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const buttonStyle = {
  marginTop: 'auto',
  flexDirection: 'column', // Display children in a column
  alignItems: 'center', // Center items horizontally
};

// const buttonStyle = {
//   marginTop: 'auto', // Push the button to the bottom
// };

export const UserDiagnostics = () => {
  const dispatch = useAppDispatch();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
  };

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const diagnosticList = useAppSelector(state => state.diagnostic.entities);
  const loading = useAppSelector(state => state.diagnostic.loading);
  // const location = useLocation();
  const searchParams = new URLSearchParams(pageLocation.search);
  const consultationId = sessionStorage.getItem('consultation_id');
  const patientName = sessionStorage.getItem('patientName');
  // const [diagnosticInfos,setDiagnosticInfos]=useState();
  const [diagnosticInfos, setDiagnosticInfos] = useState<{
    id: string;
    description: string;
    maladies: {
      fullName: string;
      abbr: string;
    };
    maladiesDetected: {
      fullName: string;
      abbr: string;
    };
    probability: string;
    picture: string;
    pictureContentType: string;
    prescription: string;
    probabilities: string[];
    symptoms: string[];
  } | null>(null);

  // Your function to handle the update
  // const handleUpdate = (diagnosticInfos): MouseEventHandler<HTMLButtonElement> => () => {
  //   const maladie = {
  //     id: diagnosticInfos.maladies?.[0]?.id,
  //     fullName: diagnosticInfos.maladies?.[0]?.fullName,
  //     abbr: diagnosticInfos.maladies?.[0]?.abbr,
  //   };
  //   const listeMaladies = [];
  //   listeMaladies[0] = maladie;

  //   // Assuming you have an IDiagnostic object
  //   const diagnosticToUpdate={
  //     maladies: listeMaladies, // Replace with the actual ID
  //     // Other fields you want to update
  //   };
  //   dispatch(partialUpdateEntity(diagnosticToUpdate))
  //     .unwrap()
  //     .then((response) => {
  //       // Handle successful update
  //       console.log('Update successful', response);
  //       // Optionally, you can dispatch an action to fetch the updated entities
  //       // dispatch(getEntities({}));
  //     })
  //     .catch((error) => {
  //       // Handle update error
  //       console.error('Update failed', error);
  //     });
  // };

  const [selectedMaladie, setSelectedMaladie] = useState<IMaladie | null>(null);

  interface IMaladie {
    id: string;
    fullName: string;
  }

  // Other state and function definitions...

  const handleUpdate = () => {
    console.log('this is my selected maladie : ', selectedMaladie);
    if (selectedMaladie && diagnosticInfos) {
      // Your existing logic to construct the maladie object...

      const diagnosticToUpdate = {
        id: diagnosticInfos.id, // Replace with the actual property name of the diagnostic ID
        maladies: [
          {
            id: selectedMaladie.id,
            fullName: selectedMaladie.fullName,
          },
        ],
      };

      dispatch(partialUpdateEntity(diagnosticToUpdate))
        .unwrap()
        .then(response => {
          // Handle successful update
          console.log('Update successful', response);
          // Optionally, you can dispatch an action to fetch the updated entities
          // dispatch(getEntities({}));
        })
        .catch(error => {
          // Handle update error
          console.error('Update failed', error);
        });
    }

    setIsValidateModalOpen(!isValidateModalOpen);
    setIsModelOpen(!isModelOpen);
    window.location.reload();
  };

  const [statisticsData, setStatisticsData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  }>({
    labels: ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc'],
    datasets: [
      {
        label: 'Probabilities',
        data: [],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const [data, setData] = useState([]);
  const [dataMaladies, setDataMaladies] = useState([]);
  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    setIsModelOpen(false);

    // const endURL = `?sort=${sortState.sort},${sortState.order}`;
    // if (pageLocation.search !== endURL) {
    //   navigate(`${pageLocation.pathname}${endURL}`);
    // }
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
    setIsModelOpen(false);
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

  const loadDiagnosticsById = id => {
    console.log(id);
    axios
      .get(`/api/diagnostics/consultations/${consultationId}`)
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadDiagnosticsById(consultationId);
  }, [consultationId]);

  useEffect(() => {
    if (data.length > 0) {
      const table = $('#myTable').DataTable();
      return () => {
        table.destroy();
      };
    }
  }, [data]);

  // console.log('data16', data[16]?.maladies[0].fullName);

  const [isStatisticsModalOpen, setIsStatisticsModalOpen] = useState(false);
  const [isValidateModalOpen, setIsValidateModalOpen] = useState(false);
  useEffect(() => {
    const storedDiagnostic = JSON.parse(sessionStorage.getItem('diagnostic'));
    if (storedDiagnostic) {
      console.log('Diagnostic Information:', storedDiagnostic);
    }
    setDiagnosticInfos(storedDiagnostic);
  }, [isStatisticsModalOpen]);

  useEffect(() => {
    const myDiagnostic = JSON.parse(sessionStorage.getItem('Mydiagnostic'));
    if (myDiagnostic) {
      console.log('Diagnostic Information:', myDiagnostic);
    }
    setDiagnosticInfos(myDiagnostic);
  }, [isValidateModalOpen]);

  const toggleStatisticsModal = (probabilities, diagnostic) => {
    const circularReferenceReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };

    const jsonString = JSON.stringify(probabilities, circularReferenceReplacer());
    sessionStorage.setItem('statisticsData', jsonString);
    const jsonStringDiagnostic = JSON.stringify(diagnostic, circularReferenceReplacer());
    sessionStorage.setItem('diagnostic', jsonStringDiagnostic);
    setIsStatisticsModalOpen(!isStatisticsModalOpen);
    const keepItem1 = 'user_data';
    const keepItem2 = 'jhi-authenticationToken';
    const keepItem3 = 'consultation_id';
    const keepItem4 = 'patientName';
    const keepItem5 = 'statisticsData';
    const keepItem6 = 'diagnostic';

    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const key = sessionStorage.key(i);
      if (key !== keepItem1 && key !== keepItem2 && key !== keepItem3 && key !== keepItem4 && key !== keepItem5 && key !== keepItem6) {
        sessionStorage.removeItem(key);
      }
    }
  };

  const toggleValidateModal = diagnostic => {
    const circularReferenceReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };

    const maladies = axios.get(`/api/maladies`).then(response => {
      console.log(response.data);
      setDataMaladies(response.data);
    });
    console.log('dataMaladies:', dataMaladies);

    const jsonStringDiagnostic = JSON.stringify(diagnostic, circularReferenceReplacer());
    sessionStorage.setItem('Mydiagnostic', jsonStringDiagnostic);
    setIsValidateModalOpen(!isValidateModalOpen);
  };

  const getSessionStorageData = () => {
    const storedData = sessionStorage.getItem('statisticsData');
    try {
      return storedData ? JSON.parse(storedData.trim()) : [];
    } catch (error) {
      console.error('Error parsing JSON from sessionStorage:', error);

      return [];
    }
  };
  console.log('getSessionStorageData', getSessionStorageData());
  const diseases = ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc'];

  useEffect(() => {
    const originalData = getSessionStorageData();
    const convertedData = Array.isArray(originalData) ? originalData.map(value => Number(value.toFixed(2))) : [];

    setStatisticsData({
      labels: ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc'],
      datasets: [
        {
          label: 'Probabilities',
          data: convertedData,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [isStatisticsModalOpen]);
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  const handleClose = () => {
    // Add any additional logic you want when the modal is closed
    setIsValidateModalOpen(!isValidateModalOpen);
  };

  // Function to handle the confirm button
  const handleConfirm = () => {
    // Add any logic you want when the user confirms the selection
    // You can access the selected value from your select element here
    setIsValidateModalOpen(!isValidateModalOpen);
  };

  if (consultationId != undefined && consultationId != null) {
    return (
      <div className="p-2">
        <h2 id="diagnostic-heading" data-cy="DiagnosticHeading">
          Diagnostics for Patient : {patientName}
          <div className="d-flex justify-content-end">
            <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
              <FontAwesomeIcon icon="sync" spin={loading} />{' '}
              <Translate contentKey="assistanteDermatologueApp.diagnostic.home.refreshListLabel">Refresh List</Translate>
            </Button>

            <Button color="primary" onClick={toggleModel}>
              New diagnostic
            </Button>
            <DiagnosticModel isOpen={isModelOpen} toggle={toggleModel} isNew={true} />
            {/* <Link to="/diagnostic/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="assistanteDermatologueApp.diagnostic.home.createLabel">Create new Diagnostic</Translate>
          </Link> */}
          </div>
        </h2>
        <div className="table-responsive">
          {data && data.length > 0 ? (
            <table className="table table-responsive p-3" id="myTable">
              <thead>
                <tr>
                  {/* <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="assistanteDermatologueApp.diagnostic.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th> */}
                  <th className="hand" onClick={sort('dateDiagnostic')}>
                    <Translate contentKey="assistanteDermatologueApp.diagnostic.dateDiagnostic">Date Diagnostic</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('dateDiagnostic')} />
                  </th>
                  <th className="hand">Disease</th>

                  <th className="hand" onClick={sort('picture')}>
                    <Translate contentKey="assistanteDermatologueApp.diagnostic.picture">Picture</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('picture')} />
                  </th>
                  <th className="hand" onClick={sort('description')}>
                    <Translate contentKey="assistanteDermatologueApp.diagnostic.description">Description</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                  </th>
                  <th className="hand" onClick={sort('prescription')}>
                    <Translate contentKey="assistanteDermatologueApp.diagnostic.prescription">Prescription</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('prescription')} />
                  </th>
                  <th className="hand" onClick={sort('probability')}>
                    <Translate contentKey="assistanteDermatologueApp.diagnostic.probability">Probability</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('probability')} />
                  </th>
                  {/* <th>
                  <Translate contentKey="assistanteDermatologueApp.diagnostic.consultations">Consultations</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th> */}
                  <th />
                </tr>
              </thead>
              <tbody>
                {data.map((diagnostic, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    {/* <td>
                    <Button tag={Link} to={`/diagnostic/${diagnostic.id}`} color="link" size="sm">
                      {diagnostic.id}
                    </Button>
                  </td> */}
                    <td>
                      {diagnostic.dateDiagnostic ? (
                        <TextFormat type="date" value={diagnostic.dateDiagnostic} format={APP_DATE_FORMAT} />
                      ) : null}
                    </td>

                    <td>{diagnostic.maladies[0]?.fullName}</td>

                    <td>
                      {diagnostic.picture ? (
                        <div>
                          {diagnostic.pictureContentType ? (
                            <a onClick={openFile(diagnostic.pictureContentType, diagnostic.picture)}>
                              <img
                                src={`data:${diagnostic.pictureContentType};base64,${diagnostic.picture}`}
                                style={{ maxHeight: '30px' }}
                              />
                              &nbsp;
                            </a>
                          ) : null}
                          <span>
                            {diagnostic.pictureContentType}, {byteSize(diagnostic.picture)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{diagnostic.description}</td>
                    <td>{diagnostic.prescription}</td>
                    <td>{diagnostic.probability}</td>
                    {/* <td>
                    {diagnostic.consultations ? (
                      <Link to={`/consultation/${diagnostic.consultations.id}`}>{diagnostic.consultations.id}</Link>
                    ) : (
                      ''
                    )}
                  </td> */}
                    <td className="text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button color="success" size="sm" onClick={() => toggleStatisticsModal(diagnostic.probabilities, diagnostic)}>
                          <FontAwesomeIcon icon={faChartLine} /> <span className="d-none d-md-inline">Statistics</span>
                        </Button>

                        <Button tag={Link} to={`/diagnostic/${diagnostic.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`/diagnostic/${diagnostic.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button color="success" size="sm" onClick={() => toggleValidateModal(diagnostic)}>
                          <FontAwesomeIcon icon={faCheck} /> <span className="d-none d-md-inline">Validate</span>
                        </Button>
                        <Button
                          onClick={() => (location.href = `/diagnostic/${diagnostic.id}/delete`)}
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
                <Translate contentKey="assistanteDermatologueApp.diagnostic.home.notFound">No Diagnostics found</Translate>
              </div>
            )
          )}
        </div>
        <Modal
          open={isStatisticsModalOpen}
          onClose={toggleStatisticsModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={chartstyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ background: 'yellow', textAlign: 'center' }}>
              Statistics
            </Typography>

            <Bar data={statisticsData} />
            {diagnosticInfos && (
              <div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <Paper
                    sx={{
                      p: 2,
                      margin: 'auto',
                      maxWidth: 500,
                      flexGrow: 1,
                      backgroundColor: theme => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item>
                        <ButtonBase sx={{ width: 128, height: 128 }}>
                          {diagnosticInfos.picture ? (
                            <div>
                              {diagnosticInfos.pictureContentType ? (
                                <a onClick={openFile(diagnosticInfos.pictureContentType, diagnosticInfos.picture)}>
                                  <img
                                    src={`data:${diagnosticInfos.pictureContentType};base64,${diagnosticInfos.picture}`}
                                    style={{ maxHeight: '120px', maxWidth: '120px' }}
                                  />
                                  &nbsp;
                                </a>
                              ) : null}
                            </div>
                          ) : null}
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                              Predicted disease: {diagnosticInfos.maladiesDetected?.[0]?.fullName}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                              Confidence: {diagnosticInfos.probability + ' %'}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Disease Symptoms: {diagnosticInfos.symptoms?.map(symptom => symptom).join(', ')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Prescription: {diagnosticInfos.prescription}
                            </Typography>
                          </Grid>
                          {/* <Grid item>
                        <Typography sx={{ cursor: 'pointer' }} variant="body2">
                          Remove
                        </Typography>
                      </Grid> */}
                        </Grid>
                        {/* <Grid item>
                      <Typography variant="subtitle1" component="div">
                        $19.00
                      </Typography>
                    </Grid> */}
                      </Grid>
                    </Grid>
                  </Paper>

                  <Paper
                    sx={{
                      p: 2,
                      margin: 'auto',
                      width: 320,
                      maxWidth: 350,
                      flexGrow: 2,
                      backgroundColor: theme => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={8} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                              Disease Description
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{ whiteSpace: 'pre-line' }}>
                              <p>{diagnosticInfos.description}</p>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </div>
                {/* <p>Diagnostic ID: {diagnosticInfos.picture}</p> */}
                {/* Add other properties as needed */}
              </div>
            )}
          </Box>
        </Modal>

        <Modal
          open={isValidateModalOpen}
          onClose={toggleValidateModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={validatestyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' }}>
              Diagnostic Validation
            </Typography>
            {/* <Container className='chat-container' style={{ alignContent: "stretch" }}> */}
            <Row>
              <Col>
                {diagnosticInfos && (
                  <div className="form-field">
                    <label>SELECT THE CORRECT DISEASE</label>
                    <select
                      name="maladie_id"
                      style={{ width: '200px', justifyContent: 'initial', fontSize: '20px', color: 'gray' }}
                      required
                      onChange={e => {
                        const selectedMaladie = dataMaladies.find(maladie => maladie.id === e.target.value);
                        setSelectedMaladie(selectedMaladie || null);
                      }}
                      value={selectedMaladie?.id || ''}
                    >
                      <option value="">choose</option>
                      {dataMaladies.map(maladie => (
                        <option key={maladie.id} value={maladie.id}>
                          <Typography variant="body2" gutterBottom>
                            <span>{maladie.fullName}</span>
                          </Typography>
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col>
                <Card>
                  <Card.Header>DISEASE DETECTED BY THE ALGORITHM</Card.Header>
                  <Card.Body>
                    {diagnosticInfos && (
                      <div>
                        <span>PREDICATED DISEASE : {diagnosticInfos.maladiesDetected?.[0]?.fullName} </span> <br></br>
                        <span>CONFIDENCE : {diagnosticInfos.probability + ' '}%</span>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                {diagnosticInfos && (
                  <Card>
                    <Card.Header>DISEASE DETECTECTION RESULTS GIVEN BY THE ALGORTHM</Card.Header>
                    <Card.Body>
                      {diagnosticInfos.probabilities?.map((probability, index) => (
                        <option key={index} value={probability}>
                          <Typography variant="body2" gutterBottom>
                            <span>{diseases[index]}</span> ========= <span>{probability}%</span>
                          </Typography>
                        </option>
                      ))}
                    </Card.Body>
                  </Card>
                )}
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="success" onClick={handleUpdate}>
                  Confirm
                </Button>
              </Col>
            </Row>
            {/* </Container> */}
          </Box>
        </Modal>
      </div>
    );
  } else {
    return (
      <div>
        {/*<Button onClick={handleOpen}>Open modal</Button>*/}
        <Modal
          open={true}
          onClose={() => {
            // Handle close logic here, if needed
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ background: 'yellow', textAlign: 'center' }}>
              Warning
            </Typography>
            {/*<hr />*/}
            <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: 'bold' }}>
              You must select a consultation
            </Typography>
            <br />
            <Button
              // style={buttonStyle}
              onClick={() => {
                // Handle any additional logic here
                navigate('/consultation');
                // Close the modal if needed
                // onClose();
              }}
            >
              Ok
            </Button>
          </Box>
        </Modal>
      </div>
    );
  }
};

export default UserDiagnostics;
