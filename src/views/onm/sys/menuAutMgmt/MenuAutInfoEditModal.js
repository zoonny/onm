import React from 'react';
import { Button, Card, CardBody, CardHeader, Modal, CardFooter } from 'reactstrap';
import {
  Form,
  Button as ValidButton,
} from 'views/comn/validation/FormValidation';
import { GetConstants, Constants } from 'libs/Constants';

const EditModal = ({
  title,
  editForm,
  formId,
  edit,
  toggle,
  onSubmit,
  onCancel,
  onDelete,
  className,
}) => {
  return (
    <Modal isOpen={edit.visible} toggle={toggle} className={className}>
      <Card>
      <Form
            id={formId}
            action=""
            method="post"
            className="form-horizontal"
            onSubmit={onSubmit}
          >
        <CardHeader>
          <strong>{title}</strong> {GetConstants.getEditTitle(edit.mode)}
        </CardHeader>
        <CardBody>          
            {editForm}
        </CardBody>
        <CardFooter>
        {(edit.mode === Constants.EDIT_MODE.WRITE) && (
              <>
                <ValidButton type="submit" size="sm" color="primary">
                  <i className="fa fa-check" />{' '}
                  {GetConstants.getEditTitle(edit.mode)}
                </ValidButton>
              </>
            )}          
        {(edit.mode === Constants.EDIT_MODE.EDIT) && (
              <>
                <ValidButton type="submit" size="sm" color="primary">
                  <i className="fa fa-check" />{' '}
                  {GetConstants.getEditTitle(edit.mode)}
                </ValidButton>
                <Button id={formId} onClick={onDelete} size="sm" color="primary">
                  <i className="fa fa-check" />{' '}
                  삭제
                </Button>                
              </>
            )}  
          <Button type="reset" size="sm" onClick={onCancel}>
              <i className="fa fa-remove" /> {Constants.BUTTON.CLOSE}
          </Button>
        </CardFooter>
        </Form>
      </Card>
    </Modal>
  );
};

export default EditModal;
