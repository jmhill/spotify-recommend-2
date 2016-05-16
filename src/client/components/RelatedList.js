import React from 'react';

import RelatedSearchBox from './RelatedSearchBox';
import ArtistSearchResult from './ArtistSearchResult';

export default class RelatedList extends React.Component {
  constructor() {
    super();
    this.state = {
      searchData: []
    };
  }

  _handleSearchSubmit(text) {
    $.ajax({
      url: '/search/' + text,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        console.log(data);
        this.setState({searchData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        <RelatedSearchBox
          onSearchSubmit={this._handleSearchSubmit.bind(this)}
        />
        <ArtistSearchResult
          searchData={this.state.searchData}
        />
      </div>
    );
  }
}
