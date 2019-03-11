import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as sysMenuInfoActions from 'store/sys/sysMenuMgmt/sysMenuInfo';
import { Constants } from 'libs/Constants';

import SysMenuInfoSearch from 'views/onm/sys/sysMenuMgmt/SysMenuInfoSearch';
import SysMenuInfoList from 'views/onm/sys/sysMenuMgmt/SysMenuInfoList';
import Paging from 'views/comn/paging/Paging';
import EditModal from 'views/comn/modal/EditModal';
import SysMenuInfoEditForm from 'views/onm/sys/sysMenuMgmt/SysMenuInfoEditForm';

import InputParser from 'libs/InputParser';

import withPaging from 'containers/comn/hoc/withPaging';
import withEditModal from 'containers/comn/hoc/withEditModal';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';

import { toast } from 'react-toastify';

class SysMenuInfoContainer extends Component {
  // SysMenuInfoContainer
  componentDidMount() {
    this.initialize();
    this.getSysMenuInfoList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getSysMenuInfoList(nextProps.paging.page);
    }

    return true;
  }

  // SysMenuInfoList
  initialize = () => {
    const { SysMenuInfoActions } = this.props;

    SysMenuInfoActions.initialize();
  };

  getSysMenuInfoList = async (page) => {
    const { search, paging, SysMenuInfoActions, alert } = this.props;

    try {
      await SysMenuInfoActions.getSysMenuInfoList({
        riNm: search.riNm,
        page: page ? page : paging.page,
      });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  // SysMenuInfoSearch
  handleSearch = e => {
    this.getSysMenuInfoList();
  };

  handleSearchInputChange = e => {
    const { SysMenuInfoActions } = this.props;
    const { name, value } = e.target;

    SysMenuInfoActions.changeSearchInput({
      name,
      value,
    });
  };

  handleKeyPress = e => {
    if (e.charCode === 13){
      this.getSysMenuInfoList();
    }
  };

  handlePostEditInputChange = (e) => {
    const { SysMenuInfoActions } = this.props;
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

    SysMenuInfoActions.changeSysMenuInfoEditInput({
      name,
      value : opt,
    });
  };

  // PostItem
  handleItemWrite = e => {
    const { SysMenuInfoActions, onEditOpenForWrite } = this.props;

    SysMenuInfoActions.initializeSysMenuInfo();

    onEditOpenForWrite();
  };

  handleItemClick = async e => {
    const { SysMenuInfoActions, onEditOpenForRead, alert } = this.props;

    try {
      await SysMenuInfoActions.getSysMenuInfo({riId: e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }

    onEditOpenForRead();
  };

  handleItemEdit = async e => {
    const { SysMenuInfoActions, onEditOpenForEdit, alert } = this.props;

    if(e.target.id ===''){
      toast('자원(리소스)을 선택해 주세요.');
    }
    else{
      try {
        await SysMenuInfoActions.getSysMenuInfo({riId: e.target.id});
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
      }
    onEditOpenForEdit();
    }
  };

  handleItemDelete = e => {
    const { BaseActions } = this.props;

    if(e.target.id ===''){
      toast('자원(리소스)을 선택해 주세요.');
    }
    else{
      BaseActions.showModal({
        modalName: Constants.MODAL.CONFIRM,
        title: '자원 삭제',
        message: '선택한 자원을 삭제하시겠습니까?',
        onConfirm: this.deleteItem,
        args: e.target.id,
      });
    }
  };

  deleteItem = async e => {
    const { BaseActions, SysMenuInfoActions, alert } = this.props;

    try {
      await SysMenuInfoActions.removeSysMenuInfo({riId: e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    } finally {
      BaseActions.hideModal({
        modalName: Constants.MODAL.CONFIRM,
      });
    }

    this.getSysMenuInfoList();
  };

  // SysMenuInfoEdit
  handleSysMenuInfoEditInputChange = e => {
    const { SysMenuInfoActions } = this.props;
    const { name, value } = e.target;

    SysMenuInfoActions.changeSysMenuInfoEditInput({
      name,
      value,
    });
  };

  handlePostEditSubmit = async e => {
    e.preventDefault();

    const { edit, SysMenuInfoActions, onEditCancel, alert } = this.props;

    const form = e.target;
    const data = new FormData(form);

    InputParser.parseInputData(form, data);

    const post = {
      riId: data.get('riId'),
		  riNm: data.get('riNm'),
		  riDesc: data.get('riDesc'),
		  riTypeCd: data.get('riTypeCd'),
		  riPtrn: data.get('riPtrn'),
		  indcOdrg: data.get('indcOdrg'),
		  menuYn: data.get('menuYn'),
		  retvHstStoreYn: data.get('retvHstStoreYn'),
      upRiId: data.get('upRiId'),
    };

    try {
      switch (edit.mode) {
        case Constants.EDIT_MODE.WRITE:
          await SysMenuInfoActions.writeSysMenuInfo(post);
          break;
        case Constants.EDIT_MODE.EDIT:
          await SysMenuInfoActions.editSysMenuInfo({
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

    this.getSysMenuInfoList();
  };

  handleItemChecked = async e => {
    const { SysMenuInfoActions, onEditOpenForRead, alert, checkedRow } = this.props;
    SysMenuInfoActions.checkedRow({
      checkedRow: e.target.id,
    });
  };

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
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <SysMenuInfoSearch
                  search={search}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}
                  onKeyPress={handleKeyPress}
                />
              </CardHeader>
              <CardBody>
                <SysMenuInfoList
                  posts={posts}
                  onItemClick={handleItemClick}
                  onItemEdit={handleItemEdit}
                  onItemDelete={handleItemDelete}
                  checkedRow={checkedRow}
                  onItemChecked={handleItemChecked}
                  onWrite={handleItemWrite}
                />
                <Paging paging={paging} lastPage={lastPage} onChangePage={onChangePage} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <EditModal
          title={'자원'}
          editForm={
            <SysMenuInfoEditForm
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
    error: state.sysMenuInfo.get('error'),
    pending: state.sysMenuInfo.get('pending'),
    posts: state.sysMenuInfo.get('posts').toJS(),
    post: state.sysMenuInfo.get('post').toJS(),
    comCodes: state.sysMenuInfo.get('comCodes').toJS(),
    search: state.sysMenuInfo.get('search').toJS(),
    lastPage: state.sysMenuInfo.get('lastPage'),
    checkedRow: state.sysMenuInfo.get('checkedRow'),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    SysMenuInfoActions: bindActionCreators(sysMenuInfoActions, dispatch),
  }),
)(withRouter(withAlert(withEditModal(withPaging(SysMenuInfoContainer)))));
