//COMMON
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as setlDstrbActions from 'store/setlTxn/setlDstrbMgmt/setlDstrb';
import { Constants } from 'libs/Constants';
import InputParser from 'libs/InputParser';
import withPaging from 'containers/comn/hoc/withPaging';
import withEditModal from 'containers/comn/hoc/withEditModal';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { toast } from 'react-toastify';
import { differenceInCalendarWeeksWithOptions } from 'date-fns/esm/fp';

//VIEW
import Paging from 'views/comn/paging/Paging';
import EditModal from 'views/comn/modal/EditModal';
import SetlDstrbSearch from 'views/onm/setlTxn/setlDstrbMgmt/SetlDstrbSearch';
import SetlDstrbList from 'views/onm/setlTxn/setlDstrbMgmt/SetlDstrbList';
import SetlDstrbEditForm from 'views/onm/setlTxn/setlDstrbMgmt/SetlDstrbEditForm';

class SetlDstrbContainer extends Component {

  constructor() {
    super();
    this.state = {
      date: new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  
  // SetlDstrbContainer
  componentDidMount() {
    this.initialize();
    this.getSetlDstrbList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getSetlDstrbList(null, nextProps.paging.page);
    }

    return true;
  }

  // SetlDstrbList
  initialize = () => {
    const { SetlDstrbActions } = this.props;

    SetlDstrbActions.initialize();
  };

  getSetlDstrbList = async ( page) => {
    const { search, paging, SetlDstrbActions, alert } = this.props;

    try {
      await SetlDstrbActions.getSetlDstrbList({
        startDt : search.startDt,
        endDt : search.endDt,
        page: page ? page : paging.page,
      });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  // SetlDstrbSearch
  handleSearch = e => {
    this.getSetlDstrbList();
  };

  handleSearchInputChange = e => {
    const { SetlDstrbActions } = this.props;
    const { name, value } = e.target;

    SetlDstrbActions.changeSearchInput({
      name,
      value,
    });
  };

  // TarifItem
  handleItemWrite = e => {
    const { SetlDstrbActions, onEditOpenForWrite } = this.props;

    SetlDstrbActions.initializeSetlDstrb();

    onEditOpenForWrite();
  };

  handleItemClick = async e => {
    const { SetlDstrbActions, onEditOpenForRead, alert } = this.props;

    try {
      await SetlDstrbActions.getSetlDstrb({id: e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }

    onEditOpenForRead();
  };

  handleItemEdit = async e => {
    const { SetlDstrbActions, onEditOpenForEdit, alert } = this.props;

    if(e.target.id ===''){
      toast('항목을 선택해 주세요.');
    }
    else{
      try {
        await SetlDstrbActions.getSetlDstrb({id: e.target.id});
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
      }
  
      onEditOpenForEdit();
    }    
  };

  handleItemDelete = e => {
    const { BaseActions } = this.props;
    
    if(e.target.id ===''){
      toast('항목을 선택해 주세요.');
    }
    else{
        BaseActions.showModal({
        modalName: Constants.MODAL.CONFIRM,
        title: '정산조정금액 삭제',
        message: '선택한 정산조정금액을 삭제하시겠습니까?',
        onConfirm: this.deleteItem,
        args: e.target.id,
      });
    }
  };

  deleteItem = async e => {
    const { BaseActions, SetlDstrbActions, alert } = this.props;

    try {
      console.log('target.id:', e.target.id);
      await SetlDstrbActions.removeSetlDstrb({id: e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    } finally {
      BaseActions.hideModal({
        modalName: Constants.MODAL.CONFIRM,
      });
    }

    this.getSetlDstrbList();
  };

  handleSetlDstrbEditInputChange = (e) => {
    const { SetlDstrbActions } = this.props;
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

    SetlDstrbActions.changeSetlDstrbEditInput({
      name,
      value : opt,
    });
  };

  handleSetlDstrbEditSubmit = async e => {
    e.preventDefault();
    const { edit, SetlDstrbActions, onEditCancel, alert} = this.props;    
    const form = e.target;
    const data = new FormData(form);

    InputParser.parseInputData(form, data);

    const dstrb = {      
      ptnrId: data.get('ptnrId'),
      icomPtnrId: data.get('icomPtnrId'),
      setlTgtYm: data.get('setlTgtYm'),
      setlItemCd: data.get('setlItemCd'),
      setlItemNm: data.get('setlItemNm'),
      stepNo: data.get('stepNo'),
		  dstrbAmt: data.get('dstrbAmt'),
		  dstrbVat: data.get('dstrbVat'),
      chCd: data.get('chCd'),
      cdDtlNm: data.get('cdDtlNm'),
      ptnrNm: data.get('ptnrNm'),
      dstrbRate: data.get('dstrbRate'),
      dstrbYn: data.get('dstrbYn'),
      totalAmt: data.get('totalAmt'),
      totalVat: data.get('totalVat'),
      total: data.get('total'),      
      adjWhyCd: data.get('adjWhyCd'),
      adjDtlSbst: data.get('adjDtlSbst'),
      adjAmt: data.get('adjAmt'),
      adjVat: data.get('adjVat'),
    };

    try {
      switch (edit.mode) {
        case Constants.EDIT_MODE.WRITE:
          await SetlDstrbActions.writeSetlDstrb(dstrb);
          break;
        case Constants.EDIT_MODE.EDIT:
          await SetlDstrbActions.editSetlDstrb({
            ...dstrb,
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

    this.getSetlDstrbList();
  };

  handleItemChecked = async e => {
    const { SetlDstrbActions, onEditOpenForRead, alert, checkedRow } = this.props;    
    SetlDstrbActions.checkedRow({
      checkedRow: e.target.id,
    });
  };

  handleCheckHistYn = async e => {
    const { SetlDstrbActions, onEditOpenForRead, alert, search, checkedHistYn } = this.props;    
    if(e.target.value === '' || e.target.value === 'N'){
      SetlDstrbActions.checkedHistYn({
        checkedHistYn: 'Y',
      });  
    }
    else {
      SetlDstrbActions.checkedHistYn({      
        checkedHistYn: 'N',
      });
    }
  }

  handleChange(date) {
    console.log('handleChange', date);

    this.setState({
      date: date,
    });

    console.log(this.state.date);
  }

  handleSelect(date) {
    console.log('handleSelect', date);
  }

  handleExcelDown = async e => {
    const { SetlDstrbActions, search, alert } = this.props; 
    
    try {
      await SetlDstrbActions.excelDownload({
        startDt : search.startDt,
        endDt : search.endDt,        
      });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  }


  render() {
    const {
      dstrbs,
      codes,
      comCodes,
      dstrb,
      search,
      edit,      
      paging,
      lastPage,
      onChangePage,
      onEditCancel,
      checkedRow,
      checkedHistYn, 
      onSelect,     
    } = this.props;

    const {
      handleSearch,
      handleSearchInputChange,
      handleItemWrite,
      handleItemClick,
      handleItemEdit,
      handleItemDelete,
      handleSetlDstrbEditSubmit,
      handleSetlDstrbEditInputChange,      
      handleItemChecked,
      handleCheckHistYn,
      handleChange,
      handleSelect,
      handleExcelDown,
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <SetlDstrbSearch
                  search={search}
                  checkedHistYn={checkedHistYn}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}
                  onWrite={handleItemWrite}
                  onCheckedHistYn={handleCheckHistYn}
                  onSelect={handleSelect}
                  onChangeDate={handleChange}
                  onExcelDown={handleExcelDown}
                />
              </CardHeader>
              <CardBody>
                <SetlDstrbList
                  dstrbs={dstrbs}
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
          title={'정산조정금액'}
          editForm={
            <SetlDstrbEditForm
              edit={edit}              
              dstrb={dstrb}
              comCodes={comCodes}
              onChange={handleSetlDstrbEditInputChange}              
            />
          }
          formId={dstrb.id}
          edit={edit}          
          toggle={onEditCancel}
          onSubmit={handleSetlDstrbEditSubmit}
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
    error: state.setlDstrb.get('error'),
    pending: state.setlDstrb.get('pending'),
    dstrbs: state.setlDstrb.get('dstrbs').toJS(),
    // codes: state.setlDstrb.get('codes').toJS(),
    comCodes: state.setlDstrb.get('comCodes').toJS(),
    dstrb: state.setlDstrb.get('dstrb').toJS(),
    search: state.setlDstrb.get('search').toJS(),
    lastPage: state.setlDstrb.get('lastPage'),
    checkedRow: state.setlDstrb.get('checkedRow'), 
    // date: state.setlDstrb.get('date'),   
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    SetlDstrbActions: bindActionCreators(setlDstrbActions, dispatch),
  }),
)(withRouter(withAlert(withEditModal(withPaging(SetlDstrbContainer)))));