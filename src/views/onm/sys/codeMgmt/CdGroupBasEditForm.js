import React from 'react';
import { Col, FormGroup, Button, Label, Input as Select } from 'reactstrap';
import { Input } from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';
import { GetConstants, Constants } from 'libs/Constants';

const CdGroupBasEditForm = ({ edit, gCode, code, onChange, onDupCodeCheck, groupCds }) => {

  let classNm = "col_85";
  let requireTag = '';

  if(edit.mode === Constants.EDIT_MODE.WRITE){
    classNm += " inButton";
  }
  if(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.EDIT){
    requireTag = <span className="warning"> *</span>
  }

  if(edit.id === "gCode"){
    return (
      <>
        <FormGroup row className="Inh_alignRow">
          <Col md="3" className="md6" >
            <Label>코드그룹아이디</Label>{requireTag}
          </Col>
          <Col md="6" className={classNm}>
            <Input
              type="text"
              id="cdGroupId"
              name="cdGroupId"
              placeholder="코드그룹아이디를 입력하세요."
              data-parse="uppercase"
              title="group"
              value={gCode.cdGroupId}
              onChange={onChange}
              validations={[v.required]}
              {...edit.opts}
            />
          {(edit.mode === Constants.EDIT_MODE.WRITE && gCode.codeIdDupYn === 'Y') && (
            <Button id="gCode,gCodeId" color="dark" outline size="sm" className="btn-smallRed" onClick={onDupCodeCheck}>
              중복체크
            </Button>
          )}
          {(edit.mode === Constants.EDIT_MODE.WRITE && gCode.codeIdDupYn === 'N') && (              
            <Button id="gCode,gCodeId" color="dark" outline size="sm" className="btn-smallRed" disabled>
              중복체크
            </Button>
          )}
          </Col>
        </FormGroup>
        <FormGroup row className="Inh_alignRow">
          <Col md="3" className="md6">
            <Label>상위코드그룹아이디</Label>
          </Col>
          <Col md="6" className="col_85">
            <Input
              type="text"
              id="upCdGroupId"
              name="upCdGroupId"
              placeholder="상위코드그룹아이디를 입력하세요."
              title="group"
              value={gCode.upCdGroupId}
              onChange={onChange}
              {...edit.opts}
            />
          </Col>
        </FormGroup>
        <FormGroup row className="Inh_alignRow">
          <Col md="3" className="md6">
            <Label>코드그룹명</Label>{requireTag}
          </Col>
          <Col md="6" className="col_85">
          {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.READ) && (
            <Input
              type="text"
              id="cdGroupNm"
              name="cdGroupNm"
              placeholder="코드그룹명을 입력하세요."
              data-parse="uppercase"
              title="group"
              value={gCode.cdGroupNm}
              onChange={onChange}
              validations={[v.required]}
              {...edit.opts}
            />
          )}
          {(edit.mode === Constants.EDIT_MODE.EDIT) && (
            <Input
              type="text"
              id="cdGroupNm"
              name="cdGroupNm"
              placeholder="코드그룹명을 입력하세요."
              data-parse="uppercase"
              title="group"
              value={gCode.cdGroupNm}
              onChange={onChange}
              validations={[v.required]}
            />
          )}
          </Col>
        </FormGroup>
        <FormGroup row className="Inh_alignRow">
          <Col md="3" className="md6">
            <Label>코드그룹내용</Label>
          </Col>
          <Col md="6" className="col_85">
          {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.READ) && (
            <Input
              type="text"
              id="cdGroupSbst"
              name="cdGroupSbst"
              placeholder="코드그룹내용을 입력하세요."
              data-parse="uppercase"
              title="group"
              value={gCode.cdGroupSbst}
              onChange={onChange}
              validations={[v.required]}
              {...edit.opts}
            />
          )}
          {(edit.mode === Constants.EDIT_MODE.EDIT) && (
            <Input
            type="text"
            id="cdGroupSbst"
            name="cdGroupSbst"
            placeholder="코드그룹내용을 입력하세요."
            data-parse="uppercase"
            title="group"
            value={gCode.cdGroupSbst}
            onChange={onChange}
            />
          )}
          </Col>
        </FormGroup>
        <FormGroup row className="Inh_alignRow">
          <Col md="3" className="md6">
            <Label>코드길이</Label>
          </Col>
          <Col md="6" className="col_85">
          {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.READ) && (
            <Input
              type="text"
              id="cdLen"
              name="cdLen"
              placeholder="코드길이를 입력하세요."
              data-parse="uppercase"
              title="group"
              value={gCode.cdLen}
              onChange={onChange}
              {...edit.opts}
            />
          )}
          {(edit.mode === Constants.EDIT_MODE.EDIT) && (
            <Input
            type="text"
            id="cdLen"
            name="cdLen"
            placeholder="코드길이를 입력하세요."
            data-parse="uppercase"
            title="group"
            value={gCode.cdLen}
            onChange={onChange}
            />
          )}
          </Col>
        </FormGroup>
        <FormGroup row className="Inh_alignRow">
          <Col md="3" className="md6">
            <Label>사용여부</Label>
          </Col>
          <Col md="6" className="col_85">
          {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.READ) && (
            <Select
              type="select"
              id="useYn"
              name="useYn"
              title="group"
              value={gCode.useYn}
              onChange={onChange}
              {...edit.opts}
            >
            <option value="Y">Y</option>
            <option value="N">N</option>
            </Select>
          )}
          {(edit.mode === Constants.EDIT_MODE.EDIT) && (
            <Select
              type="select"
              id="useYn"
              name="useYn"
              title="group"
              value={gCode.useYn}
              onChange={onChange}
            >
            <option value="Y">Y</option>
            <option value="N">N</option>
            </Select>
          )}
          </Col>
        </FormGroup>
      </>
    );
  } else if(edit.id === 'code'){
    return (
      <>
        <FormGroup row className="Inh_alignRow">
          <Col md="3" className="md6">
            <Label>코드그룹</Label>{requireTag}
          </Col>
          <Col md="6"  className="col_85">
            <Select
              type="select"
              id="cdGroupId"
              name="cdGroupId"
              value={code.cdGroupId}
              onChange={onChange}
              validations={[v.required]}
              {...edit.opts}
            >
              <option value="">--선택하세요--</option>
            { 
              groupCds.map(function (item) {
                return <option value={item.cdGroupId}>{item.cdGroupId}({item.cdGroupNm})</option>
              })
            }
            </Select>
          </Col>
        </FormGroup>
        <FormGroup row className="Inh_alignRow">
          <Col md="3" className="md6">
            <Label>상위코드상세아이디</Label>
          </Col>
          <Col md="6" className="col_85">
            <Input
              type="text"
              id="upCdDtlId"
              name="upCdDtlId"
              placeholder="상위코드상세아이디를 입력하세요."
              data-parse="uppercase"
              value={code.upCdDtlId}
              onChange={onChange}
              {...edit.opts}
            />
          </Col>
        </FormGroup>
        <FormGroup row className="Inh_alignRow">
          <Col md="3" className="md6">
            <Label>코드상세아이디</Label>{requireTag}
          </Col>
          <Col md="6" className={classNm}>
            <Input
              type="text"
              id="cdDtlId"
              name="cdDtlId"
              placeholder="코드상세아이디를 입력하세요."
              value={code.cdDtlId}
              onChange={onChange}
              validations={[v.required]}
              {...edit.opts}
            />
            {(edit.mode === Constants.EDIT_MODE.WRITE && code.codeIdDupYn === 'Y') && (
              <Button id="code,codeDtlId" color="dark" outline size="sm" className="btn-smallRed" onClick={onDupCodeCheck}>
                중복체크
              </Button>
            )}
            {(edit.mode === Constants.EDIT_MODE.WRITE && code.codeIdDupYn === 'N') && (              
              <Button id="code,codeDtlId" color="dark" outline size="sm" className="btn-smallRed" disabled>
                중복체크
              </Button>
            )}
          </Col>
        </FormGroup>
        <FormGroup row className="Inh_alignRow">
          <Col md="3" className="md6">
            <Label>코드상세명</Label>{requireTag}
          </Col>
          <Col md="6" className="col_85">
          {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.READ) && (
            <Input
              type="text"
              id="cdDtlNm"
              name="cdDtlNm"
              placeholder="코드상세명을 입력하세요."
              data-parse="uppercase"
              value={code.cdDtlNm}
              onChange={onChange}
              validations={[v.required]}
              {...edit.opts}
            />
          )}
          {(edit.mode === Constants.EDIT_MODE.EDIT) && (
            <Input
              type="text"
              id="cdDtlNm"
              name="cdDtlNm"
              placeholder="코드상세명을 입력하세요."
              data-parse="uppercase"
              value={code.cdDtlNm}
              onChange={onChange}
              validations={[v.required]}
            />
          )}
          </Col>
        </FormGroup>
        <FormGroup row className="Inh_alignRow">
          <Col md="3" className="md6">
            <Label>코드상세내용</Label>
          </Col>
          <Col md="6" className="col_85"> 
          {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.READ) && (
            <Input
              type="text"
              id="cdDtlSbst"
              name="cdDtlSbst"
              placeholder="코드상세내용을 입력하세요."
              data-parse="uppercase"
              value={code.cdDtlSbst}
              onChange={onChange}
              {...edit.opts}
            />
          )}
          {(edit.mode === Constants.EDIT_MODE.EDIT) && (
            <Input
              type="text"
              id="cdDtlSbst"
              name="cdDtlSbst"
              placeholder="코드상세내용을 입력하세요."
              data-parse="uppercase"
              value={code.cdDtlSbst}
              onChange={onChange}
            />
          )}
          </Col>
        </FormGroup>
        <FormGroup row className="Inh_alignRow">
          <Col md="3" className="md6">
            <Label>표시순서</Label>
          </Col>
          <Col md="6" className="col_85">
          {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.READ) && (
            <Input
              type="text"
              id="indcOdrg"
              name="indcOdrg"
              placeholder="표시순서를 숫자로 입력하세요."
              data-parse="uppercase"
              value={code.indcOdrg}
              onChange={onChange}
              {...edit.opts}
            />
          )}
          {(edit.mode === Constants.EDIT_MODE.EDIT) && (
            <Input
              type="text"
              id="indcOdrg"
              name="indcOdrg"
              placeholder="표시순서를 숫자로 입력하세요."
              data-parse="uppercase"
              value={code.indcOdrg}
              onChange={onChange}
            />
          )}
          </Col>
        </FormGroup>
        <FormGroup row className="Inh_alignRow">
          <Col md="3" className="md6">
            <Label>사용여부</Label>
          </Col>
          <Col md="6" className="col_85">
          {(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.READ) && (
            <Select
              type="select"
              id="useYn"
              name="useYn"
              value={code.useYn}
              onChange={onChange}
              {...edit.opts}
            >
            <option value="Y">Y</option>
            <option value="N">N</option>
            </Select>
          )}
          {(edit.mode === Constants.EDIT_MODE.EDIT) && (
            <Select
              type="select"
              id="useYn"
              name="useYn"
              value={code.useYn}
              onChange={onChange}
            >
            <option value="Y">Y</option>
            <option value="N">N</option>
            </Select>
          )}
          </Col>
        </FormGroup>
      </>
    );
  }
};

export default CdGroupBasEditForm;
