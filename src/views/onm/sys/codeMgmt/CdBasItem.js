import React from 'react';
import { Label } from 'reactstrap';

const CdBasItem = ({ index, code, onItemDoubleClick, onItemChecked }) => {
    // don't pass key
    const { _id, cdDtlId, cdGroupId, upCdDtlId, cdDtlNm, cdDtlSbst, useYn, indcOdrg, cretDt } = code;
  
    return (
      <tr key={cdDtlId}>
        <td className="check">
          <input 
            id={"code," + cdGroupId + "/" + cdDtlId} 
            type="radio" 
            name="checkRadio" 
            onClick={onItemChecked} 
          /><Label htmlFor={"code," + cdGroupId + "/" + cdDtlId}></Label>
        </td>
        <td 
          id={"code," + cdGroupId + "/" + cdDtlId} 
          className="codeClick" 
          onDoubleClick={onItemDoubleClick}
        >{cdDtlId}</td>      
        <td>{upCdDtlId}</td>
        <td>{cdDtlNm}</td>
        <td>{cdDtlSbst}</td>
        <td>{useYn}</td>
        <td>{indcOdrg}</td>      
        <td>{cretDt}</td>
      </tr>
    );
  };

  export default CdBasItem;
