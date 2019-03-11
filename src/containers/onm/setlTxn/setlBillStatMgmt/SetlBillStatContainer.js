//COMMON
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as setlBillStatActions from 'store/setlTxn/setlBillTrtMgmt/setlBillStat';
import withPaging from 'containers/comn/hoc/withPaging';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';

//VIEW
import Paging from 'views/comn/paging/Paging';
import SetlBillStatSearch from 'views/onm/setlTxn/setlBillTrtMgmt/SetlBillStatSearch';
import SetlBillStatList from 'views/onm/setlTxn/setlBillTrtMgmt/SetlBillStatList';

class SetlBillStatContainer extends Component {
  // SetlDstrbContainer
  componentDidMount() {
    this.getSetlBillStatList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getSetlBillStatList(null, nextProps.paging.page);
    }

    return true;
  }

  getSetlBillStatList = async ( page) => {
    const { search, paging, SetlBillStatActions, alert } = this.props;

    try {
      await SetlBillStatActions.getSetlBillStatList({
        startDt: search.startDt,
        endDt: search.endDt,
        ptnrId : search.ptnrId,
        page: page ? page : paging.page,
      });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  // SetlDstrbSearch
  handleSearch = e => {
    this.getSetlBillStatList();
  };

  handleSearchInputChange = (e) => {
    console.log('검색 PopupINPUTChange', e);
    const { SetlBillStatActions } = this.props;
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

    SetlBillStatActions.changeSearchInput({
      name,
      value,
    });
  };

  render() {
    const {
      billStats,
      codes,
      search,
      paging,
      lastPage,
      onChangePage,
    } = this.props;

    const {
      handleSearch,
      handleSearchInputChange,
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <SetlBillStatSearch
                  search={search}
                  codes={codes}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}
                />
              </CardHeader>
              <CardBody>
                <SetlBillStatList
                  billStats={billStats}
                />
                <Paging paging={paging} lastPage={lastPage} onChangePage={onChangePage} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  state => ({
    args: state.base.getIn(['modal', 'confirm', 'args']),
    error: state.setlBillStat.get('error'),
    pending: state.setlBillStat.get('pending'),
    billStats: state.setlBillStat.get('billStats').toJS(),
    codes: state.setlBillStat.get('codes').toJS(),
    search: state.setlBillStat.get('search').toJS(),
    lastPage: state.setlBillStat.get('lastPage'),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    SetlBillStatActions: bindActionCreators(setlBillStatActions, dispatch),
  }),
)(withRouter(withAlert(withPaging(SetlBillStatContainer))));