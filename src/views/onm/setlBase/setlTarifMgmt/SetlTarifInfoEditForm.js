import React from 'react';
import { Col, FormGroup, Label, Input as Select } from 'reactstrap';
import { Input } from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';
import { className } from 'postcss-selector-parser';
import { Constants } from 'libs/Constants';

const SetlItemInfoEditForm = ({ edit, tarif, onChange, codes, comCodes}) => { 
  
  let requireTag = '';
  let today = new Date()
      ,yyyy = today.getFullYear()
      ,mm = today.getMonth()+1
      ,dd = today.getDate();
  
  if(mm < 10){
    mm = '0'+mm
  }
  if(dd < 10){
    dd = '0'+dd
  }
  today = yyyy + '-' + mm + '-' + dd;

  if(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.EDIT){
    requireTag = <span className="warning"> *</span>
  }

  return (
    <>
      <FormGroup row className="Inh_alignRow">        
        <Col md="3">
          <Label>정산항목명</Label>{requireTag}
        </Col>
        <Col xs="12" md="9" className="col_80">
        {(edit.mode === Constants.EDIT_MODE.WRITE) && (
            <>
            <Select
              type="select"
              id="setlItemCd"
              name="setlItemCd"          
              value = {tarif.setlItemCd}
              onChange={onChange}
              validations={[v.required]}
            >
            <option value="">선택</option>
              {                 
                codes.map(function (item) {
                  return <option value={item.setlItemCd}>{item.setlItemNm}</option>
                })
              }
            </Select>
            </>
          )}
          {(edit.mode === Constants.EDIT_MODE.EDIT || edit.mode === Constants.EDIT_MODE.READ) &&(
            <>
              <Input
                type="text"
                id="setlItemNm"
                name="setlItemNm"          
                value = {tarif.setlItemNm} 
                readOnly={true}                
              />                           
            </>
          )}          
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">        
        <Col md="3">
          <Label>정산항목코드</Label>
        </Col>
        <Col xs="12" md="9" className="col_80">
        {(edit.mode === Constants.EDIT_MODE.WRITE) && (
            <>
            <Input
                type="text"                          
                value = {tarif.setlItemCd}
                readOnly={true}                
              />
            </>
          )}
          {(edit.mode === Constants.EDIT_MODE.EDIT || edit.mode === Constants.EDIT_MODE.READ) &&(
            <>
              <Input
                type="text"
                id="setlItemCd"
                name="setlItemCd"          
                value = {tarif.setlItemCd} 
                readOnly={true}                
              />                           
            </>
          )}          
        </Col>
      </FormGroup>      
      <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>유효시작일시</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE) &&(
          <Input
            type="date"
            id="efctStDt"
            name="efctStDt"            
            value={today}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        )}
        {(edit.mode === Constants.EDIT_MODE.READ || edit.mode === Constants.EDIT_MODE.EDIT) &&(
          <Input
            type="text"
            id="efctStDt"
            name="efctStDt"
            value={tarif.efctStDt}
            onChange={onChange}            
            readOnly={true}
          />
        )}
        </Col>
        <Col md="3">
          <Label>유효종료일시</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE) &&(
          <Input
            type="date"
            id="efctFnsDt"
            name="efctFnsDt"            
            data-parse="uppercase"
            value="9999-12-31"
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        )}
        {(edit.mode === Constants.EDIT_MODE.EDIT || edit.mode === Constants.EDIT_MODE.READ) &&(
          <Input
            type="text"
            id="efctFnsDt"
            name="efctFnsDt"
            placeholder="유효종료일시를 입력하세요."
            data-parse="uppercase"
            value={tarif.efctFnsDt}
            onChange={onChange}            
            readOnly={true}
          />
        )}
        </Col>
        </FormGroup>
        <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>계산유형</Label>{requireTag}
        </Col>
        <Col xs="12" md="9"  className="col_80">
        {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.EDIT) && (
            <>
            <Select
              type="select"
              id="calcTypeCd"
              name="calcTypeCd"          
              value = {tarif.calcTypeCd}
              onChange={onChange}
              validations={[v.required]}
            >
             { 
                comCodes.map(function (code) {
                  return <option value={code.cdDtlId}>{code.cdDtlNm}</option>
                })
              }
            </Select>
            </>
          )}          
          {(edit.mode === Constants.EDIT_MODE.READ) &&(
            <>
              <Input
                type="text"
                id="calcTypeCd"
                name="calcTypeCd"          
                value = {tarif.calcTypeCd} 
                {...edit.opts}                          
              />             
            </>
          )}          
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>요율값</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            pattern="[0-9]*"
            id="tarifVal"
            name="tarifVal"
            placeholder="요율값을 입력하세요."
            data-parse="uppercase"
            value={tarif.tarifVal}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}            
          />
        </Col>
        </FormGroup>        
    </>
  );
};

export default SetlItemInfoEditForm;
