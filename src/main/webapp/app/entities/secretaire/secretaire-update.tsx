import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ISecretaire } from 'app/shared/model/secretaire.model';
import { getEntity, updateEntity, createEntity, reset } from './secretaire.reducer';

export const SecretaireUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const secretaireEntity = useAppSelector(state => state.secretaire.entity);
  const loading = useAppSelector(state => state.secretaire.loading);
  const updating = useAppSelector(state => state.secretaire.updating);
  const updateSuccess = useAppSelector(state => state.secretaire.updateSuccess);

  const handleClose = () => {
    navigate('/secretaire');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...secretaireEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...secretaireEntity,
          user: secretaireEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="assistanteDermatologueApp.secretaire.home.createOrEditLabel" data-cy="SecretaireCreateUpdateHeading">
            <Translate contentKey="assistanteDermatologueApp.secretaire.home.createOrEditLabel">Create or edit a Secretaire</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="secretaire-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('assistanteDermatologueApp.secretaire.codeEmp')}
                id="secretaire-codeEmp"
                name="codeEmp"
                data-cy="codeEmp"
                type="text"
              />
              <ValidatedField
                label={translate('assistanteDermatologueApp.secretaire.genre')}
                id="secretaire-genre"
                name="genre"
                data-cy="genre"
                type="text"
              />
              <ValidatedField
                label={translate('assistanteDermatologueApp.secretaire.telephone')}
                id="secretaire-telephone"
                name="telephone"
                data-cy="telephone"
                type="text"
              />
              <ValidatedField
                id="secretaire-user"
                name="user"
                data-cy="user"
                label={translate('assistanteDermatologueApp.secretaire.user')}
                type="select"
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/secretaire" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SecretaireUpdate;
