//COMMON
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as setlBillTrtActions from 'store/setlTxn/setlBillTrtMgmt/setlBillTrt';
import { Constants } from 'libs/Constants';

import withPaging from 'containers/comn/hoc/withPaging';
import withEditModal from 'containers/comn/hoc/withEditModal';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';

//VIEW
import Paging from 'views/comn/paging/Paging';
import EditModal from 'views/comn/modal/EditModal';
import SetlBillTrtSearch from 'views/onm/setlTxn/setlBillTrtMgmt/SetlBillTrtSearch';
import SetlBillTrtList from 'views/onm/setlTxn/setlBillTrtMgmt/SetlBillTrtList';
import SetlCloEditForm from 'views/onm/setlTxn/setlBillTrtMgmt/SetlCloEditForm';

import InputParser from 'libs/InputParser';

import { toast } from 'react-toastify';

class SetlBillTrtContainer extends Component {
  // SetlBillTrtContainer
  componentDidMount() {
    this.getSetlBillTrtList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getSetlBillTrtList(null, nextProps.paging.page);
    }

    return true;
  }

  // SetlBillTrtActions
  initialize = () => {
    const { SetlBillTrtActions } = this.props;

    SetlBillTrtActions.initialize();
  };

  getSetlBillTrtList = async ( page) => {
    const { search, paging, SetlBillTrtActions, alert } = this.props;

    try {
      await SetlBillTrtActions.getSetlBillTrtList({
        startDt: search.startDt,
        endDt: search.endDt,
        ptnrId : search.ptnrId,
        page: page ? page : paging.page,
      });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  // SetlBillTrtSearch
  handleSearch = e => {
    this.getSetlBillTrtList();
  };

  handleItemEdit = async e => {
    const { SetlBillTrtActions, onEditOpenForEdit, alert } = this.props;

    if(e.target.id ===''){
      toast('정산청구내역을 선택해 주세요.');
    }
    else{
      try {
        await SetlBillTrtActions.getSetlBillTrt({id: e.target.id});
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
      }
      onEditOpenForEdit();
    }
  };

  handleItemDelete = e => {
    const { BaseActions } = this.props;

    console.log("e.target.id: ", e.target.id);
    if(e.target.id ===''){
      toast('정산청구내역을 선택해 주세요.');
    }
    else{
      BaseActions.showModal({
        modalName: Constants.MODAL.CONFIRM,
        title: '정산마감 취소',
        message: '선택한 정산마감을 취소하시겠습니까?',
        onConfirm: this.deleteItem,
        args: e.target.id,
      });
    }
  };

  deleteItem = async e => {
    const { BaseActions, SetlBillTrtActions, alert } = this.props;

    try {
      await SetlBillTrtActions.removeSetlItemCloYn({id: e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    } finally {
      BaseActions.hideModal({
        modalName: Constants.MODAL.CONFIRM,
      });
    }

    this.getSetlBillTrtList();
  };

  handleSearchInputChange = (e) => {
    console.log('검색 PopupINPUTChange', e);
    const { SetlBillTrtActions } = this.props;
    const { name, value, options } = e.target;
    console.log('####1', name);
    console.log('####2', value);
    console.log('####2_1', e.target.type);
    let opt;

    if(e.target.type === 'select-one'){ 
      console.log('####3', options[1]);     
      for (let i=0, len = options.length; i < len; i++){      
        if(options[i].selected){
          opt = options[i].value;
        }
      }
      console.log('###4',opt);
    }
    else{
      opt = value;
    }

    SetlBillTrtActions.changeSearchInput({
      name,
      value,
    });
  };

  handlePostEditSubmit = async e => {
    e.preventDefault();

    const { edit, SetlBillTrtActions, onEditCancel, alert } = this.props;

    const form = e.target;
    const data = new FormData(form);

    InputParser.parseInputData(form, data);

    const post = {
      setlTgtYm: data.get('setlTgtYm'),
    };

    try {
      switch (edit.mode) {
        case Constants.EDIT_MODE.EDIT:
          await SetlBillTrtActions.writeSetlItemCloYn({
            setlTgtYm: post.setlTgtYm
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

    this.getSetlBillTrtList();
  };

  handleItemChecked = async e => {
    const { SetlBillTrtActions, onEditOpenForRead, alert, checkedRow } = this.props;
    SetlBillTrtActions.checkedRow({
      checkedRow: e.target.id,
    });
    console.log("target.id: ", e.target.id);
  };

  render() {
    const {
      billTrts,
      billTrt,
      codes,
      search,
      edit,
      paging,
      lastPage,
      onChangePage,
      onEditCancel,
      checkedRow,
    } = this.props;

    const {
      handleSearch,
      handleSearchInputChange,
      handlePostEditSubmit,
      handlePostEditInputChange,
      handleItemChecked,
      handleItemEdit,
      handleItemDelete,
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <SetlBillTrtSearch
                  search={search}
                  codes={codes}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}
                />
              </CardHeader>
              <CardBody>
                <SetlBillTrtList
                  billTrts={billTrts}
                  onItemEdit={handleItemEdit}
                  onItemDelete={handleItemDelete}
                  onItemChecked={handleItemChecked}
                  checkedRow={checkedRow}
                />
                <Paging paging={paging} lastPage={lastPage} onChangePage={onChangePage} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <EditModal
          title={'정산마감'}
          editForm={
            <SetlCloEditForm
              edit={edit}
              billTrt={billTrt}
              onChange={handlePostEditInputChange}
            />
          }
          formId={billTrt.id}
          edit={edit}
          toggle={onEditCancel}
          onSubmit={handlePostEditSubmit}
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
    error: state.setlBillTrt.get('error'),
    pending: state.setlBillTrt.get('pending'),
    billTrts: state.setlBillTrt.get('billTrts').toJS(),
    billTrt: state.setlBillTrt.get('billTrt').toJS(),
    codes: state.setlBillTrt.get('codes').toJS(),
    search: state.setlBillTrt.get('search').toJS(),
    lastPage: state.setlBillTrt.get('lastPage'),
    checkedRow: state.setlBillTrt.get('checkedRow'),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    SetlBillTrtActions: bindActionCreators(setlBillTrtActions, dispatch),
  }),
)(withRouter(withAlert(withEditModal(withPaging(SetlBillTrtContainer)))));