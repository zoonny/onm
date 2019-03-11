import axios from 'axios';
import queryString from 'query-string';

const apiUrl = process.env.REACT_APP_API_URL;

export const getSetlItemInfoList = ({setlItemNm, includeHistYn, page}) =>  axios.post(`${apiUrl}/api/setlBase/retrieveSetlItemInfoList`,{setlItemNm, includeHistYn, page});
export const getSetlItemInfo = ({id}) => axios.post(`${apiUrl}/api/setlBase/retrieveSetlItemInfo`,{id});
export const writeSetlItemInfo = ({ setlItemCd, efctFnsDt, efctStDt, setlItemNm, setlTypeCd, setlSperd, vatYn, dtlCretYn }) =>
    axios.post(`${apiUrl}/api/setlBase/registSetlItemInfo`, { setlItemCd, efctFnsDt, efctStDt, setlItemNm, setlTypeCd, setlSperd, vatYn, dtlCretYn });
export const editSetlItemInfo = ({ setlItemCd, efctFnsDt, efctStDt, setlItemNm, setlTypeCd, setlSperd, vatYn, dtlCretYn }) =>
    axios.post(`${apiUrl}/api/setlBase/changeSetlItemInfo`, { setlItemCd, efctFnsDt, efctStDt, setlItemNm, setlTypeCd, setlSperd, vatYn, dtlCretYn });
export const removeSetlItemInfo = ({id}) => axios.post(`${apiUrl}/api/setlBase/deleteSetlItemInfo`,{id});

export const getSetlTarifInfoList = ({setlItemNm,includeHistYn, page}) =>  axios.post(`${apiUrl}/api/setlBase/retrieveSetlTarifInfoList`,{setlItemNm,includeHistYn, page});
export const getSetlTarifInfo = ({id}) => axios.post(`${apiUrl}/api/setlBase/retrieveSetlTarifInfo/`,{id});
export const writeSetlTarifInfo = ({ newSetlItemCd, setlItemCd, stepNo, efctFnsDt, efctStDt, calcTypeCd, tarifVal }) =>
    axios.post(`${apiUrl}/api/setlBase/registSetlTarifInfo`, { newSetlItemCd, setlItemCd, stepNo, efctFnsDt, efctStDt, calcTypeCd, tarifVal });
export const editSetlTarifInfo = ({ id, setlItemCd, stepNo, efctFnsDt, calcTypeCd, tarifVal }) =>
    axios.post(`${apiUrl}/api/setlBase/changeSetlTarifInfo`, { id, setlItemCd, stepNo, efctFnsDt, calcTypeCd, tarifVal });
export const removeSetlTarifInfo = ({id}) => axios.post(`${apiUrl}/api/setlBase/deleteSetlTarifInfo`,{id});

export const getSetlTgtInfoList = ({ setlItemCd, ptnrId, includeHistYn, page }) =>  axios.post(`${apiUrl}/api/setlBase/retrieveSetlTgtInfoList`,{ setlItemCd, ptnrId, includeHistYn, page });
export const getSetlTgtInfo = ({id}) => axios.post(`${apiUrl}/api/setlBase/retrieveSetlTgtInfo`,{id});
export const writeSetlTgtInfo = ({ setlItemCd, ptnrId, efctStDt, efctFnsDt, dstrbRate, dstrbYn }) => 
    axios.post(`${apiUrl}/api/setlBase/registSetlTgtInfo`, { setlItemCd, ptnrId, efctStDt, efctFnsDt, dstrbRate, dstrbYn });
export const editSetlTgtInfo = ({ id, setlItemCd, ptnrId, efctStDt, efctFnsDt, dstrbRate, dstrbYn }) => 
    axios.post(`${apiUrl}/api/setlBase/changeSetlTgtInfo`, { id, setlItemCd, ptnrId, efctStDt, efctFnsDt, dstrbRate, dstrbYn });
export const removeSetlTgtInfo = ({id}) => axios.post(`${apiUrl}/api/setlBase/deleteSetlTgtInfo`,{id});