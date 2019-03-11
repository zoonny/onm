import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/setlBase/setlBaseApi';

// action types
const INITIALIZE = 'setlItemInfo/INITIALIZE';
const INITIALIZE_SETLITEMINFO = 'setlItemInfo/INITIALIZE_SETLITEMINFO';
const CHANGE_SEARCH_INPUT = 'setlItemInfo/CHANGE_SEARCH_INPUT';
const CHANGE_SETLITEMINFO_EDIT_INPUT = 'setlItemInfo/CHANGE_SETLITEMINFO_EDIT_INPUT';
const CHECKED_SETLITEM = 'setlItemInfo/CHECKED_SETLITEM';
const CHECKED_INCLUDEHISTYN = 'setlTarifInfo/CHECKED_INCLUDEHISTYN';

// API action types
const WRITE_SETLITEMINFO = 'setlItemInfo/WRITE_SETLITEMINFO';
const GET_SETLITEMINFO_LIST = 'setlItemInfo/GET_SETLITEMINFO_LIST';
const GET_SETLITEMINFO = 'setlItemInfo/GET_SETLITEMINFO';
const EDIT_SETLITEMINFO = 'setlItemInfo/EDIT_SETLITEMINFO';
const REMOVE_SETLITEMINFO = 'setlItemInfo/REMOVE_SETLITEMINFO';

// action creators
export const initialize = createAction(INITIALIZE);
export const initializeSetlItemInfo = createAction(INITIALIZE_SETLITEMINFO);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const changeSetlItemInfoEditInput = createAction(CHANGE_SETLITEMINFO_EDIT_INPUT);
export const checkedRow = createAction(CHECKED_SETLITEM);
export const checkedHistYn = createAction(CHECKED_INCLUDEHISTYN);

// API action creators
export const writeSetlItemInfo = createAction(WRITE_SETLITEMINFO, api.writeSetlItemInfo);
export const getSetlItemInfoList = createAction(
  GET_SETLITEMINFO_LIST,
  api.getSetlItemInfoList,
  meta => meta,
);
export const getSetlItemInfo = createAction(GET_SETLITEMINFO, api.getSetlItemInfo);
export const editSetlItemInfo = createAction(EDIT_SETLITEMINFO, api.editSetlItemInfo);
export const removeSetlItemInfo = createAction(REMOVE_SETLITEMINFO, api.removeSetlItemInfo);

// initial state
const initialState = fromJS({
  posts: [],
  comCodes: [],
  lastPage: 1,
  post: {
    setlItemCd: '',
    efctFnsDt: '',
    efctStDt: '',
    setlItemNm: '',
    setlTypeCd: '',
    setlSperd: '',
    vatYn: '',
    dtlCretYn: '',
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
    [INITIALIZE_SETLITEMINFO]: (state, action) => {
      return state.set('post', initialState.get('post'));
    },
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [CHANGE_SETLITEMINFO_EDIT_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['post', name], value);
    },
    [CHECKED_SETLITEM]: (state, action) => {
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
      type: WRITE_SETLITEMINFO,
      onSuccess: (state, action) => {
        console.log(action.payload);
        const { _id } = action.payload.data;
        return state.set('setlItemCd', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: GET_SETLITEMINFO_LIST,
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
      type: GET_SETLITEMINFO,
      onSuccess: (state, action) => {
        const { setlItemCd, efctFnsDt, efctStDt, setlItemNm, setlTypeCd, setlSperd, vatYn, dtlCretYn } = action.payload.data;
        return state
          .setIn(['post', 'setlItemCd'], setlItemCd)
          .setIn(['post', 'setlItemNm'], setlItemNm)
          .setIn(['post', 'efctStDt'], efctStDt)
          .setIn(['post', 'efctFnsDt'], efctFnsDt)
          .setIn(['post', 'setlTypeCd'], setlTypeCd)
          .setIn(['post', 'setlSperd'], setlSperd)
          .setIn(['post', 'vatYn'], vatYn)
          .setIn(['post', 'dtlCretYn'], dtlCretYn)
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: EDIT_SETLITEMINFO,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('setlItemCd', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: REMOVE_SETLITEMINFO,
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
