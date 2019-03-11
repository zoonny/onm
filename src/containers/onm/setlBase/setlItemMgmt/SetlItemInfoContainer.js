import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as setlItemInfoActions from 'store/setlBase/setlItemMgmt/setlItemInfo';
import { Constants } from 'libs/Constants';

import SetlItemInfoSearch from 'views/onm/setlBase/setlItemMgmt/SetlItemInfoSearch';
import SetlItemInfoList from 'views/onm/setlBase/setlItemMgmt/SetlItemInfoList';
import Paging from 'views/comn/paging/Paging';
import EditModal from 'views/comn/modal/EditModal';
import SetlItemInfoEditForm from 'views/onm/setlBase/setlItemMgmt/SetlItemInfoEditForm';

import InputParser from 'libs/InputParser';

import withPaging from 'containers/comn/hoc/withPaging';
import withEditModal from 'containers/comn/hoc/withEditModal';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';

import { toast } from 'react-toastify';

class SetlItemInfoContainer extends Component {
  // SetlItemInfoContainer
  componentDidMount() {
    this.initialize();
    this.getSetlItemInfoList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getSetlItemInfoList(nextProps.paging.page);
    }

    return true;
  }

  // SetlItemInfoList
  initialize = () => {
    const { SetlItemInfoActions } = this.props;

    SetlItemInfoActions.initialize();
  };

  getSetlItemInfoList = async (page) => {
    const { search, paging, SetlItemInfoActions, alert } = this.props;

    try {
      await SetlItemInfoActions.getSetlItemInfoList({
        setlItemNm: search.setlItemNm,
        includeHistYn : search.includeHistYn,
        page: page ? page : paging.page,
      });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  // SetlItemInfoSearch
  handleSearch = e => {
    this.getSetlItemInfoList();
  };

  handleSearchInputChange = e => {
    const { SetlItemInfoActions } = this.props;
    const { name, value } = e.target;

    SetlItemInfoActions.changeSearchInput({
      name,
      value,
    });
  };

  handleKeyPress = e => {
    if (e.charCode === 13){
      this.getSetlItemInfoList();
    }
  };

  handlePostEditInputChange = (e) => {
    const { SetlItemInfoActions } = this.props;
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

    SetlItemInfoActions.changeSetlItemInfoEditInput({
      name,
      value : opt,
    });
  };

  // PostItem
  handleItemWrite = e => {
    const { SetlItemInfoActions, onEditOpenForWrite } = this.props;

    SetlItemInfoActions.initializeSetlItemInfo();

    onEditOpenForWrite();
  };

  handleItemClick = async e => {
    const { SetlItemInfoActions, onEditOpenForRead, alert } = this.props;

    try {
      console.log('target.id:', e.target.id);
      await SetlItemInfoActions.getSetlItemInfo({id: e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }

    onEditOpenForRead();
  };

  handleItemEdit = async e => {
    const { SetlItemInfoActions, onEditOpenForEdit, alert } = this.props;

    if(e.target.id ===''){
      toast('정산항목을 선택해 주세요.');
    }
    else{
      try {
        console.log('target.id:', e.target.id);
        await SetlItemInfoActions.getSetlItemInfo({id: e.target.id});
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
      }
      onEditOpenForEdit();
    }
  };

  handleItemDelete = e => {
    const { BaseActions } = this.props;

    if(e.target.id ===''){
      toast('정산항목을 선택해 주세요.');
    }
    else{
      BaseActions.showModal({
        modalName: Constants.MODAL.CONFIRM,
        title: '정산항목 삭제',
        message: '선택한 정산항목을 삭제하시겠습니까?',
        onConfirm: this.deleteItem,
        args: e.target.id,
      });
    }
  };

  deleteItem = async e => {
    const { BaseActions, SetlItemInfoActions, alert } = this.props;

    try {
      console.log('target.id:', e.target.id);
      await SetlItemInfoActions.removeSetlItemInfo({id: e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    } finally {
      BaseActions.hideModal({
        modalName: Constants.MODAL.CONFIRM,
      });
    }

    this.getSetlItemInfoList();
  };

  // SetlItemInfoEdit
  handleSetlItemInfoEditInputChange = e => {
    const { SetlItemInfoActions } = this.props;
    const { name, value } = e.target;

    SetlItemInfoActions.changeSetlItemInfoEditInput({
      name,
      value,
    });
  };

  handlePostEditSubmit = async e => {
    e.preventDefault();

    const { edit, SetlItemInfoActions, onEditCancel, alert } = this.props;

    const form = e.target;
    const data = new FormData(form);

    InputParser.parseInputData(form, data);

    const post = {
      setlItemCd: data.get('setlItemCd'),
		  setlItemNm: data.get('setlItemNm'),
		  efctStDt: data.get('efctStDt'),
		  efctFnsDt: data.get('efctFnsDt'),
		  setlTypeCd: data.get('setlTypeCd'),
		  setlSperd: data.get('setlSperd'),
		  vatYn: data.get('vatYn'),
		  dtlCretYn: data.get('dtlCretYn'),
    };

    try {
      switch (edit.mode) {
        case Constants.EDIT_MODE.WRITE:
          await SetlItemInfoActions.writeSetlItemInfo(post);
          break;
        case Constants.EDIT_MODE.EDIT:
          await SetlItemInfoActions.editSetlItemInfo({
            ...post,
            id: e.target.id,
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

    this.getSetlItemInfoList();
  };

  handleItemChecked = async e => {
    const { SetlItemInfoActions, onEditOpenForRead, alert, checkedRow } = this.props;
    SetlItemInfoActions.checkedRow({
      checkedRow: e.target.id,
    });
  };

  handleCheckHistYn = async e => {
    const { SetlItemInfoActions, onEditOpenForRead, alert, search, checkedHistYn } = this.props;
    console.log('HERE : ' + e.target.value);
    if(e.target.value === '' || e.target.value === 'N'){
      SetlItemInfoActions.checkedHistYn({
        checkedHistYn: 'Y',
      });  
    }
    else {
      SetlItemInfoActions.checkedHistYn({      
        checkedHistYn: 'N',
      });
    }
  }

  render() {
    const {
      posts,
      post,
      comCodes,
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
      handlePostEditSubmit,
      handlePostEditInputChange,
      handleItemChecked,
      handleKeyPress,
      handleCheckHistYn,
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <SetlItemInfoSearch
                  search={search}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}
                  onWrite={handleItemWrite}
                  onKeyPress={handleKeyPress}
                  onCheckedHistYn={handleCheckHistYn}
                />
              </CardHeader>
              <CardBody>
                <SetlItemInfoList
                  posts={posts}
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
          title={'정산항목'}
          editForm={
            <SetlItemInfoEditForm
              edit={edit}
              post={post}
              comCodes={comCodes}
              onChange={handlePostEditInputChange}
            />
          }
          formId={post.id}
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
    error: state.setlItemInfo.get('error'),
    pending: state.setlItemInfo.get('pending'),
    posts: state.setlItemInfo.get('posts').toJS(),
    post: state.setlItemInfo.get('post').toJS(),
    comCodes: state.setlItemInfo.get('comCodes').toJS(),
    search: state.setlItemInfo.get('search').toJS(),
    lastPage: state.setlItemInfo.get('lastPage'),
    checkedRow: state.setlItemInfo.get('checkedRow'),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    SetlItemInfoActions: bindActionCreators(setlItemInfoActions, dispatch),
  }),
)(withRouter(withAlert(withEditModal(withPaging(SetlItemInfoContainer)))));
