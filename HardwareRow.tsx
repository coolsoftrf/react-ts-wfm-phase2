import React from 'react';
import {
  Equipment,
  HARDWARE_STATUS_FAIL,
  HARDWARE_STATUS_NORMAL,
  HARDWARE_STATUS_TO_REPLACE,
  HARDWARE_STATUS_UNDER_MAINTENANCE,
} from './entities';

export default (
  hardware: Equipment,
  clickHandler?: (hwId:number, statusId: number) => void
) => (
  <div>
    {hardware.name} {hardware.serial}
    {hardware.hardwareStatus.id == HARDWARE_STATUS_FAIL && (
      <button onClick={() => clickHandler(hardware.id, HARDWARE_STATUS_UNDER_MAINTENANCE)}>
        Start Maintenance
      </button>
    )}
    {hardware.hardwareStatus.id == HARDWARE_STATUS_UNDER_MAINTENANCE && (
      <div>
        <button onClick={() => clickHandler(hardware.id, HARDWARE_STATUS_NORMAL)}>
          Fixed
        </button>
        <button onClick={() => clickHandler(hardware.id, HARDWARE_STATUS_TO_REPLACE)}>
          Replace Required
        </button>
      </div>
    )}
  </div>
);
