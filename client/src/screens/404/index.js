import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

import './styles.css';

export function notFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      className="d-flex flex-column justify-content-center align-items-center notfound-page"
      extra={
        <Link to="/">
          <Button type="primary">Back to Home</Button>
        </Link>
      }
    />
  );
}
