import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as setlTgtInfoActions from 'store/setlBase/setlTgtMgmt/setlTgtInfo';
import { Constants } from 'libs/Constants';

import SetlTgtInfoSearch from 'views/onm/setlBase/setlTgtMgmt/SetlTgtInfoSearch';
import SetlTgtInfoList from 'views/onm/setlBase/setlTgtMgmt/SetlTgtInfoList';
import Paging from 'views/comn/paging/Paging';
import EditModal from 'views/comn/modal/EditModal';
import SetlTgtInfoEditForm from 'views/onm/setlBase/setlTgtMgmt/SetlTgtInfoEditForm';

import InputParser from 'libs/InputParser';

import withPaging from 'containers/comn/hoc/withPaging';
import withEditModal from 'containers/comn/hoc/withEditModal';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { toast } from 'react-toastify'

class SetlTgtInfoContainer extends Component {
  // SetlTgtInfoContainer
  componentDidMount() {
    this.initialize();
    this.getSetlTgtInfoList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getSetlTgtInfoList(nextProps.paging.page);
    }

    return true;
  }

  // SetlTgtInfoList
  initialize = () => {
    const { SetlTgtInfoActions } = this.props;

    SetlTgtInfoActions.initialize();
  };

  getSetlTgtInfoList = async (page) => {
    const { search, paging, SetlTgtInfoActions, alert } = this.props;

    try {
      await SetlTgtInfoActions.getSetlTgtInfoList({
        setlItemCd : search.setlItemCd,
        ptnrId : search.ptnrId,
        includeHistYn : search.includeHistYn,
        page: page ? page : paging.page,
      });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  // SetlTgtInfoSearch
  handleSearch = e => {
    this.getSetlTgtInfoList();
  };

  handleSearchInputChange = e => {
    const { SetlTgtInfoActions } = this.props;
    const { name, value } = e.target;

    SetlTgtInfoActions.changeSearchInput({
      name,
      value,
    });
  };

  handleKeyPress = e => {
    if (e.charCode === 13){
      this.getSetlTgtInfoList();
    }
  };

  // PostItem
  handleItemWrite = e => {
    const { SetlTgtInfoActions, onEditOpenForWrite } = this.props;

    SetlTgtInfoActions.initializeSetlTgtInfo();

    onEditOpenForWrite();
  };

  handleItemClick = async e => {
    const { SetlTgtInfoActions, onEditOpenForRead, alert } = this.props;

    try {
      await SetlTgtInfoActions.getSetlTgtInfo({id: e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }

    onEditOpenForRead();
  };

  handleItemEdit = async e => {
    const { SetlTgtInfoActions, onEditOpenForEdit, alert } = this.props;
    
    if(e.target.id === ''){
      toast('수정할 정산 대상을 선택해 주세요.');
    } else {
      try {
        await SetlTgtInfoActions.getSetlTgtInfo({id: e.target.id});
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
      }
      
      onEditOpenForEdit();
    }
  };

  handleItemDelete = e => {
    const { BaseActions } = this.props;

    if(e.target.id === ''){
      toast('삭제할 정산 대상을 선택해 주세요.');
    } else {
        BaseActions.showModal({
        modalName: Constants.MODAL.CONFIRM,
        title: '정산대상 삭제',
        message: '선택한 정산대상을 삭제하시겠습니까?',
        onConfirm: this.deleteItem,
        args: e.target.id,
      });
    }
  };

  deleteItem = async e => {
    const { BaseActions, SetlTgtInfoActions, alert } = this.props;

    try {
      await SetlTgtInfoActions.removeSetlTgtInfo({id: e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    } finally {
      BaseActions.hideModal({
        modalName: Constants.MODAL.CONFIRM,
      });
    }

    this.getSetlTgtInfoList();
  };

  // SetlTgtInfoEdit
  handleSetlTgtInfoEditInputChange = (e) => {
    const { SetlTgtInfoActions } = this.props;
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

    SetlTgtInfoActions.changeSetlTgtInfoEditInput({
      name,
      value : opt,      
    });
  };

  handleSetlTgtInfoEditSubmit = async e => {
    e.preventDefault();

    const { edit, SetlTgtInfoActions, onEditCancel, alert } = this.props;
    
    const form = e.target;
    const data = new FormData(form);

    InputParser.parseInputData(form, data);

    const setlTgt = {
      setlItemCd: data.get('setlItemCd'),
		  efctStDt: data.get('efctStDt'),
		  efctFnsDt: data.get('efctFnsDt'),
      ptnrId: data.get('ptnrId'),
		  dstrbRate: data.get('dstrbRate'),
		  dstrbYn: data.get('dstrbYn'),
    };

    try {
      switch (edit.mode) {
        case Constants.EDIT_MODE.WRITE:
        if(setlTgt.setlItemCd === null || setlTgt.setlItemCd === ''){
          toast('정산항목명을 선택해주세요.');
        } else if(setlTgt.ptnrId === null || setlTgt.ptnrId === ''){
          toast('파트너명을 선택해주세요.');
        } else {
          await SetlTgtInfoActions.writeSetlTgtInfo(setlTgt);
          onEditCancel();
          this.getSetlTgtInfoList();
        }
        break;
        case Constants.EDIT_MODE.EDIT:
          await SetlTgtInfoActions.editSetlTgtInfo({
            ...setlTgt,
            id: e.target.id,
          });
          onEditCancel();
          this.getSetlTgtInfoList();
          break;
        default:
          console.error('Unknown EditMode:', edit.mode);
          break;
      }
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
      return;
    }
  };

  handleItemChecked = async e => {
    const { SetlTgtInfoActions, checkedRow } = this.props;
    SetlTgtInfoActions.checkedRow({
      checkedRow: e.target.id,
    });
  };

  handleCheckHistYn = async e => {
    const { SetlTgtInfoActions, checkedHistYn } = this.props;
    if(e.target.value === '' || e.target.value === 'N'){
      SetlTgtInfoActions.checkedHistYn({
        checkedHistYn: 'Y',
      });  
    }
    else {
      SetlTgtInfoActions.checkedHistYn({      
        checkedHistYn: 'N',
      });
    }
  }

  render() {
    const {
      setlTgts,
      setlTgt,
      setlItems,
      ptnrs,
      search,
      edit,
      paging,
      lastPage,
      onChangePage,
      onEditCancel,
      checkedRow,
      checkedHistYn,
    } = this.props;

    const {
      handleSearch,
      handleSearchInputChange,
      handleItemWrite,
      handleItemClick,
      handleItemEdit,
      handleItemDelete,
      handleSetlTgtInfoEditSubmit,
      handleSetlTgtInfoEditInputChange,
      handleItemChecked,
      handleCheckHistYn,
      handleKeyPress,
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <SetlTgtInfoSearch
                  search={search}
                  checkedHistYn={checkedHistYn}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}
                  onCheckedHistYn={handleCheckHistYn}
                  onKeyPress={handleKeyPress}
                />
              </CardHeader>
              <CardBody>
                <SetlTgtInfoList
                  setlTgts={setlTgts}
                  onItemClick={handleItemClick}
                  onItemEdit={handleItemEdit}
                  onItemDelete={handleItemDelete}
                  onItemChecked={handleItemChecked}
                  checkedRow={checkedRow}
                  onWrite={handleItemWrite}
                />
                <Paging paging={paging} lastPage={lastPage} onChangePage={onChangePage} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <EditModal
          title={'정산대상'}
          editForm={
            <SetlTgtInfoEditForm
              edit={edit}
              setlItems={setlItems}
              ptnrs={ptnrs}
              setlTgt={setlTgt}
              onChange={handleSetlTgtInfoEditInputChange}
            />
          }
          formId={setlTgt.id}
          edit={edit}
          toggle={onEditCancel}
          onSubmit={handleSetlTgtInfoEditSubmit}
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
    error: state.setlTgtInfo.get('error'),
    pending: state.setlTgtInfo.get('pending'),
    setlTgts: state.setlTgtInfo.get('setlTgts').toJS(),
    setlTgt: state.setlTgtInfo.get('setlTgt').toJS(),
    setlItems: state.setlTgtInfo.get('setlItems').toJS(),
    ptnrs: state.setlTgtInfo.get('ptnrs').toJS(),
    search: state.setlTgtInfo.get('search').toJS(),
    lastPage: state.setlTgtInfo.get('lastPage'),
    checkedRow: state.setlTgtInfo.get('checkedRow'),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    SetlTgtInfoActions: bindActionCreators(setlTgtInfoActions, dispatch),
  }),
)(withRouter(withAlert(withEditModal(withPaging(SetlTgtInfoContainer)))));
