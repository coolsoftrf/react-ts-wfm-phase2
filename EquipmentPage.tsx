import React, { useState, useEffect } from 'react';
import './style.css';
import { BallTriangle } from 'react-loader-spinner';
import { findFaultyEquipmentByCustomer } from './api';
import HardwareRow from './HardwareRow';
import { useParams } from 'react-router-dom';
import { Equipment } from './entities';

export const EquipmentPage = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [items, setItems] = useState();
  const [error, setError] = useState();

  // const { hwid } = useParams();

  useEffect(() => {
    findFaultyEquipmentByCustomer(/**/ 1   /*/ hwid /**/).then(
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
        Faulty hardware found: {items?.hardwares.length}
        {items?.hardwares.map((hardware: Equipment) => HardwareRow(hardware))}
      </div>

      <div hidden={!error} style={{ color: 'red' }}>
        Error occurred: {error}
      </div>
    </div>
  );
};
