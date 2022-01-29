import React, { useEffect, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { findEquipmentByCustomerAndStatus, setEquipmentStatus } from './api';
import {
  Equipment,
  HARDWARE_STATUS_UNDER_MAINTENANCE,
  Items,
} from './entities';
import HardwareRow from './HardwareRow';

type EquipmentBlockType = {
  customerId: number;
  hardwareStatusId: number;
  sectionTitle: string;
};

export default ({
  customerId,
  hardwareStatusId,
  sectionTitle,
}: EquipmentBlockType) => {
  const [isLoaded, setLoaded] = useState(true);
  const [items, setItems] = useState<Items>({
    hardwares: [
      {
        id: 0,
        name: 'железка',
        serial: 'серийник',
        hardwareStatus: {
          id: HARDWARE_STATUS_UNDER_MAINTENANCE,
          name: 'в обработке',
        },
      },
    ],
  });
  const [error, setError] = useState<any>();

  const setHardwareStatus = (hardwareId: number, hardwareStatusId: number) => {
    setEquipmentStatus(hardwareId, hardwareStatusId);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BallTriangle
          color="#00BFFF"
          height={80}
          width={80}
          visible={!isLoaded}
        />
      </div>

      <div hidden={!isLoaded}>
        {sectionTitle}: {items?.hardwares.length}
        {items?.hardwares.map((hardware: Equipment) => (
          <HardwareRow hardware={hardware} clickHandler={setHardwareStatus} />
        ))}
      </div>

      <div hidden={!error} style={{ color: 'red' }}>
        Error occurred: {error}
      </div>
    </div>
  );
};
