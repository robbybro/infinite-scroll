if (process.env.WEBPACK) require('./App.scss');

import * as React from 'react';
import { getPhotos } from '../../actions/app';

import InfiniteScroll from '../InfiniteScroll/InfiniteScroll'
export interface AppProps {
    app: {
        photos: any[];
    };
    scroll: {
        idx: number;
    };
    getPhotos: Function;
    setPhotosIdx: Function;
}

export default class App extends React.Component<AppProps, null> {
    componentDidMount() {
        this.props.getPhotos();
    }
    render() {
        return (
            <div>
                <header>
                    <h1>Infinite Scroll</h1>
                    <h2> Displaying {this.props.scroll.idx} items at a time</h2>
                </header>
                <InfiniteScroll {...this.props}/>
            </div>
        );
    }
}