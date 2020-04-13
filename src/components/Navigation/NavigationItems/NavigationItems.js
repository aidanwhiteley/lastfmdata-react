import React from 'react';
import classes from './NavigationItems.module.css';
import './burger-menu.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { scaleDown as Menu } from 'react-burger-menu';

const navigationData = [
    { id: 1, name: 'albums', displayName: 'Most listened to albums', route: '/albums' },
    { id: 2, name: 'recentTracks', displayName: 'Recently played tracks', route: '/recentTracks' },
    { id: 3, name: 'popularTracks', displayName: 'Most played tracks', route: '/popularTracks' }
];

class NavigationItems extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false
        }

        this.handleStateChange = this.handleStateChange.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    // See https://github.com/negomi/react-burger-menu/wiki/FAQ#i-want-to-control-the-open-state-programmatically-but-i-dont-understand-how-to-use-the-isopen-prop
    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen })
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu() {
        this.setState({ menuOpen: false })
    }

    render() {
        const navDataItems = navigationData.map(navDataItem => {
            return <NavigationItem closeMenu={() => this.closeMenu} key={navDataItem.id} {...navDataItem} />
        });

        return (
            <Menu
                isOpen={this.state.menuOpen}
                pageWrapId={"page-wrap"}
                outerContainerId={"outer-container"}
                onStateChange={(state) => this.handleStateChange(state)} >
                {navDataItems}
            </ Menu>
        );
    };
};

export default NavigationItems;