import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/sys/sysApi';

// action types
// 그룹코드
const INITIALIZE = 'cdGroupBas/INITIALIZE';
const INITIALIZE_CDGROUPBAS = 'cdGroupBas/INITIALIZE_CDGROUPBAS';
const CHANGE_SEARCH_INPUT = 'cdGroupBas/CHANGE_SEARCH_INPUT';
const CHANGE_CDGROUPBAS_EDIT_INPUT = 'cdGroupBas/CHANGE_CDGROUPBAS_EDIT_INPUT';
const WRITE_CDGROUPBAS = 'cdGroupBas/WRITE_CDGROUPBAS';
const GET_CDGROUPBAS_LIST = 'cdGroupBas/GET_CDGROUPBAS_LIST';
const GET_CDGROUPBAS = 'cdGroupBas/GET_CDGROUPBAS';
const EDIT_CDGROUPBAS = 'cdGroupBas/EDIT_CDGROUPBAS';
const REMOVE_CDGROUPBAS = 'cdGroupBas/REMOVE_CDGROUPBAS';

// 코드기본
const INITIALIZE_CDBAS = 'cdBas/INITIALIZE_CDBAS';
const CHANGE_CDBAS_EDIT_INPUT = 'cdBas/CHANGE_CDBAS_EDIT_INPUT';
const WRITE_CDBAS = 'cdBas/WRITE_CDBAS';
const GET_CDBAS_LIST = 'cdBas/GET_CDBAS_LIST';
const GET_CDBAS = 'cdBas/GET_CDBAS';
const EDIT_CDBAS = 'cdBas/EDIT_CDBAS';
const REMOVE_CDBAS = 'cdBas/REMOVE_CDBAS';

const CHECKED_CODE = 'cdGroupBas/CHECKED_CODE';

const CHECK_GCODE_DUP = 'cdGroupBas/CHECK_GCODE_DUP';
const CHECK_CODE_DUP = 'cdGroupBas/CHECK_CODE_DUP';

// action creators
// 코드그룹
export const initialize = createAction(INITIALIZE);
export const initializeCdGroupBas = createAction(INITIALIZE_CDGROUPBAS);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const changeCdGroupBasEditInput = createAction(CHANGE_CDGROUPBAS_EDIT_INPUT);
export const writeCdGroupBas = createAction(WRITE_CDGROUPBAS, api.writeCdGroupBas);
export const getCdGroupBasList = createAction(
  GET_CDGROUPBAS_LIST,
  api.getCdGroupBasList,
  meta => meta,
);
export const getCdGroupBas = createAction(GET_CDGROUPBAS, api.getCdGroupBas);
export const editCdGroupBas = createAction(EDIT_CDGROUPBAS, api.editCdGroupBas);
export const removeCdGroupBas = createAction(REMOVE_CDGROUPBAS, api.removeCdGroupBas);

// 코드기본
export const initializeCdBas = createAction(INITIALIZE_CDBAS);
export const changeCdBasEditInput = createAction(CHANGE_CDBAS_EDIT_INPUT);
export const writeCdBas = createAction(WRITE_CDBAS, api.writeCdBas);
export const getCdBasList = createAction(
  GET_CDBAS_LIST,
  api.getCdBasList,
  meta => meta,
);
export const getCdBas = createAction(GET_CDBAS, api.getCdBas);
export const editCdBas = createAction(EDIT_CDBAS, api.editCdBas);
export const removeCdBas = createAction(REMOVE_CDBAS, api.removeCdBas);

export const checkedCode = createAction(CHECKED_CODE);
export const checkGcodeDup = createAction(CHECK_GCODE_DUP, api.checkGcodeDup);
export const checkCodeDup = createAction(CHECK_CODE_DUP, api.checkCodeDup);

