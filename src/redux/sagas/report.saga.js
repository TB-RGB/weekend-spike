import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchReport() {
  try {
    const reportResponse = yield axios.get("/api/report/");
    yield put({ type: "SET_REPORT", payload: reportResponse.data });
  } catch (err) {
    console.error("Error in FETCH saga", err);
  }
}

function* addReport(action) {
  try {
    const file = action.payload.file;
    console.log('id', action.payload.id)
    console.log('Incoming file as formData', file.get('file'))
    yield axios.put(`/api/report/update/${action.payload.id}`, file);
    yield put({ type: "FETCH_REPORT" });
  } catch (err) {
    console.error("Error in PUT saga", err);
  }
}

function* reportSaga() {
  yield takeLatest("FETCH_REPORT", fetchReport);
  yield takeLatest("ADD_REPORT", addReport);
}

export default reportSaga;
