import axios from 'axios';
import queryString from 'query-string';

const apiUrl = process.env.REACT_APP_API_URL;

export const getSetlItemAdjHst = ({id}) => axios.post(`${apiUrl}/api/setlTxn/retrieveSetlItemAdjHst`,{id});
export const writeSetlItemAdjHst = ({ setlTgtYm, setlItemCd, stepNo, adjWhyCd, adjDtlSbst, adjAmt, adjVat, ptnrId, icomPtnrId }) =>
    axios.post(`${apiUrl}/api/setlTxn/registSetlItemAdjHst`, { setlTgtYm, setlItemCd, stepNo, adjWhyCd, adjDtlSbst, adjAmt, adjVat, ptnrId, icomPtnrId });
export const removeSetlItemAdjHst = ({id}) => axios.post(`${apiUrl}/api/setlTxn/deleteSetlItemAdjHst`,{id});

export const getSetlDstrbList = ({startDt,endDt, ptnrId, icomPtnrId, page}) =>  
    axios.post(`${apiUrl}/api/setlTxn/retrieveSetlDstrbTxnList`,{startDt, endDt, ptnrId, icomPtnrId, page});
export const getSetlDstrb = ({id}) => axios.post(`${apiUrl}/api/setlTxn/retrieveSetlDstrbTxn/`,{id});
export const writeSetlDstrb = ({ newSetlItemCd, setlItemCd, stepNo, efctFnsDt, efctStDt, calcTypeCd, tarifVal }) =>
    axios.post(`${apiUrl}/api/setlTxn/registSetlDstrbTxn`, { newSetlItemCd, setlItemCd, stepNo, efctFnsDt, efctStDt, calcTypeCd, tarifVal });
export const editSetlDstrb = ({ id, setlItemCd, stepNo, efctFnsDt, calcTypeCd, tarifVal }) =>
    axios.post(`${apiUrl}/api/setlBase/changeSetlDstrb`, { id, setlItemCd, stepNo, efctFnsDt, calcTypeCd, tarifVal });
export const removeSetlDstrb = ({id}) => axios.post(`${apiUrl}/api/setlBase/deleteSetlDstrb`,{id});
export const getSetlDstrbStat = ({startDt,endDt, ptnrId, icomPtnrId, page}) =>  
axios.post(`${apiUrl}/api/setlTxn/retrieveSetlDstrbTxnStat`,{startDt, endDt, ptnrId, icomPtnrId, page});

export const excelDownload = ({startDt,endDt}) =>  
axios.post(`${apiUrl}/api/setlTxn/excelDownload`,{startDt,endDt},{responseType: 'blob'});

export const getSetlBillTrtList = ({startDt,endDt, ptnrId, page}) =>  
    axios.post(`${apiUrl}/api/setlTxn/retrieveSetlBillTrtList`,{startDt, endDt, ptnrId, page});
export const getSetlBillStatList = ({startDt,endDt, ptnrId, page}) =>  
    axios.post(`${apiUrl}/api/setlTxn/retrieveSetlBillStatList`,{startDt, endDt, ptnrId, page});
export const getSetlBillTrt = ({id}) => axios.post(`${apiUrl}/api/setlTxn/retrieveSetlBillTrt/`,{id});
export const writeSetlItemCloYn = ({setlTgtYm}) => axios.post(`${apiUrl}/api/setlTxn/registSetlItemCloYn`,{setlTgtYm});
export const removeSetlItemCloYn = ({id}) => axios.post(`${apiUrl}/api/setlTxn/deleteSetlItemCloYn`,{id});
