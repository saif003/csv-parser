import React from 'react';
import { Table } from 'antd';

export const AppTable = ({ columns = [], data = null, title, loading, rowKey }) => {
  return (
    <>
      <Table
        columns={columns}
        title={title}
        rowKey={rowKey}
        loading={loading}
        hasData={data?.length && !loading}
        pagination={false}
        tableLayout="fixed"
        dataSource={!loading ? data : null}
      />
    </>
  );
};
