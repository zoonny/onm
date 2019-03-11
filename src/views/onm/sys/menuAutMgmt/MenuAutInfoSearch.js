import React from 'react';
import { Button, Input, FormGroup } from 'reactstrap';

const MenuAutInfoSearch = ({ search, onChange, onSearch, onKeyPress}) => (
  
    <FormGroup row>
    <div className="Inh_searchList">
    <div><i className="fa fa-align-justify" />권한관리{' '}</div>
      <ul>
        <li> <span>권한명</span>
        <Input
          type="text"
          id="searchText"
          name="searchText"
          placeholder=""
          value={search.searchText}
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

export default MenuAutInfoSearch;