import React from 'react';
import LayoutContainer from 'containers/comn/layout';

// 중개
const Dashboard = React.lazy(() => import('views/medi/dashboard/Dashboard'));

// 정산
const SetlItemMgmt = React.lazy(() => import('containers/onm/setlBase/setlItemMgmt/SetlItemInfoContainer'));
const SetlTarifMgmt = React.lazy(() => import('containers/onm/setlBase/setlTarifMgmt/SetlTarifInfoContainer'));
const SetlTgtMgmt = React.lazy(() => import('containers/onm/setlBase/setlTgtMgmt/SetlTgtInfoContainer'));
const SetlDstrbMgmt = React.lazy(() => import('containers/onm/setlTxn/setlDstrbMgmt/SetlDstrbContainer'));
const SetlBillTrtMgmt = React.lazy(() => import('containers/onm/setlTxn/setlBillTrtMgmt/SetlBillTrtContainer'));
const SetlBillStatMgmt = React.lazy(() => import('containers/onm/setlTxn/setlBillStatMgmt/SetlBillStatContainer'));
const SetlDstrbStat = React.lazy(() => import('containers/onm/setlTxn/setlDstrbStat/SetlDstrbStatContainer'));

//연동기관
const MedicalInstnMgmt = React.lazy(() => import('containers/onm/instn/medicalInstnMgmt/MedicalInstnInfoContainer'));
const IcomMgmt = React.lazy(() => import('containers/onm/instn/icomMgmt/IcomInfoContainer'));
const MedicalInstnIfSysMgmt = React.lazy(() => import('containers/onm/instn/medicalInstnMgmt/MedicalInstnIfSysInfoContainer'));
const IcomSysMgmt = React.lazy(() => import('containers/onm/instn/icomMgmt/IcomInfoSysInfoContainer'));


// 시스템
const UserMgmt = React.lazy(() => import('containers/onm/sys/userMgmt/UserInfoContainer'));
const CodeMgmt = React.lazy(() => import('containers/onm/sys/codeMgmt/CdGroupBasContainer'));
const MenuMgmt = React.lazy(() => import('containers/onm/menuMgmt/MenuMgmtContainer'),);
const SysMenuMgmt = React.lazy(() => import('containers/onm/sys/sysMenuMgmt/SysMenuInfoContainer'));
const MenuAutMgmt = React.lazy(() => import('containers/onm/sys/menuAutMgmt/MenuAutInfoContainer'));


// 예제
const Alert = React.lazy(() => import('views/example/alert/ReactAlertExample'));
const Post = React.lazy(() => import('containers/example/post/PostContainer'));
const DataGrid = React.lazy(() => import('views/example/datagrid/SimpleGridExample'),);
const DatePicker = React.lazy(() => import('views/example/datepicker/DatePickerExample'),);
const List = React.lazy(() => import('views/example/list/ReactVirtualizedListExample'),);
const Modal = React.lazy(() => import('views/example/modal/ModalExample'));
const Table = React.lazy(() => import('views/example/table/TableExample'));
const Tree = React.lazy(() => import('views/example/tree/TreeExample'));

const routes = [
  // 메인
  { path: '/main', exact: true, name: 'Main', component: LayoutContainer },
  // 중개
  //{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // 정산
  {
    path: '/setlBase/setlItemMgmt',
    exact: true,
    name: '정산 항목 관리',
    component: SetlItemMgmt,
  },
  {
    path: '/setlBase/setlTarifMgmt',
    exact: true,
    name: '정산 요율 관리',
    component: SetlTarifMgmt,
  },
  {
    path: '/setlBase/setlTgtMgmt',
    exact: true,
    name: '정산 대상 관리',
    component: SetlTgtMgmt,
  },
  {
    path: '/setlTxn/setlDstrbMgmt',
    exact: true,
    name: '정산내역',
    component: SetlDstrbMgmt,
  },
  {
    path: '/setlTxn/setlBillTrtMgmt',
    exact: true,
    name: '정산청구 관리',
    component: SetlBillTrtMgmt,
  },
  {
    path: '/setlTxn/setlBillStatMgmt',
    exact: true,
    name: '정산청구 통계',
    component: SetlBillStatMgmt,
  },
  {
    path: '/instn/medicalInstnMgmt',
    exact: true,
    name: '의료중개기관 관리',
    component: MedicalInstnMgmt,
  },  
  {
    path: '/instn/medicalInstnIfSysMgmt',
    exact: true,
    name: '의료중개기관 연동정보 관리',
    component: MedicalInstnIfSysMgmt,
  },  
  {
    path: '/instn/icomMgmt',
    exact: true,
    name: '보험사 관리',
    component: IcomMgmt,
  },  
  {
    path: '/instn/icomSysMgmt',
    exact: true,
    name: '보험사 연동정보 관리',
    component: IcomSysMgmt,
  },    
  {
    path: '/sys/userMgmt',
    exact: true,
    name: '사용자 관리',
    component: UserMgmt,
  },
  {
    path: '/sys/codeMgmt',
    exact: true,
    name: '코드 정보 관리',
    component: CodeMgmt,
  },
  {
    path: '/sys/menuAutMgmt',
    exact: true,
    name: '권한 관리',
    component: MenuAutMgmt,
  },
  {
    path: '/sys/sysMenuMgmt',
    exact: true,
    name: '자원 관리',
    component: SysMenuMgmt,
  },
  {
    path: '/setlTxn/setlDstrbStat',
    exact: true,
    name: '정산 통계',
    component: SetlDstrbStat,
  },  
];

export default routes;
