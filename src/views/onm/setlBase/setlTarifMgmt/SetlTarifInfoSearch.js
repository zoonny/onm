import React from 'react';
import { Col, Button, Input, Form, FormGroup } from 'reactstrap';

const SetlItemInfoSearch = ({ search, onChange, onSearch, onWrite, onCheckedHistYn }) => (
  <Form action="" method="post" className="form-horizontal">
    <FormGroup row>
    <div className="Inh_searchList">
    <div><i className="fa fa-align-justify" /> 정산요율 관리{' '}</div>
      <ul>
        <li> <span>정산항목명</span>
        <Input
          type="text"
          id="setlItemNm"
          name="setlItemNm"
          placeholder="정산항목명"
          value={search.setlItemNm}
          onChange={onChange}
        />        
        </li>
        <li>
          <div className="check">
          <Input
            type="checkbox"
            id="includeHistYn"
            name="includeHistYn"          
            value={search.includeHistYn}           
            onClick={onCheckedHistYn}
          /> 
          <label htmlFor="includeHistYn">이력포함</label>
          </div>      
        </li>
        <li>
        <Button color="dark" outline size="sm" onClick={onSearch} className="btn-search">
          조회
        </Button>
        </li>        
      </ul>
      </div>
    </FormGroup>
  </Form>
);

export default SetlItemInfoSearch;
