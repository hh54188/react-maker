import React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

const reducer = (state, action) => {
  switch(action.type) {
    case 'INCREMENT': return { counter: state.counter + 1 };
    default: return state;
  }
}

const store = createStore(reducer, { counter: 0 });

class Counter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { counter, onIncrement } = this.props;
    return (
      <div>
        <h1>{counter}</h1>
        <button onClick={onIncrement}>Add</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { counter: state.counter };
}

const mapDispatchToProps = (dispatch) => {
  return {
    // Action Creator
    onIncrement: () => {
      dispatch({
        type: 'INCREMENT'
      });
    }
  }
}

// connect 函数把 mapStateToProps 和 mapDispatchToProps 的返回值
// 并把它们作为 Counter 组件的 props
// connect 返回的是一个 wrapper component
Counter = connect(mapStateToProps, mapDispatchToProps)(Counter);

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <Counter />
      </Provider>
    )
  }
}

export default App;