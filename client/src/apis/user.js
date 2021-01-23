import { formatDate, formatNumber } from 'utils';
import { HttpClient } from './httpClient';

const parseResult = (response) => {
  const records = response?.records || [];
  return records.map((ob) => {
    ob.birthday = formatDate(ob.birthday);
    ob.credit_limit = formatNumber(ob.credit_limit);
    return ob;
  });
};

export function getUserCSV() {
  return HttpClient.get(`user/csv`).then(parseResult);
}

export function getUserPRN() {
  return HttpClient.get(`user/prn`).then(parseResult);
}
