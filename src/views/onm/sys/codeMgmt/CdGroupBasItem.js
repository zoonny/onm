import React from 'react';
import { Label } from 'reactstrap';

const CdGroupBasItem = ({ index, gCode, onItemClick, onItemChecked, onItemDoubleClick }) => {
  // don't pass key
  const { _id, cdGroupId, upCdGroupId, cdGroupNm, cdGroupSbst, useYn, cretDt } = gCode;

  return (
    <tr key={cdGroupId}>
      <td className="check">
        <input 
          id={"gCode,"+cdGroupId} 
          type="radio" 
          name="checkRadio" 
          onClick={onItemChecked} 
        /><Label htmlFor={"gCode,"+cdGroupId}></Label>
      </td>
      <td 
        id={"gCode,"+cdGroupId} 
        className="codeClick" 
        onClick={onItemClick} 
        onDoubleClick={onItemDoubleClick}
      >{cdGroupId}</td>      
      <td>{upCdGroupId}</td>
      <td>{cdGroupNm}</td>
      <td>{cdGroupSbst}</td>
      <td>{useYn}</td>      
      <td>{cretDt}</td>
    </tr>
  );
};

export default CdGroupBasItem;
