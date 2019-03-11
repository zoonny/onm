import React from 'react';
import { Col, FormGroup, Label, Input as Select, Button} from 'reactstrap';
import { Input } from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';
import { className } from 'postcss-selector-parser';
import { Constants } from '../../../../libs/Constants';


const MedicalInstnInfoEditForm = ({ edit, medicalInstn, onChange, bankCdList, chCdList, ptnrIdTag, chCdTag, requireTag}) => {  
    if(edit.mode === Constants.EDIT_MODE.EDIT){
      requireTag = <span className="warning" style={{'vertical-align':'middle'}}> *</span>

      ptnrIdTag=
      <FormGroup row className="Inh_alignRow">        
      <Col md="3">
        <Label>파트너 아이디</Label>
      </Col>
      <Col xs="12" md="9"> 
      <Input
        type="text"
        id="ptnrId"
        name="ptnrId"
        value={medicalInstn.ptnrId}
        readOnly     
      /> 
      </Col>    
      </FormGroup> 

      chCdTag = 
      <Select
        type="select"
        id="chCd"
        name="chCd"            
        defaultValue={medicalInstn.chCd}
        {...edit.opts}
        >
        { 
          chCdList.map(function (item) {
            return <option key={item.setlItemCd} value={item.setlItemCd}>{item.setlItemNm}</option>
          })
        }
        />
      </Select>
    } else if(edit.mode === Constants.EDIT_MODE.WRITE){
      requireTag = <span className="warning" style={{'vertical-align':'middle'}}> *</span>

      chCdTag =    
      <Select
        type="select"
        id="chCd"
        name="chCd"            
        defaultValue={medicalInstn.chCd}
        onChange={onChange}
        {...edit.opts}
        >
        { 
          chCdList.map(function (item) {
            return <option key={item.setlItemCd} value={item.setlItemCd}>{item.setlItemNm}</option>
          })
        }
      />
      </Select>

    } else {
      ptnrIdTag=
      <FormGroup row className="Inh_alignRow">        
      <Col md="3">
        <Label>파트너 아이디</Label>
      </Col>
      <Col xs="12" md="9"> 
      <Input
        type="text"
        id="ptnrId"
        name="ptnrId"
        value={medicalInstn.ptnrId}
        {...edit.opts}      
      /> 
      </Col>    
      </FormGroup> 

      chCdTag =    
      <Select
        type="select"
        id="chCd"
        name="chCd"            
        defaultValue={medicalInstn.chCd}
        onChange={onChange}
        {...edit.opts}
        >
        { 
          chCdList.map(function (item) {
            return <option key={item.setlItemCd} value={item.setlItemCd}>{item.setlItemNm}</option>
          })
        }
      /></Select>      
    }
    return (    
      <>
        {ptnrIdTag}
        <FormGroup row className="Inh_alignRow">                
        <Col md="3">
          <Label>파트너명</Label>{requireTag}
        </Col>
        <Col xs="12" md="9"> 
        <Input
            type="text"
            id="ptnrNm"
            name="ptnrNm"
            maxLength={50}            
            value={medicalInstn.ptnrNm}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}            
          />
        </Col>        
        <Col md="3">
          <Label>채널유형코드</Label>
        </Col>
        <Col xs="12" md="9"> 
          {chCdTag}
        </Col>
        </FormGroup>

        <FormGroup row className="Inh_alignRow">        
        <Col md="3">
          <Label>사업자번호</Label>
        </Col>
        <Col xs="12" md="9"> 
        <Input
            type="text"
            id="bizrNo"
            name="bizrNo"
            maxLength={12}
            value={medicalInstn.bizrNo}
            onChange={onChange}
            validations={[v.bizRegisterNumber]}
            {...edit.opts}            
          />
        </Col>    
        <Col md="3">
          <Label>전화번호</Label>{requireTag}
        </Col>
        <Col xs="12" md="9"> 
        <Input
            type="text"
            id="telNo"
            name="telNo"
            maxLength={13}
            value={medicalInstn.telNo}
            onChange={onChange}
            validations={[v.required, v.dashNumber]}
            {...edit.opts}            
          />
        </Col>
        </FormGroup> 

        <FormGroup row className="Inh_alignRow">  
        <Col md="3">
          <Label>이메일</Label>
        </Col>
        <Col xs="12" md="9"> 
        <Input
            type="text"
            id="email"
            name="email"
            maxLength={50}
            value={medicalInstn.email}
            onChange={onChange}
            validations={[v.email]}   
            {...edit.opts}        
          />
        </Col>        
        </FormGroup> 

        <FormGroup row className="Inh_alignRow">        
        <Col md="3">
          <Label>주소</Label>
        </Col>
        <Col xs="9" className="col_85"> 
        <Input
            type="text"
            id="adr"
            name="adr"
            maxLength={300}
            value={medicalInstn.adr}
            onChange={onChange}                 
            {...edit.opts}       
          />
        </Col>    
        </FormGroup>  

        <FormGroup row className="Inh_alignRow">        
        <Col md="3">
          <Label>은행명</Label>
        </Col>
        <Col xs="12" md="9"> 
        <Select
            type="select"
            id="bankCd"
            name="bankCd"                       
            defaultValue={medicalInstn.bankCd}
            onChange={onChange}
            {...edit.opts}            
            >
            <option value=''>은행을 선택하세요.</option>
            { 
              bankCdList.map(function (item) {
                return <option key={item.setlItemCd} value={item.setlItemCd}>{item.setlItemNm}</option>
              })
            }
          />
        </Select>
        </Col>    
        <Col md="3">
          <Label>계좌번호</Label>
        </Col>
        <Col xs="12" md="9"> 
        <Input
            type="text"
            id="bnkacnNo"
            name="bnkacnNo"
            maxLength={20}
            value={medicalInstn.bnkacnNo}
            onChange={onChange}
            validations={[v.dashNumber]}  
            {...edit.opts}          
          />
        </Col>
        </FormGroup>              

        <FormGroup row className="Inh_alignRow">        
        <Col md="3">
          <Label>예금주명</Label>
        </Col>
        <Col xs="12" md="9"> 
        <Input
            type="text"
            id="dposrNm"
            name="dposrNm"
            maxLength={50}
            value={medicalInstn.dposrNm}
            onChange={onChange}              
            {...edit.opts}      
          />
        </Col>    
        <Col md="3">
          <Label>담당자명</Label>{requireTag}
        </Col>
        <Col xs="12" md="9"> 
        <Input
            type="text"
            id="tkcgr"
            name="tkcgr"
            maxLength={30}
            value={medicalInstn.tkcgr}
            onChange={onChange}
            validations={[v.required]}   
            {...edit.opts}         
          />
        </Col>
        </FormGroup>

        <FormGroup row className="Inh_alignRow">        
        <Col md="3">
          <Label>담당부서</Label>{requireTag}
        </Col>
        <Col xs="12" md="9">  
        <Input
            type="text"
            id="tkcgDept"
            name="tkcgDept"
            maxLength={50}
            value={medicalInstn.tkcgDept}
            onChange={onChange} 
            validations={[v.required]}             
            {...edit.opts}         
          />
        </Col>    
        </FormGroup>         

      </>
  );
};
export default MedicalInstnInfoEditForm;
