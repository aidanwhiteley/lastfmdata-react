import React, { Component } from 'react';
import axios from 'axios';
import withAxiosErrorHandler from '../../../services/withAxiosErrorHandler';
import axiosConfig from '../../../services/LastFmDataAxiosService';
import * as Constants from '../../../constants/appConstants';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class PopularTracksView extends Component {

    state = {
        popularTracks: null,
        isLoading: false
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        axios.request(axiosConfig(Constants.METHOD_TOP_TRACKS, 50))
            .then(response => {
                this.setState({ popularTracks: response.data })
                this.setState({ isLoading: false });
            }).catch(error => {
                // Handling the error should be done in withAxiosErrorHandler
                this.setState({ isLoading: false });
            });
    }

    render() {

        let JSX = <p>Awaiting data</p>;

        if (!this.state.isLoading && this.state.popularTracks) {
            const popularTracks = this.state.popularTracks.toptracks.track;
            const trackLinkFormatter = (cell, row) => (<a href={row.url}>{cell}</a>);
            const artistLinkFormatter = (cell, row) => (<a href={row.artist.url}>{cell}</a>);
            const CaptionElement = () => <h3
                style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>
                Most listened to tracks</h3>;

            const columns = [{
                dataField: 'playcount',
                text: 'Play count',
                sort: true
            }, {
                dataField: 'name',
                text: 'Track Name',
                sort: true,
                formatter: trackLinkFormatter
            }, {
                dataField: 'artist.name',
                text: 'Artist',
                sort: true,
                formatter: artistLinkFormatter
            }];

            JSX = <BootstrapTable
                bootstrap4
                striped
                hover
                condensed
                keyField='@attr.rank'
                data={popularTracks}
                columns={columns}
                pagination={paginationFactory()}
                caption={<CaptionElement />}
                headerClasses="thead-light" />
        }

        return (JSX);
    }
}

export default withAxiosErrorHandler(PopularTracksView, axios);