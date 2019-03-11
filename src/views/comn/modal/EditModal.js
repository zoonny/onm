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
  className,
}) => {
  return (    
    <Modal isOpen={edit.visible} toggle={toggle} className="modal-dialogRow" size="lg">
      <Card>
        <CardHeader>
          <strong>{title}</strong> {GetConstants.getEditTitle(edit.mode)}
        </CardHeader>
        <CardBody>
          <Form
            id={formId}
            action=""
            method="post"
            className="form-horizontal"
            onSubmit={onSubmit}
          >
            {editForm}
            <div className="Inh_newBtnset">
            {(edit.mode === Constants.EDIT_MODE.WRITE ||
              edit.mode === Constants.EDIT_MODE.EDIT) && (
              <>
                <ValidButton type="submit" size="sm" color="primary">
                  <i className="fa fa-check" />{' '}
                  {GetConstants.getEditTitle(edit.mode)}
                </ValidButton>
              </>
            )}
            <Button type="reset" size="sm" onClick={onCancel}>
                <i className="fa fa-remove" /> {Constants.BUTTON.CLOSE}
            </Button>
            </div>
          </Form>
        </CardBody>
        {/* <CardFooter>
        </CardFooter> */}
      </Card>
    </Modal>
  );
};

export default EditModal;
