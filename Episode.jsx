import React, { useContext } from 'react';
import Store from './Store';

const Episode = ({ data, favorite }) => {
  const { state, dispatch } = useContext(Store);

  const classes = () => {
    let result = ['episode-box'];
    if (favorite) {
      result.push('episode-favorite');
    }
    return result.join(' ');
  };

  const seasonAndEpisodeNumber = () => {
    return `S${zeroPad(data.season)}E${zeroPad(data.number)}`;
  };

  const toggleFavorite = episodeId => {
    let action = { payload: episodeId };
    if (state.favorites.includes(episodeId)) {
      action.type = 'REMOVE_FAVORITE';
    } else {
      action.type = 'ADD_FAVORITE';
    }
    return dispatch(action);
  };

  const zeroPad = (number, size = 2) => {
    let result = number.toString();
    while (result.length < size) {
      result = `0${result}`;
    }
    return result;
  };

  return (
    <section className={classes()}>
      <img src={data.image.medium} alt={`Futurama episode: ${data.name}`} />
      <div>{data.name}</div>
      <section className="episode-details">
        <div>{seasonAndEpisodeNumber()}</div>
        <button type="button" onClick={() => toggleFavorite(data.id)}>
          {favorite ? 'UnFavorite' : 'Add Favorite'}
        </button>
      </section>
    </section>
  );
};

export default Episode;
