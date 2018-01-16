import { SET_PHOTOS_IDX } from '../actions/constants';

export default function infiniteScroll(
    state = { idx: 0 },
    action: { type: string; value: any[] },
) {
    switch (action.type) {
        case SET_PHOTOS_IDX:
            return {
                ...state,
                idx: action.value,
            };
        default:
            return state;
    }
}
