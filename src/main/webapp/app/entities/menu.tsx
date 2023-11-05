import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/dermatologue">
        <Translate contentKey="global.menu.entities.dermatologue" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/patient">
        <Translate contentKey="global.menu.entities.patient" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/secretaire">
        <Translate contentKey="global.menu.entities.secretaire" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/rendez-vous">
        <Translate contentKey="global.menu.entities.rendezVous" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/consultation">
        <Translate contentKey="global.menu.entities.consultation" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/diagnostic">
        <Translate contentKey="global.menu.entities.diagnostic" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/maladie">
        <Translate contentKey="global.menu.entities.maladie" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/stade">
        <Translate contentKey="global.menu.entities.stade" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/image-stade">
        <Translate contentKey="global.menu.entities.imageStade" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/symptoms">
        <Translate contentKey="global.menu.entities.symptoms" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
