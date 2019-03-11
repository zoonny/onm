import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/setlBase/setlBaseApi';

// action types
const INITIALIZE = 'setlTgtInfo/INITIALIZE';
const INITIALIZE_SETLTGTINFO = 'setlTgtInfo/INITIALIZE_SETLTGTINFO';
const CHANGE_SEARCH_INPUT = 'setlTgtInfo/CHANGE_SEARCH_INPUT';
const CHANGE_SETLTGTINFO_EDIT_INPUT = 'setlTgtInfo/CHANGE_SETLTGTINFO_EDIT_INPUT';
const CHECKED_ROW = 'setlTgtInfo/CHECKED_ROW';
const CHECKED_INCLUDEHISTYN = 'setlTgtInfo/CHECKED_INCLUDEHISTYN';

// API action types
const WRITE_SETLTGTINFO = 'setlTgtInfo/WRITE_SETLTGTINFO';
const GET_SETLTGTINFO_LIST = 'setlTgtInfo/GET_SETLTGTINFO_LIST';
const GET_SETLTGTINFO = 'setlTgtInfo/GET_SETLTGTINFO';
const EDIT_SETLTGTINFO = 'setlTgtInfo/EDIT_SETLTGTINFO';
const REMOVE_SETLTGTINFO = 'setlTgtInfo/REMOVE_SETLTGTINFO';

// action creators
export const initialize = createAction(INITIALIZE);
export const initializeSetlTgtInfo = createAction(INITIALIZE_SETLTGTINFO);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const changeSetlTgtInfoEditInput = createAction(CHANGE_SETLTGTINFO_EDIT_INPUT);
export const checkedRow = createAction(CHECKED_ROW);
export const checkedHistYn = createAction(CHECKED_INCLUDEHISTYN);

// API action creators
export const writeSetlTgtInfo = createAction(WRITE_SETLTGTINFO, api.writeSetlTgtInfo);
export const getSetlTgtInfoList = createAction(
  GET_SETLTGTINFO_LIST,
  api.getSetlTgtInfoList,
  meta => meta,
);
export const getSetlTgtInfo = createAction(GET_SETLTGTINFO, api.getSetlTgtInfo);
export const editSetlTgtInfo = createAction(EDIT_SETLTGTINFO, api.editSetlTgtInfo);
export const removeSetlTgtInfo = createAction(REMOVE_SETLTGTINFO, api.removeSetlTgtInfo);

// initial state
const initialState = fromJS({
  setlTgts: [],
  setlItems: [],
  ptnrs: [],
  lastPage: 1,
  setlTgt: {
    setlItemCd: '',
    setlItemNm: '',
    ptnrId: '',
    ptnrNm: '',
    efctStDt: '',
    efctFnsDt: '',
    dstrbRate: '',
    dstrbYn: '',
  },
  search: {
    setlItemCd: '',
    ptnrId: '',
    includeHistYn:'',
  },
  checkedRow: null,
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [INITIALIZE_SETLTGTINFO]: (state, action) => {
      return state.set('setlTgt', initialState.get('setlTgt'));
    },
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [CHANGE_SETLTGTINFO_EDIT_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['setlTgt', name], value);
    },
    [CHECKED_ROW]: (state, action) => {
      const { checkedRow } = action.payload;
      return state.set('checkedRow', checkedRow);
    },
    [CHECKED_INCLUDEHISTYN]: (state, action) => {
      const { checkedHistYn } = action.payload;
      return state
        .setIn(['search', 'includeHistYn'],checkedHistYn)
        .set('checkedHistYn' ,checkedHistYn);      
    },
    ...pender({
      type: WRITE_SETLTGTINFO,
      onSuccess: (state, action) => {
        console.log(action.payload);
        const { _id } = action.payload.data;
        return state.set('setlItemCd', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: GET_SETLTGTINFO_LIST,
      onSuccess: (state, action) => {
        //const { data: posts } = action.payload;
        const { setlTgtList: setlTgts } = action.payload.data;
        const { setlItemList: setlItems } = action.payload.data;
        const { ptnrList: ptnrs } = action.payload.data;
        console.log(setlTgts);
        console.log(setlItems);
        console.log(ptnrs);
        const lastPage = action.payload.headers['last-page'];
        return state
          .set('setlTgts', fromJS(setlTgts))
          .set('setlItems', fromJS(setlItems))
          .set('ptnrs', fromJS(ptnrs))
          .set('lastPage', parseInt(lastPage, 10));
      },
      // onPending: (state, action) => state,
      onError: (state, action) => {
        throw {
          code: '404',
          message: action.payload,
        };
      },
    }),
    ...pender({
      type: GET_SETLTGTINFO,
      onSuccess: (state, action) => {
        const { setlItemCd, setlItemNm, ptnrId, ptnrNm, efctStDt, efctFnsDt, dstrbRate, dstrbYn } = action.payload.data;
        return state
          .setIn(['setlTgt', 'setlItemCd'], setlItemCd)
          .setIn(['setlTgt', 'setlItemNm'], setlItemNm)
          .setIn(['setlTgt', 'ptnrId'], ptnrId)
          .setIn(['setlTgt', 'ptnrNm'], ptnrNm)
          .setIn(['setlTgt', 'efctStDt'], efctStDt)
          .setIn(['setlTgt', 'efctFnsDt'], efctFnsDt)
          .setIn(['setlTgt', 'dstrbRate'], dstrbRate)
          .setIn(['setlTgt', 'dstrbYn'], dstrbYn)
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: EDIT_SETLTGTINFO,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('setlItemCd', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: REMOVE_SETLTGTINFO,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('setlItemCd', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
  },
  initialState,
);
