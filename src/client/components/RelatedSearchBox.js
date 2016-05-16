import React from 'react';

export default class RelatedSearchBox extends React.Component {
  render() {
    return (
      <div>
        <form className="pure-form">
            <input type="text" />
            <button type="button" className="pure-button pure-button-primary">Find Related Artists</button>
        </form>
      </div>
    )
  }
}
