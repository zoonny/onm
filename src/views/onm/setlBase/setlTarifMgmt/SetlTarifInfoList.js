import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import SetlTarifInfoItem from './SetlTarifInfoItem';

const columns = ['선택','정산항목코드', '정산항목명', ,'유효시작일시', '유효종료일시', '계산유형코드', '계산유형명', '요율값(부가세제외)'];

const SetlTarifInfoList = ({ tarifs, onItemClick, onItemEdit, onItemDelete, onItemChecked, checkedRow,onWrite }) => {
  // if (tarifs.length === 0) {
  //   let options = 'No data';    
  // }

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
          {(tarifs.length === 0)&& (
            <tr>              
              <td className="noData" colSpan={columns.length} >조회된 결과가 없습니다.</td>
            </tr>
          )}          
          {(tarifs.length !== 0) && tarifs.map((tarif, index) => (
            <SetlTarifInfoItem
              key={index}
              index={index}
              tarif={tarif}
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
          정산요율 등록
        </Button>
        <Button id={checkedRow} color="dark" outline size="sm" onClick={onItemEdit} >
          정산요율 수정
        </Button>
        <Button id={checkedRow} color="dark" outline size="sm" onClick={onItemDelete}>
          정산요율 삭제
        </Button>
        </li> 
      </ul>
    </div>
  );
};

export default SetlTarifInfoList;
