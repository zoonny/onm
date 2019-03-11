import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as medicalInstnIfSysInfoActions from 'store/instn/medicalInstnMgmt/medicalInstnIfSysInfo';
import { Constants } from 'libs/Constants';

import MedicalInstnIfSysInfoSearch from 'views/onm/instn/medicalInstnIfSysMgmt/MedicalInstnIfSysInfoSearch';
import MedicalInstnIfSysInfoList from 'views/onm/instn/medicalInstnIfSysMgmt/MedicalInstnIfSysInfoList';
import Paging from 'views/comn/paging/Paging';
import EditModal from 'views/comn/modal/EditModal';
import MedicalInstnIfSysInfoEditForm from 'views/onm/instn/medicalInstnIfSysMgmt/MedicalInstnIfSysInfoEditForm';

import InputParser from 'libs/InputParser';
import withPaging from 'containers/comn/hoc/withPaging';
import withEditModal from 'containers/comn/hoc/withEditModal';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { isNull } from 'util';

 import { toast } from 'react-toastify'

class MedicalInstnIfSysInfoContainer extends Component {
  
  // MedicalInstnIfSysInfoContainer
  componentDidMount() {
    this.initialize();
    this.getMedicalInstnIfSysInfoList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getMedicalInstnIfSysInfoList(nextProps.paging.page);
    }

    return true;
  }

  // MedicalInstnIfSysInfoList
  initialize = () => {
    const { MedicalInstnIfSysInfoActions } = this.props;

    MedicalInstnIfSysInfoActions.initialize();
  };

  getMedicalInstnIfSysInfoList = async (page) => {
    const { search, paging, MedicalInstnIfSysInfoActions, alert } = this.props;

    try {
        await MedicalInstnIfSysInfoActions.getMedicalInstnIfSysInfoList({
          searchText: search.searchText,
          page: page ? page : paging.page,
        });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  // MedicalInstnIfSysInfoSearch
  handleSearch = e => {   
    this.getMedicalInstnIfSysInfoList();
  };

  handleKeyPress = e => {   
    if ( e.charCode === 13){
      this.getMedicalInstnIfSysInfoList();
    }
  };   

  handleSearchInputChange = e => {
    const { MedicalInstnIfSysInfoActions } = this.props;
    const { name, value } = e.target;

    MedicalInstnIfSysInfoActions.changeSearchInput({
      name,
      value,
    });
  };

  // UserItem
  handleItemWrite = e => {
    const { MedicalInstnIfSysInfoActions, onEditOpenForWrite } = this.props;

    MedicalInstnIfSysInfoActions.initializeMedicalInstnIfSysInfo();

    onEditOpenForWrite();
  };

  handleItemClick = async e => {
    const { MedicalInstnIfSysInfoActions, onEditOpenForRead, alert } = this.props;    
    try {      
      await MedicalInstnIfSysInfoActions.getMedicalInstnIfSysInfo({ptnrId:e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }

    onEditOpenForRead();
  };

  // notify = (message) => toast(message);

  handleItemEdit = async e => {
    
    const { MedicalInstnIfSysInfoActions, onEditOpenForEdit, alert} = this.props;
    if(e.target.id ===''){
      toast('의료기관를 선택해 주세요.');
    }
    else{
      try {      
        await MedicalInstnIfSysInfoActions.getMedicalInstnIfSysInfo({ptnrId:e.target.id});            
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
      }
      
      onEditOpenForEdit();
    }   
  };

  handleItemDelete = e => {
    const { BaseActions } = this.props;
    
    if(e.target.id ===''){
      toast('의료중개기관를 선택해 주세요.');
    }
    else{
      BaseActions.showModal({
        modalName: Constants.MODAL.CONFIRM,
        title: '의료중개기관 연동정보 삭제',
        message: '선택한 의료중개기관 연동정보를 삭제하시겠습니까?',
        onConfirm: this.deleteItem,
        args: e.target.id,
      });
    }    
  };

  deleteItem = async e => {
    const { BaseActions, MedicalInstnIfSysInfoActions, alert } = this.props;

    try {
      await MedicalInstnIfSysInfoActions.removeMedicalInstnIfSysInfo({ptnrId:e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    } finally {      
      BaseActions.hideModal({
        modalName: Constants.MODAL.CONFIRM,
      });
    }

    this.getMedicalInstnIfSysInfoList();
  };

  // MedicalInstnIfSysInfoEdit
  handleMedicalInstnIfSysInfoEditInputChange = e => {
    const { MedicalInstnIfSysInfoActions } = this.props;
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

    MedicalInstnIfSysInfoActions.changeMedicalInstnIfSysInfoEditInput({
      name,
      value,
    });
  };

  handleMedicalInstnIfSysInfoEditSubmit = async e => {
    e.preventDefault();

    const { edit, MedicalInstnIfSysInfoActions, onEditCancel, alert } = this.props;

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
          await MedicalInstnIfSysInfoActions.writeMedicalInstnIfSysInfo(medicalInstn);
          break;
        case Constants.EDIT_MODE.EDIT:
          await MedicalInstnIfSysInfoActions.editMedicalInstnIfSysInfo({
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

    this.getMedicalInstnIfSysInfoList();
  };

  handleItemChecked = async e => {    
    const { MedicalInstnIfSysInfoActions, onEditOpenForRead, alert, checkedMedicalInstn } = this.props;
    MedicalInstnIfSysInfoActions.checkedMedicalInstn({
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
      handleMedicalInstnIfSysInfoEditSubmit,
      handleMedicalInstnIfSysInfoEditInputChange,
      handleItemChecked,
      handleKeyPress,      
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <MedicalInstnIfSysInfoSearch
                  search={search}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}
                  onWrite={handleItemWrite}
                  onKeyPress={handleKeyPress}
                />
              </CardHeader>
              <CardBody>
                <MedicalInstnIfSysInfoList
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
          <EditModal  title="의료중개기관 연동정보 "        
          editForm={
            <MedicalInstnIfSysInfoEditForm
              edit={edit}
              medicalInstn={medicalInstn}
              onChange={handleMedicalInstnIfSysInfoEditInputChange}              
              ptnrIdList={ptnrIdList}
            />
          }
          formId={medicalInstn.ptnrId}
          edit={edit}
          toggle={onEditCancel}
          onSubmit={handleMedicalInstnIfSysInfoEditSubmit}
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
    error: state.medicalInstnIfSysInfo.get('error'),
    pending: state.medicalInstnIfSysInfo.get('pending'),
    medicalInstnList: state.medicalInstnIfSysInfo.get('medicalInstnList').toJS(),
    medicalInstn: state.medicalInstnIfSysInfo.get('medicalInstn').toJS(),
    search: state.medicalInstnIfSysInfo.get('search').toJS(),
    lastPage: state.medicalInstnIfSysInfo.get('lastPage'),
    totalCount: state.medicalInstnIfSysInfo.get('totalCount'),
    checkedMedicalInstn: state.medicalInstnIfSysInfo.get('checkedMedicalInstn'),
    ptnrIdList: state.medicalInstnIfSysInfo.get('ptnrIdList').toJS(),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    MedicalInstnIfSysInfoActions: bindActionCreators(medicalInstnIfSysInfoActions, dispatch),
  }),
)(withRouter(withAlert(withEditModal(withPaging(MedicalInstnIfSysInfoContainer)))));
