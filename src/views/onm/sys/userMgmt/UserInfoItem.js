import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Label } from 'reactstrap';
import moment from 'moment';

const UserInfoItem = ({ index, user, onItemClick, onItemEdit, onItemDelete,onItemChecked}) => {
  // don't pass key
  const { _id, userId, userNm, accActvSttusCd, accActvSttusNm, efctFnsDt, mphonNo, pponNo, email, cmpnNm, deptNm, efctStDt} = user;

  
  return (
    <tr key={userId + efctFnsDt}>
      <td className="check"><input id={userId +'/'+ efctFnsDt} type="radio" name="checkRadio" onClick={onItemChecked}/><Label htmlFor={userId +'/'+ efctFnsDt}></Label></td>
      <td id={userId +'/'+ efctFnsDt} onClick={onItemClick}>{userId}</td>      
      <td>{userNm}</td>
      <td>{accActvSttusNm}</td>
      <td>{efctFnsDt}</td>
      <td>{mphonNo}</td>
      <td>{pponNo}</td>
      <td>{email}</td>
      <td>{cmpnNm}</td>
      <td>{deptNm}</td>
      <td>{efctStDt}</td>      
      {/* <td id={userId + efctFnsDt}>
        <Button id={userId +'/'+ efctFnsDt} color="dark" outline size="sm" onClick={onItemEdit}  className="btn-small">
          수정
        </Button>{' '}
        <Button id={userId +'/'+ efctFnsDt} color="dark" outline size="sm" onClick={onItemDelete}  className="btn-small">
          삭제
        </Button>
      </td> */}
    </tr>
  );
};

export default UserInfoItem;