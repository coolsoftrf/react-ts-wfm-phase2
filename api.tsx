import {
  Address,
  HARDWARE_STATUS_UNDER_MAINTENANCE,
  SearchResults,
} from './entities';

const STAGING = 'https://nnsu-nc-data-app.herokuapp.com';
const PROD = 'https://ntl-nc-data-app.herokuapp.com';
const HOST = STAGING;

const doFetch = (uri: string): Promise<SearchResults> =>
  fetch(`${HOST}${uri}`).then((res) => res.json());

export const findCustomersByServiceStatus = (statusId: number) =>
  doFetch(
    `/customers/search/findAllByServiceStatus_Id?serviceStatusId=${statusId}`
  );
export const findCustomerByService = (serviceId: number) =>
  doFetch(`/services/${serviceId}/customer`);

export const findFaultyEquipmentByCustomer = (customerId: number) =>
  doFetch(
    `/hardwares/search/findAllFaultyByCustomer_Id?customerId=${customerId}`
  );
export const findEquipmentToReplaceByCustomer = (customerId: number) =>
  doFetch(
    `/hardwares/search/findAllToReplaceByCustomer_Id?customerId=${customerId}`
  );
export const findEquipmentUnderMaintenanceByCustomer = (customerId: number) =>
  doFetch(
    `/hardwares/search/findAllByCustomer_IdAndHardwareStatus_Id?customerId=${customerId}&hardwareStatusId=${HARDWARE_STATUS_UNDER_MAINTENANCE}`
  );
export const findEquipmentByCustomerAndStatus = (
  customerId: number,
  hardwareStatusId: number
) =>
  doFetch(
    `/hardwares/search/findAllByCustomer_IdAndHardwareStatus_Id?customerId=${customerId}&hardwareStatusId=${hardwareStatusId}`
  );
export const getEquipmentAddress = (hardwareId: number): Promise<Address> =>
  fetch(`${HOST}/hardwares/${hardwareId}/address`).then((result) =>
    result.json()
  );

export const setEquipmentStatus = (
  hardwareId: number,
  hardwareStatusId: number
) =>
  doFetch(
    `/hardwares/search/setHardwareStatusByHardware_Id?hardwareId=${hardwareId}&hardwareStatusId=${hardwareStatusId}`
  );
