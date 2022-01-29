import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import EquipmentPage from './EquipmentPage';
import Main from './MainPage';

export const EQUIPMENT = 'equipment';

export default () => (
  <BrowserRouter>
    <Route exact path="/" component={Main} />
    <Route path={`/${EQUIPMENT}/:customerId`} component={EquipmentPage} />
  </BrowserRouter>
);
