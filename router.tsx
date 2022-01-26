import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { EquipmentPage } from './EquipmentPage';
import { Main } from './MainPage';

export const EQUIPMENT = 'equipment';

export const AppRouter = () => (
  <BrowserRouter>
    <Route exact path="/" component={Main} />
    <Route path={`/${EQUIPMENT}/:hwid`} component={EquipmentPage} />
  </BrowserRouter>
);
