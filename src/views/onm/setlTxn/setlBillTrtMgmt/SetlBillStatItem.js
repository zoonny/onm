import React from 'react';

const SetlBillStatItem = ({ billStat }) => {
  // don't pass key
  const { setlTgtYm, stepNo, ptnrId, ptnrNm, setlItemCd, setlItemNm, setlAmt, setlVat, adjAmt, adjVat, totalAmt, totalVat, total } = billStat;

  return (
    <tr>
      <td>{setlTgtYm}</td>
      <td>{stepNo}</td>
      <td>{ptnrId}</td>
      <td>{ptnrNm}</td>
      <td>{setlAmt}</td>      
      <td>{adjAmt}</td>
      <td>{totalAmt}</td>
    </tr>
  );
};

export default SetlBillStatItem;
