import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import SetlBillTrtItem from './SetlBillTrtItem';

const columns = ['선택', '정산대상 년월', '단계번호', '정산조직ID', '정산조직명', '정산항목명', '정산금액', '정산부가세', '조정금액', '조정부가세', '정산금액(최종)', '정산부가세(최종)', '정산합계(최종)', '마감여부'];

const SetlBillTrtList = ({ billTrts, onItemEdit, onItemDelete, checkedRow, onItemChecked }) => {  

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
          {(billTrts.length === 0)&& (
            <tr>
              <td className="noData" colSpan={columns.length} >조회된 결과가 없습니다.</td>
            </tr>
          )}          
          {(billTrts.length !== 0) && billTrts.map((billTrt, index) => (
            <SetlBillTrtItem
              key={index}
              index={index}
              billTrt={billTrt}
              onItemEdit={onItemEdit}
              onItemDelete={onItemDelete}
              onItemChecked={onItemChecked}
            />
          ))}
        </tbody>
      </Table>
      <ul className="Inh_btnList">
        <li className="float-right">        
        <Button id={checkedRow} color="dark" outline size="sm" onClick={onItemEdit} >
          정산월마감 등록
        </Button>
        <Button id={checkedRow} color="dark" outline size="sm" onClick={onItemDelete}>
          정산월마감 취소
        </Button>
        </li> 
      </ul>
    </div>
  );
};

export default SetlBillTrtList;
