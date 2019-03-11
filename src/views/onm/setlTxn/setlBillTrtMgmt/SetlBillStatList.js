import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import SetlBillStatItem from './SetlBillStatItem';

const columns = ['정산대상 년월', '단계번호', '정산조직ID', '정산조직명', '정산금액', '조정금액', '정산금액(최종)'];

const SetlBillStatList = ({ billStats }) => {  

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
          {(billStats.length === 0)&& (
            <tr>
              <td className="noData" colSpan={columns.length} >조회된 결과가 없습니다.</td>
            </tr>
          )}          
          {(billStats.length !== 0) && billStats.map((billStat, index) => (
            <SetlBillStatItem
              key={index}
              index={index}
              billStat={billStat}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SetlBillStatList;
