import React, { useState, useEffect } from 'react';
import { Items, SERVICE_STATUS_FAIL } from './entities';
import './style.css';
import { Watch } from 'react-loader-spinner';
import { findCustomersByServiceStatus } from './api';
import CustomerRow from './CustomerRow';

export default () => {
  const [isLoaded, setLoaded] = useState(false);
  const [items, setItems] = useState<Items>();
  const [error, setError] = useState();

  useEffect(() => {
    findCustomersByServiceStatus(SERVICE_STATUS_FAIL).then(
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

  return (
    <div>
      <h1>Customers to fix</h1>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Watch color="#00BFFF" height={80} width={80} visible={!isLoaded} />
      </div>

      <div hidden={!isLoaded}>
        Faulty customers found: {items?.customers.length}
        {items?.customers.map((customer) => <CustomerRow customer={customer}/>)}
      </div>

      <div hidden={!error} style={{ color: 'red' }}>
        Error occurred: {error}
      </div>
    </div>
  );
};
