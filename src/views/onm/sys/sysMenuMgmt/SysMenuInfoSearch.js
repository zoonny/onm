import React from 'react';
import { Button, Input, FormGroup } from 'reactstrap';

const SysMenuInfoSearch = ({ search, onChange, onSearch, onKeyPress }) => (
    <FormGroup row>
    <div className="Inh_searchList">
    <div><i className="fa fa-align-justify" />자원 관리{' '}</div>
      <ul>
        <li> <span>자원명</span>
        <Input
          type="text"
          id="riNm"
          name="riNm"
          placeholder="자원명 입력"
          value={search.riNm}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
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

export default SysMenuInfoSearch;
