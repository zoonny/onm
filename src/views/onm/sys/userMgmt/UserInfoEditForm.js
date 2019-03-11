import React from 'react';
import { Col, FormGroup, Label,  Dropdown, DropdownToggle, DropdownItem,  DropdownMenu} from 'reactstrap';
import { Input } from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';
import { className } from 'postcss-selector-parser';

const UserInfoEditForm = ({ edit, user, onChange }) => {
  return (
    <>      
      <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>사용자아이디</Label>
        </Col>        
        <Col xs="12" md="9">          
          <Input
            type="text"
            id="userId"
            name="userId"
            placeholder="사용자아이디를 입력하세요."
            // data-parse="uppercase"
            value={user.userId}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />                  
        </Col>      
        <Col md="3">
          <Label>사용자이름</Label>
        </Col>        
        <Col xs="12" md="9">          
          <Input
            type="text"
            id="userNm"
            name="userNm"
            placeholder="이름을 입력하세요."
            data-parse="uppercase"
            value={user.userNm}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />                  
        </Col>        
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label htmlFor="textarea-input">계정상태</Label>
        </Col>
        <Col xs="12" md="9">
            <Input
            type="text"
            id="accActvSttusCd"
            name="accActvSttusCd"
            placeholder="계정 상태를 입력하세요.(U:활성화, N:비활성화)"
            data-parse="uppercase"
            value={user.accActvSttusCd}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        </Col>     
        <Col md="3">
          <Label>이동전화번호</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="mphonNo"
            name="mphonNo"
            placeholder="이동전화번호를 입력하세요."
            value={user.mphonNo}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>비밀번호</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="pwd"
            name="pwd"
            placeholder="비밀번호를 입력하세요."
            value={user.pwd}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        </Col>      
        <Col md="3">
          <Label>유효종료일</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="efctFnsDt"
            name="efctFnsDt"
            placeholder="유효종료일을 입력하세요."
            value={user.efctFnsDt}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>일반전화번호</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="pponNo"
            name="pponNo"
            placeholder="일반전화번호를 입력하세요."
            value={user.pponNo}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        </Col>      
        <Col md="3">
          <Label>이메일</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="이메일를 입력하세요."
            value={user.email}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        </Col>
      </FormGroup>
      <FormGroup row className="Inh_alignRow">
        <Col md="3">
          <Label>회사명</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="cmpnNm"
            name="cmpnNm"
            placeholder="회사명을 입력하세요."
            value={user.cmpnNm}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        </Col>      
        <Col md="3">
          <Label>부서명</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            id="deptNm"
            name="deptNm"
            placeholder="부서명을 입력하세요."
            value={user.deptNm}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}
          />
        </Col>
      </FormGroup>
    </>
  );
};

export default UserInfoEditForm;
