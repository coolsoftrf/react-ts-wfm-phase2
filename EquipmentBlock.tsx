import React, { useEffect, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { findEquipmentByCustomerAndStatus, setEquipmentStatus } from './api';
import { Equipment, Items } from './entities';
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
  }, []);

  const setHardwareStatus = (hardwareId: number, hardwareStatusId: number) => {
    setEquipmentStatus(hardwareId, hardwareStatusId).then(() =>
      window.location.reload()
    );
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
