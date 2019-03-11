import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import SetlTgtInfoItem from './SetlTgtInfoItem';
import { checkedSetlTgt } from '../../../../store/setlBase/setlTgtMgmt/setlTgtInfo';

const columns = ['선택', '정산항목코드', '정산항목명', '파트너아이디', '파트너명', '배분율(%)', '배분여부', '유효시작일시', '유효종료일시'];

const SetlTgtInfoList = ({ setlTgts, onItemClick, onItemEdit, onItemDelete, onItemChecked, checkedRow, onWrite }) => {

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
          {(setlTgts.length === 0) && (
            <tr>
              <td className="noData" colSpan={columns.length} >조회된 결과가 없습니다.</td>
            </tr>
          )}
          {(setlTgts.length !== 0) && setlTgts.map((setlTgt, index) => (
            <SetlTgtInfoItem
              key={index}
              index={index}
              setlTgt={setlTgt}
              onItemClick={onItemClick}
              onItemChecked={onItemChecked}
            />
          ))}
        </tbody>
      </Table>
      <ul className="Inh_btnList">
        <li className="float-right">
        <Button color="dark" outline size="sm" onClick={onWrite}>
          정산대상등록
        </Button>
        <Button id={checkedRow} color="dark" outline size="sm" onClick={onItemEdit} >
          정산대상수정
        </Button>
        <Button id={checkedRow} color="dark" outline size="sm" onClick={onItemDelete}>
          정산대상삭제
        </Button>
        </li>
      </ul>
    </div>
  );
};

export default SetlTgtInfoList;
