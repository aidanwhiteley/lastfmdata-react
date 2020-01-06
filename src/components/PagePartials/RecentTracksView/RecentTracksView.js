import React, { Component } from 'react';
import axios from 'axios';
import withAxiosErrorHandler from '../../../services/withAxiosErrorHandler';
import axiosConfig from '../../../services/LastFmDataAxiosService';
import * as Constants from '../../../constants/appConstants';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import classes from './RecentTracksView.module.css';

class RecentTracksView extends Component {

    state = {
        recentTracks: null,
        isLoading: false
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        axios.request(axiosConfig(Constants.METHOD_RECENT_TRACKS, 50))
            .then(response => {
                const tracks = response.data.recenttracks.track;

                // Fix for there being now date on Now Playing tracks (as we use this for the key field)
                tracks.forEach(aTrack => {
                    if (!aTrack.date) {
                        aTrack.date = {};
                        aTrack.date.uts = + new Date();
                    }
                })

                this.setState({ recentTracks: tracks })
                this.setState({ isLoading: false });
            }).catch(error => {
                // Handling the error should be done in withAxiosErrorHandler
                this.setState({ isLoading: false });
            });
    }

    render() {

        let JSX = <div className={classes.Loader}>Loading...</div>;

        if (!this.state.isLoading && this.state.recentTracks) {
            const recentTracks = this.state.recentTracks;
            const trackLinkFormatter = (cell, row) => (<a href={row.url}>{cell}</a>);
            const nowPlayingCheck = (cell, row) => (row["@attr"] && row["@attr"].nowplaying ? 'Now playing!' : cell);
            const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>
                Recently played tracks</h3>;

            const columns = [{
                dataField: 'date.#text',
                text: 'Date/time',
                sort: true,
                formatter: nowPlayingCheck
            }, {
                dataField: 'name',
                text: 'Track Name',
                sort: true,
                formatter: trackLinkFormatter
            }, {
                dataField: 'artist.#text',
                text: 'Artist',
                sort: true
            }, {
                dataField: 'album.#text',
                text: 'Album',
                sort: true
            }];

            JSX = <BootstrapTable
                bootstrap4
                striped
                hover
                condensed
                keyField='date.uts'
                data={recentTracks}
                columns={columns}
                pagination={paginationFactory()}
                caption={< CaptionElement />}
                headerClasses="thead-light" />
        }

        return (JSX);
    }
}

export default withAxiosErrorHandler(RecentTracksView, axios);