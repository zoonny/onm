import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Label } from 'reactstrap';
import moment from 'moment';

const MedicalInstnInfoItem = ({ medicalInstn, onItemClick, onItemChecked}) => {
  // don't pass key
  const { rowNum, ptnrId, ptnrNm, bizrNo, telNo, email, bankCdNm, bnkacnNo, tkcgr, cretDt} = medicalInstn;

  
  return (
    <tr key={ptnrId}>
      <td className="check"><input id={ptnrId} type="radio" name="checkRadio" onClick={onItemChecked}/><Label for={ptnrId}></Label></td>
      <td>{ptnrId}</td>      
      <td id={ptnrId} onClick={onItemClick} className="codeClick">{ptnrNm}</td>
      <td>{bizrNo}</td>
      <td>{telNo}</td>
      <td>{email}</td>
      <td>{bankCdNm}</td>
      <td>{bnkacnNo}</td>
      <td>{tkcgr}</td>
      <td>{cretDt}</td>
    </tr>
  );
};

export default MedicalInstnInfoItem;