import React from 'react';
import { Button, Card, CardBody, CardHeader, Modal, CardFooter } from 'reactstrap';
import {
  Form,
  Button as ValidButton,
} from 'views/comn/validation/FormValidation';
import { GetConstants, Constants } from 'libs/Constants';

const MenuAutInfoTreeModal = ({
  title,
  treeForm,
  formId,
  editTree,
  toggle,
  onTreeSubmit,
  onTreeCancel,
  className,
}) => {
  return (
    <Modal isOpen={editTree.visible} toggle={toggle} className={className}>
      <Card>
      <Form
            action=""
            method="post"
            className="form-horizontal"
            onSubmit={onTreeSubmit}
          >
        <CardHeader>
          <strong>{title}</strong> {GetConstants.getEditTitle(editTree.mode)}
        </CardHeader>
        <CardBody>
            {treeForm}   
        </CardBody>
        <CardFooter>
          <Button id={formId} type="submit" size="sm" color="primary">
            <i className="fa fa-check" />{' '}{GetConstants.getEditTitle(editTree.mode)}
          </Button>          
          <Button type="reset" size="sm" onClick={onTreeCancel}>
              <i className="fa fa-remove" /> {Constants.BUTTON.CLOSE}
          </Button>
        </CardFooter>
        </Form>
      </Card>
    </Modal>
  );
};

export default MenuAutInfoTreeModal;
