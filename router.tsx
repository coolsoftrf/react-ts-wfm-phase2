import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Equipment } from './equipment';
import { App } from './index';

export const EQUIPMENT = 'equipment';

export const AppRouter = () => (
  <BrowserRouter>
    <Route exact path="/" component={App} />
    <Route path={`/${EQUIPMENT}/:hwid`} component={Equipment} />
  </BrowserRouter>
);
