import { HARDWARE_STATUS_UNDER_MAINTENAMCE, SearchResults } from './entities';

const STAGING = 'https://nnsu-nc-data-app.herokuapp.com';
const PROD = 'https://ntl-nc-data-app.herokuapp.com';
const HOST = STAGING;

const doFetch = (uri: string): Promise<SearchResults> =>
  fetch(uri).then((res) => res.json());

export const findCustomersByServiceStatus = (statusId: number) =>
  doFetch(
    `${HOST}/customers/search/findAllByServiceStatus_Id?serviceStatusId=${statusId}`
  );
export const findCustomerByService = (serviceId: number) =>
  doFetch(`${HOST}/services/${serviceId}/customer`);

export const findFaultyEquipmentByCustomer = (customerId: number) =>
  doFetch(
    `${HOST}/hardwares/search/findAllFaultyByCustomer_Id?customerId=${customerId}`
  );
export const findEquipmentToReplaceByCustomer = (customerId: number) =>
  doFetch(
    `${HOST}/hardwares/search/findAllToReplaceByCustomer_Id?customerId=${customerId}`
  );
export const findEquipmentUnderMaintenanceByCustomer = (customerId: number) =>
  doFetch(
    `${HOST}/hardwares/search/findAllByCustomer_IdAndHardwareStatus_Id?customerId=${customerId}&hardwareStatusId=${HARDWARE_STATUS_UNDER_MAINTENAMCE}`
  );
export const findEquipmentByCustomerAndStatus = (
  customerId: number,
  hardwareStatusId: number
) =>
  doFetch(
    `${HOST}/hardwares/search/findAllByCustomer_IdAndHardwareStatus_Id?customerId=${customerId}&hardwareStatusId=${hardwareStatusId}`
  );

export const setEquipmentStatus = (
  hardwareId: number,
  hardwareStatusId: number
) =>
  doFetch(
    `${HOST}/hardwares/setHardwareStatusByHardware_Id?hardwareId=${hardwareId}&hardwareStatusId=${hardwareStatusId}`
  );
