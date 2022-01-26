import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { HARDWARE_STATUS_FAIL, HARDWARE_STATUS_TO_REPLACE, HARDWARE_STATUS_UNDER_MAINTENAMCE, Items } from './entities';
import { EquipmentBlock } from './EquipmentBlock';

export const EquipmentPage = () => {

  const { customerId } = useParams();

  return (
    <div>
      <EquipmentBlock customerId={customerId} hardwareStatusId={HARDWARE_STATUS_FAIL} sectionTitle="Faulty hardware found"/>
      <br />
      <EquipmentBlock customerId={customerId} hardwareStatusId={HARDWARE_STATUS_UNDER_MAINTENAMCE} sectionTitle="Hardware under maintenance"/>
      <br />
      <EquipmentBlock customerId={customerId} hardwareStatusId={HARDWARE_STATUS_TO_REPLACE} sectionTitle="Hardware to replace found"/>
    </div>
  );
};
