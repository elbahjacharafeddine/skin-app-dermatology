import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';
import { AUTHORITIES } from 'app/config/constants';
import PrivateRoute from 'app/shared/auth/private-route';
const EntitiesMenu = () => {
  const data = sessionStorage.getItem('user_data');
  const dataJson = data ? JSON.parse(data) : null;
  return (
    <>
      <MenuItem icon="asterisk" to="/dermatologue" role={data ? dataJson.authorities : []} forWho={['ROLE_ADMIN', 'ROLE_ADMIN']}>
        <Translate contentKey="global.menu.entities.dermatologue" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/patient" role={data ? dataJson.authorities : []} forWho={['ROLE_ADMIN', 'ROLE_SECRETAIRE']}>
        <Translate contentKey="global.menu.entities.patient" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/secretaire" role={data ? dataJson.authorities : []} forWho={['ROLE_ADMIN']}>
        <Translate contentKey="global.menu.entities.secretaire" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/rendez-vous" role={data ? dataJson.authorities : []} forWho={['ROLE_ADMIN', 'ROLE_SECRETAIRE']}>
        <Translate contentKey="global.menu.entities.rendezVous" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/consultation" role={data ? dataJson.authorities : []} forWho={['ROLE_DERMATOLOGUE']}>
        <Translate contentKey="global.menu.entities.consultation" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/diagnostic" role={data ? dataJson.authorities : []} forWho={['ROLE_DERMATOLOGUE']}>
        <Translate contentKey="global.menu.entities.diagnostic" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/maladie" role={data ? dataJson.authorities : []} forWho={['ROLE_ADMIN', 'ROLE_DERMATOLOGUE']}>
        <Translate contentKey="global.menu.entities.maladie" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/stade" role={data ? dataJson.authorities : []} forWho={['ROLE_DERMATOLOGUE']}>
        <Translate contentKey="global.menu.entities.stade" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/image-stade" role={data ? dataJson.authorities : []} forWho={['ROLE_ADMIN', 'ROLE_DERMATOLOGUE']}>
        <Translate contentKey="global.menu.entities.imageStade" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/symptoms" role={data ? dataJson.authorities : []} forWho={['ROLE_DERMATOLOGUE']}>
        <Translate contentKey="global.menu.entities.symptoms" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
