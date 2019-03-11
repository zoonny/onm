import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';

import {
  AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler,
} from '@coreui/react';
// import logo from 'assets/img/brand/logo.svg';
import logo from 'assets/img/brand/logo.png';
import sygnet from 'assets/img/brand/logo.png';
//import Inhcheckbox from 'assets/img/box_dis.png';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class HeaderContainer extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 42, height: 34, alt: 'KT Logo' }}
          minimized={{ src: sygnet, width: 32, height: 24, alt: 'KT Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
        <div className="topMenu">
        <ul>
          <li><a href="">Account</a></li>
          <li><a href="">Logout</a></li>  
        </ul>
        </div>
      </React.Fragment>
    );
  }
}

HeaderContainer.propTypes = propTypes;
HeaderContainer.defaultProps = defaultProps;

export default HeaderContainer;
