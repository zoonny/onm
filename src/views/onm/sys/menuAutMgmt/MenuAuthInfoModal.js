import React, { Component } from 'react';
import { Constants } from 'libs/Constants';

const withTreeEditModal = WrappedComponent => {
  return class extends Component {
    state = {
      editTree: {
        visible: false,
        mode: Constants.EDIT_MODE.WRITE,
        opts: {
          readOnly: false,
        },
      },
    };

    handleTreeEditOpenForEdit = e => {
      this.setState({
        ...this.state,
        editTree: {
          ...this.state.editTree,
          visible: true,
          mode: Constants.EDIT_MODE.EDIT,
          opts: {
            readOnly: false,
          },
        },
      });
    };

    handleTreeEditCancel = e => {
      this.setState({
        ...this.state,
        editTree: {
          ...this.state.editTree,
          visible: false,
        },
      });
    };

    render() {
      const { editTree } = this.state;
      const {
        handleTreeEditOpenForEdit,        
        handleTreeEditCancel,
      } = this;

      return (
        <WrappedComponent
          {...this.props}
          editTree={editTree}          
          onTreeEditOpenForEdit={handleTreeEditOpenForEdit}
          onTreeEditCancel={handleTreeEditCancel}
        />
      );
    }
  };
};

export default withTreeEditModal;
