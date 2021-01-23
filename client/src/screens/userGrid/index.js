import React, { useEffect, useState } from 'react';
import { getUserCSV, getUserPRN } from 'apis';
import { parseHttpError } from 'utils';
import { AppTable } from 'components/generic';

export const UserGrid = (props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'DOB',
      dataIndex: 'birthday',
    },
    {
      title: 'Credit Limit',
      dataIndex: 'credit_limit',
    },
    {
      title: 'Post Code',
      dataIndex: 'postcode',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  useEffect(() => {
    setLoading(true);
    let isCancelled = false;
    const api = props.location.pathname.indexOf('prn') > 0 ? getUserPRN() : getUserCSV();

    api
      .then((response) => {
        if (!isCancelled) {
          setUsers(response);
          setLoading(false);
        }
      })
      .catch((exception) => {
        parseHttpError(exception);
        if (!isCancelled) {
          setLoading(false);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, [props.location.pathname]);

  return <AppTable columns={columns} loading={loading} data={users} rowKey="phone" title={() => 'CSV Users'} />;
};
