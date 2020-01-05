import React, { Component } from 'react';
import axios from 'axios';
import withAxiosErrorHandler from '../../../services/withAxiosErrorHandler';
import axiosConfig from '../../../services/LastFmDataAxiosService';
import * as Constants from '../../../constants/appConstants';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class RecentTracksView extends Component {

    state = {
        recentTracks: null,
        isLoading: false
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        axios.request(axiosConfig(Constants.METHOD_RECENT_TRACKS, 50))
            .then(response => {
                this.setState({ recentTracks: response.data })
                this.setState({ isLoading: false });
            }).catch(error => {
                // Handling the error should be done in withAxiosErrorHandler
                this.setState({ isLoading: false });
            });
    }

    render() {

        let JSX = <p>Awaiting data</p>

        if (!this.state.isLoading && this.state.recentTracks) {
            const recentTracks = this.state.recentTracks.recenttracks.track;
            const trackLinkFormatter = (cell, row) => (<a href={row.url}>{cell}</a>);
            const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>
                Tracks listened to recently</h3>;

            const columns = [{
                dataField: 'date.#text',
                text: 'Date/time',
                sort: true
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
                caption={<CaptionElement />}
                headerClasses="thead-light" />
        }

        return (JSX);
    }
}

export default withAxiosErrorHandler(RecentTracksView, axios);