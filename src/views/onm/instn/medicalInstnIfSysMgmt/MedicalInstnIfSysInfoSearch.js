import React from 'react';
import { Button, Input, FormGroup } from 'reactstrap';

const MedicalInstnIfSysInfoSearch = ({ search, onChange, onSearch, onKeyPress}) => (  
  <FormGroup row>
  <div className="Inh_searchList">
  <div><i className="fa fa-align-justify" />의료중개기관 연동정보{' '}</div>
    <ul>
      <li><span>파트너명</span>
      <Input
        type="text"
        id="searchText"
        name="searchText"
        placeholder=""
        value={search.searchText}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <Button color="dark" outline size="sm" onClick={onSearch} className="btn-search">
        검색
      </Button>
      </li>       
    </ul>
    </div>
  </FormGroup>
);

export default MedicalInstnIfSysInfoSearch;
