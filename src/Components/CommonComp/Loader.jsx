import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

const RenderLoader = () => {
  return (
    <div class="col d-flex justify-content-center"> <Loader
      type="Oval"
      color="#042B63"
      height={50}
      width={50}
    />
    </div>
  );
}

export default RenderLoader