import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as menuAutInfoActions from 'store/sys/menuAutMgmt/menuAutInfo';
import { Constants } from 'libs/Constants';

import MenuAutInfoSearch from 'views/onm/sys/menuAutMgmt/MenuAutInfoSearch';
import MenuAutInfoList from 'views/onm/sys/menuAutMgmt/MenuAutInfoList';
import Paging from 'views/comn/paging/Paging';
import MenuAutInfoEditModal from 'views/onm/sys/menuAutMgmt/MenuAutInfoEditModal';
import MenuAutInfoEditForm from 'views/onm/sys/menuAutMgmt/MenuAutInfoEditForm';
import MenuAutInfoTreeModal from 'views/onm/sys/menuAutMgmt/MenuAutInfoTreeModal';
import MenuAutInfoTreeForm from 'views/onm/sys/menuAutMgmt/MenuAutInfoTreeForm';

import InputParser from 'libs/InputParser';

import withPaging from 'containers/comn/hoc/withPaging';
import withEditModal from 'containers/comn/hoc/withEditModal';
import withTreeEditModal from 'views/onm/sys/menuAutMgmt/MenuAuthInfoModal';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';

import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';

import { isNull } from 'util';

class MenuAutInfoContainer extends Component {
  constructor(props) {
    super(props);    
    this.state = {      
      defaultCheckedKeys: [],
      submitDefaultCheckedKeys: [],
      editCheckFlag : false,
      editCheckedKeys: [],
      treeid: '',
    };
  }

  // MenuAutInfoContainer
  componentDidMount() {
    this.initialize();
    this.getMenuAutInfoList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.paging !== nextProps.paging) {
      this.getMenuAutInfoList(null, nextProps.paging.page);
    }

