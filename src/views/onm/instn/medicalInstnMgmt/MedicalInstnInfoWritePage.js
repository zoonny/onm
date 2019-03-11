import React from 'react';
import { Col, FormGroup, Label, Input as Select, Button} from 'reactstrap';
import { Input } from 'views/comn/validation/FormValidation';
import * as v from 'libs/Validations';
import { className } from 'postcss-selector-parser';
import { Constants } from '../../../../libs/Constants';


const MedicalInstnInfoWriteForm = ({ edit, medicalInstn, onChange, bankCdList, chCdList}) => {  
    return (    
      <>
        
        <FormGroup row className="Inh_alignRow">                
        <Col md="3">
          <Label>파트너 아이디</Label><span className="warning"> *</span>          
        </Col>       
        <Col xs="12" md="9"> 
          <Input
          type="text"
          id="ptnrId"
          name="ptnrId"
          maxLength={10}      
          placeholder="파트너 아이디를 입력하세요."
          value={medicalInstn.ptnrId}
          onChange={onChange}
          validations={[v.required, v.upperCaseUnderbarDashNumber]}
          {...edit.opts}      
          /> 
        </Col>              
        <Col md="3">
          <Label>파트너명</Label><span className="warning"> *</span>
        </Col>
        <Col xs="12" md="9"> 
        <Input
            type="text"
            id="ptnrNm"
            name="ptnrNm"
            maxLength={50}
            placeholder="파트너명을 입력하세요."
            value={medicalInstn.ptnrNm}
            onChange={onChange}
            validations={[v.required]}
            {...edit.opts}            
          />
        </Col>
        </FormGroup>        
       
        <FormGroup row className="Inh_alignRow">                
        <Col md="3">
          <Label>채널유형코드</Label>
        </Col>
        <Col xs="12" md="9"> 
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
            placeholder="000-00-0000"
            value={medicalInstn.bizrNo}
            onChange={onChange}
            validations={[v.bizRegisterNumber]}
            {...edit.opts}            
          />
        </Col>    
        <Col md="3">
          <Label>전화번호</Label><span className="warning"> *</span>
        </Col>
        <Col xs="12" md="9"> 
        <Input
            type="text"
            id="telNo"
            name="telNo"
            maxLength={13}
            placeholder="000-0000-0000"
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
            placeholder="이메일 주소를 입력하세요."
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
            placeholder="주소를 입력하세요."
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
            placeholder="계좌번호를 입력하세요."
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
            placeholder="예금주명을 입력하세요."
            value={medicalInstn.dposrNm}
            onChange={onChange}              
            {...edit.opts}      
          />
        </Col>    
        <Col md="3">
          <Label>담당자명</Label><span className="warning"> *</span>
        </Col>
        <Col xs="12" md="9"> 
        <Input
            type="text"
            id="tkcgr"
            name="tkcgr"
            maxLength={30}
            placeholder="담당자명을 입력하세요."
            value={medicalInstn.tkcgr}
            onChange={onChange}
            validations={[v.required]}   
            {...edit.opts}         
          />
        </Col>
        </FormGroup>

        <FormGroup row className="Inh_alignRow">        
        <Col md="3">
          <Label>담당부서</Label><span className="warning"> *</span>
        </Col>
        <Col xs="12" md="9">  
        <Input
            type="text"
            id="tkcgDept"
            name="tkcgDept"
            maxLength={50}
            placeholder="담당부서을 입력하세요."
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
export default MedicalInstnInfoWriteForm;
