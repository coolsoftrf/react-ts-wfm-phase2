import React from 'react';
import { Equipment } from './entities';

export default (hardware: Equipment) => (
  <div>
    {hardware.name} {hardware.serial} {hardware.hardwareStatus.name}
  </div>
);
