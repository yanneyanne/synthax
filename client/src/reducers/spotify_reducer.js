import * as types from '../actions/types';

/** The initial state; no tokens and no user info */
const initialState = {
  accessToken: null,
  refreshToken: null,
  currentTrack: {
    uri: null,
    name: null,
    artist: null
  },
  user: {
    loading: false,
    country: null,
    display_name: null,
    email: null,
    external_urls: {},
    followers: {},
    href: null,
    id: null,
    images: [],
    product: null,
    type: null,
    uri: null,
  }
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    // when we get the tokens... set the tokens!
    case types.SPOTIFY_TOKENS:
      const {accessToken, refreshToken} = action;
      return Object.assign({}, state, {accessToken, refreshToken});

    // set our loading property when the loading begins
    case types.SPOTIFY_ME_BEGIN:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {loading: true})
      });

    // when we get the data merge it in
    case types.SPOTIFY_ME_SUCCESS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.data, {loading: false})
      });

    // currently no failure state :(
    case types.SPOTIFY_ME_FAILURE:
      return state;

    case types.SPOTIFY_SET_CURRENT_SONG:
      return Object.assign({}, state, {
        currentTrack: {
          uri: action.uri,
          name: action.name,
          artist: action.artist
        }
      })

    default:
      return state;
  }
}
