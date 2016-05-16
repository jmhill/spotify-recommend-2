import React from 'react';

export default class RelatedSearchBox extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  _handleTextChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  _handleSubmit(e) {
    e.preventDefault();
    let text = this.state.text.trim();
    this.props.onSearchSubmit(text);
  }

  render() {
    return (
      <div>
        <form className="pure-form" onSubmit={this._handleSubmit.bind(this)}>
          <input type="text" onChange={this._handleTextChange.bind(this)} />
          <input type="submit" value="Find Related Artists" className="pure-button pure-button-primary"></input>
        </form>
      </div>
    )
  }
}
