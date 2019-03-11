import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import UserInfoItem from './UserInfoItem';
import { tokensToFunction } from 'path-to-regexp';

const columns = ['선택','사용자아이디', '사용자명', '계정상태', '유효종료일', '이동전화번호', '일반전화번호','이메일','회사명','부서명','등록일자'];

const UserInfoList = ({ users, user,onItemClick, onItemEdit, onItemDelete,onItemChecked,checkedUser,onWrite,onResetPwd }) => {
  
  return (
    <div className="animated fadeIn">
      <Table responsive hover>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(users.length === 0) && (
            <tr>
              <td className="noData" colSpan={columns.length} >조회된 결과가 없습니다.</td>
            </tr>
          )}
          {users.map((user, index) => (
            <UserInfoItem
              key={index}
              index={index}
              user={user}
              onItemClick={onItemClick}
              onItemEdit={onItemEdit}
              onItemDelete={onItemDelete}
              onItemChecked={onItemChecked}              
            />
          ))}
        </tbody>
      </Table>      
      <ul className="Inh_btnList">        
        <li>
        <Button id={checkedUser} color="dark" outline size="sm" onClick={onResetPwd}>
          비밀번호 초기화
        </Button>
        </li>
        <li className="float-right">        
        <Button color="dark" outline size="sm" onClick={onWrite}>
          사용자 등록
        </Button>
        <Button id={checkedUser} color="dark" outline size="sm" onClick={onItemEdit} >
          사용자 수정
        </Button>
        <Button id={checkedUser} color="dark" outline size="sm" onClick={onItemDelete}>
          사용자 삭제
        </Button>
        </li> 
      </ul>
    </div>
  );
};

export default UserInfoList;
