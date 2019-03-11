import React from 'react';
import { Col, Button, Input, Form, FormGroup } from 'reactstrap';

const UserInfoSearch = ({ search, onChange, onSearch, onWrite }) => (
  <Form action="" method="post" className="form-horizontal">
    <FormGroup row>
    <div className="Inh_searchList">
    <div><i className="fa fa-align-justify" />사용자관리{' '}</div>
      <ul>
        <li> <span>사용자 아이디</span>
        <Input
          type="text"
          id="userId"
          name="userId"
          placeholder=""
          value={search.userId}
          onChange={onChange}
        />
        </li>
        <li><span>사용자명</span>
        <Input
          type="text"
          id="userNm"
          name="userNm"
          value = {search.cmpnNm}
          onChange={onChange}
        />                 
        <Button color="dark" outline size="sm" onClick={onSearch} className="btn-search">
          검색
        </Button>
        </li>
        {/* <li className="float-right">
        <Button color="dark" outline size="sm" onClick={onWrite} className="btn-primary">
          사용자 등록
        </Button>
        </li> */}
      </ul>
      </div>

      {/* <Col md="2">
        <i className="fa fa-align-justify" /> 사용자관리{' '}
        {/* <small className="text-muted">사용자관리</small> }
      </Col>
      <Col md="6">
        <Input
          type="text"
          id="tag"
          name="tag"
          placeholder="태그"
          value={search.tag}
          onChange={onChange}
        />
      </Col>
      <Col md="2">
        <Button color="dark" outline size="sm" onClick={onSearch}>
          검색
        </Button>
      </Col>
      <Col md="2" className="float-right">
        <Button color="dark" outline size="sm" onClick={onWrite}>
          사용자 등록
        </Button>
      </Col> */}
    </FormGroup>
  </Form>
);

export default UserInfoSearch;
