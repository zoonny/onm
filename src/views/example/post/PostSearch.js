import React from 'react';
import { Col, Button, Input, Form, FormGroup } from 'reactstrap';

const PostSearch = ({ search, onChange, onSearch, onWrite }) => (
  <Form action="" method="post" className="form-horizontal">
    <FormGroup row>

      <div className="Inh_searchList">
        <div><i className="fa fa-align-justify" /> Posts{' '}
        <small className="text-muted">example</small></div>
        <ul>
          <li>
            <div className="check"><input type="checkbox" name="history_check" id="history_check1" /><label for="history_check1">이력조회</label></div>
            <div className="check"><input type="checkbox" name="history_check" id="history_check2" disabled/><label for="history_check2">이력조회</label></div>
            <div className="check"><input type="checkbox" name="history_check" id="history_check3" checked disabled/><label for="history_check3">이력조회</label></div>
          </li>
          <li>
            <div className="check"><input type="radio" name="history_radio" id="ex_radio1" /><label for="ex_radio1">이력조회</label></div>
            <div className="check"><input type="radio" name="history_radio" id="ex_radio2" disabled/><label for="ex_radio2">이력조회</label></div>
            <div className="check"><input type="radio" name="history_radio1" id="ex_radio3" checked disabled /><label for="ex_radio3">이력조회</label></div>
          </li>
          <li>
          <Input
            type="text"
            id="tag"
            name="tag"
            placeholder="태그"
            value={search.tag}
            onChange={onChange}
          />
          <Button color="dark" outline size="sm" size="sm" onClick={onSearch} className="btn-search">
            검색
          </Button>
          </li>
          <li><Button color="dark" outline size="sm" size="sm" onClick={onWrite} className="btn-primary">
            등록
          </Button></li>
        </ul>
      </div>   
      {/* <Col md="2">
        <i className="fa fa-align-justify" /> Posts{' '}
        <small className="text-muted">example</small>
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
          등록
        </Button>
      </Col> */}
    </FormGroup>
  </Form>
);

export default PostSearch;
