import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as icomInfoActions from 'store/instn/icomMgmt/icomInfo';
import { Constants } from 'libs/Constants';

import IcomInfoSearch from 'views/onm/instn/icomMgmt/IcomInfoSearch';
import IcomInfoList from 'views/onm/instn/icomMgmt/IcomInfoList';
import Paging from 'views/comn/paging/Paging';
import EditPage from 'views/comn/modal/EditPage';
import EditModal from 'views/comn/modal/EditModal';
import IcomInfoEditPage from 'views/onm/instn/icomMgmt/IcomInfoEditPage';

import InputParser from 'libs/InputParser';
import withPaging from 'containers/comn/hoc/withPaging';
import withEditPage from 'containers/comn/hoc/withEditPage';
import withEditModal from 'containers/comn/hoc/withEditModal';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { isNull } from 'util';

 import { toast } from 'react-toastify'

class IcomInfoContainer extends Component {
  
  // IcomInfoContainer
  componentDidMount() {
    this.initialize();
    this.getIcomInfoList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getIcomInfoList(nextProps.paging.page);
    }

    return true;
  }

  // IcomInfoList
  initialize = () => {
    const { IcomInfoActions } = this.props;

    IcomInfoActions.initialize();
  };

  getIcomInfoList = async (page) => {
    const { search, paging, IcomInfoActions, alert } = this.props;

    try {
        await IcomInfoActions.getIcomInfoList({
          searchText: search.searchText,
          page: page ? page : paging.page,
        });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  // IcomInfoSearch
  handleSearch = e => {   
    this.getIcomInfoList();
  };

  handleKeyPress = e => {   
    if ( e.charCode === 13){
      this.getIcomInfoList();
    }
  };   

  handleSearchInputChange = e => {
    const { IcomInfoActions } = this.props;
    const { name, value } = e.target;

    IcomInfoActions.changeSearchInput({
      name,
      value,
    });
  };

  // UserItem
  handleItemWrite = e => {
    const { IcomInfoActions, onEditOpenForWrite } = this.props;

    IcomInfoActions.initializeIcomInfo();

    onEditOpenForWrite();
  };

  handleItemClick = async e => {
    const { IcomInfoActions, onEditOpenForRead, alert } = this.props;    
    try {      
      await IcomInfoActions.getIcomInfo({ptnrId:e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }

    onEditOpenForRead();
  };

  // notify = (message) => toast(message);

  handleItemEdit = async e => {
    
    const { IcomInfoActions, onEditOpenForEdit, alert} = this.props;
    if(e.target.id ===''){
      toast('보험사를 선택해 주세요.');
    }
    else{
      try {      
        await IcomInfoActions.getIcomInfo({ptnrId:e.target.id});            
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
        title: '보험사 삭제',
        message: '선택한 보험사를 삭제하시겠습니까?',
        onConfirm: this.deleteItem,
        args: e.target.id,
      });
    }    
  };

  deleteItem = async e => {
    const { BaseActions, IcomInfoActions, alert } = this.props;

    try {
      await IcomInfoActions.removeIcomInfo({ptnrId:e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    } finally {      
      BaseActions.hideModal({
        modalName: Constants.MODAL.CONFIRM,
      });
    }

    this.getIcomInfoList();
  };

  // IcomInfoEdit
  handleIcomInfoEditInputChange = e => {
    const { IcomInfoActions } = this.props;
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

    IcomInfoActions.changeSearchInput({
      name,
      value,
    });
  };

  handleIcomInfoEditSubmit = async e => {
    e.preventDefault();

    const { edit, IcomInfoActions, onEditCancel, alert } = this.props;

    const form = e.target;
    const data = new FormData(form);    

    InputParser.parseInputData(form, data);
    
    const icom = {
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
    };
    
    try {
      switch (edit.mode) {
        case Constants.EDIT_MODE.WRITE:
          await IcomInfoActions.writeIcomInfo(icom);
          break;
        case Constants.EDIT_MODE.EDIT:
          await IcomInfoActions.editIcomInfo({
            ...icom,
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

    this.getIcomInfoList();
  };

  handleItemChecked = async e => {    
    const { IcomInfoActions, onEditOpenForRead, alert, checkedIcom } = this.props;
    IcomInfoActions.checkedIcom({
      checkedIcom: e.target.id,
    });
  };

  render() {
    const {
      icomList,
      icom,
      search,
      edit,
      paging,
      lastPage,
      onChangePage,
      onEditCancel,
      checkedIcom,
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
      handleIcomInfoEditSubmit,
      handleIcomInfoEditInputChange,
      handleItemChecked,
      handleKeyPress,      
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <IcomInfoSearch
                  search={search}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}
                  onWrite={handleItemWrite}
                  onKeyPress={handleKeyPress}
                />
              </CardHeader>
              <CardBody>
                <IcomInfoList
                  icomList={icomList}
                  checkedIcom={checkedIcom}
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
          <EditModal  title="보험사 "        
          editForm={
            <IcomInfoEditPage
              edit={edit}
              icom={icom}
              onChange={handleIcomInfoEditInputChange}              
              bankCdList={bankCdList}
              chCdList={chCdList}
            />
          }
          formId={icom.ptnrId}
          edit={edit}
          toggle={onEditCancel}
          onSubmit={handleIcomInfoEditSubmit}
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
    error: state.icomInfo.get('error'),
    pending: state.icomInfo.get('pending'),
    icomList: state.icomInfo.get('icomList').toJS(),
    icom: state.icomInfo.get('icom').toJS(),
    search: state.icomInfo.get('search').toJS(),
    lastPage: state.icomInfo.get('lastPage'),
    totalCount: state.icomInfo.get('totalCount'),
    checkedIcom: state.icomInfo.get('checkedIcom'),
    bankCdList: state.icomInfo.get('bankCdList').toJS(),
    chCdList: state.icomInfo.get('chCdList').toJS(),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    IcomInfoActions: bindActionCreators(icomInfoActions, dispatch),
  }),
)(withRouter(withAlert(withEditModal(withPaging(IcomInfoContainer)))));
