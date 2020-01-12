import React, { Component } from 'react';
import axios from 'axios';
import withAxiosErrorHandler from '../../../services/withAxiosErrorHandler';
import axiosConfig from '../../../services/LastFmDataAxiosService';
import * as Constants from '../../../constants/appConstants';
import ListOfAlbums from './ListOfAlbums/ListOfAlbums';
import NoAlbumImageAvailable from '../../../assets/images/not-found.png';
import classes from './AlbumsView.module.css';

class AlbumsView extends Component {

    state = {
        topAlbums: null,
        isLoading: false
    }

    CancelToken = axios.CancelToken;
    source = this.CancelToken.source();

    smallDeviceImageOffset = window.screen.width < 500 ? 1 : 0;

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

    componentDidMount() {

        this.setState({ isLoading: true });

        axios.request(axiosConfig(Constants.METHOD_TOP_ALBUMS, 20), {cancelToken: this.source.Token})
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

                this.setState({ topAlbums: albums })
                this.setState({ isLoading: false });

            }).catch(error => {
                // Handling the error should be done in withAxiosErrorHandler
                this.setState({ isLoading: false });
            });
    }

    componentWillUnmount() {
        this.source.cancel('Operation canceled by unmount method');
    }

    render() {

        let JSX = <div className={classes.Loader}>Loading...</div>
        if (!this.state.isLoading && this.state.topAlbums) {
            JSX = <ListOfAlbums albums={this.state.topAlbums} />
        }

        return (JSX);
    }
}

export default withAxiosErrorHandler(AlbumsView, axios);