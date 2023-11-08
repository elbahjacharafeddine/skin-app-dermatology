import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './secretaire.reducer';

export const Secretaire = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const secretaireList = useAppSelector(state => state.secretaire.entities);
  const loading = useAppSelector(state => state.secretaire.loading);

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
  // const storedUser = JSON.parse(localStorage.getItem('SecretaireUser'));

  return (
    <div>
      <h2 id="secretaire-heading" data-cy="SecretaireHeading">
        <Translate contentKey="assistanteDermatologueApp.secretaire.home.title">Secretaires</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="assistanteDermatologueApp.secretaire.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/secretaire/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="assistanteDermatologueApp.secretaire.home.createLabel">Create new Secretaire</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {secretaireList && secretaireList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="assistanteDermatologueApp.secretaire.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('codeEmp')}>
                  <Translate contentKey="assistanteDermatologueApp.secretaire.codeEmp">Code Emp</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('codeEmp')} />
                </th>
                <th className="hand" onClick={sort('genre')}>
                  <Translate contentKey="assistanteDermatologueApp.secretaire.genre">Genre</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('genre')} />
                </th>
                <th className="hand" onClick={sort('telephone')}>
                  <Translate contentKey="assistanteDermatologueApp.secretaire.telephone">Telephone</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('telephone')} />
                </th>
                <th>Full Name</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {secretaireList.map((secretaire, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/secretaire/${secretaire.id}`} color="link" size="sm">
                      {secretaire.id}
                    </Button>
                  </td>
                  <td>{secretaire.codeEmp}</td>
                  <td>{secretaire.genre}</td>
                  <td>{secretaire.telephone}</td>
                  <td>{secretaire.user ? secretaire.user.firstName + ' ' + secretaire.user.lastName : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/secretaire/${secretaire.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/secretaire/${secretaire.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (location.href = `/secretaire/${secretaire.id}/delete`)}
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
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="assistanteDermatologueApp.secretaire.home.notFound">No Secretaires found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Secretaire;
