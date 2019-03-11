import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import moment from 'moment';

const MenuAutInfoItem = ({ menuAutItem, onItemEdit, onTreeItemClick}) => {
  // don't pass key
  const { rowNum, roleId, roleNm, menuCount, cretDt} = menuAutItem;

  return (
    <tr key={roleId}>      
      <td>{roleId}</td>      
      <td id={roleId} onClick={onItemEdit} className="codeClick">{roleNm}</td>
      <td>{menuCount}</td>      
      <td>        
        <i className="icon-settings icon_settings" treeid={roleId} onClick={onTreeItemClick}/>
      </td>
      <td>{cretDt}</td>
    </tr>
  );
};

export default MenuAutInfoItem;