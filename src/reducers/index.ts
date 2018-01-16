import { combineReducers } from 'redux';

import app from './app';
import infiniteScroll from './infinite-scroll';

export default combineReducers({
    app,
    scroll: infiniteScroll,
});
