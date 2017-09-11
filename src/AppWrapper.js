import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default AppWrapper;