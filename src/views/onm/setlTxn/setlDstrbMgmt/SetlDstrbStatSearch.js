import React from 'react';
import { Col, Button, Form, Input, FormGroup } from 'reactstrap';
import * as v from 'libs/Validations';

const SetlDstrbStatSearch = ({ search, onChange, onSearch }) => (
  <Form action="" method="post" className="form-horizontal">
    <FormGroup row>
    <div className="Inh_searchList">
    <div><i className="fa fa-align-justify" /> 정산내역 통계{' '}</div>
      <ul>
        <li> <span>정산대상년월</span>
        <Input
          type="month"
          id="startDt"
          name="startDt"          
          value={search.startDt}
          onChange={onChange}          
        />
        &nbsp;&nbsp;~&nbsp;&nbsp;
        <Input
          type="month"
          id="endDt"
          name="endDt"          
          value={search.endDt}
          onChange={onChange}          
        />                
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

export default SetlDstrbStatSearch;