// initial state
const initialState = fromJS({
  groupCds: [],
  gCodes: [],
  codes: [],
  lastPage: 1,
  gCode: {
    cdGroupId: '', 
    upCdGroupId: '', 
    cdGroupNm: '', 
    cdGroupSbst: '', 
    useYn: '', 
    cretDt: '',
    codeIdDupYn: 'Y',
  },
  code: {
    cdDtlId: '', 
    cdGroupId: '', 
    upCdDtlId: '', 
    cdDtlNm: '', 
    cdDtlSbst: '', 
    useYn: '', 
    indcOdrg: '', 
    cretDt: '',
    codeIdDupYn: 'Y',
  },
  search: {
    cdGroupId: '',
    cdGroupNm: '',
  },
  checkedCode: null,
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [INITIALIZE_CDGROUPBAS]: (state, action) => {
      return state.set('gCode', initialState.get('gCode'));
    },
    [INITIALIZE_CDBAS]: (state, action) => {
      return state.set('code', initialState.get('code'));
    },
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [CHANGE_CDGROUPBAS_EDIT_INPUT]: (state, action) => {
      const { name, value, dupYn, upDupYn } = action.payload;
      return state
        .setIn(['gCode', name], value)
        .setIn(['gCode', 'codeIdDupYn'], dupYn);
    },
    [CHANGE_CDBAS_EDIT_INPUT]: (state, action) => {
      const { name, value, dupYn, upDupYn } = action.payload;
      return state
        .setIn(['code', name], value)
        .setIn(['code', 'codeIdDupYn'], dupYn);
    },
    [CHECKED_CODE]: (state, action) => {
      const { checkedCode } = action.payload;
      return state.set('checkedCode', checkedCode);
    },
    ...pender({
      type: WRITE_CDGROUPBAS,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('cdGroupId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: CHECK_GCODE_DUP,
      onSuccess: (state, action) => {
        const { codeIdDupYn } = action.payload.data;
        return state          
          .setIn(['gCode', 'codeIdDupYn'], codeIdDupYn)
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: WRITE_CDBAS,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('cdDtlId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: CHECK_CODE_DUP,
      onSuccess: (state, action) => {
        const { codeIdDupYn } = action.payload.data;
        return state          
          .setIn(['code', 'codeIdDupYn'], codeIdDupYn)
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: GET_CDGROUPBAS_LIST,
      onSuccess: (state, action) => {
        const { groupCds: groupCds} = action.payload.data;
        const { cdGroupList: gCodes } = action.payload.data;
        console.log(groupCds);
        console.log(gCodes);
        const lastPage = action.payload.headers['last-page'];
        return state
          .set('groupCds', fromJS(groupCds))
          .set('gCodes', fromJS(gCodes))
          .set('lastPage', parseInt(lastPage, 10));
      },
      // onPending: (state, action) => state,
      onError: (state, action) => {
        throw {
          gCode: '404',
          message: action.payload,
        };
      },
    }),
    ...pender({
      type: GET_CDBAS_LIST,
      onSuccess: (state, action) => {
        const { data: codes } = action.payload;
        console.log(codes);
        //const lastPage = action.payload.headers['last-page'];
        return state
          .set('codes', fromJS(codes))
          //.set('cdGroupId', codes[0].cdGroupId)
          //.set('lastPage', parseInt(lastPage, 10));
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
      type: GET_CDGROUPBAS,
      onSuccess: (state, action) => {
        const { _id, cdGroupId, upCdGroupId, cdGroupNm, cdGroupSbst, cdLen, useYn, cretDt } = action.payload.data;
        return state
          .setIn(['gCode', 'id'], _id)
          .setIn(['gCode', 'cdGroupId'], cdGroupId)
          .setIn(['gCode', 'upCdGroupId'], upCdGroupId)
          .setIn(['gCode', 'cdGroupNm'], cdGroupNm)
          .setIn(['gCode', 'cdGroupSbst'], cdGroupSbst)
          .setIn(['gCode', 'cdLen'], cdLen)
          .setIn(['gCode', 'useYn'], useYn)
          .setIn(['gCode', 'cretDt'], cretDt);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: GET_CDBAS,
      onSuccess: (state, action) => {
        const { _id, cdGroupId, cdDtlId, upCdDtlId, cdDtlNm, cdDtlSbst, useYn, indcOdrg, cretDt } = action.payload.data;
        return state
          .setIn(['code', 'id'], _id)
          .setIn(['code', 'cdGroupId'], cdGroupId)
          .setIn(['code', 'cdDtlId'], cdDtlId)
          .setIn(['code', 'upCdDtlId'], upCdDtlId)
          .setIn(['code', 'cdDtlNm'], cdDtlNm)
          .setIn(['code', 'cdDtlSbst'], cdDtlSbst)
          .setIn(['code', 'useYn'], useYn)
          .setIn(['code', 'indcOdrg'], indcOdrg)
          .setIn(['code', 'cretDt'], cretDt);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: EDIT_CDGROUPBAS,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('cdGroupId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: EDIT_CDBAS,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('cdDtlId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: REMOVE_CDGROUPBAS,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('cdGroupId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: REMOVE_CDBAS,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('cdDtlId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
  },
  initialState,
);
