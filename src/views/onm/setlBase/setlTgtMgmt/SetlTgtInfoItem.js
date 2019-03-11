import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Label } from 'reactstrap';
import moment from 'moment';

const SetlTgtInfoItem = ({ index, setlTgt, onItemClick, onItemEdit, onItemDelete, onItemChecked }) => {
  // don't pass key
  const { _id, setlItemCd, setlItemNm, ptnrId, ptnrNm, dstrbRate, dstrbYn, efctFnsDt, efctStDt } = setlTgt;

    return (
    <tr key={setlItemCd + efctFnsDt + efctStDt}>
      <td className="check"><input id={setlItemCd +'/'+ efctFnsDt} type="radio" name="checkRadio" onClick={onItemChecked}/><Label htmlFor={setlItemCd +'/'+ efctFnsDt}></Label></td>
      <td id={setlItemCd +'/'+ efctFnsDt} onClick={onItemClick} className="codeClick">{setlItemCd}</td>
      <td>{setlItemNm}</td>
      <td>{ptnrId}</td>
      <td>{ptnrNm}</td>
      <td>{dstrbRate}</td>
      <td>{dstrbYn}</td>
      <td>{efctStDt}</td>
      <td>{efctFnsDt}</td>
    </tr>
  );
};

export default SetlTgtInfoItem;
