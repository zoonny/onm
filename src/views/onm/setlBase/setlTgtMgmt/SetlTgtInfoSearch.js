import React from 'react';
import { Col, Button, Input, Form, FormGroup } from 'reactstrap';

const SetlTgtInfoSearch = ({ search, onChange, onSearch, onWrite, onCheckedHistYn, onKeyPress }) => (
  <Form action="" method="post" className="form-horizontal">
    <FormGroup row>
    <div className="Inh_searchList">
    <div><i className="fa fa-align-justify" /> 정산 대상{' '}</div>
      <ul>
        <li> <span>정산항목코드</span>
        <Input
          type="text"
          id="setlItemCd"
          name="setlItemCd"
          placeholder="정산항목코드 입력"
          value={search.setlItemCd}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
        </li>
        <li> <span>파트너아이디</span>
        <Input
          type="text"
          id="ptnrId"
          name="ptnrId"
          placeholder="파트너아이디 입력"
          value={search.ptnrId}
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
          name=""
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
  </Form>
);

export default SetlTgtInfoSearch;
