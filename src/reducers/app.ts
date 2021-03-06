import { GET_PHOTOS } from '../actions/constants';

export default function app(
    state = { photos: [] },
    action: { type: string; value: any[] },
) {
    switch (action.type) {
        case GET_PHOTOS:
            return {
                ...state,
                photos: action.value,
            };
        default:
            return state;
    }
}
