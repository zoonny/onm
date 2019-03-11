import { createAction, handleActions } from 'redux-actions';

import { fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'apis/sys/sysApi';

// event action types
const INITIALIZE = 'userInfo/INITIALIZE';
const INITIALIZE_USERINFO = 'userInfo/INITIALIZE_USERINFO';
const CHANGE_SEARCH_INPUT = 'userInfo/CHANGE_SEARCH_INPUT';
const CHANGE_USERINFO_EDIT_INPUT = 'userInfo/CHANGE_USERINFO_EDIT_INPUT';
const CHECKED_USER = 'userInfo/CHECKED_USER';

// api action types
const WRITE_USERINFO = 'userInfo/WRITE_USERINFO';
const GET_USERINFO_LIST = 'userInfo/GET_USERINFO_LIST';
const GET_USERINFO = 'userInfo/GET_USERINFO';
const EDIT_USERINFO = 'userInfo/EDIT_USERINFO';
const REMOVE_USERINFO = 'userInfo/REMOVE_USERINFO';
const CHECK_USER_DUP = 'userInfo/CHECK_USER_DUP';
const RESET_PASSWORD = 'userInfo/RESET_PASSWORD';

// action creators
export const initialize = createAction(INITIALIZE);
export const initializeUserInfo = createAction(INITIALIZE_USERINFO);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const changeUserInfoEditInput = createAction(CHANGE_USERINFO_EDIT_INPUT);
export const checkedUser = createAction(CHECKED_USER);

// api creators
export const writeUserInfo = createAction(WRITE_USERINFO, api.writeUserInfo);
export const getUserInfoList = createAction(
  GET_USERINFO_LIST,
  api.getUserInfoList,
  meta => meta,
);
export const getUserInfo = createAction(GET_USERINFO, api.getUserInfo);
export const editUserInfo = createAction(EDIT_USERINFO, api.editUserInfo);
export const removeUserInfo = createAction(REMOVE_USERINFO, api.removeUserInfo);
export const checkUserDup = createAction(CHECK_USER_DUP, api.checkUserDup);
export const resetPassword = createAction(RESET_PASSWORD, api.resetPassword);


// initial state
const initialState = fromJS({
  users: [],
  lastPage: 1,
  user: {
    id: '',
    userId: '',
    userNm: '',
    accActvSttusCd: '',
    accActvSttusNm: '',
    efctFnsDt: '',
    newEfctFnsDt:'',
    mphonNo: '',
    pponNo: '',
    email: '',
    cmpnNm: '',
    deptNm: '',
    userIdDupYn: '',    
  },
  search: {
    userId: '',
    userNm: '',
  },
  date: {
    date: new Date(),
  },
  checkedUser: '',
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [INITIALIZE_USERINFO]: (state, action) => {
      return state
        .set('user', initialState.get('user'))
        .set('checkedUser','');
    },
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [CHANGE_USERINFO_EDIT_INPUT]: (state, action) => {
      const { name, value, dupYn, newEfctFnsDt } = action.payload;
      return state
        .setIn(['user', name], value)
        .setIn(['user', 'userIdDupYn'], dupYn);        
    },
    [CHECKED_USER]: (state, action) => {
      const { checkedUser } = action.payload;
      return state.set('checkedUser', checkedUser);
    },
    ...pender({
      type: WRITE_USERINFO,
      onSuccess: (state, action) => {
        console.log(action.payload);
        const { _id } = action.payload.data;
        return state.set('userId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: GET_USERINFO_LIST,
      onSuccess: (state, action) => {
        const { data: users } = action.payload;
        console.log(users);
        const lastPage = action.payload.headers['last-page'];
        return state
          .set('users', fromJS(users))
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
      type: GET_USERINFO,
      onSuccess: (state, action) => {
        const { _id,userId,userNm,pwd,accActvSttusCd,efctFnsDt,mphonNo,pponNo,email,cmpnNm,deptNm} = action.payload.data;
        return state
          .setIn(['user', 'id'], _id)
          .setIn(['user', 'userId'], userId)
          .setIn(['user', 'userNm'], userNm)
          .setIn(['user', 'pwd'], pwd)
          .setIn(['user', 'accActvSttusCd'], accActvSttusCd)
          .setIn(['user', 'efctFnsDt'], efctFnsDt)
          .setIn(['user', 'mphonNo'], mphonNo)
          .setIn(['user', 'pponNo'], pponNo)
          .setIn(['user', 'email'], email)
          .setIn(['user', 'cmpnNm'], cmpnNm)
          .setIn(['user', 'deptNm'], deptNm);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: EDIT_USERINFO,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('userId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: REMOVE_USERINFO,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('userId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: CHECK_USER_DUP,
      onSuccess: (state, action) => {
        const { userId,userIdDupYn} = action.payload.data;
        return state          
          .setIn(['user', 'userId'], userId)
          .setIn(['user', 'userIdDupYn'], userIdDupYn);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: RESET_PASSWORD,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('userId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
  },
  initialState,
);
