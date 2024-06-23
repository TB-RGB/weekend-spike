import { all } from "redux-saga/effects";
import reportSaga from "./report.saga";

export default function* rootSaga(){
    yield all([
        reportSaga()
    ])
}