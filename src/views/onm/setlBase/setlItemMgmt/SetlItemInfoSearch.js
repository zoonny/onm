import React from 'react';
import { Button, Input, FormGroup } from 'reactstrap';

const SetlItemInfoSearch = ({ search, onChange, onSearch, onWrite, onKeyPress, onCheckedHistYn }) => (
    <FormGroup row>
    <div className="Inh_searchList">
    <div><i className="fa fa-align-justify" /> 정산 항목 관리{' '}</div>
      <ul>
        <li> <span>정산항목명</span>
        <Input
          type="text"
          id="setlItemNm"
          name="setlItemNm"
          placeholder="정산항목명 입력"
          value={search.setlItemNm}
          onChange={onChange}
          onKeyPress={onKeyPress}
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
          검색
        </Button>
        </li>
      </ul>
      </div>
    </FormGroup>
);

export default SetlItemInfoSearch;
