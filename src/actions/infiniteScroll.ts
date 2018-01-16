import { SET_PHOTOS_IDX } from './constants';

export function setPhotosIdx(idx) {
    return (dispatch: Function) =>
        dispatch({ type: SET_PHOTOS_IDX, value: idx });
}
