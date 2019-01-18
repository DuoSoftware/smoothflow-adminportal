import { combineReducers } from 'redux'
import UserReducer from './user.reducer'
import PublicReducer from './public.reducer'
import UIHelperReducer from './uihelper.reducer';

export default combineReducers({
    'user': UserReducer,
    'public_': PublicReducer,
    'uihelper': UIHelperReducer
})