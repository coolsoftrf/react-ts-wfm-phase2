import React, { Component } from 'react';
import { SERVICE_STATUS_FAIL, Items } from './entities';
import './style.css';
import { BallTriangle } from 'react-loader-spinner';
import { findFaultyEquipmentByCustomer } from './api';
import HardwareRow from './HardwareRow';
import { useParams } from 'react-router-dom';

interface AppProps {}
interface AppState {
  isLoaded: boolean;
  items: Items;
  error: Object;
}
export class Equipment extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: undefined,
      error: undefined,
    };
  }

  componentDidMount() {
    let params = useParams();
    findFaultyEquipmentByCustomer(params.hwid).then(
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
        <h1>Hardware to fix</h1>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <BallTriangle
            color="#00BFFF"
            height={80}
            width={80}
            visible={!this.state.isLoaded}
          />
        </div>

        <div hidden={!this.state.isLoaded}>
          Faulty hardware found: {this.state.items?.hardwares.length}
          {this.state.items?.hardwares.map((hardware) => HardwareRow(hardware))}
        </div>
      </div>
    );
  }
}
