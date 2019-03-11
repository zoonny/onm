import axios from 'axios';
import queryString from 'query-string';

const apiUrl = process.env.REACT_APP_API_URL;

export const getMedicalInstnInfoList = ({ searchText, page }) =>  axios.post(`${apiUrl}/api/instn/retrieveMedicalInstnInfoList`,{ searchText, page });
export const getMedicalInstnInfo = ({ ptnrId }) =>  axios.post(`${apiUrl}/api/instn/retrieveMedicalInstnInfo`,{ ptnrId });
export const writeMedicalInstnInfo = ({ ptnrId, ptnrNm, chCd, ptnrDivCd, bizrNo, telNo, email, bankCd, bnkacnNo, dposrNm, tkcgr, tkcgDept, adr }) =>  axios.post(`${apiUrl}/api/instn/registMedicalInstnInfo`, { ptnrId, ptnrNm, chCd, ptnrDivCd, bizrNo, telNo, email, bankCd, bnkacnNo, dposrNm, tkcgr, tkcgDept, adr });
export const editMedicalInstnInfo = ({ ptnrId, ptnrNm, chCd, ptnrDivCd, bizrNo, telNo, email, bankCd, bnkacnNo, dposrNm, tkcgr, tkcgDept, adr }) =>  axios.post(`${apiUrl}/api/instn/changeMedicalInstnInfo`, { ptnrId, ptnrNm, chCd, ptnrDivCd, bizrNo, telNo, email, bankCd, bnkacnNo, dposrNm, tkcgr, tkcgDept, adr });
export const removeMedicalInstnInfo = ({ ptnrId }) =>  axios.post(`${apiUrl}/api/instn/deleteMedicalInstnInfo`,{ ptnrId });

export const getIcomInfoList = ({ searchText, page }) =>  axios.post(`${apiUrl}/api/instn/retrieveIcomInfoList`,{ searchText, page });
export const getIcomInfo = ({ ptnrId }) =>  axios.post(`${apiUrl}/api/instn/retrieveIcomInfo`,{ ptnrId });
export const writeIcomInfo = ({ ptnrId, ptnrNm, ptnrDivCd, bizrNo, telNo, email, bankCd, bnkacnNo, dposrNm, tkcgr, tkcgDept, adr }) =>  axios.post(`${apiUrl}/api/instn/registIcomInfo`, { ptnrId, ptnrNm, ptnrDivCd, bizrNo, telNo, email, bankCd, bnkacnNo, dposrNm, tkcgr, tkcgDept, adr });
export const editIcomInfo = ({ ptnrId, ptnrNm, ptnrDivCd, bizrNo, telNo, email, bankCd, bnkacnNo, dposrNm, tkcgr, tkcgDept, adr }) =>  axios.post(`${apiUrl}/api/instn/changeIcomInfo`, { ptnrId, ptnrNm, ptnrDivCd, bizrNo, telNo, email, bankCd, bnkacnNo, dposrNm, tkcgr, tkcgDept, adr });
export const removeIcomInfo = ({ ptnrId }) =>  axios.post(`${apiUrl}/api/instn/deleteIcomInfo`,{ ptnrId });

export const getMedicalInstnIfSysInfoList = ({ searchText, page }) =>  axios.post(`${apiUrl}/api/instn/retrieveMedicalInstnIfSysInfoList`,{ searchText, page });
export const getMedicalInstnIfSysInfo = ({ ptnrId }) =>  axios.post(`${apiUrl}/api/instn/retrieveMedicalInstnIfSysInfo`,{ ptnrId });
export const writeMedicalInstnIfSysInfo = ({ ptnrId, sysIpAdr, sysPort }) =>  axios.post(`${apiUrl}/api/instn/registMedicalInstnIfSysInfo`, { ptnrId, sysIpAdr, sysPort });
export const editMedicalInstnIfSysInfo = ({ ptnrId, sysIpAdr, sysPort }) =>  axios.post(`${apiUrl}/api/instn/changeMedicalInstnIfSysInfo`, { ptnrId, sysIpAdr, sysPort });
export const removeMedicalInstnIfSysInfo = ({ ptnrId }) =>  axios.post(`${apiUrl}/api/instn/deleteMedicalInstnIfSysInfo`,{ ptnrId });

export const getIcomInfoSysInfoList = ({ searchText, page }) =>  axios.post(`${apiUrl}/api/instn/retrieveIcomInfoSysInfoList`,{ searchText, page });
export const getIcomInfoSysInfo = ({ ptnrId }) =>  axios.post(`${apiUrl}/api/instn/retrieveIcomInfoSysInfo`,{ ptnrId });
export const writeIcomInfoSysInfo = ({ ptnrId, sysIpAdr, sysPort }) =>  axios.post(`${apiUrl}/api/instn/registIcomInfoSysInfo`, { ptnrId, sysIpAdr, sysPort });
export const editIcomInfoSysInfo = ({ ptnrId, sysIpAdr, sysPort }) =>  axios.post(`${apiUrl}/api/instn/changeIcomInfoSysInfo`, { ptnrId, sysIpAdr, sysPort });
export const removeIcomInfoSysInfo = ({ ptnrId }) =>  axios.post(`${apiUrl}/api/instn/deleteIcomInfoSysInfo`,{ ptnrId });
