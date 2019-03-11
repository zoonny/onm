import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import SetlDstrbItem from './SetlDstrbItem';

const columns = ['선택','정산대상 년월', '단계번호', '채널유형', '정산조직ID', '정산조직명', '정산항목명', '배분율(%)', '배분여부', '배분금액', '배분부가세', '조정금액', '조정부가세', '배분금액(최종)', '배분부가세(최종)', '배분합계(최종)'];

const SetlDstrbList = ({ dstrbs, onItemClick, onItemEdit, onItemDelete, onItemChecked, checkedRow,onWrite }) => {  

  return (
    <div className="animated fadeIn">
      <Table responsive hover >
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
          {(dstrbs.length === 0)&& (
            <tr>
            <td className="noData" colSpan={columns.length}>조회된 결과가 없습니다.</td>
            </tr>
          )}          
          {(dstrbs.length !== 0) && dstrbs.map((dstrb, index) => (
            <SetlDstrbItem
              key={index}
              index={index}
              dstrb={dstrb}
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
        <Button id={checkedRow} color="dark" outline size="sm" onClick={onItemEdit}>
          정산조정금액 등록
        </Button>
        <Button id={checkedRow} color="dark" outline size="sm" onClick={onItemDelete}>
          정산조정금액 취소
        </Button>
        </li> 
      </ul>
    </div>
  );
};

export default SetlDstrbList;
