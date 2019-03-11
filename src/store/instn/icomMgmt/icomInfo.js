import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/instn/instnApi';

// action types
const INITIALIZE = 'icomInfo/INITIALIZE';
const INITIALIZE_ICOMINFO = 'icomInfo/INITIALIZE_ICOMINFO';
const CHANGE_SEARCH_INPUT = 'icomInfo/CHANGE_SEARCH_INPUT';
const CHANGE_ICOMINFO_EDIT_INPUT = 'icomInfo/CHANGE_ICOMINFO_EDIT_INPUT';
const CHECKED_ICOM = 'icomInfo/CHECKED_ICOM';
const WRITE_ICOMINFO = 'icomInfo/WRITE_ICOMINFO';
const GET_ICOMINFO_LIST = 'icomInfo/GET_ICOMINFO_LIST';
const GET_ICOMINFO = 'icomInfo/GET_ICOMINFO';
const EDIT_ICOMINFO = 'icomInfo/EDIT_ICOMINFO';
const REMOVE_ICOMINFO = 'icomInfo/REMOVE_ICOMINFO';

// action creators
export const initialize = createAction(INITIALIZE);
export const initializeIcomInfo = createAction(INITIALIZE_ICOMINFO);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const changeIcomEditInput = createAction(CHANGE_ICOMINFO_EDIT_INPUT);
export const checkedIcom = createAction(CHECKED_ICOM);
export const writeIcomInfo = createAction(WRITE_ICOMINFO, api.writeIcomInfo);
export const getIcomInfoList = createAction(
  GET_ICOMINFO_LIST,
  api.getIcomInfoList,
  meta => meta,
);
export const getIcomInfo = createAction(GET_ICOMINFO, api.getIcomInfo);
export const editIcomInfo = createAction(EDIT_ICOMINFO, api.editIcomInfo);
export const removeIcomInfo = createAction(REMOVE_ICOMINFO, api.removeIcomInfo);

// initial state
const initialState = fromJS({
  icomList: [],  
  bankCdList: [],
  chCdList: [],
  icom: {},
  search: {
    searchText: '',
  },
  totalCount: 0,
  lastPage: 1,
  resultCount: 0,
  checkedIcom: null,
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [INITIALIZE_ICOMINFO]: (state, action) => {
      return state.set('icom', initialState.get('icom'));
    },
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [CHANGE_ICOMINFO_EDIT_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.set(['icom', name], value);
    },
    [CHECKED_ICOM]: (state, action) => {
      const { checkedIcom } = action.payload;
      return state.set('checkedIcom', checkedIcom);
    },
    ...pender({
      type: WRITE_ICOMINFO,
      onSuccess: (state, action) => {        
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: GET_ICOMINFO_LIST,
      onSuccess: (state, action) => {
        const { medicalInstnList: icomList } = action.payload.data;  
        const { bankCdList: bankCdList } = action.payload.data;
        const { chCdList: chCdList } = action.payload.data;        
        const lastPage = action.payload.headers['last-page'];
        const totalCount = action.payload.headers['total-count'];
        return state
          .set('icomList', fromJS(icomList))
          .set('bankCdList', fromJS(bankCdList))
          .set('chCdList', fromJS(chCdList))
          .set('lastPage', parseInt(lastPage, 10))
          .set('totalCount', totalCount);         
      },      
      onError: (state, action) => {
        throw {
          code: '404',
          message: action.payload,
        };
      },
    }),
    ...pender({
      type: GET_ICOMINFO,
      onSuccess: (state, action) => {
        const { data } = action.payload;
        return state          
          .setIn(['icom', 'ptnrId'], data.ptnrId)
          .setIn(['icom', 'ptnrNm'], data.ptnrNm)
          .setIn(['icom', 'bizrNo'], data.bizrNo)
          .setIn(['icom', 'telNo'], data.telNo)
          .setIn(['icom', 'email'], data.email)
          .setIn(['icom', 'bankCd'], data.bankCd)
          .setIn(['icom', 'bankCdNm'], data.bankCdNm)
          .setIn(['icom', 'bnkacnNo'], data.bnkacnNo)
          .setIn(['icom', 'dposrNm'], data.dposrNm)
          .setIn(['icom', 'ptnrDivCd'], data.ptnrDivCd)
          .setIn(['icom', 'ptnrDivCdNm'], data.ptnrDivCdNm)
          .setIn(['icom', 'tkcgr'], data.tkcgr)
          .setIn(['icom', 'tkcgDept'], data.tkcgDept)
          .setIn(['icom', 'adr'], data.adr)                    
          .setIn(['icom', 'cretDt'], data.cretDt);
      },
    }),
    ...pender({
      type: EDIT_ICOMINFO,
      onSuccess: (state, action) => {
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
    }),
    ...pender({
      type: REMOVE_ICOMINFO,
      onSuccess: (state, action) => {
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
    }),
  },
  initialState,
);
