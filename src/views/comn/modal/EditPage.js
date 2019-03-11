import React from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter } from 'reactstrap';
import {
  Form,
  Button as ValidButton,
} from 'views/comn/validation/FormValidation';
import { GetConstants, Constants } from 'libs/Constants';

const EditPage = ({
  title,
  editForm,
  formId,
  edit,
  toggle,
  onSubmit,
  onCancel,
  className,
}) => {
  if(edit.mode === Constants.EDIT_MODE.WRITE || edit.mode === Constants.EDIT_MODE.EDIT || edit.mode === Constants.EDIT_MODE.READ){
    return (           
      <Form
        id={formId}
        action=""
        method="post"            
        className="form-horizontal"
        onSubmit={onSubmit}            
      >
       {editForm}       
      </Form>
    );
  }
  else{
    return (           
      <Form
        id={formId}
        action=""
        method="post"            
        className="form-horizontal hidden"
        onSubmit={onSubmit}            
      >
       {editForm}        
      </Form>
    );
  } 
};

export default EditPage;
