import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import moment from 'moment';

const SetlDstrbItem = ({ index, dstrb, onItemClick, onItemEdit, onItemDelete, onItemChecked }) => {
  // don't pass key
  const { setlTgtYm, stepNo, cdDtlNm, ptnrId, ptnrNm, setlItemNm, setlItemCd, dstrbRate, dstrbYn, dstrbAmt, dstrbVat, adjAmt, adjVat, totalAmt, totalVat, total, icomPtnrId } = dstrb;

  return (
    <tr key={ptnrId +'/'+ setlTgtYm +'/'+ setlItemCd + '/' + stepNo + '/' + icomPtnrId}>
      <td className="check"><input id={ptnrId +'/'+ setlTgtYm +'/'+ setlItemCd + '/' + stepNo + '/' + icomPtnrId} type="radio" name="checkRadio" onClick={onItemChecked} /><label htmlFor={ptnrId +'/'+ setlTgtYm +'/'+ setlItemCd + '/' + stepNo + '/' + icomPtnrId}></label></td>
      <td>{setlTgtYm}</td>
      <td>{stepNo}</td>
      <td>{cdDtlNm}</td>
      <td>{ptnrId}</td>
      <td>{ptnrNm}</td>
      <td>{setlItemNm}</td>
      <td>{dstrbRate}</td>      
      <td>{dstrbYn}</td>
      <td>{dstrbAmt}</td>
      <td>{dstrbVat}</td>
      <td>{adjAmt}</td>
      <td>{adjVat}</td>
      <td>{totalAmt}</td>
      <td>{totalVat}</td>
      <td>{total}</td>
    </tr>
  );
};

export default SetlDstrbItem;
