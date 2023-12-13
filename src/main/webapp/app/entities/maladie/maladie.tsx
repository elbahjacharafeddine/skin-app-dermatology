import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import $ from 'jquery';
import 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-responsive-dt/js/responsive.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';

import { getEntities } from './maladie.reducer';
const buttonContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};
const headerColor = {
  backgroundColor: '#54B4D3',
};
const buttonStyle = {
  marginRight: '10px',
};
export const Maladie = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const maladieList = useAppSelector(state => state.maladie.entities);
  const loading = useAppSelector(state => state.maladie.loading);

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

  useEffect(() => {
    if (maladieList.length > 0) {
      const table = $('#myTable').DataTable();
      return () => {
        table.destroy();
      };
    }
  }, [maladieList]);

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div className="p-2 card p-4">
      <h2 id="maladie-heading" data-cy="MaladieHeading">
        <Translate contentKey="assistanteDermatologueApp.maladie.home.title">Maladies</Translate>
        <div className="d-flex justify-content-end">
          {/*<Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>*/}
          {/*  <FontAwesomeIcon icon="sync" spin={loading} />{' '}*/}
          {/*  <Translate contentKey="assistanteDermatologueApp.maladie.home.refreshListLabel">Refresh List</Translate>*/}
          {/*</Button>*/}
          <Link to="/maladie/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="assistanteDermatologueApp.maladie.home.createLabel">Create new Maladie</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {maladieList && maladieList.length > 0 ? (
          <Table className="table table-responsive" id="myTable">
            <thead>
              <tr>
                <th className="hand" onClick={sort('fullName')}>
                  <Translate contentKey="assistanteDermatologueApp.maladie.fullName">Full Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('fullName')} />
                </th>
                <th className="hand" onClick={sort('abbr')}>
                  <Translate contentKey="assistanteDermatologueApp.maladie.abbr">Abbr</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('abbr')} />
                </th>

                <th />
              </tr>
            </thead>
            <tbody>
              {maladieList.map((maladie, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>{maladie.fullName}</td>
                  <td>{maladie.abbr}</td>

                  <td className="text-end">
                    <div className="flex-btn-group-container" style={buttonContainerStyle}>
                      <Button
                        tag={Link}
                        to={`/maladie/${maladie.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                        style={buttonStyle}
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/maladie/${maladie.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                        style={buttonStyle}
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (location.href = `/maladie/${maladie.id}/delete`)}
                        color="danger"
                        size="sm"
                        style={buttonStyle}
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
              <Translate contentKey="assistanteDermatologueApp.maladie.home.notFound">No Maladies found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Maladie;
