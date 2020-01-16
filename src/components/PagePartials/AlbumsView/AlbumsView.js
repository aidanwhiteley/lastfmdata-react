import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import withAxiosErrorHandler from '../../../services/withAxiosErrorHandler';
import axiosConfig from '../../../services/LastFmDataAxiosService';
import * as Constants from '../../../constants/appConstants';
import ListOfAlbums from './ListOfAlbums/ListOfAlbums';
import NoAlbumImageAvailable from '../../../assets/images/not-found.jpg';
import classes from './AlbumsView.module.css';
import * as actionTypes from '../../../store/actions';

class AlbumsView extends Component {

    state = {
        isLoading: false
    }

    CancelToken = axios.CancelToken;
    source = this.CancelToken.source();

    smallDeviceImageOffset = window.screen.width < 500 ? 1 : 0;

    componentDidMount() {

        this.setState({ isLoading: true });

        if (!this.props.topAlbums || (new Date() - this.props.topAlbums.lastUpdate >= Constants.CACHE_TIMEOUT_MILLIS)) {

            axios.request(axiosConfig(Constants.METHOD_TOP_ALBUMS, 20), { cancelToken: this.source.Token })
                .then(response => {

                    // Map data into easier to use format
                    const albums = response.data.topalbums.album.map(anAlbum => {
                        return {
                            artistName: anAlbum.artist.name,
                            artistUrl: anAlbum.artist.url,
                            albumName: anAlbum.name,
                            albumUrl: anAlbum.url,
                            albumPlayCount: anAlbum.playcount,
                            albumImage: this.whichAlbumImage(anAlbum)
                        }
                    });

                    this.setState({ isLoading: false });
                    this.props.onAlbumDataRetrieved(albums);
                }).catch(error => {
                    // Handling the error should be done in withAxiosErrorHandler
                    this.setState({ isLoading: false });
                });
        } else {
            // Data retrieved from Redux store
            this.setState({ isLoading: false });
        }
    }

    componentWillUnmount() {
        // TODO - rework this - Travis build / test stills complains about possible memory leak
        this.source.cancel('Operation canceled by unmount method');
    }

    render() {

        let JSX = <div className={classes.Loader}>Loading...</div>
        if (!this.state.isLoading && this.props.topAlbums) {
            JSX = <ListOfAlbums albums={this.props.topAlbums.apiData} />
        }

        return (JSX);
    }

    whichAlbumImage = (anAlbum) => {
        const countImageSlots = anAlbum.image.length;
        // We expect 4 images per album - the slot name are in the array below just for info
        if (countImageSlots !== ['small', 'medium', 'large', 'extralarge'].length) {
            return NoAlbumImageAvailable;
        } else {
            const imageUrl = anAlbum.image[anAlbum.image.length - 1 - this.smallDeviceImageOffset]['#text'];
            if (!imageUrl) {
                return NoAlbumImageAvailable;
            } else {
                return imageUrl;
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        topAlbums: state.topAlbums
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAlbumDataRetrieved: (apiData) => dispatch({ type: actionTypes.STORE_TOP_ALBUMS_DATA, apiData: apiData })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withAxiosErrorHandler(AlbumsView, axios));