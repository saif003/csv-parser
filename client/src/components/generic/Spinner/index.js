import React from 'react';
import { Spin } from 'antd';

import './style.css';

export const Spinner = ({ heightVh = 70, overlay = false, isLoading = false }) => {
  return (
    <div>
      {overlay ? (
        isLoading ? (
          <div className="overlay-container">
            <div className="loader">
              <Spin size="large" spinning={overlay} className="cartzy-spinner" />
            </div>
          </div>
        ) : (
          ''
        )
      ) : (
        <div className="loader-container" style={{ height: `${heightVh}vh` }}>
          <div>
            <Spin size="large" spinning={true} />
          </div>
        </div>
      )}
    </div>
  );
};
