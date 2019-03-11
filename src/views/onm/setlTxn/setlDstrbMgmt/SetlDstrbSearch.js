import React from 'react';
import { Col, Button, Form, Input, FormGroup,Row } from 'reactstrap';
import * as v from 'libs/Validations';
import DatePicker from 'react-datepicker';
import Date_Picker from 'react-date-picker';
import 'react-datepicker/dist/react-datepicker.css';

const SetlItemInfoSearch = ({ search, onChange, onSearch, onWrite, onCheckedHistYn, onSelect,onChangeDate, date, onExcelDown }) => (
  <Form action="" method="post" className="form-horizontal">
    <FormGroup row>
    <div className="Inh_searchList">
    <div><i className="fa fa-align-justify" /> 정산내역 조회{' '}</div>
      <ul>
        <li> <span>정산대상년월</span>
        <Input
          type="month"
          id="startDt"
          name="startDt"          
          value={search.startDt}
          onChange={onChange}
          validations={[v.date1]}
        />        
        &nbsp;&nbsp;~&nbsp;&nbsp;
        <Input
          type="month"
          id="endDt"
          name="endDt"          
          value={search.endDt}
          onChange={onChange}
          //validations={[v.date1]}
          format="YYYYMM"
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
          </div>      
        </li>
        <li>
        <Button color="dark" outline size="sm" onClick={onSearch} className="btn-search">
          조회
        </Button>
        </li>
        <li>
        <Button color="dark" outline size="sm" onClick={onExcelDown} className="btn-search">
          출력
        </Button>
        </li>        
      </ul>
      </div>
    </FormGroup>
  </Form>
);

export default SetlItemInfoSearch;
