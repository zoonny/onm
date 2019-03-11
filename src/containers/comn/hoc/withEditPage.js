import React, { Component } from 'react';
import { Constants } from 'libs/Constants';

const withEditPage = WrappedComponent => {
  return class extends Component {
    state = {
      edit: {
        visible: false,
        mode: Constants.EDIT_MODE.NONE,
        opts: {
          readOnly: false,
        },
      },
    };

    handleEditOpenForWrite = e => {
      this.setState({
        ...this.state,
        edit: {
          ...this.state.edit,
          visible: true,
          mode: Constants.EDIT_MODE.WRITE,
          opts: {
            readOnly: false,            
          },
        },
      });
    };

    handleEditOpenForRead = e => {
      this.setState({
        ...this.state,
        edit: {
          ...this.state.edit,
          visible: true,
          mode: Constants.EDIT_MODE.READ,
          opts: {
            readOnly: true,
          },
        },
      });
    };

    handleEditOpenForEdit = e => {
      this.setState({
        ...this.state,
        edit: {
          ...this.state.edit,
          visible: true,
          mode: Constants.EDIT_MODE.EDIT,
          opts: {
            readOnly: true,
          },
        },
      });
    };

    handleEditCancel = e => {
      this.setState({
        ...this.state,
        edit: {
          ...this.state.edit,
          visible: false,
          mode:Constants.EDIT_MODE.NONE,
        },
      });
    };

    render() {
      const { edit } = this.state;
      const {
        handleEditOpenForWrite,
        handleEditOpenForRead,
        handleEditOpenForEdit,
        handleEditCancel,
      } = this;

      return (
        <WrappedComponent
          {...this.props}
          edit={edit}
          onEditOpenForWrite={handleEditOpenForWrite}
          onEditOpenForRead={handleEditOpenForRead}
          onEditOpenForEdit={handleEditOpenForEdit}
          onEditCancel={handleEditCancel}
        />
      );
    }
  };
};

export default withEditPage;
