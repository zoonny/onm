import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as cdGroupBasActions from 'store/sys/codeMgmt/cdGroupBas';
import { Constants } from 'libs/Constants';

import CdGroupBasSearch from 'views/onm/sys/codeMgmt/CdGroupBasSearch';
import CdGroupBasList from 'views/onm/sys/codeMgmt/CdGroupBasList';
import CdBasList from 'views/onm/sys/codeMgmt/CdBasList';
import Paging from 'views/comn/paging/Paging';
import EditModal from 'views/comn/modal/EditModal';
import CdGroupBasEditForm from 'views/onm/sys/codeMgmt/CdGroupBasEditForm';

import InputParser from 'libs/InputParser';

import withPaging from 'containers/comn/hoc/withPaging';
import withEditModal from 'containers/comn/hoc/withEditModal';
import { withRouter, Link } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { toast } from 'react-toastify';


class CdGroupBasContainer extends Component {
  // CdGroupBasContainer
  componentDidMount() {
    this.initialize();
    this.getCdGroupBasList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getCdGroupBasList(nextProps.paging.page);
    }

    return true;
  }

  // getCdGroupBasList
  initialize = () => {
    const { CdGroupBasActions } = this.props;

    CdGroupBasActions.initialize();
  };

  // GroupCode
  getCdGroupBasList = async (page) => {
    const { search, paging, CdGroupBasActions, alert } = this.props;
    
    try {
       await CdGroupBasActions.getCdGroupBasList({
         cdGroupId: search.cdGroupId,
         cdGroupNm: search.cdGroupNm,
         page: page ? page : paging.page,
       });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
      //window.location.href = "onm#/500";
    }
  };

  // CodeBas
  getCdBasList = async (page) => {
    const { id, paging, CdGroupBasActions, alert } = this.props;
    
    try {
       await CdGroupBasActions.getCdBasList({
         id: id,
         page: page ? page : paging.page,
       });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  // CdGroupBasSearch
  handleSearch = e => {
    this.getCdGroupBasList();
  };

  handleSearchInputChange = e => {
    const { CdGroupBasActions } = this.props;
    const { name, value } = e.target;

    CdGroupBasActions.changeSearchInput({
      name,
      value,
    });
  };

  // CodeItem
  handleItemWrite = e => {
    const { CdGroupBasActions, onEditOpenForWriteCode} = this.props;

    CdGroupBasActions.initializeCdGroupBas();
    CdGroupBasActions.initializeCdBas();
    onEditOpenForWriteCode({id:e.target.id});
  };

  handleDupCodeCheck = async e => {
    const str = e.target.id;
    const id = str.split(",");
    const { CdGroupBasActions, gCode, code } = this.props;

    if(id[0] === 'gCode'){
      if(id[1] === 'gCodeId'){
        if(gCode.cdGroupId === ''){
          toast('체크 할 아이디를 입력해 주세요.');
        } else {
          await CdGroupBasActions.checkGcodeDup({
            id: gCode.cdGroupId,
          });
          const { gCode: res } = this.props;
          if(res.codeIdDupYn === 'Y'){
            toast('코드그룹 아이디 중복 입니다.');
          } else {
            toast('사용가능한 아이디 입니다.');
          }
        }
      }
    }else if(id[0] === 'code'){
      if(id[1] === 'codeDtlId'){
        if(code.cdDtlId === ''){
          toast('체크 할 아이디를 입력해 주세요.');
        } else {
          await CdGroupBasActions.checkCodeDup({
            id: code.cdGroupId+","+code.cdDtlId,
          });
          const { code: res } = this.props;
          if(res.codeIdDupYn === 'Y'){
            toast('코드상세 아이디 중복 입니다.');
          } else {
            toast('사용가능한 아이디 입니다.');
          }
        }
      }
    }
  };

  handleItemClick = async e => {
    const { CdGroupBasActions, alert } = this.props;
    const str = e.target.id;
    const id = str.split(",");
    
    let idx = e.nativeEvent.path[2].children.length;
    for (let i = 0; i < idx; i++) {
      e.nativeEvent.path[2].children[i].className = ''
    }
    e.nativeEvent.path[1].className = 'Inh_trFocus'

    try {
      await CdGroupBasActions.getCdBasList({id: id[1]});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  handleItemDoubleClick = async e => {
    const { CdGroupBasActions, onEditOpenForReadCode, alert } = this.props;
    const str = e.target.id;
    const id = str.split(",");
    
    if(id[0] === 'gCode'){
      try {
      await CdGroupBasActions.getCdGroupBas({id: id[1]});
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
      }
    } else if(id[0] === 'code'){
      try {
      await CdGroupBasActions.getCdBas({id: id[1]});
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
      }
    }

    onEditOpenForReadCode({id: id[0]});
  }

  handleGroupCdClick = async e => {
    const { CdGroupBasActions, onEditOpenForEditCode, alert } = this.props;
    const str = e.target.id;
    const id = str.split(",");
    
    if(e.target.id === ''){
      toast('그룹코드를 선택해 주세요.');
    } else if (id[0] !== 'gCode'){
      toast('수정 할 그룹코드를 선택해 주세요.');
    } else {
      try {
        await CdGroupBasActions.getCdGroupBas({id: id[1]});
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
      }
  
      onEditOpenForEditCode({id: id[0]});
    }
  };

  handleBasCdClick = async e => {
    const { CdGroupBasActions, onEditOpenForEditCode, alert } = this.props;
    const str = e.target.id;
    const id = str.split(",");
    
    if(str === ''){
      toast('상세코드를 선택해 주세요.');
    } else if (id[0] !== 'code'){
      toast('수정 할 상세코드를 선택해 주세요.');
    } else {
      try {
        await CdGroupBasActions.getCdBas({id: id[1]});
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
      }
    
      onEditOpenForEditCode({id: id[0]});
    } 
  };

  handleItemDelete = e => {
    const { BaseActions } = this.props;
    
    if(e.target.id === ''){
      if(e.target.name === 'group'){
        toast('그룹코드를 선택해 주세요.');
      } else {
        toast('상세코드를 선택해 주세요.');
      }
    } else if (e.target.id.indexOf('gCode') !== -1){
      if(e.target.name === 'cd'){
        toast('삭제 할 상세코드를 선택해 주세요.');
      } else {
        BaseActions.showModal({
          modalName: Constants.MODAL.CONFIRM,
          title: '그룹코드 삭제',
          message: '선택한 그룹코드를 삭제하시겠습니까?(상세코드 포함)',
          onConfirm: this.deleteItem,
          args: e.target.id,
        });
      }
    } else if (e.target.id.indexOf('code') !== -1){
      if(e.target.name === 'group'){
        toast('삭제 할 그룹코드를 선택해 주세요.');
      } else {
        BaseActions.showModal({
          modalName: Constants.MODAL.CONFIRM,
          title: '상세코드 삭제',
          message: '선택한 상세코드를 삭제하시겠습니까?',
          onConfirm: this.deleteItem,
          args: e.target.id,
        });
      }
    } 
  };

  deleteItem = async e => {
    const { BaseActions, CdGroupBasActions, alert } = this.props;
    const str = e.target.id;
    const id = str.split(",");

    if (id[0] === "gCode") {
      try {
        await CdGroupBasActions.removeCdGroupBas({cdGroupId: id[1]});
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
      } finally {
        BaseActions.hideModal({
          modalName: Constants.MODAL.CONFIRM,
        });
      }

      this.getCdGroupBasList();
      CdGroupBasActions.getCdBasList({id: id[1]});
    }else if(id[0] === "code"){
      try {
        await CdGroupBasActions.removeCdBas({id: id[1]});
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
      } finally {
        BaseActions.hideModal({
          modalName: Constants.MODAL.CONFIRM,
        });
      }

      CdGroupBasActions.getCdBasList({id: id[1]});
    }
  };

  // CdGroupBasEdit
  handleCodeEditInputChange = e => {
    const { CdGroupBasActions, gCode, code } = this.props;
    const { name, value, options } = e.target;
    let dupYn = 'N';
    let opt;

    if(e.target.title === "group"){
      if(e.target.id === 'cdGroupId'){
        dupYn = 'Y';
      } else {
        dupYn = gCode.codeIdDupYn;
      }
    } else {
      if(e.target.id === 'cdDtlId'){
        dupYn = 'Y';
      } else {
        dupYn = code.codeIdDupYn;
      }
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

    if(e.target.title === "group"){
      CdGroupBasActions.changeCdGroupBasEditInput({
        name,
        value: opt,
        dupYn,
      });
    } else {
      CdGroupBasActions.changeCdBasEditInput({
        name,
        value: opt,
        dupYn,
      });
    }
  };

  handleCodeEditSubmit = async e => {
    e.preventDefault();

    const { edit, CdGroupBasActions, onEditCancel, alert, gCode, code} = this.props;

    const form = e.target;
    const data = new FormData(form);

    InputParser.parseInputData(form, data);

    const groupCode = {
      cdGroupId: data.get('cdGroupId'),
      upCdGroupId: data.get('upCdGroupId'),
      cdGroupNm: data.get('cdGroupNm'),
      cdGroupSbst: data.get('cdGroupSbst'),
      cdLen: data.get('cdLen'),
      useYn: data.get('useYn'),
    };

    const dtlCode = {
      cdGroupId: data.get('cdGroupId'),
      cdDtlId: data.get('cdDtlId'),
      upCdDtlId: data.get('upCdDtlId'),
      cdDtlNm: data.get('cdDtlNm'),
      cdDtlSbst: data.get('cdDtlSbst'),
      indcOdrg: data.get('indcOdrg'),
      useYn: data.get('useYn'),
    };

    try {
      if(edit.id === "gCode"){
        switch (edit.mode) {
          case Constants.EDIT_MODE.WRITE:
            if(gCode.codeIdDupYn === 'Y'){
              toast('코드그룹 아이디 중복체크를 확인해주세요.');
            } else {
              await CdGroupBasActions.writeCdGroupBas(groupCode);
              onEditCancel();
              this.getCdGroupBasList();
            }
            break;
          case Constants.EDIT_MODE.EDIT:
            await CdGroupBasActions.editCdGroupBas({
              ...groupCode,
              id: e.target.id,
            });
            onEditCancel();
            this.getCdGroupBasList();
            break;
          default:
            console.error('Unknown EditMode:', edit.mode);
            break;
        }
      } else if(edit.id === "code"){
        switch (edit.mode) {
          case Constants.EDIT_MODE.WRITE:
            if(code.cdGroupId === null || code.cdGroupId === ''){
              toast('코드그룹 아이디를 선택해주세요.');
            }else if(code.codeIdDupYn === 'Y'){
              toast('코드상세 아이디 중복체크를 확인해주세요.');
            } else {
              await CdGroupBasActions.writeCdBas(dtlCode);
              onEditCancel();
              this.getCdGroupBasList();
              CdGroupBasActions.getCdBasList({id: dtlCode.cdGroupId});
            }
            break;
          case Constants.EDIT_MODE.EDIT:
            await CdGroupBasActions.editCdBas({
              ...dtlCode,
              id: e.target.id,
            });
            onEditCancel();
            this.getCdGroupBasList();
            CdGroupBasActions.getCdBasList({id: dtlCode.cdGroupId});
            break;
          default:
            console.error('Unknown EditMode:', edit.mode);
            break;
        }
      }
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
      return;
    }
  };

  handleItemChecked = async e => {
    const { CdGroupBasActions, checkedCode } = this.props;

    CdGroupBasActions.checkedCode({
      checkedCode: e.target.id,
    });
  };

  render() {
    const {
      groupCds,
      gCodes,
      gCode,
      codes,
      code,
      search,
      edit,
      paging,
      lastPage,
      onChangePage,
      onEditCancel,
      checkedCode,
    } = this.props;

    const {
      handleSearch,
      handleSearchInputChange,
      handleItemWrite,
      handleDupCodeCheck,
      handleItemClick,
      handleItemDoubleClick,
      handleGroupCdClick,
      handleBasCdClick,
      handleItemDelete,
      handleCodeEditSubmit,
      handleCodeEditInputChange,
      handleItemChecked,
    } = this;

    return (
      <div className="animated fadeIn">   
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <CdGroupBasSearch
                  search={search}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}
                />
              </CardHeader>
              <CardBody>
                <div className="animated fadeIn">
                  <div className="table-responsive2">
                  <CdGroupBasList
                    gCodes={gCodes}
                    onItemClick={handleItemClick}
                    onItemDoubleClick={handleItemDoubleClick}
                    onGroupCdClick={handleGroupCdClick}
                    onItemWrite={handleItemWrite}
                    checkedCode={checkedCode}
                    onItemChecked={handleItemChecked}
                    onItemDelete={handleItemDelete}
                  />
                  <CdBasList
                    codes={codes}
                    onItemClick={handleItemClick}
                    onItemDoubleClick={handleItemDoubleClick}
                    onBasCdClick={handleBasCdClick}
                    onItemWrite = {handleItemWrite}
                    checkedCode={checkedCode}
                    onItemChecked={handleItemChecked}
                    onItemDelete={handleItemDelete}
                  />
                  </div>
                </div>
                <Paging paging={paging} lastPage={lastPage} onChangePage={onChangePage} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        {<EditModal
          title={'코드'}
          editForm={
            <CdGroupBasEditForm
              edit={edit}
              groupCds={groupCds}
              gCode={gCode}
              code={code}
              onChange={handleCodeEditInputChange}
              onDupCodeCheck={handleDupCodeCheck}
            />
          }
          formId={gCode.id}
          edit={edit}
          toggle={onEditCancel}
          onSubmit={handleCodeEditSubmit}
          onCancel={onEditCancel}
          className={''}
        />}
      </div>
    );
  }
}

export default connect(
  state => ({
    args: state.base.getIn(['modal', 'confirm', 'args']),
    error: state.cdGroupBas.get('error'),
    pending: state.cdGroupBas.get('pending'),
    groupCds: state.cdGroupBas.get('groupCds').toJS(),
    gCodes: state.cdGroupBas.get('gCodes').toJS(),
    gCode: state.cdGroupBas.get('gCode').toJS(),
    codes: state.cdGroupBas.get('codes').toJS(),
    code: state.cdGroupBas.get('code').toJS(),
    search: state.cdGroupBas.get('search').toJS(),
    lastPage: state.cdGroupBas.get('lastPage'),
    checkedCode: state.cdGroupBas.get('checkedCode'),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    CdGroupBasActions: bindActionCreators(cdGroupBasActions, dispatch),
  }),
)(withRouter(withAlert(withEditModal(withPaging(CdGroupBasContainer)))));
