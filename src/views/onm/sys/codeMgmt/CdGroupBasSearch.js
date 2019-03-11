import React from 'react';
import { Col, Button, Input, Form, FormGroup } from 'reactstrap';

const CdGroupBasSearch = ({ search, onChange, onSearch, onWrite }) => (
  <Form action="" method="post" className="form-horizontal">
    <FormGroup row>
      <div className="Inh_searchList">
        <div><i className="fa fa-align-justify" /> 코드 정보 관리{' '}</div>
          <ul>
            <li><span>코드 그룹 아이디</span>
              <Input
              type="text"
              id="cdGroupId"
              name="cdGroupId"
              placeholder=""
              value={search.cdGroupId}
              onChange={onChange}
              />
            </li>
            <li><span>코드 그룹명</span>
              <Input
              type="text"
              id="cdGroupNm"
              name="cdGroupNm"
              placeholder=""
              value={search.cdGroupNm}
              onChange={onChange}
              />
              <Button color="dark" outline size="sm" onClick={onSearch} className="btn-search">
                검색
              </Button>
            </li>
          </ul>
      </div>
      {/* <Col md="2">
        <i className="fa fa-align-justify" /> 코드 정보 관리{' '}
        <small className="text-muted">example</small>
      </Col>
      <Col md="3">
        <Input
          type="text"
          id="cdGroupId"
          name="cdGroupId"
          placeholder="코드그룹아이디"
          value={search.cdGroupId}
          onChange={onChange}
        />
      </Col>
      <Col md="3">
        <Input
          type="text"
          id="cdGroupNm"
          name="cdGroupNm"
          placeholder="코드그룹명"
          value={search.cdGroupNm}
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
          코드그룹 등록
        </Button>
      </Col> */}
    </FormGroup>
  </Form>
);

export default CdGroupBasSearch;
