import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/setlBase/setlBaseApi';

// Event action types
const INITIALIZE = 'setlTarifInfo/INITIALIZE';
const INITIALIZE_SETLTARIFINFO = 'setlTarifInfo/INITIALIZE_SETLTARIFINFO';
const CHANGE_SEARCH_INPUT = 'setlTarifInfo/CHANGE_SEARCH_INPUT';
const CHANGE_SETLTARIFINFO_EDIT_INPUT = 'setlTarifInfo/CHANGE_SETLTARIFINFO_EDIT_INPUT';
const CHECKED_ROW = 'setlTarifInfo/CHECKED_ROW';
const CHECKED_INCLUDEHISTYN = 'setlTarifInfo/CHECKED_INCLUDEHISTYN';

// API action types
const GET_SETLTARIFINFO_LIST = 'setlTarifInfo/GET_SETLTARIFINFO_LIST';
const GET_SETLTARIFINFO = 'setlTarifInfo/GET_SETLTARIFINFO';
const WRITE_SETLTARIFINFO = 'setlTarifInfo/WRITE_SETLTARIFINFO';
const EDIT_SETLTARIFINFO = 'setlTarifInfo/EDIT_SETLTARIFINFO';
const REMOVE_SETLTARIFINFO = 'setlTarifInfo/REMOVE_SETLTARIFINFO';

// Event action creators
export const initialize = createAction(INITIALIZE);
export const initializeSetlTarifInfo = createAction(INITIALIZE_SETLTARIFINFO);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const changeSetlTarifInfoEditInput = createAction(CHANGE_SETLTARIFINFO_EDIT_INPUT);
export const checkedRow = createAction(CHECKED_ROW);
export const checkedHistYn = createAction(CHECKED_INCLUDEHISTYN);

// API action creators
export const getSetlTarifInfoList = createAction(GET_SETLTARIFINFO_LIST, api.getSetlTarifInfoList, meta => meta);
export const getSetlTarifInfo = createAction(GET_SETLTARIFINFO, api.getSetlTarifInfo);
export const writeSetlTarifInfo = createAction(WRITE_SETLTARIFINFO, api.writeSetlTarifInfo);
export const editSetlTarifInfo = createAction(EDIT_SETLTARIFINFO, api.editSetlTarifInfo);
export const removeSetlTarifInfo = createAction(REMOVE_SETLTARIFINFO, api.removeSetlTarifInfo);

// initial state
const initialState = fromJS({
  tarifs: [],
  codes: [],
  comCodes: [],
  lastPage: 1,
  tarif: {
    setlItemCd: '',
    newSetlItemCd:'',
    stepNo: '',
    efctFnsDt: '',
    efctStDt: '',
    calcTypeCd: '',
    tarifVal: '',    
  },  
  search: {
    setlItemNm: '',
    includeHistYn: '',
  },
  checkedRow: null,  
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [INITIALIZE_SETLTARIFINFO]: (state, action) => {
      return state.set('tarif', initialState.get('tarif'));
    },
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [CHANGE_SETLTARIFINFO_EDIT_INPUT]: (state, action) => {
      const { name, value} = action.payload;
      return state.setIn(['tarif', name], value);      
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
      type: WRITE_SETLTARIFINFO,
      onSuccess: (state, action) => {
        console.log(action.payload);
        const { _id } = action.payload.data;
        return state.set('setlItemCd', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: GET_SETLTARIFINFO_LIST,
      onSuccess: (state, action) => {                 
        // const { data: codes } = action.payload.codeList;
        const { tarifList: tarifs } = action.payload.data;
        const { codeList: codes } = action.payload.data;
        const { comCodeList: comCodes } = action.payload.data;
        console.log(">>>>> ", action.payload.data.tarifList);
        const lastPage = action.payload.headers['last-page'];
        return state
          .set('tarifs', fromJS(tarifs))
          .set('codes', fromJS(codes))
          .set('comCodes',fromJS(comCodes))
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
      type: GET_SETLTARIFINFO,
      onSuccess: (state, action) => {
        const { setlItemCd, setlItemNm, stepNo, efctFnsDt, efctStDt, calcTypeCd, cdDtlNm, tarifVal } = action.payload.data;
        return state
          .setIn(['tarif', 'setlItemCd'], setlItemCd)
          .setIn(['tarif', 'setlItemNm'], setlItemNm)
          .setIn(['tarif', 'stepNo'], stepNo)
          .setIn(['tarif', 'efctStDt'], efctStDt)
          .setIn(['tarif', 'efctFnsDt'], efctFnsDt)
          .setIn(['tarif', 'calcTypeCd'], calcTypeCd)
          .setIn(['tarif', 'cdDtlNm'], cdDtlNm)
          .setIn(['tarif', 'tarifVal'], tarifVal)
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: EDIT_SETLTARIFINFO,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('setlItemCd', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: REMOVE_SETLTARIFINFO,
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
