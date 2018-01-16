import axios from 'axios';

import { GET_PHOTOS } from './constants';

export function getPhotos() {
    return (dispatch: Function) => {
        axios.get('/photos').then((res: any) => {
            dispatch(getPhotosSuccess(res.data));
        });
    };
}

function getPhotosSuccess(photos: any[]) {
    return {
        type: GET_PHOTOS,
        value: photos,
    };
}
