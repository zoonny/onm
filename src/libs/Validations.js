import React from 'react';
import { FormFeedback, FormText } from 'reactstrap';

 import validator from 'validator';

export const required = (value, e) => {  
  if (!value.toString().trim().length) {
    return <span className="error"><i className="fa fa-exclamation warning"> 필수값 입니다.</i></span>
    // return (
    //   <div>
    //     <FormText><i className="fa fa-exclamation warning">{e.name}은 필수값 입니다.</i></FormText>
    //   </div>
    // );
  }
};

export const email = (value, e) => {
     if ( (value.toString().trim().length > 0) && !validator.isEmail(value)) {
      return <span className="error"><i className="fa fa-exclamation warning"> 이메일 주소 형식이 아닙니다.</i></span>;
     }
};

export const lt = (value, props) => {
  if (!value.toString().trim().length > props.maxLength) {
    return <span className="error"><i className="fa fa-exclamation warning"> The value exceeded {props.maxLength} symbols.</i></span>;
  }
};

export const password = (value,props, components) => {  
  if (!validator.matches(value,'^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$')){
    return <span className="error"><i className="fa fa-exclamation warning"> 패스워드 형식이 맞지 않습니다.</i></span>;
  }
};

export const pwdConfirm = (value, props, components) => {  
  if (value !== components['pwd'][0].value) {
    return <span className="error"><i className="fa fa-exclamation warning"> 패스워드가 같지 않습니다.</i></span>;
  }
};

export const mobile = (value) => {
  // if (!validator.isMobilePhone(value,'ko-KR')){
  //   return '전화 번호 형식이 아닙니다.';
  // }
  if ( (value.toString().trim().length > 0) && !validator.matches(value,'^01([0|1|6|7|8|9]?)-([0-9]{3,4})-([0-9]{4})$')){
    return <span className="error"><i className="fa fa-exclamation warning"> 전화 번호 형식이 아닙니다.</i></span>;
  }  
};

export const phone = (value) => {
  if ( (value.toString().trim().length > 0) && !validator.matches(value,'^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$')){
    return <span className="error"><i className="fa fa-exclamation warning"> 전화 번호 형식이 아닙니다.</i></span>;
  }  
};

export const date = (value) => {  
  if (!validator.matches(value,'[0-9]{4}-[0-9]{2}-[0-9]{2}$')){
    return <span className="error"><i className="fa fa-exclamation warning"> 날짜 형식이 아닙니다.</i></span>;
  }  
};

export const date1 = (value) => {  
  if (!validator.matches(value,'[0-9]{4}[0-9]{2}$')){
    return <span className="error"><i className="fa fa-exclamation warning"> 날짜 형식이 아닙니다.</i></span>;
  }  
};

export const port = (value, e) => {
  if ( (value.toString().trim().length > 0) && !validator.matches(value,'^([1-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$')){
    return <span className="error"><i className="fa fa-exclamation warning"> 1 ~ 65535 번호를 입력해 주세요.</i></span>;
  }
};

export const ipv4 = (value, e) => {
  if ( (value.toString().trim().length > 0) && !validator.matches(value,'^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4]|[0-9]|[01]?[0-9][0-9]?)$')){
    return <span className="error"><i className="fa fa-exclamation warning"> IP 주소 형식이 아닙니다.</i></span>;
  }
};

export const dashNumber = (value, e) => {
  if ( (value.toString().trim().length > 0) && !validator.matches(value,'^[0-9\-]*$')){
    return <span className="error"><i className="fa fa-exclamation warning"> 숫자, - 만 입력가능</i></span>;
  }
};

export const bizRegisterNumber = (value, e) => {
  if ( (value.toString().trim().length > 0) && !validator.matches(value,'[0-9]{3}-[0-9]{2}-[0-9]{5}')){
    return <span className="error"><i className="fa fa-exclamation warning"> 예) 000-00-0000</i></span>;
  }
};

export const upperCaseUnderbarDashNumber = (value, e) => {
  if ( (value.toString().trim().length > 0) && !validator.matches(value,'^[A-Z0-9_\-]*$')){
    return <span className="error"><i className="fa fa-exclamation warning"> 숫자,영문대문자,-,_ 만 입력가능</i></span>;
  }
};
