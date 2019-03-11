import React from 'react';
import { Col, FormGroup, Label, Input as Select } from 'reactstrap';
import { Input } from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';
import { className } from 'postcss-selector-parser';
import { Constants } from '../../../../libs/Constants';

const SetlItemInfoEditForm = ({ edit, post, onChange, comCodes }) => {
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
          <Label>정산항목코드</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE) && (
        <>
          <Input
            type="text"
            id="setlItemCd"
            name="setlItemCd"
            placeholder="정산항목코드를 입력하세요."
            data-parse="uppercase"
            maxlength={10}
            value={post.setlItemCd}
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
            id="setlItemCd"
            name="setlItemCd"
            placeholder="정산항목코드를 입력하세요."
            data-parse="uppercase"
            maxlength={10}
            value={post.setlItemCd}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
            readOnly
          />
        </>
        )}
        </Col>
        <Col md="3">
          <Label>정산항목명</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="setlItemNm"
            name="setlItemNm"
            placeholder="정산항목명을 입력하세요."
            maxlength={50}
            value={post.setlItemNm}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>유효시작일시</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE) && (
        <>
          <Input
            type="date"
            id="efctStDt"
            name="efctStDt"
            placeholder="유효시작일시를 입력하세요."
            value={today}
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
            id="efctStDt"
            name="efctStDt"
            placeholder="유효시작일시를 입력하세요."
            value={post.efctStDt}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
            readOnly
            />
            </>
        )}
        </Col>
        <Col md="3">
          <Label>유효종료일시</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE) && (
        <>
          <Input
            type="date"
            id="efctFnsDt"
            name="efctFnsDt"
            placeholder="유효종료일시를 입력하세요."
            data-parse="uppercase"
            value={"9999-12-31"}
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
            id="efctFnsDt"
            name="efctFnsDt"
            placeholder="유효종료일시를 입력하세요."
            data-parse="uppercase"
            value={post.efctFnsDt}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
            readOnly
          />
        </>
        )}
        </Col>
        </FormGroup>
        <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>정산유형코드</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.EDIT) && (
            <>
            <Select
              type="select"
              id="setlTypeCd"
              name="setlTypeCd"
              value={post.setlTypeCd}
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
              id="calcTypeCd"
              name="calcTypeCd"          
              value = {post.setlTypeCd} 
              {...edit.opts}                          
            />             
            </>
          )} 
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
{/*     정산가입기간은 항목제외하기로 함(UI리뷰반영,2/28)
        <Col md="3">
          <Label>정산가입기간</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            pattern="[0-9]*"
            id="setlSperd"
            name="setlSperd"
            placeholder="정산가입기간을 입력하세요."
            data-parse="uppercase"
            maxlength={5}
            value={post.setlSperd}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        </Col> */}
        <Col md="3">
          <Label>부가세여부</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.EDIT) && (
          <Select
            type="select"
            id="vatYn"
            name="vatYn"
            value={post.vatYn}
            onChange={onChange}
          >
          <option value="Y">Y</option>
          <option value="N">N</option>
          </Select>
          )}
        {(edit.mode === Constants.EDIT_MODE.READ) && (
          <Input
            type="text"
            id="vatYn"
            name="vatYn"
            value={post.vatYn}
            onChange={onChange}
            {...edit.opts}
          />
        )}
        </Col>
        <Col md="3">
          <Label>상세생성여부</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.EDIT) && (
          <Select
            type="select"
            id="dtlCretYn"
            name="dtlCretYn"
            value={post.dtlCretYn}
            onChange={onChange}
          >
          <option value="Y">Y</option>
          <option value="N">N</option>
          </Select>
          )}
        {(edit.mode === Constants.EDIT_MODE.READ) && (
          <Input
            type="text"
            id="dtlCretYn"
            name="dtlCretYn"
            value={post.dtlCretYn}
            onChange={onChange}
            {...edit.opts}
          />
        )}
        </Col>
      </FormGroup>
    </>
  )
};

export default SetlItemInfoEditForm;