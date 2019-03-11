import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import SetlDstrbStatItem from './SetlDstrbStatItem';

const columns = ['정산대상 년월', '단계번호', '채널유형', '정산조직ID', '정산조직명', '배분금액', '조정금액', '배분금액(최종)'];

const SetlDstrbStat = ({ dstrbs }) => {  

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
            <SetlDstrbStatItem
              key={index}
              index={index}
              dstrb={dstrb}             
            />
          ))}
        </tbody>
      </Table>      
    </div>
  );
};

export default SetlDstrbStat;
