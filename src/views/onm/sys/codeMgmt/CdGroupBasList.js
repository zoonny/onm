import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import CdGroupBasItem from './CdGroupBasItem';

const columns = ['선택', '코드그룹ID', '상위코드그룹ID', '코드그룹명', '코드그룹내용', '사용여부', '등록일자'];


const CdGroupBasList = ({ gCodes, onItemClick, onItemDoubleClick, onItemWrite, onGroupCdClick, checkedCode, onItemChecked, onItemDelete }) => {

  return (
    <div className="Inh_codeTable">
      <div className="Inh_tableHeightNS">
        <Table hover >
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
            {(gCodes.length === 0) && (
              <tr>
                <td className="noData" colSpan={columns.length} >조회된 결과가 없습니다.</td>
              </tr>
            )}
            {(gCodes.length !== 0) && gCodes.map((gCode, index) => (   
              <CdGroupBasItem
                key={index}
                index={index}
                gCode={gCode}
                onItemClick={onItemClick}
                onItemDoubleClick={onItemDoubleClick}
                onItemChecked={onItemChecked}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <div className="Inh_btnList">
        <div className="float-left">
           <Button id="gCode" color="dark" outline size="sm" onClick={onItemWrite}> 
          그룹코드 등록
          </Button>
          <Button id={checkedCode} color="dark" outline size="sm" onClick={onGroupCdClick}>
          그룹코드 수정
          </Button>
           <Button id={checkedCode} name="group" color="dark" outline size="sm" onClick={onItemDelete}> 
          그룹코드 삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CdGroupBasList;
