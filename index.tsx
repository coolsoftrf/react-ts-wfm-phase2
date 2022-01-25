import React, { Component } from 'react';
import { render } from 'react-dom';
import { SERVICE_STATUS_FAIL, Items } from './entities';
import './style.css';
import { Watch } from 'react-loader-spinner';
import { findCustomersByServiceStatus } from './api';
import CustomerRow from './CustomerRow';
import { AppRouter } from './router';

interface AppProps {}
interface AppState {
  isLoaded: boolean;
  items: Items;
  error: Object;
}

export class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: undefined,
      error: undefined,
    };
  }

  componentDidMount() {
    findCustomersByServiceStatus(SERVICE_STATUS_FAIL).then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result._embedded,
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }

  render() {
    return (
      <div>
        <h1>Customers to fix</h1>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Watch
            color="#00BFFF"
            height={80}
            width={80}
            visible={!this.state.isLoaded}
          />
        </div>

        <div hidden={!this.state.isLoaded}>
          Faulty customers found: {this.state.items?.customers.length}
          {this.state.items?.customers.map((customer) => CustomerRow(customer))}
        </div>

        <div hidden={!this.state.error} style={{ color: 'red' }}>
          Error occurred: {this.state.error}
        </div>
      </div>
    );
  }
}

render(<AppRouter />, document.getElementById('root'));
