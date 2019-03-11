import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as userInfoActions from 'store/sys/userMgmt/userInfo';
import { Constants } from 'libs/Constants';

import UserInfoSearch from 'views/onm/sys/userMgmt/UserInfoSearch';
import UserInfoList from 'views/onm/sys/userMgmt/UserInfoList';
import Paging from 'views/comn/paging/Paging';
//import EditModal from 'views/comn/modal/EditModal';
import EditPage from 'views/comn/modal/EditPage';
//import UserInfoEditForm from 'views/onm/sys/userMgmt/UserInfoEditForm';
import UserInfoEditPage from 'views/onm/sys/userMgmt/UserInfoEditPage';
import UserInfoWritePage from 'views/onm/sys/userMgmt/UserInfoWritePage';

import InputParser from 'libs/InputParser';

import withPaging from 'containers/comn/hoc/withPaging';
import withEditModal from 'containers/comn/hoc/withEditModal';
import withEditPage from 'containers/comn/hoc/withEditPage';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { isNull } from 'util';

 import { toast } from 'react-toastify'

class UserInfoContainer extends Component {
  
  // UserInfoContainer
  componentDidMount() {
    this.initialize();
    this.getUserInfoList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getUserInfoList(nextProps.paging.page);
    }

    return true;
  }

  // UserInfoList
  initialize = () => {
    const { UserInfoActions } = this.props;

    UserInfoActions.initialize();
  };

  getUserInfoList = async (page) => {
    const { search, paging, UserInfoActions, alert } = this.props;

    try {
        await UserInfoActions.getUserInfoList({
          userId: search.userId,
          userNm: search.userNm,
          page: page ? page : paging.page,
        });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  // UserInfoSearch
  handleSearch = e => {   
    this.getUserInfoList();
  };

  handleSearchInputChange = e => {
    const { UserInfoActions } = this.props;
    const { name, value } = e.target;

    UserInfoActions.changeSearchInput({
      name,
      value,
    });
  };

  // UserItem
  handleItemWrite = e => {
    const { UserInfoActions, onEditOpenForWrite } = this.props;
    this.initialize();
    this.getUserInfoList();
    UserInfoActions.initializeUserInfo();

    onEditOpenForWrite();
  };

  handleItemClick = async e => {
    const { UserInfoActions, onEditOpenForRead, alert } = this.props;    
    try {      
      await UserInfoActions.getUserInfo({id:e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }

    onEditOpenForRead();
  };

  // notify = (message) => toast(message);

  handleItemEdit = async e => {
    const { UserInfoActions, onEditOpenForEdit, alert, checkedUser } = this.props;
    if(e.target.id ==='' || checkedUser == ''){
      toast('사용자를 선택해 주세요.');
    }
    else{
      try {      
        await UserInfoActions.getUserInfo({id:e.target.id});     
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
      }
  
      onEditOpenForEdit();
    }   
  };

  handleItemDelete = e => {
    const { BaseActions, edit, checkedUser } = this.props;
    console.log('####### EDIT #######',edit.mode);
    console.log('####### target #######',e.target.id);
    if(e.target.id ==='' || checkedUser == ''){
      toast('사용자를 선택해 주세요.');
    }
    else{
      BaseActions.showModal({
        modalName: Constants.MODAL.CONFIRM,
        title: '사용자 삭제',
        message: '선택한 사용자를 삭제하시겠습니까?',
        onConfirm: this.deleteItem,
        args: e.target.id,
      });
    }    
  };

  deleteItem = async e => {
    const { BaseActions, UserInfoActions, alert, onEditCancel } = this.props;

    try {
      await UserInfoActions.removeUserInfo({id:e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    } finally {
      BaseActions.hideModal({
        modalName: Constants.MODAL.CONFIRM,
      });
    }
    onEditCancel();
    this.initialize();
    this.getUserInfoList();
  };
  
  // UserInfoEdit
  handleUserInfoEditInputChange = e => {
    console.log('### ID ###',e.target.id);
    console.log('### VALUE ###',e.target.value);
    const { UserInfoActions, user } = this.props;
    const { name, value, options} = e.target;
    let dupYn = 'N';
    let opt;
    let newEfctFnsDt;
    
    if(e.target.id === 'userId'){
      dupYn = 'Y';
    }
    else{
      dupYn = user.userIdDupYn;
    }
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
    // console.log('### ID ###',e.target.id);
    // console.log('### VALUE ###',e.target.value);
    // if(e.target.id === 'efctFnsDt'){
    //   newEfctFnsDt = e.target.value;
    // }
    UserInfoActions.changeUserInfoEditInput({
      name,
      value : opt,
      dupYn,      
    });    
  };

  handleUserInfoEditSubmit = async e => {
    e.preventDefault();

    const { edit, UserInfoActions, onEditCancel, alert, user} = this.props;

    const form = e.target;
    const data = new FormData(form);

    InputParser.parseInputData(form, data);

    const inputUser = {
      userId: data.get('userId'),
      userNm: data.get('userNm'),
      pwd: data.get('pwd'),
      confrimPwd: data.get('confirmPwd'),
      accActvSttusCd: data.get('accActvSttusCd'),
      efctFnsDt: data.get('efctFnsDt'),
      newEfctFnsDt: data.get('newEfctFnsDt'),
      mphonNo: data.get('mphonNo'),
      pponNo: data.get('pponNo'),
      email: data.get('email'),
      cmpnNm: data.get('cmpnNm'),
      deptNm: data.get('deptNm'),
    };
    try {
        switch (edit.mode) {          
          case Constants.EDIT_MODE.WRITE:
              if(user.userIdDupYn === 'Y' || user.userIdDupYn === ''){
                toast('사용자 아이디 중복체크를 확인해 주세요.');
              }
              else if(inputUser.pwd !== inputUser.confrimPwd){
                toast('비밀번호 확인을 확인해 주세요.');
              }
              else{
                await UserInfoActions.writeUserInfo(inputUser);
                onEditCancel();
                this.getUserInfoList();
              }              
            break;
          case Constants.EDIT_MODE.EDIT:
            inputUser.efctFnsDt = user.efctFnsDt;
            await UserInfoActions.editUserInfo({
              ...inputUser,
              id: e.target.id,
            });
            console.log('333');
            onEditCancel();
            this.getUserInfoList();
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
    const { UserInfoActions, onEditOpenForRead, alert, checkedUser } = this.props;
    UserInfoActions.checkedUser({
      checkedUser: e.target.id,
    });
  };

  handleDupUserCheck = async e => {
    const { UserInfoActions, user} = this.props;
    await UserInfoActions.checkUserDup({
      userId: user.userId,
    });
    const { user: res } = this.props;
    if(res.userIdDupYn === 'Y'){
      toast('사용자 아이디 중복 입니다.');
    }
  };

  handleResettPwd = async e => {
    const { BaseActions, checkedUser } = this.props;
    
    if(e.target.id ==='' || checkedUser == ''){
      toast('사용자를 선택해 주세요.');
    }
    else{
      BaseActions.showModal({
        modalName: Constants.MODAL.CONFIRM,
        title: '패스워드 초기화',
        message: '선택한 사용자의 패스워드를 초기화 하시겠습니까?',
        onConfirm: this.resetPwd,
        args: e.target.id,
      });
    }
  };
  resetPwd = async e => {
    const { BaseActions, UserInfoActions, alert } = this.props;

    try {
      await UserInfoActions.resetPassword({id:e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    } finally {
      BaseActions.hideModal({
        modalName: Constants.MODAL.CONFIRM,
      });
    }

    this.getUserInfoList();
  };

  // handleValidPwdCheck = async e => {
  //   const { UserInfoActions, user } = this.props;    
  //   UserInfoActions.ceckPwdValid({

  //   });
  // }

  render() {
    const {
      users,
      user,
      search,
      edit,
      paging,
      lastPage,
      onChangePage,
      onEditCancel,
      checkedUser,
      date,
    } = this.props;

    const {
      handleSearch,
      handleSearchInputChange,
      handleItemWrite,
      handleItemClick,
      handleItemEdit,
      handleItemDelete,
      handleUserInfoEditSubmit,
      handleUserInfoEditInputChange,
      handleDupUserCheck,
      handleItemChecked,
      handleResettPwd,
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <UserInfoSearch
                  search={search}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}
                  onWrite={handleItemWrite}
                />
              </CardHeader>
              <CardBody>
                <UserInfoList
                  users={users}
                  checkedUser={checkedUser}
                  onItemClick={handleItemClick}
                  onItemEdit={handleItemEdit}
                  onItemDelete={handleItemDelete}
                  onItemChecked={handleItemChecked}
                  onWrite={handleItemWrite}
                  onResetPwd={handleResettPwd}
                />
                <Paging paging={paging} lastPage={lastPage} onChangePage={onChangePage} />
              </CardBody>
            </Card>
          </Col>
        </Row>
          {(edit.mode === Constants.EDIT_MODE.WRITE) && (
            <>
            <EditPage          
              editForm={                          
                <UserInfoWritePage
                  edit={edit}
                  user={user}
                  date={date}
                  onChange={handleUserInfoEditInputChange}
                  onDupUserCheck={handleDupUserCheck}
                  // onValidPwdCheck={handleValidPwdCheck}
                  />             
              }          
              formId={user.id}
              edit={edit}
              toggle={onEditCancel}
              onSubmit={handleUserInfoEditSubmit}
              onCancel={onEditCancel}
              className={''}
            />
            </>
          )}
          {(edit.mode === Constants.EDIT_MODE.EDIT) && (
            <>
            <EditPage          
              editForm={                          
                <UserInfoEditPage
                  edit={edit}
                  user={user}
                  onChange={handleUserInfoEditInputChange}
                  onDupUserCheck={handleDupUserCheck}
                  // onValidPwdCheck={handleValidPwdCheck}
                  />             
              }          
              formId={user.id}
              edit={edit}
              toggle={onEditCancel}
              onSubmit={handleUserInfoEditSubmit}
              onCancel={onEditCancel}
              className={''}
            />
            </>
          )}
          
      </div>
    );
  }
}

export default connect(
  state => ({
    args: state.base.getIn(['modal', 'confirm', 'args']),
    error: state.userInfo.get('error'),
    pending: state.userInfo.get('pending'),
    users: state.userInfo.get('users').toJS(),
    user: state.userInfo.get('user').toJS(),
    search: state.userInfo.get('search').toJS(),
    lastPage: state.userInfo.get('lastPage'),
    checkedUser: state.userInfo.get('checkedUser'),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    UserInfoActions: bindActionCreators(userInfoActions, dispatch),
  }),
)(withRouter(withAlert(withEditPage(withPaging(UserInfoContainer)))));
