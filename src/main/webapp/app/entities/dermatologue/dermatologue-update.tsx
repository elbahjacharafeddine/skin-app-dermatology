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
import { IDermatologue } from 'app/shared/model/dermatologue.model';
import { getEntity, updateEntity, createEntity, reset } from './dermatologue.reducer';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const DermatologueUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const dermatologueEntity = useAppSelector(state => state.dermatologue.entity);
  const loading = useAppSelector(state => state.dermatologue.loading);
  const updating = useAppSelector(state => state.dermatologue.updating);
  const updateSuccess = useAppSelector(state => state.dermatologue.updateSuccess);

  const [dermatologue, setDermatologue] = useState({
    dermatologue: {
      codeEmp: '8979567',
      telephone: '09165516617',
      genre: 'male',
    },
    user: {
      login: 'elmansouri',
      password: 'password',
      firstName: 'test',
      lastName: 'test',
      email: 'test.doe@example.com',
      activated: true,
      langKey: 'en',
      imageUrl: 'https://example.com/user.jpg',
    },
  });

  const handleClose = () => {
    navigate('/dermatologue');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));

      // updateUser(id);
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
      ...dermatologueEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user.toString()),
    };

    if (isNew) {
      dispatch(createEntity(dermatologue));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...dermatologueEntity,
          user: dermatologueEntity?.user,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="assistanteDermatologueApp.dermatologue.home.createOrEditLabel" data-cy="DermatologueCreateUpdateHeading">
            <Translate contentKey="assistanteDermatologueApp.dermatologue.home.createOrEditLabel">Create or edit a Dermatologue</Translate>
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
                  id="dermatologue-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                  hidden={true}
                />
              ) : null}
              <ValidatedField
                label={translate('assistanteDermatologueApp.dermatologue.codeEmp')}
                id="dermatologue-codeEmp"
                name="codeEmp"
                data-cy="codeEmp"
                type="text"
              />
              <ValidatedField
                label={translate('assistanteDermatologueApp.dermatologue.genre')}
                id="dermatologue-genre"
                name="genre"
                data-cy="genre"
                type="text"
              />
              <ValidatedField
                label={translate('assistanteDermatologueApp.dermatologue.telephone')}
                id="dermatologue-telephone"
                name="telephone"
                data-cy="telephone"
                type="text"
              />
              <ValidatedField
                label="Login"
                // label={translate('assistanteDermatologueApp.dermatologue.user.login')}
                id="login"
                name="user.login"
                data-cy="user.login"
                type="text"
                readOnly={true}
              />
              <ValidatedField
                label="email"
                // label={translate('assistanteDermatologueApp.dermatologue.user.login')}
                id="lastName"
                name="user.email"
                data-cy="user.email"
                type="text"
              />
              <ValidatedField
                label="First name"
                // label={translate('assistanteDermatologueApp.dermatologue.user.login')}
                id="firstName"
                name="user.firstName"
                data-cy="user.firstName"
                type="text"
              />
              <ValidatedField
                label="Last name"
                // label={translate('assistanteDermatologueApp.dermatologue.user.login')}
                id="lastName"
                name="user.lastName"
                data-cy="user.lastName"
                type="text"
              />
              {/*<ValidatedField*/}
              {/*  id="dermatologue-user"*/}
              {/*  name="user"*/}
              {/*  data-cy="user"*/}
              {/*  label={translate('assistanteDermatologueApp.dermatologue.user')}*/}
              {/*  type="select"*/}
              {/*>*/}
              {/*  <option value="" key="0" />*/}
              {/*  {users*/}
              {/*    ? users.map(otherEntity => (*/}
              {/*        <option value={otherEntity.id} key={otherEntity.id}>*/}
              {/*          {otherEntity.login }*/}
              {/*        </option>*/}
              {/*      ))*/}
              {/*    : null}*/}
              {/*</ValidatedField>*/}
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/dermatologue" replace color="info">
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

export default DermatologueUpdate;
