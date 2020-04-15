import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import withAxiosErrorHandler from '../../../services/withAxiosErrorHandler';
import axiosConfig from '../../../services/LastFmDataAxiosService';
import * as Constants from '../../../constants/appConstants';
import ListOfAlbums from './ListOfAlbums/ListOfAlbums';
import NoAlbumImageAvailable from '../../../assets/images/not-found.jpg';
import classes from './AlbumsView.module.css';
import { storeTopAlbums } from '../../../store/apiDataSlice';
import { validateTimePeriod } from '../../../utilities/utils';

const mapDispatch = { storeTopAlbums };

class AlbumsView extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: false };

        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();
        this.smallDeviceImageOffset = window.screen.width < 500 ? 1 : 0;

        this.getData = this.getRemoteData.bind(this);
        this.getTimePeriod = this.getTimePeriod.bind(this);
    }

    componentDidMount() {

        const timePeriod = this.getTimePeriod();

        if (!this.existsStoredNonStaleData(timePeriod)) {
            this.getRemoteData(timePeriod);
        } else {
            // Data retrieved from Redux store
        }
    }

    componentDidUpdate(prevProps) {

        if (prevProps.match.params.timePeriod !== this.props.match.params.timePeriod) {
            const timePeriod = this.getTimePeriod();
            if (!this.existsStoredNonStaleData(timePeriod)) {
                this.getRemoteData(timePeriod);
            } else {
                // Data retrieved from Redux store
            }
        }
    }

    existsStoredNonStaleData(timePeriod) {

        if (!this.props.topAlbums) {
            return false;
        }

        const albumSet = this.props.topAlbums.find(albumSet => albumSet.timePeriod === timePeriod)
        if (!albumSet) {
            return false;
        }

        if ((new Date()).getTime() - albumSet.lastUpdate >= Constants.CACHE_TIMEOUT_MILLIS) {
            return false;
        }

        return true;
    }

    componentWillUnmount() {
        // TODO - rework this - Travis build / test stills complains about possible memory leak
        this.source.cancel('Operation canceled by unmount method');
    }

    getTimePeriod() {
        return validateTimePeriod(this.props.match.params.timePeriod);
    }

    getRemoteData(timePeriod) {
        this.setState({ isLoading: true });

        axios.request(axiosConfig(Constants.METHOD_TOP_ALBUMS, 20, timePeriod), { cancelToken: this.source.Token })
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
                this.props.storeTopAlbums({ apiData: albums, lastUpdate: (new Date().getTime()), timePeriod: timePeriod });
            }).catch(error => {
                // Handling the error should be done in withAxiosErrorHandler
                this.setState({ isLoading: false });
            });
    }

    render() {

        const timePeriod = this.getTimePeriod();
        const albumSet = this.props.topAlbums.find(albumSet => albumSet.timePeriod === timePeriod);

        let JSX = <div className={classes.Loader}>Loading...</div>

        if (!this.state.isLoading && albumSet) {
            JSX = <ListOfAlbums albums={albumSet.apiData} />
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


export default connect(mapStateToProps, mapDispatch)(withAxiosErrorHandler(AlbumsView, axios));