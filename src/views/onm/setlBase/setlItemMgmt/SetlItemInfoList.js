import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import SetlItemInfoItem from './SetlItemInfoItem';

const columns = ['선택', '정산항목코드', '정산항목명', '유효시작일시', '유효종료일시', '정산유형코드', '정산유형명', '부가세여부', '상세생성여부'];

const SetlItemInfoList = ({ posts, onItemClick, onItemEdit, onItemDelete, onItemChecked, checkedRow, onWrite }) => {

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
        {(posts.length === 0) && (
            <tr>
              <td className="noData" colSpan={columns.length} >조회된 결과가 없습니다.</td>  
            </tr>
          )}
          {(posts.length !== 0) && posts.map((post, index) => (
            <SetlItemInfoItem
              key={index}
              index={index}
              post={post}
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
          정산항목 등록
        </Button>
        <Button id={checkedRow} color="dark" outline size="sm" onClick={onItemEdit} >
          정산항목 수정
        </Button>
        <Button id={checkedRow} color="dark" outline size="sm" onClick={onItemDelete}>
          정산항목 삭제
        </Button>
        </li>
      </ul>
    </div>
  );
};

export default SetlItemInfoList;
