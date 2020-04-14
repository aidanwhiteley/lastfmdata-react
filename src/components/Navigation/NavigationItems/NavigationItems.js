import React from 'react';
import './burger-menu.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { scaleRotate as Menu } from 'react-burger-menu';
import { faPlayCircle, faMusic, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const navigationData = [
    { id: 1, name: 'albums', displayName: 'Top albums', route: '/albums', icon: faMusic },
    { id: 2, name: 'recentTracks', displayName: 'Recent tracks', route: '/recentTracks', icon: faPlayCircle },
    { id: 3, name: 'popularTracks', displayName: 'Top tracks', route: '/popularTracks', icon: faVolumeUp }
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