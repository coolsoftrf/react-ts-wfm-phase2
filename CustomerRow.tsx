import React from 'react';
import { Customer } from './entities';
import { Link } from 'react-router-dom';
import { EQUIPMENT } from './router';

export default ({ customer }: {customer: Customer}) => (
  <div key={customer.id}>
    <Link to={`${EQUIPMENT}/${customer.id}`} key={customer.id}>
      {customer.firstName} {customer.lastName}
    </Link>
  </div>
);
