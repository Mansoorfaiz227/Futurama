import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import { StoreProvider } from './Store';
import './index.css';

const componentTree = (
  <StoreProvider>
    <Root />
  </StoreProvider>
);

ReactDOM.render(componentTree, document.getElementById('root'));
