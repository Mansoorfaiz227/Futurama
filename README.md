# Futurama Episodes

[app](http://radavis.github.io/futurama-episodes)

[base tutorial](https://medium.com/octopus-labs-london/replacing-redux-with-react-hooks-and-context-part-1-11b72ffdb533)

## Example

Store episode data using React Context API and React Hooks.

```jsx
// Store.js
const Store = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_EPISODES':
      return { ...state, episodes: action.payload };
    default:
      return state;
  }
};

const StoreProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <Store.Provider value={value}>
      {props.children}
    </Store.Provider>
  );
};

// index.js
const componentTree = (
  <StoreProvider>
    <App />
  </StoreProvider>
);

ReactDOM.render(componentTree, document.getElementById('root'));

// App.jsx
const App = () => {
  const { state, dispatch } = useContext(Store);

  const fetchEpisodes = async () => {
    if (state.episodes.length < 0) return false;

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

  useEffect(() => {
    fetchEpisodes();
  });

  return (
    <section className="episode-layout">
      <EpisodeList episodes={state.episodes} />
    </section>
  );
};
```
