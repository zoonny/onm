import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import SysMenuInfoItem from './SysMenuInfoItem';

const columns = ['선택', '자원아이디', '자원명', '상위자원아이디', '상위자원명', '자원유형', '자원패턴', '표시순서', '메뉴여부', '조회이력저장여부', '자원설명', '등록일시'];

const SysMenuInfoList = ({ posts, onItemClick, onItemEdit, onItemDelete, onItemChecked, checkedRow, onWrite }) => {

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
            <SysMenuInfoItem
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
          자원 등록
        </Button>
        <Button id={checkedRow} color="dark" outline size="sm" onClick={onItemEdit} >
          자원 수정
        </Button>
        <Button id={checkedRow} color="dark" outline size="sm" onClick={onItemDelete}>
          자원 삭제
        </Button>
        </li> 
      </ul>
    </div>
  );
};

export default SysMenuInfoList;
