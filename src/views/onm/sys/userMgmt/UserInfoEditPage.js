import React from 'react';
import { Col, FormGroup, Label,  Dropdown, DropdownToggle, DropdownItem,  DropdownMenu, Button, Input as Select} from 'reactstrap';
import { Input } from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';
import { className } from 'postcss-selector-parser';
import { Constants } from '../../../../libs/Constants';
import DatePicker from 'react-datepicker';

const UserInfoEditForm = ({ edit, user, onChange, onConfirm }) => {
     return (    
      <>      
      <div className="Inh_userInputDiv">
        <FormGroup>
        <Col className="title">
          <Label>사용자 아이디</Label>
        </Col>
        <Col>
          <Input 
            id="userId" 
            name="userId" 
            type="text" 
            className="form-control" 
            value={user.userId} 
            {...edit.opts}
          />
        </Col>
        </FormGroup>
        <FormGroup>
        <Col className="title">
          <Label>사용자명</Label>
        </Col>
        <Col>
          <Input 
            id="userNm" 
            name="userNm"  
            data-parse="uppercase" 
            type="text" 
            className="form-control" 
            value={user.userNm}
            validations={[v.required]}
            onChange={onChange}
          />
        </Col>
        </FormGroup>
        <FormGroup>
        <Col className="title">
          <Label>계정상태</Label>
        </Col>
        <Col>          
          <Select
          type="select"
          id="accActvSttusCd"
          name="accActvSttusCd"          
          value = {user.accActvSttusCd}
          onChange={onChange}
          >            
          <option value="U">활성화</option>
          <option value="N">비활성화</option>
          </Select>
        </Col>
        </FormGroup>
        {/* <FormGroup>
        <Col className="title">
          <Label>기존비밀번호</Label>
        </Col>
        <Col>
          <Input 
            id="pwd" 
            name="pwd" 
            placeholder="비밀번호를 입력하세요." 
            type="text" 
            className="form-control" 
            value={user.pwd} 
          />
        </Col>
        </FormGroup>
        <FormGroup>
        <Col className="title">
          <Label>새 비밀번호</Label>
        </Col>
        <Col className="inButton">
          <Input 
            type="text" 
            className="form-control" 
            value="" 
          />
          <Button color="dark" outline size="sm" className="btn-small">
            유효성체크
          </Button>
        </Col>
        </FormGroup>
        <FormGroup>
        <Col className="title">
          <Label>새 비밀번호 확인</Label>
        </Col>
        <Col>
          <Input 
            type="text" 
            className="form-control" 
            value="" 
          />
        </Col>
        </FormGroup> */}
        <FormGroup>
        <Col className="title">
          <Label>이동전화번호</Label>
        </Col>
        <Col>
          <Input 
            id="mphonNo" 
            name="mphonNo"  
            type="text" 
            className="form-control" 
            value={user.mphonNo}
            validations={[v.required, v.mobile]}
            onChange={onChange}
          />
        </Col>
        </FormGroup>
        <FormGroup>
        <Col className="title">
          <Label>유효종료일시</Label>
        </Col>
        <Col>
          <Input 
            id="newEfctFnsDt" 
            name="newEfctFnsDt"  
            type="date" 
            className="form-control"             
            value={user.efctFnsDt}
            validations={[v.required]}
            onChange={onChange}
          />
        </Col>
        </FormGroup>
        <FormGroup>
        <Col className="title">
          <Label>전화번호</Label>
        </Col>
        <Col>
          <Input 
            id="pponNo" 
            name="pponNo"  
            type="text" 
            className="form-control" 
            value={user.mphonNo}
            validations={[v.required, v.phone]}
            onChange={onChange}
          />
        </Col>
        </FormGroup>
        <FormGroup>
        <Col className="title">
          <Label>이메일</Label>
        </Col>
        <Col>
          <Input 
            id="email" 
            name="email"  
            type="text" 
            className="form-control" 
            value={user.email}
            validations={[v.required, v.email]}
            onChange={onChange}
          />
        </Col>
        </FormGroup>
        <FormGroup>
        <Col className="title">
          <Label>회사명</Label>
        </Col>
        <Col>
          <Input 
            id="cmpnNm" 
            name="cmpnNm"  
            type="text" 
            className="form-control" 
            value={user.cmpnNm}
            onChange={onChange}
          />
        </Col>
        </FormGroup>
        <FormGroup>
        <Col className="title">
          <Label>부서명</Label>
        </Col>
        <Col>
          <Input 
            id="deptNm" 
            name="deptNm"  
            type="text" 
            className="form-control" 
            value={user.deptNm}
            onChange={onChange} 
          />
        </Col>
        </FormGroup>
        <div className="Inh_userInputbt">
            <Button color="primary" onClick={onConfirm}>
              {Constants.BUTTON.CONFIRM}
            </Button>
        </div>
        </div>
      </>
    );
};

export default UserInfoEditForm;
