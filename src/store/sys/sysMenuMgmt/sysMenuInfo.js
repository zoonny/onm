import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/sys/sysApi';

// action types
const INITIALIZE = 'sysMenuInfo/INITIALIZE';
const INITIALIZE_SYSMENUINFO = 'sysMenuInfo/INITIALIZE_SYSMENUINFO';
const CHANGE_SEARCH_INPUT = 'sysMenuInfo/CHANGE_SEARCH_INPUT';
const CHANGE_SYSMENUINFO_EDIT_INPUT = 'sysMenuInfo/CHANGE_SYSMENUINFO_EDIT_INPUT';
const CHECKED_ROW = 'sysMenuInfo/CHECKED_ROW';

// API action types
const WRITE_SYSMENUINFO = 'sysMenuInfo/WRITE_SYSMENUINFO';
const GET_SYSMENUINFO_LIST = 'sysMenuInfo/GET_SYSMENUINFO_LIST';
const GET_SYSMENUINFO = 'sysMenuInfo/GET_SYSMENUINFO';
const EDIT_SYSMENUINFO = 'sysMenuInfo/EDIT_SYSMENUINFO';
const REMOVE_SYSMENUINFO = 'sysMenuInfo/REMOVE_SYSMENUINFO';

// action creators
export const initialize = createAction(INITIALIZE);
export const initializeSysMenuInfo = createAction(INITIALIZE_SYSMENUINFO);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const changeSysMenuInfoEditInput = createAction(CHANGE_SYSMENUINFO_EDIT_INPUT);
export const checkedRow = createAction(CHECKED_ROW);

// API action creators
export const writeSysMenuInfo = createAction(WRITE_SYSMENUINFO, api.writeSysMenuInfo);
export const getSysMenuInfoList = createAction(
  GET_SYSMENUINFO_LIST,
  api.getSysMenuInfoList,
  meta => meta,
);
export const getSysMenuInfo = createAction(GET_SYSMENUINFO, api.getSysMenuInfo);
export const editSysMenuInfo = createAction(EDIT_SYSMENUINFO, api.editSysMenuInfo);
export const removeSysMenuInfo = createAction(REMOVE_SYSMENUINFO, api.removeSysMenuInfo);

// initial state
const initialState = fromJS({
  posts: [],
  comCodes: [],
  lastPage: 1,
  post: {
    riId: '',
    riNm: '',
    riDesc: '',
    riTypeCd: '',
    riPtrn: '',
    indcOdrg: '',
    menuYn: '',
    retvHstStoreYn: '',
    upRiId: '',
  },
  search: {
    riNm: '',
  },
  checkedRow: null,
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [INITIALIZE_SYSMENUINFO]: (state, action) => {
      return state.set('post', initialState.get('post'));
    },
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [CHANGE_SYSMENUINFO_EDIT_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['post', name], value);
    },
    [CHECKED_ROW]: (state, action) => {
      const { checkedRow } = action.payload;
      return state.set('checkedRow', checkedRow);
    },
    ...pender({
      type: WRITE_SYSMENUINFO,
      onSuccess: (state, action) => {
        console.log(action.payload);
        const { _id } = action.payload.data;
        return state.set('riId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: GET_SYSMENUINFO_LIST,
      onSuccess: (state, action) => {
        const { resultList: posts } = action.payload.data;
        const { comCodeList: comCodes } = action.payload.data;
        console.log(posts);
        const lastPage = action.payload.headers['last-page'];
        return state
          .set('posts', fromJS(posts))
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
      type: GET_SYSMENUINFO,
      onSuccess: (state, action) => {
        const { riId, riNm, riDesc, riTypeCd, riPtrn, indcOdrg, menuYn, retvHstStoreYn, upRiId, upRiNm, riTypeNm } = action.payload.data;
        return state
          .setIn(['post', 'riId'], riId)
          .setIn(['post', 'riNm'], riNm)
          .setIn(['post', 'riDesc'], riDesc)
          .setIn(['post', 'riTypeCd'], riTypeCd)
          .setIn(['post', 'riPtrn'], riPtrn)
          .setIn(['post', 'riDesc'], riDesc)
          .setIn(['post', 'indcOdrg'], indcOdrg)
          .setIn(['post', 'menuYn'], menuYn)
          .setIn(['post', 'retvHstStoreYn'], retvHstStoreYn)
          .setIn(['post', 'upRiId'], upRiId)
          .setIn(['post', 'upRiNm'], upRiNm)
          .setIn(['post', 'riTypeNm'], riTypeNm);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: EDIT_SYSMENUINFO,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('riId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: REMOVE_SYSMENUINFO,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('riId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
  },
  initialState,
);
