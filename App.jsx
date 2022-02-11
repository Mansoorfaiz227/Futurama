import { Link } from '@reach/router';
import React, { useContext, useEffect } from 'react';
import Store from './Store';

const App = ({ children }) => {
  const { state, dispatch } = useContext(Store);

  const fetchEpisodes = async () => {
    if (state.episodes.length > 0) return false;
    const url =
      'https://api.tvmaze.com/singlesearch/shows?q=futurama&embed=episodes';
    const data = await fetch(url);
    const json = await data.json();
    const action = {
      type: 'FETCH_EPISODES',
      payload: json._embedded.episodes
    };
    return dispatch(action);
  };

  // useEffect React Hook
  // fetch episodes when page loads (similar to componentDidMount class lifecycle method)
  useEffect(() => {
    fetchEpisodes();
  });

  return (
    <>
      <header className="header">
        <div>
          <h1>Futurama</h1>
          <p>Pick your favorite episodes</p>
        </div>
        <ul className="navigation">
          <li>
            <Link to="/">All Episodes</Link>
          </li>
          <li>
            <Link to="/favorites">{state.favorites.length} Favorite(s)</Link>
          </li>
        </ul>
      </header>

      {children}
    </>
  );
};

export default App;
