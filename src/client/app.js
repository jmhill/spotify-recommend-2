const React = require('react');
const ReactDOM = require('react-dom');

class Test extends React.Component {
  render() {
    return (
      <p>Hello React</p>
    );
  }
}

ReactDOM.render(
  <Test />,
  document.getElementById('react-test')
);
