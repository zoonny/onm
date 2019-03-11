import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import CdBasItem from './CdBasItem';

const columns = ['선택', '코드상세ID', '상위코드상세ID', '코드상세명', '코드상세내용', '사용여부', '표시순서', '등록일자'];


const CdBasList = ({ codes, cdGroupId, onItemDoubleClick, onBasCdClick, onItemWrite, checkedCode, onItemChecked, onItemDelete }) => {
  
  return (
    <div className="Inh_codeTable float-right">
      <div className="Inh_tableHeight">
        <Table hover>
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
            {(codes.length === 0) && (
              <tr>
                <td className="noData" colSpan={columns.length} >조회된 결과가 없습니다.</td>
              </tr>
            )}
            {(codes.length !== 0) && codes.map((code, index) => (   
              <CdBasItem
                key={index}
                index={index}
                code={code}
                onItemDoubleClick={onItemDoubleClick}
                onItemChecked={onItemChecked}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <div className="Inh_btnList">
        <div className="float-right">
          <Button id={"code"} color="dark" outline size="sm" onClick={onItemWrite}>
            상세코드 등록
          </Button>
          <Button id={checkedCode} color="dark" outline size="sm" onClick={onBasCdClick}>
            상세코드 수정
          </Button>
          <Button id={checkedCode} name="cd" color="dark" outline size="sm" onClick={onItemDelete}>
            상세코드 삭제
          </Button>
        </div> 
      </div>
    </div>
  );
};

export default CdBasList;
