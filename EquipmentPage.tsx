import React from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import {
  HARDWARE_STATUS_FAIL,
  HARDWARE_STATUS_TO_REPLACE,
  HARDWARE_STATUS_UNDER_MAINTENANCE,
} from './entities';
import EquipmentBlock from './EquipmentBlock';

export default () => {
  const { customerId } = useParams();

  return (
    <div>
      <h1>Hardware to fix</h1>

      <EquipmentBlock
        customerId={customerId}
        hardwareStatusId={HARDWARE_STATUS_FAIL}
        sectionTitle="Faulty hardware"
      />
      <br />
      <EquipmentBlock
        customerId={customerId}
        hardwareStatusId={HARDWARE_STATUS_UNDER_MAINTENANCE}
        sectionTitle="Hardware under maintenance"
      />
    </div>
  );
};
