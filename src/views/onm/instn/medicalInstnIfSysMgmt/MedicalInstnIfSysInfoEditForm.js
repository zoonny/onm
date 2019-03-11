import React from 'react';
import { Col, FormGroup, Label, Input as Select, Button} from 'reactstrap';
import { Input } from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';
import { className } from 'postcss-selector-parser';
import { Constants } from '../../../../libs/Constants';


const MedicalInstnIfSysInfoEditForm = ({ edit, medicalInstn, onChange, ptnrIdList, ptnrIdTag }) => {  
    if(edit.mode === Constants.EDIT_MODE.WRITE){
      if(ptnrIdList.length === 0){
        ptnrIdTag = 
        <Input
        type="text"
        id="ptnrId"
        name="ptnrId"      
        value={''}
        placeholder={'등록 할 파트너 정보가 없습니다.'}
        validations={[v.required]}
        readOnly
      />
      } else {
        ptnrIdTag = 
        <Select
          type="select"
          id="ptnrId"
          name="ptnrId"
          >
          { 
            ptnrIdList.map(function (item) {
              return <option key={item.setlItemCd} value={item.setlItemCd}>{item.setlItemNm}</option>
            })
          }
          />
        </Select>        
      }
    
    } else {
      ptnrIdTag = 
      <Input
      type="text"
      id="ptnrId"
      name="ptnrId"      
      value={medicalInstn.ptnrNm +' ('+ medicalInstn.ptnrId +')'}
      readOnly
    />
    }
    return (    
      <>
        <FormGroup row className="Inh_alignRow">        
        <Col md="3">
          <Label>파트너정보</Label>
        </Col>
        <Col xs="12" md="9"> 
        {ptnrIdTag}
        </Col>
        </FormGroup>

        <FormGroup row className="Inh_alignRow">        
        <Col md="3">
          <Label>연동시스템 IP</Label>
        </Col>
        <Col xs="12" md="9"> 
        <Input
            type="text"            
            id="sysIpAdr"
            name="sysIpAdr"
            maxLength={15}
            placeholder="연동시스템 IP주소를 입력하세요."
            value={medicalInstn.sysIpAdr}
            onChange={onChange}
            validations={[v.required, v.ipv4]}
            {...edit.opts}
          />
        </Col>    
        <Col md="3">
          <Label>연동시스템 Port</Label>
        </Col>
        <Col xs="12" md="9"> 
        <Input
            type="text"            
            id="sysPort"
            name="sysPort"
            maxLength={5}
            placeholder="1 ~ 65535 Port 번호를 입력하세요"
            value={medicalInstn.sysPort}
            onChange={onChange}
            validations={[v.required, v.port]}
            {...edit.opts}
          />
        </Col>
        </FormGroup> 
      </>
  );
};
export default MedicalInstnIfSysInfoEditForm;
