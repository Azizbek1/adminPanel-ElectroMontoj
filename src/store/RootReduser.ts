import { reducer as toastrReducer } from 'react-redux-toastr'
import { reducer as userReducer } from './slices/auth.slice'

export const reducers = {
    user: userReducer,
    toastr: toastrReducer
}
