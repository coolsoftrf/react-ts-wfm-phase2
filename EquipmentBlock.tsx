import React, { useEffect, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { findEquipmentByCustomerAndStatus, setEquipmentStatus } from './api';
import { Equipment, Items } from './entities';
import HardwareRow from './HardwareRow';

export const EquipmentBlock = ({
  customerId,
  hardwareStatusId,
  sectionTitle,
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [items, setItems] = useState<Items>();
  const [error, setError] = useState<any>();
  useEffect(() => {
    findEquipmentByCustomerAndStatus(customerId, hardwareStatusId).then(
      (result) => {
        setLoaded(true);
        setItems(result._embedded);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setLoaded(true);
        setError(error);
      }
    );
  });

  return (
    <div>
      <h1>Hardware to fix</h1>

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
        {items?.hardwares.map((hardware: Equipment) =>
          HardwareRow(hardware, setEquipmentStatus)
        )}
      </div>

      <div hidden={!error} style={{ color: 'red' }}>
        Error occurred: {error}
      </div>
    </div>
  );
};
