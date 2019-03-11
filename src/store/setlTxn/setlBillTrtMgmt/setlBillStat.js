import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/setlTxn/setlTxnApi';

// action types
const CHANGE_SEARCH_INPUT = 'SetlBillStat/CHANGE_SEARCH_INPUT';

// API action types
const GET_SETLBILLSTAT_LIST = 'SetlBillStat/GET_SETLBILLSTAT_LIST';

// action creators
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);

// API action creators
export const getSetlBillStatList = createAction(GET_SETLBILLSTAT_LIST, api.getSetlBillStatList, meta => meta);

// initial state
const initialState = fromJS({
  billStats: [],
  codes: [],  
  lastPage: 1,
  search: {
    startDt: '',
    endDt: '',
    ptnrId: '',
  },
});

// reducer
export default handleActions(
  {
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    ...pender({
      type: GET_SETLBILLSTAT_LIST,
      onSuccess: (state, action) => {                 
        // const { data: codes } = action.payload.codeList;
        const { billStatList: billStats } = action.payload.data;
        const { codeList: codes } = action.payload.data;        
        console.log(billStats);
        const lastPage = action.payload.headers['last-page'];
        return state
          .set('billStats', fromJS(billStats))
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
  },
  initialState,
);
