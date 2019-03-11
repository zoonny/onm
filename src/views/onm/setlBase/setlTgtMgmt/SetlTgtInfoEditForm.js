import React from 'react';
import { Col, FormGroup, Label, Input as Select } from 'reactstrap';
import { Input } from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';
import { className } from 'postcss-selector-parser';
import { Constants } from 'libs/Constants';
const SetlTgtInfoEditForm = ({ edit, setlTgt, onChange, setlItems, ptnrs }) => {
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
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE) && (
          <Select
            type="select"
            id="setlItemCd"
            name="setlItemCd"
            value={setlTgt.setlItemCd}
            onChange={onChange}
          >
            <option value="">--선택하세요--</option>
          { 
            setlItems.map(function (item, index) {
              return <option key={index} value={item.setlItemCd}>{item.setlItemNm}</option>
            })
          }
          </Select>
        )}
        {(edit.mode === Constants.EDIT_MODE.EDIT || edit.mode === Constants.EDIT_MODE.READ) && (
          <Input
          type="text"
          id="setlItemNm"
          name="setlItemNm"
          value={setlTgt.setlItemNm}
          onChange={onChange}
          readOnly={true}
          />
        )}
        </Col>
        <Col md="3">
          <Label>정산항목아이디</Label>
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE) && (
          <Input
            type="text"
            value={setlTgt.setlItemCd}
            readOnly={true}
          />
        )}
        {(edit.mode === Constants.EDIT_MODE.EDIT || edit.mode === Constants.EDIT_MODE.READ) &&(
          <Input
          type="text"
          id="setlItemCd"
          name="setlItemCd"
          value={setlTgt.setlItemCd}
          readOnly={true}
        />
        )}
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>파트너명</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE) && (
          <Select
            type="select"
            id="ptnrId"
            name="ptnrId"
            value = {setlTgt.ptnrId}
            onChange={onChange}
          >
            <option value="">--선택하세요--</option>
          { 
            ptnrs.map(function (item, index) {
              return <option key={index} value={item.ptnrId}>{item.ptnrNm}</option>
            })
          }
          </Select>
        )}
        {(edit.mode === Constants.EDIT_MODE.EDIT || edit.mode === Constants.EDIT_MODE.READ) && (
          <Input
            type="text"
            id="ptnrNm"
            name="ptnrNm"
            value={setlTgt.ptnrNm}
            onChange={onChange}
            readOnly={true}
          />
        )}
        </Col>
        <Col md="3">
          <Label>파트너아이디</Label>
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE) && (
          <Input
            type="text"
            value={setlTgt.ptnrId}
            readOnly={true}
          />
        )}
        {(edit.mode === Constants.EDIT_MODE.EDIT || edit.mode === Constants.EDIT_MODE.READ) && (
          <Input
            type="text"
            id="ptnrId"
            name="ptnrId"
            value={setlTgt.ptnrId}
            readOnly={true}
          />
        )}
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>유효시작일시</Label>
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE) && (
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
        {(edit.mode === Constants.EDIT_MODE.EDIT || edit.mode === Constants.EDIT_MODE.READ) && (
          <Input
          type="text"
          id="efctStDt"
          name="efctStDt"
          value={setlTgt.efctStDt}
          onChange={onChange}
          readOnly={true}
        />
        )}
        </Col>
        <Col md="3">
          <Label>유효종료일시</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE) && (
          <Input
            type="date"
            id="efctFnsDt"
            name="efctFnsDt"
            value="9999-12-31"
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        )}
        {(edit.mode === Constants.EDIT_MODE.EDIT || edit.mode === Constants.EDIT_MODE.READ) && (
          <Input
          type="text"
          id="efctFnsDt"
          name="efctFnsDt"
          value={setlTgt.efctFnsDt}
          onChange={onChange}
          readOnly={true}
        />
        )}
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>배분율(%)</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.READ) && (
          <Input
            type="text"
            id="dstrbRate"
            name="dstrbRate"
            placeholder="배분율을 입력하세요."
            value={setlTgt.dstrbRate}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        )}
        {(edit.mode === Constants.EDIT_MODE.EDIT) && (
          <Input
            type="text"
            id="dstrbRate"
            name="dstrbRate"
            placeholder="배분율을 입력하세요."
            value={setlTgt.dstrbRate}
            onChange={onChange}
            validations={[v.required]}
          />
        )}
        </Col>
        <Col md="3">
          <Label>배분여부</Label>
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.EDIT) && (
          <Select
            type="select"
            id="dstrbYn"
            name="dstrbYn"
            value={setlTgt.dstrbYn}
            onChange={onChange}
          >
            <option value="Y">Y</option>
            <option value="N">N</option>
          </Select>
        )}
        {(edit.mode === Constants.EDIT_MODE.READ) && (
          <Input
            type="text"
            id="dstrbYn"
            name="dstrbYn"
            value={setlTgt.dstrbYn}
            readOnly={true}
          />
        )}
        </Col>
      </FormGroup>
    </>
  );
};

export default SetlTgtInfoEditForm;
