import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/instn/instnApi';

// action types
const INITIALIZE = 'medicalInstnIfSysInfo/INITIALIZE';
const INITIALIZE_MEDICALINSTNIFSYSINFO = 'medicalInstnIfSysInfo/INITIALIZE_MEDICALINSTNIFSYSINFO';
const CHANGE_SEARCH_INPUT = 'medicalInstnIfSysInfo/CHANGE_SEARCH_INPUT';
const CHANGE_MEDICALINSTNIFSYSINFO_EDIT_INPUT = 'medicalInstnIfSysInfo/CHANGE_MEDICALINSTNIFSYSINFO_EDIT_INPUT';
const CHECKED_MEDICALINSTN = 'medicalInstnIfSysInfo/CHECKED_MEDICALINSTN';
const WRITE_MEDICALINSTNIFSYSINFO = 'medicalInstnIfSysInfo/WRITE_MEDICALINSTNIFSYSINFO';
const GET_MEDICALINSTNIFSYSINFO_LIST = 'medicalInstnIfSysInfo/GET_MEDICALINSTNIFSYSINFO_LIST';
const GET_MEDICALINSTNIFSYSINFO = 'medicalInstnIfSysInfo/GET_MEDICALINSTNIFSYSINFO';
const EDIT_MEDICALINSTNIFSYSINFO = 'medicalInstnIfSysInfo/EDIT_MEDICALINSTNIFSYSINFO';
const REMOVE_MEDICALINSTNIFSYSINFO = 'medicalInstnIfSysInfo/REMOVE_MEDICALINSTNIFSYSINFO';

// action creators
export const initialize = createAction(INITIALIZE);
export const initializeMedicalInstnIfSysInfo = createAction(INITIALIZE_MEDICALINSTNIFSYSINFO);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const changeMedicalInstnIfSysInfoEditInput = createAction(CHANGE_MEDICALINSTNIFSYSINFO_EDIT_INPUT);
export const checkedMedicalInstn = createAction(CHECKED_MEDICALINSTN);
export const writeMedicalInstnIfSysInfo = createAction(WRITE_MEDICALINSTNIFSYSINFO, api.writeMedicalInstnIfSysInfo);
export const getMedicalInstnIfSysInfoList = createAction(
  GET_MEDICALINSTNIFSYSINFO_LIST,
  api.getMedicalInstnIfSysInfoList,
  meta => meta,
);
export const getMedicalInstnIfSysInfo = createAction(GET_MEDICALINSTNIFSYSINFO, api.getMedicalInstnIfSysInfo);
export const editMedicalInstnIfSysInfo = createAction(EDIT_MEDICALINSTNIFSYSINFO, api.editMedicalInstnIfSysInfo);
export const removeMedicalInstnIfSysInfo = createAction(REMOVE_MEDICALINSTNIFSYSINFO, api.removeMedicalInstnIfSysInfo);

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
    [INITIALIZE_MEDICALINSTNIFSYSINFO]: (state, action) => {
      return state.set('medicalInstn', initialState.get('medicalInstn'));
    },
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [CHANGE_MEDICALINSTNIFSYSINFO_EDIT_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.set(['medicalInstn', name], value);
    },
    [CHECKED_MEDICALINSTN]: (state, action) => {
      const { checkedMedicalInstn } = action.payload;
      return state.set('checkedMedicalInstn', checkedMedicalInstn);
    },
    ...pender({
      type: WRITE_MEDICALINSTNIFSYSINFO,
      onSuccess: (state, action) => {        
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: GET_MEDICALINSTNIFSYSINFO_LIST,
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
      type: GET_MEDICALINSTNIFSYSINFO,
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
      type: EDIT_MEDICALINSTNIFSYSINFO,
      onSuccess: (state, action) => {
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
    }),
    ...pender({
      type: REMOVE_MEDICALINSTNIFSYSINFO,
      onSuccess: (state, action) => {
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
    }),
  },
  initialState,
);
