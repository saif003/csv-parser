import moment from 'moment';
import { CommonMessages, DateFormats } from './constants';
import { notification } from 'antd';

export function formatNumber(value, minFractionDigits = 0, maxFractionDigits = 0) {
  return new Intl.NumberFormat(['en-US'], {
    maximumFractionDigits: maxFractionDigits,
    minimumFractionDigits: minFractionDigits,
  }).format(value);
}

export function formatCurrency(value, minFractionDigits = 0, maxFractionDigits = 0) {
  return value ? `PKR ${formatNumber(value, minFractionDigits, maxFractionDigits)}` : '';
}

export function formatDate(dateTime, timeAgo = false, format = DateFormats.default) {
  if (dateTime) {
    let momentizedDtime = moment(dateTime);
    return timeAgo ? momentizedDtime.fromNow() : momentizedDtime.format(format);
  }
  return '';
}

export function parseHttpError(exception) {
  const defaultMsg = CommonMessages.oops;
  let errorMsg;
  switch (exception?.status) {
    case 400:
      errorMsg = defaultMsg;
      break;
    default:
      errorMsg = exception?.errorDetails || exception?.errorMessage || defaultMsg;
  }
  OpenToaster('error', errorMsg);
}

export function isObject(value) {
  return value !== null && typeof value === 'object';
}

export function OpenToaster(type, message, description) {
  if (!['success', 'error', 'info', 'warning'].includes(type)) {
    type = 'info';
  }
  const key = `${Math.random()}`;
  notification[type]({
    key,
    duration: 3,
    className: 'pointer',
    message: isObject(message) ? CommonMessages.oops : message,
    description,
    onClick: () => {
      notification.close(key);
    },
  });
  return key;
}
