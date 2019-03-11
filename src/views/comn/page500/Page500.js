import React, { Component } from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import 'scss/style.scss';
import imgNodata from 'assets/img/imgNodata.png';

class Page500 extends Component {
  
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
        <div className="page500">
          <ul>
            <li><img src={imgNodata} /></li>
            <li>죄송합니다. </li>
            <li>요청하신 기능은 일시적인 문제로 인해 <br/> 정상적으로 제공되지 않고 있습니다.</li>
            <li><button onClick={this.goHome}>초기화면으로 가기</button><button onClick={this.goBack}>이전페이지로 가기</button></li>
          </ul>
        </div>
          {/* <Row className="justify-content-center">
            <Col md="6">
              <span className="clearfix">
                <h1 className="float-left display-3 mr-4">500</h1>
                <h4 className="pt-3">Houston, we have a problem!</h4>
                <p className="text-muted float-left">The page you are looking for is temporarily unavailable.</p>
              </span>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-search"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input size="16" type="text" placeholder="What are you looking for?" />
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

export default Page500;
