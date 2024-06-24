import { combineReducers } from "redux";
import report from './report.reducer';
import details from './details.reducer'


const rootReducer = combineReducers({
    report,
    details
})

export default rootReducer