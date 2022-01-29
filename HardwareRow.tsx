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

  useEffect(() => {
    getEquipmentAddress(hardware.id).then(
      (result) => {
        setLoaded(true);
        setAddress(result.fullAddress);
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
    <NinePatch
      x={[0.53, 0.57]}
      y={[0.49, 0.51]}
      img={
        'https://github.com/coolsoftrf/react-ts-wfm-phase2/blob/look-n-feel/frame_thinner.png?raw=true'
      }
      contentX={[0.2, 0.8]}
      contentY={[0.4, 0.6]}
    >
      <div key={hardware.id}>
        {hardware.name}
        <br />
        {hardware.serial}
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
            <button
              onClick={() => clickHandler(hardware.id, HARDWARE_STATUS_NORMAL)}
            >
              Fixed
            </button>
            <button
              onClick={() =>
                clickHandler(hardware.id, HARDWARE_STATUS_TO_REPLACE)
              }
            >
              Replace Required
            </button>
          </div>
        )}
      </div>
    </NinePatch>
  );
};

export default HardwareRow;
