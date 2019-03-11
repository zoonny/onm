import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/instn/instnApi';

// action types
const INITIALIZE = 'medicalInstnInfo/INITIALIZE';
const INITIALIZE_MEDICALINSTNINFO = 'medicalInstnInfo/INITIALIZE_MEDICALINSTNINFO';
const CHANGE_SEARCH_INPUT = 'medicalInstnInfo/CHANGE_SEARCH_INPUT';
const CHANGE_MEDICALINSTNINFO_EDIT_INPUT = 'medicalInstnInfo/CHANGE_MEDICALINSTNINFO_EDIT_INPUT';
const CHECKED_MEDICALINSTN = 'medicalInstnInfo/CHECKED_MEDICALINSTN';
const WRITE_MEDICALINSTNINFO = 'medicalInstnInfo/WRITE_MEDICALINSTNINFO';
const GET_MEDICALINSTNINFO_LIST = 'medicalInstnInfo/GET_MEDICALINSTNINFO_LIST';
const GET_MEDICALINSTNINFO = 'medicalInstnInfo/GET_MEDICALINSTNINFO';
const EDIT_MEDICALINSTNINFO = 'medicalInstnInfo/EDIT_MEDICALINSTNINFO';
const REMOVE_MEDICALINSTNINFO = 'medicalInstnInfo/REMOVE_MEDICALINSTNINFO';

// action creators
export const initialize = createAction(INITIALIZE);
export const initializeMedicalInstnInfo = createAction(INITIALIZE_MEDICALINSTNINFO);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const changeMedicalInstnInfoEditInput = createAction(CHANGE_MEDICALINSTNINFO_EDIT_INPUT);
export const checkedMedicalInstn = createAction(CHECKED_MEDICALINSTN);
export const writeMedicalInstnInfo = createAction(WRITE_MEDICALINSTNINFO, api.writeMedicalInstnInfo);
export const getMedicalInstnInfoList = createAction(
  GET_MEDICALINSTNINFO_LIST,
  api.getMedicalInstnInfoList,
  meta => meta,
);
export const getMedicalInstnInfo = createAction(GET_MEDICALINSTNINFO, api.getMedicalInstnInfo);
export const editMedicalInstnInfo = createAction(EDIT_MEDICALINSTNINFO, api.editMedicalInstnInfo);
export const removeMedicalInstnInfo = createAction(REMOVE_MEDICALINSTNINFO, api.removeMedicalInstnInfo);

// initial state
const initialState = fromJS({
  medicalInstnList: [],  
  bankCdList: [],
  chCdList: [],
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
    [INITIALIZE_MEDICALINSTNINFO]: (state, action) => {
      return state.set('medicalInstn', initialState.get('medicalInstn'));
    },
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [CHANGE_MEDICALINSTNINFO_EDIT_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.set(['medicalInstn', name], value);
    },
    [CHECKED_MEDICALINSTN]: (state, action) => {
      const { checkedMedicalInstn } = action.payload;
      return state.set('checkedMedicalInstn', checkedMedicalInstn);
    },
    ...pender({
      type: WRITE_MEDICALINSTNINFO,
      onSuccess: (state, action) => {        
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: GET_MEDICALINSTNINFO_LIST,
      onSuccess: (state, action) => {
        const { medicalInstnList: medicalInstnList } = action.payload.data;  
        const { bankCdList: bankCdList } = action.payload.data;
        const { chCdList: chCdList } = action.payload.data;        
        const lastPage = action.payload.headers['last-page'];
        const totalCount = action.payload.headers['total-count'];
        return state
          .set('medicalInstnList', fromJS(medicalInstnList))
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
      type: GET_MEDICALINSTNINFO,
      onSuccess: (state, action) => {
        const { data } = action.payload;
        return state          
          .setIn(['medicalInstn', 'ptnrId'], data.ptnrId)
          .setIn(['medicalInstn', 'ptnrNm'], data.ptnrNm)
          .setIn(['medicalInstn', 'bizrNo'], data.bizrNo)
          .setIn(['medicalInstn', 'telNo'], data.telNo)
          .setIn(['medicalInstn', 'email'], data.email)
          .setIn(['medicalInstn', 'bankCd'], data.bankCd)
          .setIn(['medicalInstn', 'bankCdNm'], data.bankCdNm)
          .setIn(['medicalInstn', 'bnkacnNo'], data.bnkacnNo)
          .setIn(['medicalInstn', 'dposrNm'], data.dposrNm)
          .setIn(['medicalInstn', 'ptnrDivCd'], data.ptnrDivCd)
          .setIn(['medicalInstn', 'ptnrDivCdNm'], data.ptnrDivCdNm)
          .setIn(['medicalInstn', 'tkcgr'], data.tkcgr)
          .setIn(['medicalInstn', 'tkcgDept'], data.tkcgDept)
          .setIn(['medicalInstn', 'adr'], data.adr)                    
          .setIn(['medicalInstn', 'chCd'], data.chCd)
          .setIn(['medicalInstn', 'cretDt'], data.cretDt);
      },
    }),
    ...pender({
      type: EDIT_MEDICALINSTNINFO,
      onSuccess: (state, action) => {
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
    }),
    ...pender({
      type: REMOVE_MEDICALINSTNINFO,
      onSuccess: (state, action) => {
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
    }),
  },
  initialState,
);
