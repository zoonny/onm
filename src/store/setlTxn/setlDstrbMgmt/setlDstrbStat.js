import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/setlTxn/setlTxnApi';

// Event action types
const INITIALIZE = 'setlDstrb/INITIALIZE';
const INITIALIZE_SETLDSTRB = 'setlDstrb/INITIALIZE_SETLDSTRB';
const CHANGE_SEARCH_INPUT = 'setlDstrb/CHANGE_SEARCH_INPUT';
const CHANGE_SETLDSTRB_EDIT_INPUT = 'setlDstrb/CHANGE_SETLDSTRB_EDIT_INPUT';

// API action types
const GET_SETLDSTRB_LIST = 'setlDstrb/GET_SETLDSTRB_LIST';

// Event action creators
export const initialize = createAction(INITIALIZE);
export const initializeSetlDstrb = createAction(INITIALIZE_SETLDSTRB);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const changeSetlDstrbEditInput = createAction(CHANGE_SETLDSTRB_EDIT_INPUT);

// API action creators
export const getSetlDstrbStat = createAction(GET_SETLDSTRB_LIST, api.getSetlDstrbStat, meta => meta);

// initial state
const initialState = fromJS({
  dstrbs: [],
  codes: [],  
  lastPage: 1,
  dstrb: {
    ptnrId: '',
    icomPtnrId:'',
    setlTgtYm: '',
    setlItemCd: '',
    setlItemNm: '',
    stepNo: '',
    dstrbAmt: '',
    dstrbVat: '',
    adjAmt: '',
    adjVat: '',
    chCd: '',
    cdDtlNm: '',
    ptnrNm: '',
    dstrbRate: '',
    dstrbYn: '',
    totalAmt: '',
    totalVat: '',
    total: '',
  },  
  search: {
    startDt: '',
    endDt: '',
    icomPtnrId: '',
    ptnrId: '',
  },
  checkedRow: null,  
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [INITIALIZE_SETLDSTRB]: (state, action) => {
      return state.set('dstrb', initialState.get('dstrb'));
    },
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [CHANGE_SETLDSTRB_EDIT_INPUT]: (state, action) => {
      const { name, value} = action.payload;
      return state.setIn(['dstrb', name], value);      
    },
    ...pender({
      type: GET_SETLDSTRB_LIST,
      onSuccess: (state, action) => {                 
        // const { data: codes } = action.payload.codeList;
        const { dstrbList: dstrbs } = action.payload.data;
        //const { codeList: codes } = action.payload.data;        
        console.log(">>>>> ", action.payload.data.dstrbList);
        const lastPage = action.payload.headers['last-page'];
        return state
          .set('dstrbs', fromJS(dstrbs))
        //  .set('codes', fromJS(codes))
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
