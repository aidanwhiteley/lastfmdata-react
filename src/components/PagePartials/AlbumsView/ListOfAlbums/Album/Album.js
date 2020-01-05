import React, { Component } from 'react';
import styles from './Album.module.css';
import classNames from 'classnames/bind';

class Album extends Component {

    state = {
        isHovered: false
    }

    handleHover = () => {
        this.setState(prevState => ({
            isHovered: !prevState.isHovered
        }));
    }

    render() {

        let cx = classNames.bind(styles);

        let className = cx({
            Album: true,
            flip: this.state.isHovered
        });

        return (
            <div className={className} onMouseOver={this.handleHover} onMouseOut={this.handleHover}>
                <div className={styles.front}>
                    <div>
                        <img src={this.props.albumImage} alt="An album" />
                    </div>
                    <div className={styles.alpha}></div>
                </div>

                <div className={styles.back}>
                    <p className={styles.AlbumName}>{this.props.albumName}</p>
                    <p>by</p>
                    <p className={styles.AlbumArtist}>{this.props.artistName}.</p>
                    <p className={styles.AlbumTrackPlayCount}>{this.props.albumPlayCount} tracks played</p>
                </div>
            </div>
        )
    }
};

export default Album;