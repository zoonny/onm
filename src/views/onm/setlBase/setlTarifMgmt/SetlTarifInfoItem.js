import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import moment from 'moment';

const SetlItemInfoItem = ({ index, tarif, onItemClick, onItemEdit, onItemDelete, onItemChecked }) => {
  // don't pass key
  const { setlItemCd, setlItemNm, efctFnsDt, efctStDt, calcTypeCd, cdDtlNm, tarifVal } = tarif;

  return (
    <tr key={setlItemCd}>
      <td className="check"><input id={setlItemCd +'/'+ calcTypeCd +'/'+ efctFnsDt} type="radio" name="checkRadio" onClick={onItemChecked} /><label htmlFor={setlItemCd +'/'+ calcTypeCd +'/'+ efctFnsDt}></label></td>      
      <td id={setlItemCd +'/'+ calcTypeCd +'/'+ efctFnsDt} onClick={onItemClick} className="codeClick">{setlItemCd}</td>
      <td>{setlItemNm}</td>      
      <td>{efctStDt}</td>
      <td>{efctFnsDt}</td>
      <td>{calcTypeCd}</td>
      <td>{cdDtlNm}</td>      
      <td>{tarifVal}</td>
    </tr>
  );
};

export default SetlItemInfoItem;
