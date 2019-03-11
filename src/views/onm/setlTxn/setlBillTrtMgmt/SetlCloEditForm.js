import React from 'react';
import { Col, FormGroup, Label, Input as Select } from 'reactstrap';
import { Input } from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';
import { className } from 'postcss-selector-parser';
import { Constants } from 'libs/Constants';

const SetlCloEditForm = ({edit, billTrt, onChange}) => {

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
          value={billTrt.setlTgtYm}
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
            value={billTrt.stepNo}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
            readOnly
          />
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">      
      <Col md="3">
          <Label>마감여부(현재)</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="cloYn"
            name="cloYn"
            placeholder="마감여부를 입력하세요."
            value={billTrt.cloYn}
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

export default SetlCloEditForm;