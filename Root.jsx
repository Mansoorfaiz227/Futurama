import { Router } from '@reach/router';
import App from './App';
import EpisodeList from './EpisodeList';
import React, { useContext } from 'react';
import Store from './Store';

const Root = () => {
  const { state } = useContext(Store);

  const favoriteEpisodes = () => {
    if (state.episodes.length === 0) return [];
    return state.favorites.map(episodeId =>
      state.episodes.find(e => e.id === episodeId)
    );
  };

  return (
    <Router>
      <App path="/">
        <EpisodeList
          path="/"
          episodes={state.episodes}
          favorites={state.favorites}
        />
        <EpisodeList
          path="/favorites"
          episodes={favoriteEpisodes()}
          favorites={state.favorites}
        />
      </App>
    </Router>
  );
};

export default Root;
