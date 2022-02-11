import React from 'react';
import Episode from './Episode';

const EpisodeList = ({ episodes, favorites }) => {
  const isFavorite = episodeId => {
    return favorites.find(id => id === episodeId);
  };

  return (
    <section className="episode-layout">
      {episodes.map(episode => (
        <Episode
          data={episode}
          favorite={isFavorite(episode.id)}
          key={episode.id}
        />
      ))}
      ;
    </section>
  );
};

export default EpisodeList;
