import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import MedicalInstnInfoItem from './IcomInfoItem';
import { tokensToFunction } from 'path-to-regexp';

const columns = ['선택','파트너아이디', '파트너명', '사업자번호', '전화번호', '이메일', '은행명', '계좌번호', '담당자','등록일자'];

const IcomInfoList = ({ icomList, checkedIcom, onItemClick, onItemEdit, onItemDelete, onItemChecked,  onWrite }) => {
  
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
          {(icomList.length === 0) && (
            <tr>
              <td className="noData" colSpan={columns.length}>조회된 결과가 없습니다.</td>
            </tr>
          )}
          {icomList.map((icom, index) => (
            <MedicalInstnInfoItem
              key={index}
              index={index}
              icom={icom}
              onItemClick={onItemClick}
              onItemEdit={onItemEdit}
              onItemDelete={onItemDelete}
              onItemChecked={onItemChecked}              
            />
          ))}
        </tbody>
      </Table>      
      <ul className="Inh_btnList">              
        <li className="float-right">        
        <Button color="dark" outline size="sm" onClick={onWrite}>
          보험사 등록
        </Button>
        <Button id={checkedIcom} color="dark" outline size="sm" onClick={onItemEdit} >
          보험사 수정
        </Button>
        <Button id={checkedIcom} color="dark" outline size="sm" onClick={onItemDelete}>
          보험사 삭제
        </Button>
        </li> 
      </ul>
    </div>
  );
};

export default IcomInfoList;
