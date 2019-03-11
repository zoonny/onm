import React from 'react';
import { Col, FormGroup, Label, Input as Select } from 'reactstrap';
import { Input } from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';
import { className } from 'postcss-selector-parser';
import { Constants } from 'libs/Constants';

const SetlDstrbEditForm = ({edit, dstrb, onChange, comCodes}) => {
  let requireTag = '';
  
  if(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.EDIT){
    requireTag = <span className="warning"> *</span>
  }

  return (
    <>
      <FormGroup row className="Inh_alignRow">
      <Col md="3">
        <Label>정산대상년월</Label>
      </Col>
      <Col xs="12" md="9">
        <Input
          type="text"
          id="setlTgtYm"
          name="setlTgtYm"
          placeholder="정산대상년월을 입력하세요."
          value={dstrb.setlTgtYm}
          onChange={onChange}
          validations={[v.required]}
          {...edit.opts}
          readOnly
        />
      </Col>
      <Col md="3">
          <Label>단계번호</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="stepNo"
            name="stepNo"
            placeholder="단계번호를 입력하세요."
            value={dstrb.stepNo}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
            readOnly
          />
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">      
      <Col md="3">
          <Label>정산조직ID</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="ptnrId"
            name="ptnrId"
            placeholder="정산조직ID를 입력하세요."
            value={dstrb.ptnrId}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
            readOnly
          />
        </Col>
      <Col md="3">
          <Label>정산조직명</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="ptnrNm"
            name="ptnrNm"
            placeholder="정산조직명을 입력하세요."
            value={dstrb.ptnrNm}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
            readOnly
          />
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
      <Col md="3">
          <Label>정산항목코드</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="setlItemCd"
            name="setlItemCd"
            placeholder="정산항목코드를 입력하세요."
            value={dstrb.setlItemCd}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
            readOnly
          />
        </Col>
      <Col md="3">
          <Label>정산항목명</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="setlItemNm"
            name="setlItemNm"
            placeholder="정산항목명을 입력하세요."
            value={dstrb.setlItemNm}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
            readOnly
          />
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
      <Col md="3">
          <Label>배분금액</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="dstrbAmt"
            name="dstrbAmt"
            placeholder="배분금액을 입력하세요."
            value={dstrb.dstrbAmt}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
            readOnly
          />
        </Col>
      <Col md="3">
          <Label>배분부가세</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="dstrbVat"
            name="dstrbVat"
            placeholder="배분부가세를 입력하세요."
            value={dstrb.dstrbVat}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
            readOnly
          />
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
      <Col md="3">
          <Label>조정금액</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
          <Input
            type="number"
            id="adjAmt"
            name="adjAmt"
            pattern="[0-9]*"
            placeholder="조정금액을 입력하세요."
            maxlength={9}
            value={dstrb.adjAmt}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        </Col>
      <Col md="3">
          <Label>조정부가세</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
          <Input
            type="number"
            id="adjVat"
            name="adjVat"
            pattern="[0-9]*"
            placeholder="조정부가세를 입력하세요."
            maxlength={9}
            value={dstrb.adjVat}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        </Col>
      </FormGroup>
       <FormGroup row className="Inh_alignRow">
      <Col md="3">
          <Label>조정사유코드</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
        {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.EDIT) && (
            <>
            <Select
              type="select"
              id="adjWhyCd"
              name="adjWhyCd"
              value={dstrb.adjWhyCd}
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
              id="adjWhyCd"
              name="adjWhyCd"
              value = {dstrb.adjWhyCd}
              {...edit.opts}
            />
            </>
          )}
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
      <Col md="3">
          <Label>조정상세내용</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="adjDtlSbst"
            name="adjDtlSbst"
            placeholder="조정상세내용을 입력하세요."
            maxlength={100}
            value={dstrb.adjDtlSbst}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
      <Col md="3">
          <Label>처리자ID</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="userId"
            name="userId"
            placeholder="처리자ID를 입력하세요."
            value={"91220301"}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
            readOnly
          />
        </Col>
      <Col md="3">
          <Label>처리자명</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="userNm"
            name="userNm"
            placeholder="처리자명을 입력하세요."
            value={"김성수"}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
            readOnly
          />
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">      
      <Col md="3">
          <Label>보험사</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="icomPtnrId"
            name="icomPtnrId"
            placeholder="보험사를 입력하세요."
            value={dstrb.icomPtnrId}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
            readOnly
          />
        </Col>
        </FormGroup>
    </>
  )
};

export default SetlDstrbEditForm;