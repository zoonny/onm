import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Label } from 'reactstrap';
import moment from 'moment';

const SetlItemInfoItem = ({ index, post, onItemClick, onItemEdit, onItemDelete, onItemChecked }) => {
  // don't pass key
  const { _id, setlItemCd, efctFnsDt, efctStDt, setlItemNm, setlTypeCd, setlSperd, vatYn, dtlCretYn, setlTypeNm } = post;

  return (
    <tr key={setlItemCd + efctFnsDt + efctStDt}>
      <td className="check"><input id={setlItemCd +'/'+ efctFnsDt +'/'+ efctStDt} type="radio" name="1" onClick={onItemChecked}/><Label htmlFor={setlItemCd +'/'+ efctFnsDt +'/'+ efctStDt}></Label></td>
      <td id={setlItemCd +'/'+ efctFnsDt +'/'+ efctStDt}>{setlItemCd}</td>
      <td>{setlItemNm}</td>
      <td>{efctStDt}</td>
      <td>{efctFnsDt}</td>
      <td>{setlTypeCd}</td>
      <td>{setlTypeNm}</td>
      <td>{vatYn}</td>
      <td>{dtlCretYn}</td>
    </tr>
  );
};

export default SetlItemInfoItem;
