import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as setlTarifInfoActions from 'store/setlBase/setlTarifMgmt/setlTarifInfo';
import { Constants } from 'libs/Constants';

import SetlTarifInfoSearch from 'views/onm/setlBase/setlTarifMgmt/SetlTarifInfoSearch';
import SetlTarifInfoList from 'views/onm/setlBase/setlTarifMgmt/SetlTarifInfoList';
import Paging from 'views/comn/paging/Paging';
import EditModal from 'views/comn/modal/EditModal';
import SetlTarifInfoEditForm from 'views/onm/setlBase/setlTarifMgmt/SetlTarifInfoEditForm';

import InputParser from 'libs/InputParser';

import withPaging from 'containers/comn/hoc/withPaging';
import withEditModal from 'containers/comn/hoc/withEditModal';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { toast } from 'react-toastify';
import { differenceInCalendarWeeksWithOptions } from 'date-fns/esm/fp';
import { isNull } from 'util';

class SetlTarifInfoContainer extends Component {
  // SetlTarifInfoContainer
  componentDidMount() {
    this.initialize();
    this.getSetlTarifInfoList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getSetlTarifInfoList(null, nextProps.paging.page);
    }

    return true;
  }

  // SetlTarifInfoList
  initialize = () => {
    const { SetlTarifInfoActions } = this.props;

    SetlTarifInfoActions.initialize();
  };

  getSetlTarifInfoList = async ( page) => {
    const { search, paging, SetlTarifInfoActions, alert } = this.props;

    try {
      await SetlTarifInfoActions.getSetlTarifInfoList({
        setlItemNm : search.setlItemNm,
        includeHistYn : search.includeHistYn,
        page: page ? page : paging.page,
      });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  // SetlTarifInfoSearch
  handleSearch = e => {
    this.getSetlTarifInfoList();
  };

  handleSearchInputChange = e => {
    const { SetlTarifInfoActions } = this.props;
    const { name, value } = e.target;

    SetlTarifInfoActions.changeSearchInput({
      name,
      value,
    });
  };

  // TarifItem
  handleItemWrite = e => {
    const { SetlTarifInfoActions, onEditOpenForWrite } = this.props;

    SetlTarifInfoActions.initializeSetlTarifInfo();

    onEditOpenForWrite();
  };

  handleItemClick = async e => {
    const { SetlTarifInfoActions, onEditOpenForRead, alert } = this.props;

    try {
      await SetlTarifInfoActions.getSetlTarifInfo({id: e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }

    onEditOpenForRead();
  };

  handleItemEdit = async e => {
    const { SetlTarifInfoActions, onEditOpenForEdit, alert } = this.props;
    if(e.target.id ===''){
      toast('항목을 선택해 주세요.');
    }
    else{
      try {
        await SetlTarifInfoActions.getSetlTarifInfo({id: e.target.id});
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
      }
  
      onEditOpenForEdit();
    }    
  };

  handleItemDelete = e => {
    const { BaseActions } = this.props;

      BaseActions.showModal({
      modalName: Constants.MODAL.CONFIRM,
      title: '정산요율 항목 삭제',
      message: '선택한 정산요율 항목을 삭제하시겠습니까?',
      onConfirm: this.deleteItem,
      args: e.target.id,
    });
  };

  deleteItem = async e => {
    const { BaseActions, SetlTarifInfoActions, alert } = this.props;

    try {
      console.log('target.id:', e.target.id);
      await SetlTarifInfoActions.removeSetlTarifInfo({id: e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    } finally {
      BaseActions.hideModal({
        modalName: Constants.MODAL.CONFIRM,
      });
    }

    this.getSetlTarifInfoList();
  };

  // SetlTarifInfoEdit
  handleSetlTarifInfoEditInputChange = (e) => {    
    console.log('수정/등록PopupINPUTChange', e);
    const { SetlTarifInfoActions } = this.props;
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
    SetlTarifInfoActions.changeSetlTarifInfoEditInput({
      name,
      value : opt,      
    });
  };  

  handleSetlTarifInfoEditSubmit = async e => {
    e.preventDefault();
    const { edit, SetlTarifInfoActions, onEditCancel, alert, tarif} = this.props;    
    const form = e.target;
    const data = new FormData(form);

    InputParser.parseInputData(form, data);

    const inputTarif = {      
      setlItemCd: data.get('setlItemCd'),
      setlItemNm: data.get('setlItemNm'),
      stepNo: data.get('stepNo'),
		  efctStDt: data.get('efctStDt'),
		  efctFnsDt: data.get('efctFnsDt'),
		  calcTypeCd: data.get('calcTypeCd'),
		  cdDtlNm: data.get('cdDtlNm'),
		  tarifVal: data.get('tarifVal'),		  
    };

    try {
      switch (edit.mode) {
        case Constants.EDIT_MODE.WRITE:
        if(tarif.setlItemCd === '' || tarif.setlItemCd === null){
          toast('정산 항목을 선택해 주세요.');
        }
        else{
          await SetlTarifInfoActions.writeSetlTarifInfo(inputTarif);
          onEditCancel();
          this.getSetlTarifInfoList();
        }          
        break;

        case Constants.EDIT_MODE.EDIT:
          await SetlTarifInfoActions.editSetlTarifInfo({
            ...inputTarif,
            id: e.target.id,
          });
          onEditCancel();         
          this.getSetlTarifInfoList();
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
    const { SetlTarifInfoActions, onEditOpenForRead, alert, checkedRow } = this.props;
    console.log('HHHHH : ' + e.target.id);
    SetlTarifInfoActions.checkedRow({
      checkedRow: e.target.id,
    });
  };

  handleCheckHistYn = async e => {
    const { SetlTarifInfoActions, onEditOpenForRead, alert, search, checkedHistYn } = this.props;
    console.log('HERE : ' + e.target.value);
    if(e.target.value === '' || e.target.value === 'N'){
      SetlTarifInfoActions.checkedHistYn({
        checkedHistYn: 'Y',
      });  
    }
    else {
      SetlTarifInfoActions.checkedHistYn({      
        checkedHistYn: 'N',
      });
    }
  }

  render() {
    const {
      tarifs,
      codes,
      comCodes,
      tarif,
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
      handleSetlTarifInfoEditSubmit,
      handleSetlTarifInfoEditInputChange,      
      handleItemChecked,
      handleCheckHistYn,
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <SetlTarifInfoSearch
                  search={search}
                  checkedHistYn={checkedHistYn}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}
                  onWrite={handleItemWrite}
                  onCheckedHistYn={handleCheckHistYn}                  
                />
              </CardHeader>
              <CardBody>
                <SetlTarifInfoList
                  tarifs={tarifs}
                  codes={codes}                  
                  checkedRow={checkedRow}                  
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
        <EditModal
          title={'정산요율항목'}
          editForm={
            <SetlTarifInfoEditForm
              edit={edit}              
              tarif={tarif}
              codes={codes}
              comCodes={comCodes}
              onChange={handleSetlTarifInfoEditInputChange}              
            />
          }
          formId={tarif.id}
          edit={edit}          
          toggle={onEditCancel}
          onSubmit={handleSetlTarifInfoEditSubmit}
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
    error: state.setlTarifInfo.get('error'),
    pending: state.setlTarifInfo.get('pending'),
    tarifs: state.setlTarifInfo.get('tarifs').toJS(),
    codes: state.setlTarifInfo.get('codes').toJS(),
    comCodes: state.setlTarifInfo.get('comCodes').toJS(),
    tarif: state.setlTarifInfo.get('tarif').toJS(),
    search: state.setlTarifInfo.get('search').toJS(),
    lastPage: state.setlTarifInfo.get('lastPage'),
    checkedRow: state.setlTarifInfo.get('checkedRow'),    
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    SetlTarifInfoActions: bindActionCreators(setlTarifInfoActions, dispatch),
  }),
)(withRouter(withAlert(withEditModal(withPaging(SetlTarifInfoContainer)))));