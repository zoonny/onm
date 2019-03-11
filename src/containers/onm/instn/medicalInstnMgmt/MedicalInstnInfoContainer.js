import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as medicalInstnInfoActions from 'store/instn/medicalInstnMgmt/medicalInstnInfo';
import { Constants } from 'libs/Constants';

import MedicalInstnInfoSearch from 'views/onm/instn/medicalInstnMgmt/MedicalInstnInfoSearch';
import MedicalInstnInfoList from 'views/onm/instn/medicalInstnMgmt/MedicalInstnInfoList';
import Paging from 'views/comn/paging/Paging';
import EditModal from 'views/comn/modal/EditModal';
import MedicalInstnInfoEditPage from 'views/onm/instn/medicalInstnMgmt/MedicalInstnInfoEditPage';
import MedicalInstnInfoWritePage from 'views/onm/instn/medicalInstnMgmt/MedicalInstnInfoWritePage';

import InputParser from 'libs/InputParser';
import withPaging from 'containers/comn/hoc/withPaging';
import withEditModal from 'containers/comn/hoc/withEditModal';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { isNull } from 'util';

 import { toast } from 'react-toastify'

class MedicalInstnInfoContainer extends Component {
  
  // MedicalInstnInfoContainer
  componentDidMount() {
    this.initialize();
    this.getMedicalInstnInfoList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getMedicalInstnInfoList(nextProps.paging.page);
    }

    return true;
  }

  // MedicalInstnInfoList
  initialize = () => {
    const { MedicalInstnInfoActions } = this.props;

    MedicalInstnInfoActions.initialize();
  };

  getMedicalInstnInfoList = async (page) => {
    const { search, paging, MedicalInstnInfoActions, alert } = this.props;

    try {
        await MedicalInstnInfoActions.getMedicalInstnInfoList({
          searchText: search.searchText,
          page: page ? page : paging.page,
        });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  // MedicalInstnInfoSearch
  handleSearch = e => {   
    this.getMedicalInstnInfoList();
  };

  handleKeyPress = e => {   
    if ( e.charCode === 13){
      this.getMedicalInstnInfoList();
    }
  };   

  handleSearchInputChange = e => {
    const { MedicalInstnInfoActions } = this.props;
    const { name, value } = e.target;

    MedicalInstnInfoActions.changeSearchInput({
      name,
      value,
    });
  };

  // UserItem
  handleItemWrite = e => {
    const { MedicalInstnInfoActions, onEditOpenForWrite } = this.props;

    MedicalInstnInfoActions.initializeMedicalInstnInfo();

    onEditOpenForWrite();
  };

  handleItemClick = async e => {
    const { MedicalInstnInfoActions, onEditOpenForRead, alert } = this.props;    
    try {      
      await MedicalInstnInfoActions.getMedicalInstnInfo({ptnrId:e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }

    onEditOpenForRead();
  };

  // notify = (message) => toast(message);

  handleItemEdit = async e => {
    
    const { MedicalInstnInfoActions, onEditOpenForEdit, alert} = this.props;
    if(e.target.id ===''){
      toast('의료기관를 선택해 주세요.');
    }
    else{
      try {      
        await MedicalInstnInfoActions.getMedicalInstnInfo({ptnrId:e.target.id});            
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
        title: '의료중개기관 삭제',
        message: '선택한 의료중개기관를 삭제하시겠습니까?',
        onConfirm: this.deleteItem,
        args: e.target.id,
      });
    }    
  };

  deleteItem = async e => {
    const { BaseActions, MedicalInstnInfoActions, alert } = this.props;

    try {
      await MedicalInstnInfoActions.removeMedicalInstnInfo({ptnrId:e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    } finally {      
      BaseActions.hideModal({
        modalName: Constants.MODAL.CONFIRM,
      });
    }

    this.getMedicalInstnInfoList();
  };

  // MedicalInstnInfoEdit
  handleMedicalInstnInfoEditInputChange = e => {
    const { MedicalInstnInfoActions } = this.props;
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

    MedicalInstnInfoActions.changeMedicalInstnInfoEditInput({
      name,
      value,
    });
  };

  handleMedicalInstnInfoEditSubmit = async e => {
    e.preventDefault();

    const { edit, MedicalInstnInfoActions, onEditCancel, alert } = this.props;

    const form = e.target;
    const data = new FormData(form);    

    InputParser.parseInputData(form, data);
    
    const medicalInstn = {
      ptnrId: data.get('ptnrId'),
      ptnrNm: data.get('ptnrNm'),
      bizrNo: data.get('bizrNo'),
      telNo: data.get('telNo'),
      email: data.get('email'),
      bankCd: data.get('bankCd'),
      bnkacnNo: data.get('bnkacnNo'),
      dposrNm: data.get('dposrNm'),
      ptnrDivCd: data.get('ptnrDivCd'),
      tkcgr: data.get('tkcgr'),
      tkcgDept: data.get('tkcgDept'),
      adr: data.get('adr'),
      chCd: data.get('chCd'),
    };
    
    try {
      switch (edit.mode) {
        case Constants.EDIT_MODE.WRITE:
          await MedicalInstnInfoActions.writeMedicalInstnInfo(medicalInstn);
          break;
        case Constants.EDIT_MODE.EDIT:
          await MedicalInstnInfoActions.editMedicalInstnInfo({
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

    this.getMedicalInstnInfoList();
  };

  handleItemChecked = async e => {     
    const { MedicalInstnInfoActions, onEditOpenForRead, alert, checkedMedicalInstn } = this.props;
    MedicalInstnInfoActions.checkedMedicalInstn({
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
      bankCdList,
      chCdList,
    } = this.props;

    const {
      handleSearch,
      handleSearchInputChange,
      handleItemWrite,
      handleItemClick,
      handleItemEdit,
      handleItemDelete,
      handleMedicalInstnInfoEditSubmit,
      handleMedicalInstnInfoEditInputChange,
      handleItemChecked,
      handleKeyPress,      
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <MedicalInstnInfoSearch
                  search={search}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}
                  onWrite={handleItemWrite}
                  onKeyPress={handleKeyPress}
                />
              </CardHeader>
              <CardBody>
                <MedicalInstnInfoList
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
          <EditModal  title="의료중개기관 "        
          editForm={
            <MedicalInstnInfoEditPage
              edit={edit}
              medicalInstn={medicalInstn}
              onChange={handleMedicalInstnInfoEditInputChange}              
              bankCdList={bankCdList}
              chCdList={chCdList}
            />
          }
          formId={medicalInstn.ptnrId}
          edit={edit}
          toggle={onEditCancel}
          onSubmit={handleMedicalInstnInfoEditSubmit}
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
    error: state.medicalInstnInfo.get('error'),
    pending: state.medicalInstnInfo.get('pending'),
    medicalInstnList: state.medicalInstnInfo.get('medicalInstnList').toJS(),
    medicalInstn: state.medicalInstnInfo.get('medicalInstn').toJS(),
    search: state.medicalInstnInfo.get('search').toJS(),
    lastPage: state.medicalInstnInfo.get('lastPage'),
    totalCount: state.medicalInstnInfo.get('totalCount'),
    checkedMedicalInstn: state.medicalInstnInfo.get('checkedMedicalInstn'),
    bankCdList: state.medicalInstnInfo.get('bankCdList').toJS(),
    chCdList: state.medicalInstnInfo.get('chCdList').toJS(),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    MedicalInstnInfoActions: bindActionCreators(medicalInstnInfoActions, dispatch),
  }),
)(withRouter(withAlert(withEditModal(withPaging(MedicalInstnInfoContainer)))));
