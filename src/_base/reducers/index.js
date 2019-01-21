import { combineReducers } from 'redux'
import UserReducer from './user.reducer'
import PublicReducer from './public.reducer'
import UIHelperReducer from './uihelper.reducer';
import {reducer as toastrReducer} from 'react-redux-toastr'
import ReviewsReducer from "./reviews.reducer";

export default combineReducers({
    'user': UserReducer,
    'public_': PublicReducer,
    'uihelper': UIHelperReducer,
    'reviews': ReviewsReducer,
    'toastr': toastrReducer
})