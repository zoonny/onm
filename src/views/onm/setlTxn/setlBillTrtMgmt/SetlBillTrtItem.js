import React from 'react';
import { Button, Label } from 'reactstrap';

const SetlBillTrtItem = ({ index, billTrt, onItemClick, onItemChecked }) => {
  // don't pass key
  const { _id, setlTgtYm, stepNo, ptnrId, ptnrNm, setlItemCd, setlItemNm, setlAmt, setlVat, adjAmt, adjVat, totalAmt, totalVat, total, cloYn } = billTrt;

  return (
    <tr key={setlTgtYm + setlItemCd + stepNo + ptnrId}>
      <td className="check"><input id={setlTgtYm +'/'+ setlItemCd +'/'+ stepNo +'/'+ ptnrId} type="radio" name="1" onClick={onItemChecked}/><Label htmlFor={setlTgtYm +'/'+ setlItemCd +'/'+ stepNo +'/'+ ptnrId}></Label></td>
      <td id={setlTgtYm +'/'+ setlItemCd +'/'+ stepNo +'/'+ ptnrId}>{setlTgtYm}</td>
      <td>{stepNo}</td>
      <td>{ptnrId}</td>
      <td>{ptnrNm}</td>
      <td>{setlItemNm}</td>
      <td>{setlAmt}</td>      
      <td>{setlVat}</td>
      <td>{adjAmt}</td>
      <td>{adjVat}</td>
      <td>{totalAmt}</td>
      <td>{totalVat}</td>
      <td>{total}</td>
      <td>{cloYn}</td>
    </tr>
  );
};

export default SetlBillTrtItem;
