import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Label } from 'reactstrap';
import moment from 'moment';

const MedicalInstnIfSysInfoItem = ({ medicalInstn, onItemClick, onItemChecked}) => {
  // don't pass key
  const { rowNum, ptnrId, ptnrNm, sysIpAdr, sysPort, cretDt} = medicalInstn;
  
  return (
    <tr key={ptnrId}>
      <td className="check"><input id={ptnrId} type="radio" name="checkRadio" onClick={onItemChecked}/><Label for={ptnrId}></Label></td>      
      <td>{ptnrId}</td>      
      <td id={ptnrId} onClick={onItemClick} className="codeClick">{ptnrNm}</td>     
      <td>{sysIpAdr}</td>
      <td>{sysPort}</td>
      <td>{cretDt}</td>
    </tr>
  );
};

export default MedicalInstnIfSysInfoItem;