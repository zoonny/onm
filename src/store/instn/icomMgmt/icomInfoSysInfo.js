import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/instn/instnApi';

// action types
const INITIALIZE = 'icomInfoSysInfo/INITIALIZE';
const INITIALIZE_ICOMINFOSYSINFO = 'icomInfoSysInfo/INITIALIZE_ICOMINFOSYSINFO';
const CHANGE_SEARCH_INPUT = 'icomInfoSysInfo/CHANGE_SEARCH_INPUT';
const CHANGE_ICOMINFOSYSINFO_EDIT_INPUT = 'icomInfoSysInfo/CHANGE_ICOMINFOSYSINFO_EDIT_INPUT';
const CHECKED_MEDICALINSTN = 'icomInfoSysInfo/CHECKED_MEDICALINSTN';
const WRITE_ICOMINFOSYSINFO = 'icomInfoSysInfo/WRITE_ICOMINFOSYSINFO';
const GET_ICOMINFOSYSINFO_LIST = 'icomInfoSysInfo/GET_ICOMINFOSYSINFO_LIST';
const GET_ICOMINFOSYSINFO = 'icomInfoSysInfo/GET_ICOMINFOSYSINFO';
const EDIT_ICOMINFOSYSINFO = 'icomInfoSysInfo/EDIT_ICOMINFOSYSINFO';
const REMOVE_ICOMINFOSYSINFO = 'icomInfoSysInfo/REMOVE_ICOMINFOSYSINFO';

// action creators
export const initialize = createAction(INITIALIZE);
export const initializeIcomInfoSysInfo = createAction(INITIALIZE_ICOMINFOSYSINFO);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const changeIcomInfoSysInfoEditInput = createAction(CHANGE_ICOMINFOSYSINFO_EDIT_INPUT);
export const checkedMedicalInstn = createAction(CHECKED_MEDICALINSTN);
export const writeIcomInfoSysInfo = createAction(WRITE_ICOMINFOSYSINFO, api.writeIcomInfoSysInfo);
export const getIcomInfoSysInfoList = createAction(
  GET_ICOMINFOSYSINFO_LIST,
  api.getIcomInfoSysInfoList,
  meta => meta,
);
export const getIcomInfoSysInfo = createAction(GET_ICOMINFOSYSINFO, api.getIcomInfoSysInfo);
export const editIcomInfoSysInfo = createAction(EDIT_ICOMINFOSYSINFO, api.editIcomInfoSysInfo);
export const removeIcomInfoSysInfo = createAction(REMOVE_ICOMINFOSYSINFO, api.removeIcomInfoSysInfo);

// initial state
const initialState = fromJS({
  medicalInstnList: [],    
  ptnrIdList: [],
  medicalInstn: {},
  search: {
    searchText: '',
  },
  totalCount: 0,
  lastPage: 1,
  resultCount: 0,
  checkedMedicalInstn: null,
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [INITIALIZE_ICOMINFOSYSINFO]: (state, action) => {
      return state.set('medicalInstn', initialState.get('medicalInstn'));
    },
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [CHANGE_ICOMINFOSYSINFO_EDIT_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.set(['medicalInstn', name], value);
    },
    [CHECKED_MEDICALINSTN]: (state, action) => {
      const { checkedMedicalInstn } = action.payload;
      return state.set('checkedMedicalInstn', checkedMedicalInstn);
    },
    ...pender({
      type: WRITE_ICOMINFOSYSINFO,
      onSuccess: (state, action) => {        
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: GET_ICOMINFOSYSINFO_LIST,
      onSuccess: (state, action) => {
        const { resultList: medicalInstnList } = action.payload.data;          
        const { ptnrIdList: ptnrIdList } = action.payload.data;        
        const lastPage = action.payload.headers['last-page'];
        const totalCount = action.payload.headers['total-count'];
        return state
          .set('medicalInstnList', fromJS(medicalInstnList))          
          .set('ptnrIdList', fromJS(ptnrIdList))
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
      type: GET_ICOMINFOSYSINFO,
      onSuccess: (state, action) => {
        const { data } = action.payload;
        return state          
          .setIn(['medicalInstn', 'ptnrId'], data.ptnrId)
          .setIn(['medicalInstn', 'ptnrNm'], data.ptnrNm)
          .setIn(['medicalInstn', 'sysIpAdr'], data.sysIpAdr)
          .setIn(['medicalInstn', 'sysPort'], data.sysPort)                           
          .setIn(['medicalInstn', 'cretDt'], data.cretDt);
      },
    }),
    ...pender({
      type: EDIT_ICOMINFOSYSINFO,
      onSuccess: (state, action) => {
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
    }),
    ...pender({
      type: REMOVE_ICOMINFOSYSINFO,
      onSuccess: (state, action) => {
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
    }),
  },
  initialState,
);
