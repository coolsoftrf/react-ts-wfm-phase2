import React, { ReactElement, useEffect, useState } from 'react';
import {
  Equipment,
  HARDWARE_STATUS_FAIL,
  HARDWARE_STATUS_NORMAL,
  HARDWARE_STATUS_TO_REPLACE,
  HARDWARE_STATUS_UNDER_MAINTENANCE,
} from './entities';
import NinePatch from 'react-9patch';
import { getEquipmentAddress } from './api';
import { ThreeDots } from 'react-loader-spinner';

type HardwareRowProps = {
  hardware: Equipment;
  clickHandler?: (hwId: number, statusId: number) => void;
};

const HardwareRow = ({
  hardware,
  clickHandler,
}: HardwareRowProps): ReactElement => {
  const [isLoaded, setLoaded] = useState(false);
  const [address, setAddress] = useState('');
  const [error, setError] = useState<any>();

  return (
    <NinePatch
      x={[0.53, 0.57]}
      y={[0.49, 0.51]}
      img={
        'https://stackblitz.com/files/react-ts-wfm/github/coolsoftrf/react-ts-wfm-phase2/master/frame_thinner.png'
      }
      contentX={[0.2, 0.8]}
      contentY={[0.4, 0.6]}
    >
      <div key={hardware.id}>
        Put device name here
        <br />
        Put device serial number here
        <br />
        {(isLoaded && address) || (
          <ThreeDots color="#00BFFF" height={20} width={80} />
        )}
        <br />
        {hardware.hardwareStatus.id == HARDWARE_STATUS_FAIL && (
          <button
            onClick={() =>
              clickHandler(hardware.id, HARDWARE_STATUS_UNDER_MAINTENANCE)
            }
          >
            Start Maintenance
          </button>
        )}
        {hardware.hardwareStatus.id == HARDWARE_STATUS_UNDER_MAINTENANCE && (
          <div>
            <button onClick={() => window.alert('put your code here')}>
              Fixed
            </button>
            <button onClick={() => window.alert('put your code here')}>
              Replace Required
            </button>
          </div>
        )}
      </div>
    </NinePatch>
  );
};

export default HardwareRow;
