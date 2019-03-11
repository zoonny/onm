import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import MedicalInstnIfSysInfoItem from './MedicalInstnIfSysInfoItem';
import { tokensToFunction } from 'path-to-regexp';

const columns = ['선택','파트너아이디', '파트너명', '연동시스템 IP', '연동시스템 PORT','등록일자'];

const MedicalInstnIfSysInfoList = ({ medicalInstnList, checkedMedicalInstn, onItemClick, onItemEdit, onItemDelete, onItemChecked,  onWrite }) => {
  
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
          {(medicalInstnList.length === 0) && (
            <tr>
              <td className="noData" colSpan={columns.length}>조회된 결과가 없습니다.</td>
            </tr>
          )}
          {medicalInstnList.map((medicalInstn, index) => (
            <MedicalInstnIfSysInfoItem
              key={index}
              index={index}
              medicalInstn={medicalInstn}
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
        의료중개기관 연동정보 등록
        </Button>
        <Button id={checkedMedicalInstn} color="dark" outline size="sm" onClick={onItemEdit} >
        의료중개기관 연동정보 수정
        </Button>
        <Button id={checkedMedicalInstn} color="dark" outline size="sm" onClick={onItemDelete}>
        의료중개기관 연동정보 삭제
        </Button>
        </li> 
      </ul>
    </div>
  );
};

export default MedicalInstnIfSysInfoList;
