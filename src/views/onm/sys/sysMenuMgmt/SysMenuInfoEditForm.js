import React from 'react';
import { Col, FormGroup, Label, Input as Select } from 'reactstrap';
import { Input } from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';
import { className } from 'postcss-selector-parser';
import { Constants } from '../../../../libs/Constants';

const SysMenuInfoEditForm = ({ edit, post, onChange, comCodes }) => {
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
          <Label>자원아이디</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE) && (
        <>
            <Input
              type="text"
              id="riId"
              name="riId"
              placeholder="자원아이디를 입력하세요."
              data-parse="uppercase"
              maxlength={20}
              value={post.riId}
              onChange={onChange}
              validations={[v.required]}
              {...edit.opts}
          />
        </>
        )}
        {(edit.mode === Constants.EDIT_MODE.EDIT) && (
        <>
          <Input
              type="text"
              id="riId"
              name="riId"
              placeholder="자원아이디를 입력하세요."
              data-parse="uppercase"
              maxlength={20}
              value={post.riId}
              onChange={onChange}
              validations={[v.required]}
              {...edit.opts}
            readOnly
          />
        </>
        )}
        </Col>
        <Col md="3">
          <Label>자원명</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="riNm"
            name="riNm"
            placeholder="자원명을 입력하세요."
            maxlength={50}
            value={post.riNm}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>자원설명</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="riDesc"
            name="riDesc"
            placeholder="자원설명을 입력하세요."
            maxlength={100}
            value={post.riDesc}
            onChange={onChange}
            {...edit.opts}
          />
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>자원패턴</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="riPtrn"
            name="riPtrn"
            placeholder="자원패턴을 입력하세요."
            maxlength={200}
            value={post.riPtrn}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        </Col>
        <Col md="3">
          <Label>자원유형</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
          {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.EDIT) && (
            <>
            <Select
              type="select"
              id="riTypeCd"
              name="riTypeCd"
              value={post.riTypeCd}
              onChange={onChange}
              validations={[v.required]}
              {...edit.opts}
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
              id="riTypeCd"
              name="riTypeCd"          
              value = {post.riTypeCd} 
              {...edit.opts}
            />
            </>
          )}
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>메뉴여부</Label>
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.EDIT) && (
          <Select
            type="select"
            id="menuYn"
            name="menuYn"
            value={post.menuYn}
            onChange={onChange}
          >
          <option value="Y">Y</option>
          <option value="N">N</option>
          </Select>
          )}
        {(edit.mode === Constants.EDIT_MODE.READ) && (
          <Input
            type="text"
            id="menuYn"
            name="menuYn"
            value={post.menuYn}
            onChange={onChange}
            {...edit.opts}
          />
        )}
        </Col>
        <Col md="3">
          <Label>표시순서</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            pattern="[0-9]*"
            id="indcOdrg"
            name="indcOdrg"
            placeholder="표시순서를 입력하세요."
            data-parse="uppercase"
            maxlength={5}
            value={post.indcOdrg}
            onChange={onChange}
            {...edit.opts}
          />
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>상위자원아이디</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="upRiId"
            name="upRiId"
            placeholder="상위자원아이디를 입력하세요."
            data-parse="uppercase"
            maxlength={20}
            value={post.upRiId}
            onChange={onChange}
            {...edit.opts}
          />
        </Col>
        <Col md="3">
          <Label>조회이력저장여부</Label>
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.EDIT) && (
          <Select
            type="select"
            id="retvHstStoreYn"
            name="retvHstStoreYn"
            value={post.retvHstStoreYn}
            onChange={onChange}
          >
          <option value="Y">Y</option>
          <option value="N">N</option>
          </Select>
          )}
        {(edit.mode === Constants.EDIT_MODE.READ) && (
          <Input
            type="text"
            id="retvHstStoreYn"
            name="retvHstStoreYn"
            value={post.retvHstStoreYn}
            onChange={onChange}
            {...edit.opts}
          />
        )}
        </Col>
      </FormGroup>
    </>
  );
}

export default SysMenuInfoEditForm;