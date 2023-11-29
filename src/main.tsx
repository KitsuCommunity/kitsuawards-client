import 'preact/debug';

import { render } from 'preact';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'urql';

import App from './App';
import { client } from './apiConfig';
import 'styles/index.css';

render(
  <Provider value={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')!,
);
