import React from 'react';
import { PageHeader, Button } from 'antd';
import { Link } from 'react-router-dom';

import './style.css';

export const SlimLayout = (props) => {
  return (
    <>
      <PageHeader
        title={<Link to="/">CSV Parser</Link>}
        className="userHeader"
        extra={[
          <Link to="/" key="1">
            <Button className="app-btn">CSV</Button>
          </Link>,
          <Link to="prn" key="2">
            <Button className="app-btn">PRN</Button>
          </Link>,
        ]}
        avatar={{
          src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
        }}>
        {props.children}
      </PageHeader>
    </>
  );
};
