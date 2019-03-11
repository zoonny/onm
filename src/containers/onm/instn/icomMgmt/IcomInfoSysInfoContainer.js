import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as icomInfoSysInfoActions from 'store/instn/icomMgmt/icomInfoSysInfo';
import { Constants } from 'libs/Constants';

import IcomInfoSysInfoSearch from 'views/onm/instn/icomSysMgmt/IcomInfoSysInfoSearch';
import IcomInfoSysInfoList from 'views/onm/instn/icomSysMgmt/IcomInfoSysInfoList';
import Paging from 'views/comn/paging/Paging';
import EditModal from 'views/comn/modal/EditModal';
import IcomInfoSysInfoEditForm from 'views/onm/instn/icomSysMgmt/IcomInfoSysInfoEditForm';

import InputParser from 'libs/InputParser';
import withPaging from 'containers/comn/hoc/withPaging';
import withEditModal from 'containers/comn/hoc/withEditModal';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { isNull } from 'util';

 import { toast } from 'react-toastify'

class IcomInfoSysInfoContainer extends Component {
  
  // IcomInfoSysInfoContainer
  componentDidMount() {
    this.initialize();
    this.getIcomInfoSysInfoList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getIcomInfoSysInfoList(nextProps.paging.page);
    }

    return true;
  }

  // IcomInfoSysInfoList
  initialize = () => {
    const { IcomInfoSysInfoActions } = this.props;

    IcomInfoSysInfoActions.initialize();
  };

  getIcomInfoSysInfoList = async (page) => {
    const { search, paging, IcomInfoSysInfoActions, alert } = this.props;

    try {
        await IcomInfoSysInfoActions.getIcomInfoSysInfoList({
          searchText: search.searchText,
          page: page ? page : paging.page,
        });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  // IcomInfoSysInfoSearch
  handleSearch = e => {   
    this.getIcomInfoSysInfoList();
  };

  handleKeyPress = e => {   
    if ( e.charCode === 13){
      this.getIcomInfoSysInfoList();
    }
  };   

  handleSearchInputChange = e => {
    const { IcomInfoSysInfoActions } = this.props;
    const { name, value } = e.target;

    IcomInfoSysInfoActions.changeSearchInput({
      name,
      value,
    });
  };

  // UserItem
  handleItemWrite = e => {
    const { IcomInfoSysInfoActions, onEditOpenForWrite } = this.props;

    IcomInfoSysInfoActions.initializeIcomInfoSysInfo();

    onEditOpenForWrite();
  };

  handleItemClick = async e => {
    const { IcomInfoSysInfoActions, onEditOpenForRead, alert } = this.props;    
    try {      
      await IcomInfoSysInfoActions.getIcomInfoSysInfo({ptnrId:e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }

    onEditOpenForRead();
  };

  // notify = (message) => toast(message);

  handleItemEdit = async e => {
    
    const { IcomInfoSysInfoActions, onEditOpenForEdit, alert} = this.props;
    if(e.target.id ===''){
      toast('보험사를 선택해 주세요.');
    }
    else{
      try {      
        await IcomInfoSysInfoActions.getIcomInfoSysInfo({ptnrId:e.target.id});            
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
      }
      
      onEditOpenForEdit();
    }   
  };

  handleItemDelete = e => {
    const { BaseActions } = this.props;
    
    if(e.target.id ===''){
      toast('보험사를 선택해 주세요.');
    }
    else{
      BaseActions.showModal({
        modalName: Constants.MODAL.CONFIRM,
        title: '보험사 연동정보 삭제',
        message: '선택한 보험사 연동정보를 삭제하시겠습니까?',
        onConfirm: this.deleteItem,
        args: e.target.id,
      });
    }    
  };

  deleteItem = async e => {
    const { BaseActions, IcomInfoSysInfoActions, alert } = this.props;

    try {
      await IcomInfoSysInfoActions.removeIcomInfoSysInfo({ptnrId:e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    } finally {      
      BaseActions.hideModal({
        modalName: Constants.MODAL.CONFIRM,
      });
    }

    this.getIcomInfoSysInfoList();
  };

  // IcomInfoSysInfoEdit
  handleIcomInfoSysInfoEditInputChange = e => {
    const { IcomInfoSysInfoActions } = this.props;
    const { name, value, options } = e.target;

    let opt;
    if(e.target.type === 'select-one'){ 
      for (let i=0, len = options.length; i < len; i++){      
        if(options[i].selected){
          opt = options[i].value;
        }
      }
      
    }
    else{
      opt = value;
    }  

    IcomInfoSysInfoActions.changeIcomInfoSysInfoEditInput({
      name,
      value,
    });
  };

  handleIcomInfoSysInfoEditSubmit = async e => {
    e.preventDefault();

    const { edit, IcomInfoSysInfoActions, onEditCancel, alert } = this.props;

    const form = e.target;
    const data = new FormData(form);    

    InputParser.parseInputData(form, data);
    
    const medicalInstn = {
      ptnrId: data.get('ptnrId'),            
      sysIpAdr: data.get('sysIpAdr'),
      sysPort: data.get('sysPort'),
    };
    
    try {
      switch (edit.mode) {
        case Constants.EDIT_MODE.WRITE:
          await IcomInfoSysInfoActions.writeIcomInfoSysInfo(medicalInstn);
          break;
        case Constants.EDIT_MODE.EDIT:
          await IcomInfoSysInfoActions.editIcomInfoSysInfo({
            ...medicalInstn,
            ptnrId: e.target.id,
          });
          break;
        default:
          console.error('Unknown EditMode:', edit.mode);
          break;
      }
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
      return;
    } finally {
      onEditCancel();     
    }

    this.getIcomInfoSysInfoList();
  };

  handleItemChecked = async e => {    
    const { IcomInfoSysInfoActions, onEditOpenForRead, alert, checkedMedicalInstn } = this.props;
    IcomInfoSysInfoActions.checkedMedicalInstn({
      checkedMedicalInstn: e.target.id,
    });
  };

  render() {
    const {
      medicalInstnList,
      medicalInstn,
      search,
      edit,
      paging,
      lastPage,
      onChangePage,
      onEditCancel,
      checkedMedicalInstn,
      ptnrIdList,
    } = this.props;

    const {
      handleSearch,
      handleSearchInputChange,
      handleItemWrite,
      handleItemClick,
      handleItemEdit,
      handleItemDelete,
      handleIcomInfoSysInfoEditSubmit,
      handleIcomInfoSysInfoEditInputChange,
      handleItemChecked,
      handleKeyPress,      
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <IcomInfoSysInfoSearch
                  search={search}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}
                  onWrite={handleItemWrite}
                  onKeyPress={handleKeyPress}
                />
              </CardHeader>
              <CardBody>
                <IcomInfoSysInfoList
                  medicalInstnList={medicalInstnList}
                  checkedMedicalInstn={checkedMedicalInstn}
                  onItemClick={handleItemClick}
                  onItemEdit={handleItemEdit}
                  onItemDelete={handleItemDelete}
                  onItemChecked={handleItemChecked}
                  onWrite={handleItemWrite}
                />
                <Paging paging={paging} lastPage={lastPage} onChangePage={onChangePage} />
              </CardBody>
            </Card>
          </Col>
        </Row>        
          <EditModal  title="연동정보 "        
          editForm={
            <IcomInfoSysInfoEditForm
              edit={edit}
              medicalInstn={medicalInstn}
              onChange={handleIcomInfoSysInfoEditInputChange}              
              ptnrIdList={ptnrIdList}
            />
          }
          formId={medicalInstn.ptnrId}
          edit={edit}
          toggle={onEditCancel}
          onSubmit={handleIcomInfoSysInfoEditSubmit}
          onCancel={onEditCancel}
          className={''}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    args: state.base.getIn(['modal', 'confirm', 'args']),
    error: state.icomInfoSysInfo.get('error'),
    pending: state.icomInfoSysInfo.get('pending'),
    medicalInstnList: state.icomInfoSysInfo.get('medicalInstnList').toJS(),
    medicalInstn: state.icomInfoSysInfo.get('medicalInstn').toJS(),
    search: state.icomInfoSysInfo.get('search').toJS(),
    lastPage: state.icomInfoSysInfo.get('lastPage'),
    totalCount: state.icomInfoSysInfo.get('totalCount'),
    checkedMedicalInstn: state.icomInfoSysInfo.get('checkedMedicalInstn'),
    ptnrIdList: state.icomInfoSysInfo.get('ptnrIdList').toJS(),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    IcomInfoSysInfoActions: bindActionCreators(icomInfoSysInfoActions, dispatch),
  }),
)(withRouter(withAlert(withEditModal(withPaging(IcomInfoSysInfoContainer)))));
