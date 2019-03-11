import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/sys/sysApi';

// action types
const INITIALIZE = 'menuAutInfo/INITIALIZE';
const INITIALIZE_MENUAUTINFO = 'menuAutInfo/INITIALIZE_MENUAUTINFO';
const CHANGE_SEARCH_INPUT = 'menuAutInfo/CHANGE_SEARCH_INPUT';
const CHANGE_MENUAUTINFO_EDIT_INPUT = 'menuAutInfo/CHANGE_MENUAUTINFO_EDIT_INPUT';
const WRITE_MENUAUTINFO = 'menuAutInfo/WRITE_MENUAUTINFO';
const GET_MENUAUTINFO_LIST = 'menuAutInfo/GET_MENUAUTINFO_LIST';
const GET_MENUAUTINFO = 'menuAutInfo/GET_MENUAUTINFO';
const EDIT_MENUAUTINFO = 'menuAutInfo/EDIT_MENUAUTINFO';
const REMOVE_MENUAUTINFO = 'menuAutInfo/REMOVE_MENUAUTINFO';
const GET_MENUAUTTREEINFO = 'menuAutInfo/GET_MENUAUTTREEINFO';
const EDIT_MENUAUTTREEINFO = 'menuAutInfo/EDIT_MENUAUTTREEINFO';

// action creators
export const initialize = createAction(INITIALIZE);
export const initializeMenuAutInfo = createAction(INITIALIZE_MENUAUTINFO);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const changeMenuAutInfoEditInput = createAction(CHANGE_MENUAUTINFO_EDIT_INPUT);
export const writeMenuAutInfo = createAction(WRITE_MENUAUTINFO, api.writeMenuAutInfo);
export const getMenuAutInfoList = createAction(
  GET_MENUAUTINFO_LIST,
  api.getMenuAutInfoList,
  meta => meta,
);
export const getMenuAutInfo = createAction(GET_MENUAUTINFO, api.getMenuAutInfo);
export const editMenuAutInfo = createAction(EDIT_MENUAUTINFO, api.editMenuAutInfo);
export const removeMenuAutInfo = createAction(REMOVE_MENUAUTINFO, api.removeMenuAutInfo);
export const getMenuAutTreeInfo = createAction(GET_MENUAUTTREEINFO, api.getMenuAutTreeInfo);
export const editMenuAutTreeInfo = createAction(EDIT_MENUAUTTREEINFO, api.editMenuAutTreeInfo);

// initial state
const initialState = fromJS({
  menuAutItemList: [],    
  menuAutTreeList: [],
  menuAutItem: {},  
  search: {    
    searchText: '',
  },  
  lastPage: 1,
  totalCount: 0,
  resultCount : 0,
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [INITIALIZE_MENUAUTINFO]: (state, action) => {
      return state.set('menuAutItem', initialState.get('menuAutItem'));
    },
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [CHANGE_MENUAUTINFO_EDIT_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.set(['menuAutItem', name], value);
    },
    ...pender({
      type: WRITE_MENUAUTINFO,
      onSuccess: (state, action) => {
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
    }),
    ...pender({
      type: GET_MENUAUTINFO_LIST,
      onSuccess: (state, action) => {
        const { data: menuAutItemList } = action.payload;        
        const lastPage = action.payload.headers['last-page'];
        const totalCount = action.payload.headers['total-count'];
        return state
          .set('menuAutItemList', fromJS(menuAutItemList))
          .set('lastPage', lastPage)
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
      type: GET_MENUAUTINFO,
      onSuccess: (state, action) => {
        const { data } = action.payload;
        return state
          .setIn(['menuAutItem', 'roleId'], data.roleId)
          .setIn(['menuAutItem', 'roleNm'], data.roleNm)
          .setIn(['menuAutItem', 'menuCount'], data.menuCount)
          .setIn(['menuAutItem', 'amdDt'], data.amdDt)
          .setIn(['menuAutItem', 'cretDt'], data.cretDt);          
      },
    }),
    ...pender({
      type: EDIT_MENUAUTINFO,
      onSuccess: (state, action) => {
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
    }),
    ...pender({
      type: REMOVE_MENUAUTINFO,
      onSuccess: (state, action) => {
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
    }),
    ...pender({
      type: EDIT_MENUAUTTREEINFO,
      onSuccess: (state, action) => {
        const { resultCount } = action.payload.data;
        return state.set('resultCount', resultCount);
      },
    }),    
    ...pender({
      type: GET_MENUAUTTREEINFO,
      onSuccess: (state, action) => {
        const { data: menuAutTreeList } = action.payload;                
        return state.set('menuAutTreeList', fromJS(menuAutTreeList));
      },
    }),    
  },
  initialState,
);
