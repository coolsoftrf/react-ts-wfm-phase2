import React, { useEffect, useState } from 'react';
import {
  Equipment,
  HARDWARE_STATUS_FAIL,
  HARDWARE_STATUS_NORMAL,
  HARDWARE_STATUS_TO_REPLACE,
  HARDWARE_STATUS_UNDER_MAINTENANCE,
} from './entities';
import NinePatch from 'react-9patch';
import { getEquipmentAddress } from './api';
import { Bars } from 'react-loader-spinner';

export default (
  hardware: Equipment,
  clickHandler?: (hwId: number, statusId: number) => void
) => {
  const [isLoaded, setLoaded] = useState(false);
  const [address, setAddress] = useState('');
  const [error, setError] = useState<any>();

  useEffect(() => {
    getEquipmentAddress(hardware.id).then(
      (result) => {
        setLoaded(true);
        setAddress(result);
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
        'https://github.com/coolsoftrf/react-ts-wfm-phase2/blob/look-n-feel/frame_thin.png?raw=true'
      }
      contentX={[0.2, 0.8]}
      contentY={[0.3, 0.7]}
    >
      <div>
        {hardware.name}
        <br />
        {hardware.serial}
        <br />
        {(isLoaded && address) || (
          <Bars color="#00BFFF" height={80} width={80} />
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
