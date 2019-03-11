import React, { Component } from 'react';
import { Constants } from 'libs/Constants';

const withEditModal = WrappedComponent => {
  return class extends Component {
    state = {
      edit: {
        visible: false,
        mode: Constants.EDIT_MODE.WRITE,
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

    //코드등록용
    handleEditOpenForWriteCode = e => {
      this.setState({
        ...this.state,
        edit: {
          ...this.state.edit,
          id: e.id,
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

    //코드 상세
    handleEditOpenForReadCode = e => {
      this.setState({
        ...this.state,
        edit: {
          ...this.state.edit,
          id: e.id,
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
            readOnly: false,
          },          
        },        
      });
    };

    //코드수정용
    handleEditOpenForEditCode = e => {
      this.setState({
        ...this.state,
        edit: {
          ...this.state.edit,
          id: e.id,
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
        },
      });
    };

    render() {
      const { edit } = this.state;
      const {
        handleEditOpenForWrite,
        handleEditOpenForWriteCode,
        handleEditOpenForRead,
        handleEditOpenForReadCode,
        handleEditOpenForEdit,
        handleEditOpenForEditCode,
        handleEditCancel,
      } = this;

      return (
        <WrappedComponent
          {...this.props}
          edit={edit}
          onEditOpenForWrite={handleEditOpenForWrite}
          onEditOpenForWriteCode={handleEditOpenForWriteCode}
          onEditOpenForRead={handleEditOpenForRead}
          onEditOpenForReadCode={handleEditOpenForReadCode}
          onEditOpenForEdit={handleEditOpenForEdit}
          onEditOpenForEditCode={handleEditOpenForEditCode}
          onEditCancel={handleEditCancel}
        />
      );
    }
  };
};

export default withEditModal;
