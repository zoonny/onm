import React from 'react';
import { Col, FormGroup, Label,  Dropdown, DropdownToggle, DropdownItem,  DropdownMenu, Button, Input as Select} from 'reactstrap';
import { Input } from 'views/comn/validation/FormValidation';
import {
  Form,
  Button as ValidButton,
} from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';
import { className } from 'postcss-selector-parser';
import { GetConstants, Constants } from 'libs/Constants';

const UserInfoEditForm = ({ edit, user, onChange, onConfirm, onDupUserCheck}) => {

  return (    
    <>      
      <div className="Inh_userInputDiv">
      <FormGroup>
      <Col className="title">
        <Label>사용자 아이디</Label>
      </Col>
      <Col className="inButton">
        <Input 
          id="userId" 
          name="userId"  
          type="text" 
          maxLength={10} 
          className="form-control"
          onChange={onChange} 
          validations={[v.required]} 
          value="" {...edit.opts} 
        />
        {(user.userIdDupYn === 'Y' || user.userIdDupYn === '') && (              
          <Button color="dark" outline size="sm" className="btn-smallRed" onClick={onDupUserCheck}>
            중복체크
          </Button>
          )              
        }
        {(user.userIdDupYn === 'N') && (              
          <Button color="dark" outline size="sm" className="btn-smallRed" disabled>
            중복체크
          </Button>
          )              
        }        
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
          onChange={onChange} 
          validations={[v.required]} 
          value="" {...edit.opts}
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
      <FormGroup>
      <Col className="title">
        <Label>비밀번호</Label>
      </Col>
      <Col>
        <Input 
          id="pwd"
          name="pwd"
          type="password" 
          className="form-control" 
          value="" 
          onChange={onChange}
          placeholder="영문/숫자/특수문자 3종 포함 8자이상"
          validations={[v.required, v.password]}
          {...edit.opts}
        />
        {/* {(user.pwdValidCheck === 'Y' || user.pwdValidCheck === '') && (              
          <Button color="dark" outline size="sm" className="btn-smallRed">
            중복체크
          </Button>
          )              
        }
        {(user.pwdValidCheck === 'N') && (              
          <Button color="dark" outline size="sm" className="btn-smallRed" disabled>
            중복체크
          </Button>
          )              
        } */}
      </Col>
      </FormGroup>        
      <FormGroup>
      <Col className="title">
        <Label>비밀번호 확인</Label>
      </Col>
      <Col>
        <Input 
          id="confirmPwd"
          name="confirmPwd"
          type="password" 
          className="form-control" 
          value="" 
          onChange={onChange} 
          validations={[v.required, v.pwdConfirm]}
          {...edit.opts}
        />
      </Col>
      </FormGroup>
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
          value=""
          onChange={onChange} 
          validations={[v.required, v.mobile]} 
          {...edit.opts}
        />
      </Col>
      </FormGroup>
      {/* <FormGroup>
      <Col className="title">
        <Label>유효종료일시</Label>
      </Col>
      <Col>
        <Input 
          id="efctFnsDt" 
          name="efctFnsDt"  
          type="date" 
          className="form-control" 
          value=""
          onChange={onChange} 
          validations={[v.required]} 
          {...edit.opts}
        />
      </Col>
      </FormGroup> */}
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
          value="" 
          onChange={onChange} 
          validations={[v.required, v.phone]}
          {...edit.opts}
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
          type="email" 
          className="form-control" 
          value="" 
          onChange={onChange} 
          validations={[v.required, v.email]}
          {...edit.opts}
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
          value="" 
          onChange={onChange} 
          validations={[v.required]}
          {...edit.opts}
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
        value="" 
        onChange={onChange} 
          validations={[v.required]}
        {...edit.opts}
      />
      </Col>
      </FormGroup>
        <div className="Inh_userInputbt">
            {(edit.mode === Constants.EDIT_MODE.WRITE ||
               edit.mode === Constants.EDIT_MODE.EDIT) && (
               <>
                 <ValidButton type="submit" size="sm" color="primary">
                   <i className="fa fa-check" />{' '}
                   {GetConstants.getEditTitle(edit.mode)}
                 </ValidButton>
               </>
             )}
         </div>  
      </div>
    </>
  );
};
export default UserInfoEditForm;