    return true;
  }

  // MenuAutInfoList
  initialize = () => {
    const { MenuAutInfoActions } = this.props;

    MenuAutInfoActions.initialize();
  };

  getMenuAutInfoList = async (tag, page) => {
    const { search, paging, MenuAutInfoActions, alert } = this.props;

    try {
      await MenuAutInfoActions.getMenuAutInfoList({        
        searchText: search.searchText,        
        page: page ? page : paging.page,
      });     
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
  };

  // MenuAutInfoSearch
  handleSearch = e => {   
    this.getMenuAutInfoList();
  };

  handleKeyPress = e => {   
    if ( e.charCode === 13){
      this.getMenuAutInfoList();
    }
  };  

  handleSearchInputChange = e => {
    const { MenuAutInfoActions } = this.props;
    const { name, value } = e.target;
    MenuAutInfoActions.changeSearchInput({
      name,
      value,
    });
  };

  // UserItem
  handleItemWrite = e => {
    const { MenuAutInfoActions, onEditOpenForWrite } = this.props;

    MenuAutInfoActions.initializeMenuAutInfo();

    onEditOpenForWrite();
  };

  handleItemClick = async e => {
    const { MenuAutInfoActions, onEditOpenForRead, alert } = this.props;
    
    try {
      await MenuAutInfoActions.getMenuAutInfo({roleId:e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }

    onEditOpenForRead();
  };

  handleItemEdit = async e => {
    const { MenuAutInfoActions, onEditOpenForEdit, alert } = this.props;

    try {      
      await MenuAutInfoActions.getMenuAutInfo({roleId:e.target.id});     
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    }
    onEditOpenForEdit();
    
  };

  handleItemDelete = e => {
    const { BaseActions } = this.props;    
    BaseActions.showModal({
      modalName: Constants.MODAL.CONFIRM,
      title: '권한 삭제',
      message: '해당 권한를 정말 삭제하시겠습니까?삭제 시 권한에 등록된 메뉴정보도 일괄 삭제됩니다.',
      onConfirm: this.deleteItem,
      args: e.target.id,
    });
  };

  deleteItem = async e => {
    const { BaseActions, MenuAutInfoActions, onEditCancel, alert, resultCount } = this.props;    
    try {
      await MenuAutInfoActions.removeMenuAutInfo({roleId:e.target.id});
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    } finally {      
      BaseActions.hideModal({
        modalName: Constants.MODAL.CONFIRM,
      });
      onEditCancel();
    }

    this.getMenuAutInfoList();
  };

  // MenuAutInfoEdit
  handleMenuAutInfoEditInputChange = e => {
    const { MenuAutInfoActions } = this.props;
    const { name, value } = e.target;

    MenuAutInfoActions.changeMenuAutInfoEditInput({
      name,
      value,
    });
  };

  handleMenuAutInfoEditSubmit = async e => {
    e.preventDefault();

    const { edit, MenuAutInfoActions, onEditCancel, alert } = this.props;

    const form = e.target;
    const data = new FormData(form);

    InputParser.parseInputData(form, data);

    const menuAutItem = {
      roleId: data.get('roleId'),
      roleNm: data.get('roleNm'),
    };

    try {
      switch (edit.mode) {
        case Constants.EDIT_MODE.WRITE:
          await MenuAutInfoActions.writeMenuAutInfo(menuAutItem);
          break;
        case Constants.EDIT_MODE.EDIT:
          await MenuAutInfoActions.editMenuAutInfo({
            ...menuAutItem,
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

    this.getMenuAutInfoList();
  };

  handleTreeItemClick = async e => {
    const { MenuAutInfoActions, onTreeEditOpenForEdit, alert } = this.props;
    this.state.treeid = e.target.getAttribute('treeid');
    try {      
      await MenuAutInfoActions.getMenuAutTreeInfo({roleId:this.state.treeid});     
    } catch (e) {
      alert.show(e.name + ': ' + e.message);
    } finally {
      this.state.editCheckFlag = false;
    }

    onTreeEditOpenForEdit();
  };

  
  handleMenuAutInfoTreeEditSubmit = async e => {    
    e.preventDefault();
    const { MenuAutInfoActions, onTreeEditCancel, alert} = this.props;     
        
    if (!this.state.editCheckFlag) {      
      onTreeEditCancel();      
    } else {        
      try {      
        await MenuAutInfoActions.editMenuAutTreeInfo(this.state.treeid, this.state.editCheckedKeys);      
      } catch (e) {
        alert.show(e.name + ': ' + e.message);
        return;
      } finally {
        this.state.editCheckedKeys = [];
        this.state.submitDefaultCheckedKeys = [];
        onTreeEditCancel();
      }
  
      this.getMenuAutInfoList();
    }
  };

  handleTreeCheck = (checkedKeys, info) => {
    this.state.editCheckFlag = true;
    this.state.editCheckedKeys = checkedKeys.concat(info.halfCheckedKeys);     
    while ( this.state.editCheckedKeys.indexOf('null') !== -1) {
      this.state.editCheckedKeys.splice(this.state.editCheckedKeys.indexOf('null'), 1);
    }
  };  

  loadTreeItem = items => {
    return items
      //.filter((item, index) => {
      //  if (item.title === true) return false;
      //  return true;
      //})
      .map((item, index) => {
        let children = null;
        if (item.children) {
          children = this.loadTreeItem(item.children);
        } else {
          if (item.checked === true){                              
            if (this.state.defaultCheckedKeys.indexOf(item.riId) === -1){
              this.state.defaultCheckedKeys.push(item.riId);
            }
          }
        }

        if (item.checked === true){                              
          if (this.state.submitDefaultCheckedKeys.indexOf(item.riId) === -1){
            this.state.submitDefaultCheckedKeys.push(item.riId);
          }
        }

        return {
          key: item.riId,
          title: (
            <MenuAutInfoTreeForm
              title={item.riNm}
            />
          ),
          disableCheckbox: false,
          children: children,
        };
      });
  };  
 

  render() {
    const {
      menuAutItemList,
      menuAutItem,
      search,
      edit,
      paging,
      lastPage,
      totalCount,
      onChangePage,
      onEditCancel,
      editTree,
      onTreeEditCancel,
      menuAutTreeList,      
    } = this.props;

    const {
      handleSearch,
      handleSearchInputChange,
      handleItemWrite,
      handleItemClick,
      handleItemEdit,
      handleItemDelete,
      handleMenuAutInfoEditSubmit,
      handleMenuAutInfoEditInputChange,
      handleMenuAutInfoTreeEditSubmit,   
      handleTreeItemClick,
      loadTreeItem,
      handleExpand,
      handleTreeSelect,
      handleTreeCheck, 
      handleKeyPress,     
    } = this;

    let _children = null;
    if (menuAutTreeList && menuAutTreeList.items) {
        this.state.defaultCheckedKeys = [];
      _children = loadTreeItem(menuAutTreeList.items);
    }
    const menuTree = [
      {
        key: null,
        title: (
          <MenuAutInfoTreeForm
            title={'전체 메뉴'}
          />
        ),
        disableCheckbox: false,
        children: _children,
      },
    ];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <MenuAutInfoSearch
                  search={search}
                  onChange={handleSearchInputChange}
                  onSearch={handleSearch}
                  onKeyPress={handleKeyPress}                  
                />
              </CardHeader>              
              <CardBody>                
                <MenuAutInfoList
                  menuAutItemList={menuAutItemList}
                  onTreeItemClick={handleTreeItemClick}
                  onItemEdit={handleItemEdit}
                  onItemDelete={handleItemDelete}
                  onWrite={handleItemWrite}
                />
                <Paging paging={paging} lastPage={lastPage} onChangePage={onChangePage} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <MenuAutInfoEditModal
          title={'권한'}
          editForm={
            <MenuAutInfoEditForm
              edit={edit}
              menuAutItem={menuAutItem}
              onChange={handleMenuAutInfoEditInputChange}
            />
          }
          formId={menuAutItem.roleId}
          edit={edit}
          toggle={onEditCancel}
          onSubmit={handleMenuAutInfoEditSubmit}
          onCancel={onEditCancel}
          onDelete={handleItemDelete}
          className={''}
        />       
       <MenuAutInfoTreeModal
          title={'권한 메뉴정보'}
          treeForm={
            <Tree            
            className="myCls"
            showLine
            checkable
            selectable={true}
            defaultExpandAll
            //defaultSelectedKeys={this.state.defaultSelectedKeys}
            defaultCheckedKeys={this.state.defaultCheckedKeys}
            onCheck={handleTreeCheck}
            treeData={menuTree}        
            />
          }
          formId={this.state.treeid}
          editTree={editTree}
          toggle={onTreeEditCancel}
          onTreeSubmit={handleMenuAutInfoTreeEditSubmit}
          onTreeCancel={onTreeEditCancel}
          className={''}
        />          
      </div>
    );
  }
}

export default connect(
  state => ({
    args: state.base.getIn(['modal', 'confirm', 'args']),
    error: state.menuAutInfo.get('error'),
    pending: state.menuAutInfo.get('pending'),
    menuAutItemList: state.menuAutInfo.get('menuAutItemList').toJS(),
    menuAutItem: state.menuAutInfo.get('menuAutItem').toJS(),
    search: state.menuAutInfo.get('search').toJS(),
    lastPage: state.menuAutInfo.get('lastPage'),
    totalCount: state.menuAutInfo.get('totalCount'),    
    menuAutTreeList: state.menuAutInfo.get('menuAutTreeList').toJS(),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    MenuAutInfoActions: bindActionCreators(menuAutInfoActions, dispatch),
  }),
)(withRouter(withAlert(withTreeEditModal(withEditModal(withPaging(MenuAutInfoContainer))))));
