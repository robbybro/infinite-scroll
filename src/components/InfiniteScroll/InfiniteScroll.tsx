if (process.env.WEBPACK) require('./InfiniteScroll.scss');

import * as React from 'react';
import * as _ from 'underscore';
import * as $ from 'jquery';

import { AppProps } from '../App/App';

const SCROLL_WRAPPER_CLASS = '.scroll-wrapper';
const itemHeight = 50;

let lastScrollTop = 0;

export default class InfiniteScroll extends React.Component<AppProps, null> {
    componentDidMount() {
        $(SCROLL_WRAPPER_CLASS).scroll((e) => {
            this.handleScroll(e);
        });
    }

    componentWillUnmount() {
        $(SCROLL_WRAPPER_CLASS).off('scroll');
    }

    handleScroll(e) {
        // figure out the direction
        const scrollTop = $(SCROLL_WRAPPER_CLASS).scrollTop();

        if (scrollTop > lastScrollTop) {
            // scrolling down
            // buffering by 20 (10 elements on screen and another 10 offscreen
            // before the end of the list)
            if (scrollTop > (this.props.scroll.idx - 20) * itemHeight) {
                // display 10 more photos every time you get close to the bottom
                this.props.setPhotosIdx(this.props.scroll.idx + 10);
            }
        }
        else {
            // TODO: don't worry about this direction for now but an
            // optimization would be to destroy nodes as you scroll down
            // scrolling up
        }

        lastScrollTop = scrollTop;
    }
    render() {
        let listItems = this.props.app.photos;
        let photosToDisplay = [];
        if (this.props.app.photos.length) {
            for (let i = 0; i < this.props.scroll.idx; i++) {
                const photo = this.props.app.photos[i];
                photosToDisplay.push(
                    <div
                        className='list-item'
                        key={i}
                    >
                        <img
                            src={photo.thumbnailUrl}
                            alt={photo.title}
                        />
                        <p>{i} {photo.title}</p>
                    </div>
                );
            }
        }
        else {
            photosToDisplay.push(<p>No Results</p>);
        }

        return (
            <div className='scroll-wrapper'>
                <div className='scroll-list'>
                    {photosToDisplay}
                </div>
            </div>
        );
    }
}
