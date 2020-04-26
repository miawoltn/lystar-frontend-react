import React from 'react';
import {
    UncontrolledButtonDropdown, Button,
    DropdownToggle, DropdownMenu, NavLink, DropdownItem
} from 'reactstrap';

const ActionButton = (props) => {
    console.log(props)
    const navItems = props.actions.map((action, index) => {
        return (
            <DropdownItem key={index}>
                <NavLink
                    href="#!"
                    onClick={(e) => { e.preventDefault(); props.onActionSelected(action, props.id) }} >
                    {/* <i className="nav-link-icon lnr-picture"> </i> */}
                    <span>{action}</span>
                </NavLink>
            </DropdownItem>
        )
    })
    return (
        <UncontrolledButtonDropdown className="mb-2 mr-2">
            <Button size="lg" className="btn-wide" color="primary">Select Action</Button>
            <DropdownToggle size="lg" className="dropdown-toggle-split" caret
                color="primary" />
            <DropdownMenu>
                {navItems}
            </DropdownMenu>
        </UncontrolledButtonDropdown>
    )
};

export default ActionButton;