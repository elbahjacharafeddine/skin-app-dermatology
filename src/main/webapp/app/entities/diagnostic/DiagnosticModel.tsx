import React, { ChangeEvent } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { Button, Table } from 'reactstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText, Table } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { useLocation } from 'react-router-dom';
import { IConsultation } from 'app/shared/model/consultation.model';
import { getEntities as getConsultations } from 'app/entities/consultation/consultation.reducer';
import { IDiagnostic } from 'app/shared/model/diagnostic.model';
import { getEntity, updateEntity, createEntity, reset } from './diagnostic.reducer';
interface DiagnosticModelProps {
  isOpen: boolean;
  toggle: () => void;
  isNew?: boolean;
}

const DiagnosticModel: React.FC<DiagnosticModelProps> = ({ isOpen, toggle, isNew }) => {
  // const dispatch = useAppDispatch();
  const diagnosticEntity = useAppSelector(state => state.diagnostic.entity);
  const consultations = useAppSelector(state => state.consultation.entities);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const consultationId = searchParams.get('consultationId');
  const patientName = searchParams.get('patientName');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const symptomsList = ['Rougeur', 'Démangeaisons', 'Irritation', 'Sécheresse', 'Eruption cutanée', 'Desquamation', 'Taches sombres'];
  // const defaultDateDiagnostic = displayDefaultDateTime();
  const defaultDateDiagnostic = new Date();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  // const isNew = id === undefined;

  // const consultations = useAppSelector(state => state.consultation.entities);
  // const diagnosticEntity = useAppSelector(state => state.diagnostic.entity);
  const loading = useAppSelector(state => state.diagnostic.loading);
  const updating = useAppSelector(state => state.diagnostic.updating);
  const updateSuccess = useAppSelector(state => state.diagnostic.updateSuccess);

  // const handleClose = () => {
  //   navigate('/diagnostic');
  // };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getConsultations({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const handleClose = () => {
    toggle();
  };

  const handleSymptomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const newSymptoms: string[] = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected && !selectedSymptoms.includes(options[i].value)) {
        newSymptoms.push(options[i].value);
      }
    }

    setSelectedSymptoms(prevSymptoms => [...prevSymptoms, ...newSymptoms]);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, symptom: string) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    } else {
      const updatedSymptoms = selectedSymptoms.filter(s => s !== symptom);
      setSelectedSymptoms(updatedSymptoms);
    }
  };

  const handleRemoveSelectedSymptoms = () => {
    // Remove selected symptoms
    setSelectedSymptoms([]);
  };

  const saveEntity = values => {
    values.dateDiagnostic = convertDateTimeToServer(values.dateDiagnostic);
    values.description = '';
    values.prescription = '';
    values.probability = '';

    // if (values.probability !== undefined && typeof values.probability !== 'number') {
    //   values.probability = Number(values.probability);
    // }

    const entity = {
      ...diagnosticEntity,
      ...values,
      consultations: consultations.find(it => it.id.toString() === values.consultations.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
    window.location.reload();
  };

  const defaultValues = () =>
    isNew
      ? {
          dateDiagnostic: defaultDateDiagnostic.toISOString(),
          consultations: consultationId,
        }
      : {
          ...diagnosticEntity,
          dateDiagnostic: convertDateTimeFromServer(diagnosticEntity.dateDiagnostic),
          consultations: diagnosticEntity?.consultations?.id,
        };
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>New Diagnostic</ModalHeader>
      <ModalBody>
        <Row className="justify-content-center">
          <Col md="15">
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="diagnostic-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('assistanteDermatologueApp.diagnostic.dateDiagnostic')}
                id="diagnostic-dateDiagnostic"
                name="dateDiagnostic"
                data-cy="dateDiagnostic"
                type="datetime-local"
                value={defaultDateDiagnostic.toISOString().slice(0, -8)}
                validate={{ required: true }}
                hidden={true}
              />
              {/* <ValidatedField
                id="diagnostic-symptoms"
                name="symptoms"
                data-cy="symptoms"
                label={translate('assistanteDermatologueApp.diagnostic.symptoms')}
                type="select"
                multiple
                value={selectedSymptoms}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSymptomChange(e as any)}
              >
                {symptomsList.map((symptom) => (
                  <option value={symptom} key={symptom}>
                    {symptom}
                  </option>
                ))}
              </ValidatedField> */}
              <ValidatedField
                id="diagnostic-symptoms"
                name="symptoms"
                data-cy="symptoms"
                label={translate('assistanteDermatologueApp.diagnostic.symptoms')}
                type="select"
                multiple
                value={selectedSymptoms}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSymptomChange(e as any)}
              >
                {symptomsList.map(symptom => (
                  <option value={symptom} key={symptom}>
                    {symptom}
                  </option>
                ))}
              </ValidatedField>

              <div>
                <strong>Selected Symptoms:</strong>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {selectedSymptoms.map(symptom => (
                    <li key={symptom} style={{ marginBottom: '8px' }}>
                      <input
                        type="checkbox"
                        value={symptom}
                        checked={selectedSymptoms.includes(symptom)}
                        onChange={e => handleCheckboxChange(e, symptom)}
                        style={{ marginRight: '8px' }}
                      />
                      {symptom}
                    </li>
                  ))}
                </ul>
                <Button color="danger" onClick={handleRemoveSelectedSymptoms}>
                  Remove all
                </Button>
              </div>

              <ValidatedBlobField
                label={translate('assistanteDermatologueApp.diagnostic.picture')}
                id="diagnostic-picture"
                name="picture"
                data-cy="picture"
                isImage
                accept="image/*"
              />
              <ValidatedField
                label={translate('assistanteDermatologueApp.diagnostic.description')}
                id="diagnostic-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('assistanteDermatologueApp.diagnostic.prescription')}
                id="diagnostic-prescription"
                name="prescription"
                data-cy="prescription"
                type="text"
              />
              <ValidatedField
                label={translate('assistanteDermatologueApp.diagnostic.probability')}
                id="diagnostic-probability"
                name="probability"
                data-cy="probability"
                type="text"
              />
              <ValidatedField
                id="diagnostic-consultations"
                name="consultations"
                data-cy="consultations"
                // label={translate('assistanteDermatologueApp.diagnostic.consultations')}
                // type="select"
                validate={{ required: true }}
                hidden={true}
              >
                <option value="" key="0" />
                {consultations
                  ? consultations.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <center>
                <Button color="danger" onClick={toggle}>
                  Close
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </center>
            </ValidatedForm>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default DiagnosticModel;
