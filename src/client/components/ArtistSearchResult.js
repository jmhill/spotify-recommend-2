import React from 'react';

import ArtistInfo from './ArtistInfo';
import ArtistHeader from './ArtistHeader';

export default class ArtistSearchResult extends React.Component {
  render() {
    if (this.props.searchData.length < 1) {
      return (
        <p>Type search in the box above</p>
      );
    }
    let artist = this.props.searchData;
    let relatedArtists = artist.related.map(relatedArtist => {
      return (
        <ArtistInfo
          artist={relatedArtist}
        />
      );
    });
    return(
      <div>
        <ArtistHeader
          artist={artist}
        />
        <div className="pure-g main">
          {relatedArtists}
        </div>
      </div>
    );
  }
}
