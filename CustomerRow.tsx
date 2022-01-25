import React from 'react';
import { Customer } from './entities';
import { Link } from 'react-router-dom';
import { EQUIPMENT } from './router';

export default (customer: Customer) => (
  <div>
    <Link to={`${EQUIPMENT}/${customer.id}`} key={customer.id}>
      {customer.firstName} {customer.lastName}
    </Link>
  </div>
);
