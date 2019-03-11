import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import 'scss/style.scss';
import imgNodata from 'assets/img/imgNodata.png';

class Page404 extends Component {
  
  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack(){
    this.props.history.goBack();
  }

  goHome(){
    window.location.href = "onm#/";
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>          
        <div className="page404">
          <ul>
            <li><img src={imgNodata} /></li>
            <li>404 <b>Page not found</b></li>
            <li>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</li>
            <li><button onClick={this.goHome}>초기화면으로 가기</button><button onClick={this.goBack}>이전페이지로 가기</button></li>
          </ul>
        </div>
          {/* <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">Oops! You're lost.</h4>
                <p className="text-muted float-left">
                  The page you are looking for was not found.
                </p>
              </div>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  size="16"
                  type="text"
                  placeholder="What are you looking for?"
                />
                <InputGroupAddon addonType="append">
                  <Button color="info">Search</Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row> */}
        </Container>
      </div>
    );
  }
}

export default Page404;
