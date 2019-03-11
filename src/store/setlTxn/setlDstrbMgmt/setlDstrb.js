import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'apis/setlTxn/setlTxnApi';
import  {saveAs} from 'file-saver';
import Moment from 'moment';
import { Constants } from '../../../libs/Constants';

// Event action types
const INITIALIZE = 'setlDstrb/INITIALIZE';
const INITIALIZE_SETLDSTRB = 'setlDstrb/INITIALIZE_SETLDSTRB';
const CHANGE_SEARCH_INPUT = 'setlDstrb/CHANGE_SEARCH_INPUT';
const CHANGE_SETLDSTRB_EDIT_INPUT = 'setlDstrb/CHANGE_SETLDSTRB_EDIT_INPUT';
const CHECKED_ROW = 'setlDstrb/CHECKED_ROW';
const CHECKED_INCLUDEHISTYN = 'setlDstrb/CHECKED_INCLUDEHISTYN';

// API action types
const GET_SETLDSTRB_LIST = 'setlDstrb/GET_SETLDSTRB_LIST';
const GET_SETLDSTRB = 'setlDstrb/GET_SETLDSTRB';
const WRITE_SETLDSTRB = 'setlDstrb/WRITE_SETLDSTRB';
const EDIT_SETLDSTRB = 'setlDstrb/EDIT_SETLDSTRB';
const REMOVE_SETLDSTRB = 'setlDstrb/REMOVE_SETLDSTRB';
const WRITE_SETLADJHST = 'setlDstrb/WRITE_SETLADJHST';
const EXCEL_DOWN = 'setlDstrb/EXCEL_DOWN';

// Event action creators
export const initialize = createAction(INITIALIZE);
export const initializeSetlDstrb = createAction(INITIALIZE_SETLDSTRB);
export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT);
export const changeSetlDstrbEditInput = createAction(CHANGE_SETLDSTRB_EDIT_INPUT);
export const checkedRow = createAction(CHECKED_ROW);
export const checkedHistYn = createAction(CHECKED_INCLUDEHISTYN);

// API action creators
export const getSetlDstrbList = createAction(GET_SETLDSTRB_LIST, api.getSetlDstrbList, meta => meta);
export const getSetlDstrb = createAction(GET_SETLDSTRB, api.getSetlDstrb);
export const writeSetlDstrb = createAction(WRITE_SETLDSTRB, api.writeSetlDstrb);
//export const editSetlDstrb = createAction(EDIT_SETLDSTRB, api.editSetlDstrb);
export const editSetlDstrb = createAction(EDIT_SETLDSTRB, api.writeSetlItemAdjHst);
//export const removeSetlDstrb = createAction(REMOVE_SETLDSTRB, api.removeSetlDstrb);
export const removeSetlDstrb = createAction(REMOVE_SETLDSTRB, api.removeSetlItemAdjHst);
export const excelDownload = createAction(EXCEL_DOWN, api.excelDownload);

// initial state
const initialState = fromJS({
  dstrbs: [],
  comCodes: [],
  codes: [],  
  lastPage: 1,
  dstrb: {
    ptnrId: '',
    icomPtnrId:'',
    setlTgtYm: '',
    setlItemCd: '',
    setlItemNm: '',
    stepNo: '',
    dstrbAmt: '',
    dstrbVat: '',
    adjAmt: '',
    adjVat: '',
    chCd: '',
    cdDtlNm: '',
    ptnrNm: '',
    dstrbRate: '',
    dstrbYn: '',
    totalAmt: '',
    totalVat: '',
    total: '',
    adjWhyCd: '',
    adjDtlSbst: '',
  },  
  search: {
    startDt:  '',
    endDt: '',
    icomPtnrId: '',
    ptnrId: '',    
  },
  checkedRow: null,  
});

// reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [INITIALIZE_SETLDSTRB]: (state, action) => {
      return state.set('dstrb', initialState.get('dstrb'));
    },
    [CHANGE_SEARCH_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['search', name], value);
    },
    [CHANGE_SETLDSTRB_EDIT_INPUT]: (state, action) => {
      const { name, value} = action.payload;
      return state.setIn(['dstrb', name], value);      
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
      type: WRITE_SETLDSTRB,
      onSuccess: (state, action) => {
        console.log(action.payload);
        const { _id } = action.payload.data;
        return state.set('setlItemCd', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: WRITE_SETLADJHST,
      onSuccess: (state, action) => {
        console.log(action.payload);
        const { _id } = action.payload.data;
        return state.set('setlItemCd', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: GET_SETLDSTRB_LIST,
      onSuccess: (state, action) => {                 
        // const { data: codes } = action.payload.codeList;
        const { dstrbList: dstrbs } = action.payload.data;
        const { comCodeList: comCodes } = action.payload.data;
        // const { codeList: codes } = action.payload.data;        
        console.log(">>>>> ", action.payload.data.dstrbList);
        const lastPage = action.payload.headers['last-page'];
        return state
          .set('dstrbs', fromJS(dstrbs))
          // .set('codes', fromJS(codes))
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
      type: GET_SETLDSTRB,
      onSuccess: (state, action) => {
        const { ptnrId, icomPtnrId, setlTgtYm, stepNo, setlItemCd, setlItemNm, dstrbAmt, dstrbVat, adjAmt, adjVat, ptnrNm } = action.payload.data;
        return state
          .setIn(['dstrb', 'ptnrId'], ptnrId)
          .setIn(['dstrb', 'icomPtnrId'], icomPtnrId)
          .setIn(['dstrb', 'setlTgtYm'], setlTgtYm)
          .setIn(['dstrb', 'stepNo'], stepNo)
          .setIn(['dstrb', 'setlItemCd'], setlItemCd)
          .setIn(['dstrb', 'setlItemNm'], setlItemNm)
          .setIn(['dstrb', 'dstrbAmt'], dstrbAmt)
          .setIn(['dstrb', 'dstrbVat'], dstrbVat)
          .setIn(['dstrb', 'adjAmt'], adjAmt)
          .setIn(['dstrb', 'adjVat'], adjVat)
          .setIn(['dstrb', 'ptnrNm'], ptnrNm)
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: EDIT_SETLDSTRB,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('ptnrId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: REMOVE_SETLDSTRB,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set('ptnrId', _id);
      },
      // onPending: (state, action) => state,
      // onError: (state, action) => state,
    }),
    ...pender({
      type: EXCEL_DOWN,
        onSuccess: (state, action) => {
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
          var FileSaver = require('file-saver');
          const { data:excel } = action.payload;          
          const blob = new Blob([excel],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});         
          let date = new Date();
          let strDate = Moment(date).format('YYYYMMDD_HHmmss');
          let fileName = Constants.EXCEL.SETLDSTRB_NAME + strDate + Constants.EXCEL.TYPE;
          FileSaver.saveAs(blob, fileName);
          return state;          
       },
       //onPending: (state, action) => state,
       //onError: (state, action) => state,
    }),
  },
  initialState,
);