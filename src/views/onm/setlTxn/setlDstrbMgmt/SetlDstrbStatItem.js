import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import moment from 'moment';

const SetlDstrbItem = ({ index, dstrb, onItemClick, onItemEdit, onItemDelete, onItemChecked }) => {
  // don't pass key
  const { setlTgtYm, stepNo, cdDtlNm, ptnrId, ptnrNm, setlItemNm, setlItemCd, dstrbRate, dstrbYn, dstrbAmt, dstrbVat, adjAmt, adjVat, totalAmt, totalVat, total } = dstrb;

  return (
    <tr key={ptnrId +'/'+ setlTgtYm +'/'+ stepNo}>      
      <td>{setlTgtYm}</td>
      <td>{stepNo}</td>
      <td>{cdDtlNm}</td>      
      <td>{ptnrId}</td>
      <td>{ptnrNm}</td>      
      <td>{dstrbAmt}</td>      
      <td>{adjAmt}</td>
      <td>{total}</td>
    </tr>
  );
};

export default SetlDstrbItem;
