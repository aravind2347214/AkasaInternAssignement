import { combineReducers } from '@reduxjs/toolkit';
import {authReducer} from './reducers'


export const rootReducer=combineReducers({
    authReducer,
})