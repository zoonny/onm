import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Label } from 'reactstrap';
import moment from 'moment';

const SysMenuInfoItem = ({ index, post, onItemClick, onItemEdit, onItemDelete, onItemChecked }) => {
  // don't pass key
  const { riId, cretDt, riNm, riDesc, riPtrn, indcOdrg, menuYn, retvHstStoreYn, upRiId, upRiNm, riTypeNm} = post;

  return (
    <tr key={riId}>
      <td className="check"><input id={riId} type="radio" name="checkRadio" onClick={onItemChecked}/><Label htmlFor={riId}></Label></td>
      <td id={riId}>{riId}</td>
      <td>{riNm}</td>
      <td>{upRiId}</td>
      <td>{upRiNm}</td>
      <td>{riTypeNm}</td>
      <td>{riPtrn}</td>
      <td>{indcOdrg}</td>
      <td>{menuYn}</td>
      <td>{retvHstStoreYn}</td>
      <td>{riDesc}</td>
      <td>{cretDt}</td>
    </tr>
  )
};

export default SysMenuInfoItem;
