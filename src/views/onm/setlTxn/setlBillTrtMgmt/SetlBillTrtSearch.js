import React from 'react';
import { Col, Button, Input, Form, FormGroup, Input as Select  } from 'reactstrap';

const SetlBillTrtSearch = ({ search, codes, onChange, onSearch }) => (
  <Form action="" method="post" className="form-horizontal">
    <FormGroup row>
    <div className="Inh_searchList">
    <div><i className="fa fa-align-justify" /> 정산청구 조회{' '}</div>
      <ul>
        <li> <span>정산대상년월</span>
        <Input
          type="month"
          id="startDt"
          name="startDt"          
          value={search.setlItemNm}
          onChange={onChange}
        />
        &nbsp;&nbsp;~&nbsp;&nbsp;
        <Input
          type="month"
          id="endDt"
          name="endDt"          
          value={search.setlItemNm}
          onChange={onChange}
        />
        </li>
        <li> <span>보험사</span>
        <Select
          type="select"
          id="ptnrId"
          name="ptnrId"
          value = {search.ptnrId}
          onChange={onChange}
        >
          <option value="">--선택--</option>
          { 
            codes.map(function (item) {
              return <option value={item.ptnrId}>{item.ptnrNm}</option>
            })
          }
        </Select>
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

export default SetlBillTrtSearch;
