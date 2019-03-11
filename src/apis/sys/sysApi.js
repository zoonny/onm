import axios from 'axios';
import queryString from 'query-string';

const apiUrl = process.env.REACT_APP_API_URL;

export const getUserInfoList = ({ userId,userNm,page }) =>  axios.post(`${apiUrl}/api/sys/retrieveUserInfoList`,{ userId,userNm,page});
export const getUserInfo = ({id}) => axios.post(`${apiUrl}/api/sys/retrieveUserInfo/`,{id});
export const writeUserInfo = ({ userId,userNm,accActvSttusCd,efctFnsDt,mphonNo,pponNo,email,cmpnNm,deptNm,efctStDt,pwd }) =>  
    axios.post(`${apiUrl}/api/sys/registUserInfo`, {  userId,userNm,accActvSttusCd,efctFnsDt,mphonNo,pponNo,email,cmpnNm,deptNm,efctStDt,pwd });
export const editUserInfo = ({ id,userId,userNm,accActvSttusCd,efctFnsDt, newEfctFnsDt, mphonNo,pponNo,email,cmpnNm,deptNm,efctStDt,pwd }) =>  
    axios.post(`${apiUrl}/api/sys/changeUserInfo`, { id,userId,userNm,accActvSttusCd,efctFnsDt,newEfctFnsDt, mphonNo,pponNo,email,cmpnNm,deptNm,efctStDt,pwd });
export const removeUserInfo = ({id}) => axios.post(`${apiUrl}/api/sys/deleteUserInfo/`,{id});
export const checkUserDup = ({userId}) => axios.post(`${apiUrl}/api/sys/checkUserDup/`,{userId});
export const resetPassword = ({id}) => axios.post(`${apiUrl}/api/sys/resetPassword/`,{id});

export const getSysMenuInfoList = ({riNm, page}) =>  axios.post(`${apiUrl}/api/sys/retrieveSysMenuInfoList`,{riNm, page});
export const getSysMenuInfo = ({riId}) => axios.post(`${apiUrl}/api/sys/retrieveSysMenuInfo`,{riId});
export const writeSysMenuInfo = ({ riId,riNm,riDesc,riTypeCd,riPtrn,indcOdrg,menuYn,retvHstStoreYn,upRiId }) =>
    axios.post(`${apiUrl}/api/sys/registSysMenuInfo`, { riId,riNm,riDesc,riTypeCd,riPtrn,indcOdrg,menuYn,retvHstStoreYn,upRiId });
export const editSysMenuInfo = ({ id,riId,riNm,riDesc,riTypeCd,riPtrn,indcOdrg,menuYn,retvHstStoreYn,upRiId }) =>
    axios.post(`${apiUrl}/api/sys/changeSysMenuInfo`, { id,riId,riNm,riDesc,riTypeCd,riPtrn,indcOdrg,menuYn,retvHstStoreYn,upRiId });
export const removeSysMenuInfo = ({riId}) => axios.post(`${apiUrl}/api/sys/deleteSysMenuInfo`,{riId});

export const getCdGroupBasList = ({ cdGroupId, cdGroupNm, page }) =>  axios.post(`${apiUrl}/api/sys/retrieveCdGroupBasList`,{ cdGroupId, cdGroupNm, page });
export const getCdGroupBas = ({id}) => axios.post(`${apiUrl}/api/sys/retrieveCdGroupBas`,{id});
export const writeCdGroupBas = ({ cdGroupId,upCdGroupId,cdGroupNm,cdGroupSbst,cdLen,useYn }) => 
    axios.post(`${apiUrl}/api/sys/registCdGroupBas`, { cdGroupId,upCdGroupId,cdGroupNm,cdGroupSbst,cdLen,useYn });
export const editCdGroupBas = ({ id,cdGroupId,upCdGroupId,cdGroupNm,cdGroupSbst,cdLen,useYn }) => 
    axios.post(`${apiUrl}/api/sys/changeCdGroupBas`, { id,cdGroupId,upCdGroupId,cdGroupNm,cdGroupSbst,cdLen,useYn });
export const removeCdGroupBas = ({cdGroupId}) => axios.post(`${apiUrl}/api/sys/deleteCdGroupBas`,{cdGroupId});
export const checkGcodeDup = ({id}) => axios.post(`${apiUrl}/api/sys/checkGcodeDup/`,{id});

export const getCdBasList = ({id}) =>  axios.post(`${apiUrl}/api/sys/retrieveCdBasList`,{id});
export const getCdBas = ({id}) => axios.post(`${apiUrl}/api/sys/retrieveCdBas`,{id});
export const writeCdBas = ({ cdGroupId,cdDtlId,upCdDtlId,cdDtlNm,cdDtlSbst,useYn,indcOdrg }) => 
    axios.post(`${apiUrl}/api/sys/registCdBas`, { cdGroupId,cdDtlId,upCdDtlId,cdDtlNm,cdDtlSbst,useYn,indcOdrg });
export const editCdBas = ({ cdGroupId,cdDtlId,upCdDtlId,cdDtlNm,cdDtlSbst,useYn,indcOdrg }) => 
    axios.post(`${apiUrl}/api/sys/changeCdBas`, { cdGroupId,cdDtlId,upCdDtlId,cdDtlNm,cdDtlSbst,useYn,indcOdrg });
export const removeCdBas = ({id}) => axios.post(`${apiUrl}/api/sys/deleteCdBas`,{id});
export const checkCodeDup = ({id}) => axios.post(`${apiUrl}/api/sys/checkCodeDup/`,{id});

export const getMenuAutInfoList = ({ searchText, page }) =>  axios.post(`${apiUrl}/api/sys/retrieveMenuAutInfoList`,{ searchText, page });
export const getMenuAutInfo = ({ roleId }) =>  axios.post(`${apiUrl}/api/sys/retrieveMenuAutInfo`,{ roleId });
export const writeMenuAutInfo = ({ roleId, roleNm }) =>  axios.post(`${apiUrl}/api/sys/registMenuAutInfo`, { roleId, roleNm });
export const editMenuAutInfo = ({ roleId, roleNm }) =>  axios.post(`${apiUrl}/api/sys/changeMenuAutInfo`, { roleId, roleNm });
export const removeMenuAutInfo = ({ roleId }) =>  axios.post(`${apiUrl}/api/sys/deleteMenuAutInfo`,{ roleId });
export const getMenuAutTreeInfo = ({ roleId }) => axios.post(`${apiUrl}/api/sys/retrieveMenuAutTreeInfo`,{ roleId });
//export const getMenuAutTreeInfo = () => axios.get(`/api/menu/treeSample.json`);
export const editMenuAutTreeInfo = (roleId, menuArr = {}) => axios.post(`${apiUrl}/api/sys/changeMenuAutTreeInfo`, { roleId, menuArr });
