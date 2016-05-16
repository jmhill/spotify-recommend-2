import React from 'react';

export default class ArtistInfo extends React.Component {
  render() {
    let artist = this.props.artist;
    let trackList = artist.tracks.map(track => {
      return (
        <li>
          <a href={track.uri}>{track.name}</a>
        </li>
      );
    });
    let thumbnailIndex = artist.images.length - 1;

    return (
      <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
        <img src={artist.images[thumbnailIndex].url} />
        <div className="artist">
          <h2>
            <a href={artist.uri}>{artist.name}</a>
          </h2>
          <ul>
            {trackList}
          </ul>
        </div>
      </div>
    );
  }
}
