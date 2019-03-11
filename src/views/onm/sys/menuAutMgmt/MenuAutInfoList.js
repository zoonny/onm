import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import MenuAutInfoItem from './MenuAutInfoItem';

const columns = ['권한아이디', '권한명', '메뉴등록개수', '메뉴관리', '등록일자'];

const MenuAutInfoList = ({ menuAutItemList, onTreeItemClick, onItemEdit, onWrite  }) => {
  
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
          {(menuAutItemList.length === 0) && (
            <tr>
              <td className="noData" colSpan={columns.length} >조회된 결과가 없습니다.</td>
            </tr>
          )}         
          {menuAutItemList.map((menuAutItem, index) => (
            <MenuAutInfoItem
              key={index}
              index={index}
              menuAutItem={menuAutItem}              
              onItemEdit={onItemEdit}     
              onTreeItemClick={onTreeItemClick}      
            />
          ))}
        </tbody>
      </Table> 
      <ul className="Inh_btnList">                
        <li className="float-right">        
        <Button color="dark" outline size="sm" onClick={onWrite}>
          권한등록
        </Button>
        </li> 
      </ul>          
    </div>
  );
};

export default MenuAutInfoList;
