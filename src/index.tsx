import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

import App from './components/App/App';
import { getPhotos } from './actions/app';
import { setPhotosIdx } from './actions/infiniteScroll';

import store from './store';

const mapStateToProps = (state:any, props:any) => {
    return { ...state, ...props };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getPhotos: () => dispatch(getPhotos()),
        setPhotosIdx: (idx) => dispatch(setPhotosIdx(idx))
    };
};



const render = Component => {
    const ControlledApp = connect(mapStateToProps, mapDispatchToProps)(Component);
    ReactDOM.render(
        <Provider store={store}>
            <ControlledApp />
        </Provider>,
        document.getElementById('app'),
    );
};

render(App);

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
        store.replaceReducer(require('./reducers/index').default);
    });
    module.hot.accept('./components/App/App', function() {
        render(App);
    });
}
