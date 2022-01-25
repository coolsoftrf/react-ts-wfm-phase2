import { SearchResults } from "./entities";

const doFetch = (uri: string): Promise<SearchResults> =>
  fetch(uri).then((res) => res.json());

export const findCustomersByServiceStatus = (statusId: number) =>
  doFetch(
    `https://nnsu-nc-data-app.herokuapp.com/customers/search/findAllByServiceStatus_Id?serviceStatusId=${statusId}`
  );
export const findCustomerByService = (serviceId: number) =>
  doFetch(
    `https://nnsu-nc-data-app.herokuapp.com/services/${serviceId}/customer`
  );
export const findFaultyEquipmentByCustomer = (customerId: number) =>
  doFetch(
    `https://nnsu-nc-data-app.herokuapp.com/hardwares/search/findAllFaultyByCustomer_Id?customerId=${customerId}`
  );
