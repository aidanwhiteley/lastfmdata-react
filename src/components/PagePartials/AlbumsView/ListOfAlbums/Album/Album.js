import React, { Component } from 'react';
import classes from './Album.module.css';

class Album extends Component {

    state = {
        isHovered: false
    }

    handleHover() {
        this.setState(prevState => ({
            isHovered: !prevState.isHovered
        }));
    }

    render() {
        return (
            <div className={classes.Album} >
                <div className={classes.front}>
                    <div>
                        <img src={this.props.albumImage} alt="An album" />
                    </div>
                </div>
                <div className="alpha"></div>

                <div className={classes.back}>
                    <p className={classes.AlbumName}>{this.props.albumName}</p>
                    <p>by</p>
                    <p className={classes.albumArtist}>{this.props.artistName}.</p>
                    <p className={classes.albumTrackPlayCount}>{this.props.albumPlayCount} tracks played</p>
                </div>
            </div>
        )
    }
};

export default Album;