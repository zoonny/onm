import React from 'react';
import { Col, FormGroup, Label} from 'reactstrap';
import { Input } from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';
import { Constants } from 'libs/Constants';

const MenuAutInfoEditForm = ({ edit, menuAutItem, onChange }) => {
  return (
    <> 
    {(edit.mode === Constants.EDIT_MODE.EDIT) && (
      <>
        <FormGroup row>
          <Col md="3">
            <Label>권한아이디</Label>
          </Col>        
          <Col xs="12" md="9">          
            <Input
              type="text"
              id="roleId"
              name="roleId"
              value={menuAutItem.roleId}
              readOnly
            />                  
          </Col>  
        </FormGroup>
      </>
      )}       
      <FormGroup row >
      <Col md="3">
          <Label>권한명</Label>
        </Col>        
        <Col xs="12" md="9">          
          <Input
            type="text"
            id="roleNm"
            name="roleNm"
            maxLength={30}
            placeholder="권한명를 입력하세요."            
            value={menuAutItem.roleNm}
            onChange={onChange}
            validations={[v.required]}
          />                  
        </Col> 
      </FormGroup>
      {(edit.mode === Constants.EDIT_MODE.EDIT) && (
      <>
        <FormGroup row>
          <Col md="3">
            <Label>메뉴등록개수</Label>
          </Col>        
          <Col xs="12" md="9">          
            <Input
              type="text"
              value={menuAutItem.menuCount}
              readOnly
            />                  
          </Col>  
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label>등록일자</Label>
          </Col>        
          <Col xs="12" md="9">          
            <Input
              type="text"
              value={menuAutItem.cretDt}
              readOnly
            />                  
          </Col>  
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label>수정일자</Label>
          </Col>        
          <Col xs="12" md="9">          
            <Input
              type="text"
              value={menuAutItem.amdDt}
              readOnly
            />                  
          </Col>  
        </FormGroup>                  
      </>
      )}       
    </>
  );
};

export default MenuAutInfoEditForm;
