import React from 'react';

export default class ArtistHeader extends React.Component {
  render() {
    let artist = this.props.artist;
    let thumbnailIndex = artist.images.length - 1;

    return (
      <h1>
        <img src={artist.images[thumbnailIndex].url} />
        <a href={artist.uri}>{artist.name}</a>
      </h1>
    );
  }
}
