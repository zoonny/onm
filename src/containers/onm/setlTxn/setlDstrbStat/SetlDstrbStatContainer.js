//COMMON
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as setlDstrbStatActions from 'store/setlTxn/setlDstrbMgmt/setlDstrbStat';
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
import SetlDstrbSearch from 'views/onm/setlTxn/setlDstrbMgmt/SetlDstrbStatSearch';
import SetlDstrbList from 'views/onm/setlTxn/setlDstrbMgmt/SetlDstrbStat';

class SetlDstrbStatContainer extends Component {
  // SetlDstrbStatContainer
  componentDidMount() {
    this.initialize();
    this.getSetlDstrbStat();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getSetlDstrbStat(null, nextProps.paging.page);
    }

    return true;
  }

  // SetlDstrbList
  initialize = () => {
    const { SetlDstrbStatActions } = this.props;

    SetlDstrbStatActions.initialize();
  };

  getSetlDstrbStat = async ( page) => {
    const { search, paging, SetlDstrbStatActions, alert } = this.props;

    try {
      await SetlDstrbStatActions.getSetlDstrbStat({
        startDt : search.startDt,
        endDt : search.endDt,
        icomPtnrId: search.icomPtnrId,
        ptnrId: search.ptnrId,
        page: page ? page : paging.page,
      });
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  // SetlDstrbSearch
  handleSearch = e => {
    this.getSetlDstrbStat();
  };

  handleSearchInputChange = e => {
    console.log('111',e.target.name);
    console.log('222',e.target.value);
    const { SetlDstrbStatActions } = this.props;
    const { name, value } = e.target;

    SetlDstrbStatActions.changeSearchInput({
      name,
      value,
    });
  };

  // SetlDstrbEdit
  handleSetlDstrbEditInputChange = (e) => {
    const { SetlDstrbStatActions } = this.props;
    const { name, value, options } = e.target;
    console.log('### NAME ###', name);
    console.log('#### VALUE ###', value);
    console.log('#### TYPE ###', e.target.type);
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
    SetlDstrbStatActions.changeSetlDstrbEditInput({
      name,
      value : opt,      
    });
  };

  render() {
    const {
      dstrbs,
      codes,
      dstrb,
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
                <SetlDstrbSearch
                  search={search}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}                  
                />
              </CardHeader>
              <CardBody>
                <SetlDstrbList
                  dstrbs={dstrbs}
                  codes={codes}
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
    error: state.setlDstrbStat.get('error'),
    pending: state.setlDstrbStat.get('pending'),
    dstrbs: state.setlDstrbStat.get('dstrbs').toJS(),
    dstrb: state.setlDstrbStat.get('dstrb').toJS(),
    search: state.setlDstrbStat.get('search').toJS(),
    lastPage: state.setlDstrbStat.get('lastPage'),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    SetlDstrbStatActions: bindActionCreators(setlDstrbStatActions, dispatch),
  }),
)(withRouter(withAlert(withEditModal(withPaging(SetlDstrbStatContainer)))));