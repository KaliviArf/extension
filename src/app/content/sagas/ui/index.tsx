import React from 'react';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { render } from 'react-dom';
import { go, replace } from 'connected-react-router';
import {
  close,
  CloseAction,
  closed,
  closeFailed,
  open,
  opened,
  openFailed,
  SHOW_BULLES_UPDATE_SERVICE_MESSAGE,
  TOGGLE_UI,
  ToggleUIAction
} from 'app/actions';
import { CLOSE, NOTICES_FOUND, OPEN, OPENED } from 'app/constants/ActionTypes';
import {
  getPathname,
  hasUnreadNotices,
  isMounted as isNotificationMounted,
  isOpen as isNotificationOpen
} from '../../selectors';
import { append, create, hide, show } from '../../extensionIframe';
import theme from '../../../theme';
import App from '../../App';
import { history } from '../../store';
import { fakeLoadingSaga } from './fakeLoading.saga';

const iframe = create(theme.iframe.style);
let contentDocument: Document;

export function* openSaga() {
  try {
    const isOpen = yield select(isNotificationOpen);
    const isMounted = yield select(isNotificationMounted);

    if (!isOpen) {
      const location = yield select(getPathname);
      if (location) {
        yield put(replace('/'));
      }

      if (isMounted && contentDocument.visibilityState === 'visible') {
        show();
      } else {
        contentDocument = yield call(append, iframe);
        const root = document.createElement('div');
        contentDocument.body.appendChild(root);
        const renderAppInIframe = () =>
          render(<App contentDocument={contentDocument} />, root);
        yield call(renderAppInIframe);
      }

      yield put(opened());
    }
  } catch (e) {
    yield put(openFailed(e));
  }
}

export function* closeSaga(closeAction: CloseAction) {
  try {
    const isOpen = yield select(isNotificationOpen);
    if (isOpen) {
      hide();
      yield put(go(-history.entries.length));
      yield put(closed(closeAction.payload.cause));
    }
  } catch (e) {
    yield put(closeFailed(e));
  }
}

export function* noticesFoundSaga() {
  const shouldOpen = yield select(hasUnreadNotices);
  if (shouldOpen) {
    yield put(open());
  }
}

export function* toggleUISaga(action: ToggleUIAction) {
  const isOpen = yield select(isNotificationOpen);
  yield put(isOpen ? close(action.payload.closeCause) : open());
}

export default function* UISaga() {
  yield takeLatest(OPEN, openSaga);
  yield takeLatest(CLOSE, closeSaga);
  yield takeEvery(
    [TOGGLE_UI, SHOW_BULLES_UPDATE_SERVICE_MESSAGE],
    toggleUISaga
  );
  yield takeLatest(NOTICES_FOUND, noticesFoundSaga);
  yield takeLatest(OPENED, fakeLoadingSaga);
}