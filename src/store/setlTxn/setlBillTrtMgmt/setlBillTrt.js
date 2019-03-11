import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/setlTxn/setlTxnApi';

// action types
const CHANGE_SEARCH_INPUT = 'SetlBillTrt/CHANGE_SEARCH_INPUT';
const CHECKED_SETLITEM = 'SetlBillTrt/CHECKED_SETLITEM';

// API action types
const GET_SETLBILLTRT_LIST = 'SetlBillTrt/GET_SETLBILLTRT_LIST';
const GET_SETLBILLTRT = 'SetlBillTrt/GET_SETLBILLTRT';
const WRITE_SETLITEMCLOYN = 'setlDstrb/WRITE_SETLITEMCLOYN';
const REMOVE_SETLITEMCLOYN = 'setlDstrb/REMOVE_SETLITEMCLOYN';

// action creators
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const checkedRow = createAction(CHECKED_SETLITEM);

// API action creators
export const getSetlBillTrtList = createAction(GET_SETLBILLTRT_LIST, api.getSetlBillTrtList, meta => meta);
export const getSetlBillTrt = createAction(GET_SETLBILLTRT, api.getSetlBillTrt);
export const writeSetlItemCloYn = createAction(WRITE_SETLITEMCLOYN, api.writeSetlItemCloYn);
export const removeSetlItemCloYn = createAction(REMOVE_SETLITEMCLOYN, api.removeSetlItemCloYn);

// initial state
const initialState = fromJS({
  billTrts: [],
  codes: [],
  lastPage: 1,
  billTrt: {
    id: '',
    title: '',
    body: '',
    tags: '',
  },
  search: {
    startDt: '',
    endDt: '',
    ptnrId: '',
  },
  checkedRow: null,
});

// reducer
export default handleActions(
  {
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [CHECKED_SETLITEM]: (state, action) => {
      const { checkedRow } = action.payload;
      return state.set('checkedRow', checkedRow);
    },
    ...pender({
      type: WRITE_SETLITEMCLOYN,
      onSuccess: (state, action) => {
        console.log(action.payload);
        const { _id } = action.payload.data;
        return state.set('setlItemCd', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: REMOVE_SETLITEMCLOYN,
      onSuccess: (state, action) => {
        console.log(action.payload);
        const { _id } = action.payload.data;
        return state.set('setlItemCd', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: GET_SETLBILLTRT_LIST,
      onSuccess: (state, action) => {                 
        // const { data: codes } = action.payload.codeList;
        const { billTrtList: billTrts } = action.payload.data;
        const { codeList: codes } = action.payload.data;        
        console.log(billTrts);
        const lastPage = action.payload.headers['last-page'];
        return state
          .set('billTrts', fromJS(billTrts))
          .set('codes', fromJS(codes))
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
      type: GET_SETLBILLTRT,
      onSuccess: (state, action) => {
        const { setlTgtYm, stepNo, cloYn } = action.payload.data;
        return state
        .setIn(['billTrt', 'setlTgtYm'], setlTgtYm)
        .setIn(['billTrt', 'stepNo'], stepNo)
        .setIn(['billTrt', 'cloYn'], cloYn)
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
  },
  initialState,
);
