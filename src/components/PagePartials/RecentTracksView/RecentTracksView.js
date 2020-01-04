import React, { Component } from 'react';
import axios from '../../../services/LastFmDataAxiosService';
import withAxiosErrorHandler from '../../../services/withAxiosErrorHandler';
// import classes from './recentTracksView.module.css';
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
        axios.get('/stubdata/getrecenttracks.json')
            .then(response => {
                this.setState({ recentTracks: response.data })
                this.setState({ isLoading: false });
            }).catch(error => {
                // Handling the error should be done in withAxiosErrorHandler
                this.setState({ isLoading: false });
            });
    }

    render() {

        let JSX = <div className="row"><p>Awaiting data</p></div>;

        if (!this.state.isLoading && this.state.recentTracks) {
            const recentTracks = this.state.recentTracks.recenttracks.track;

            const trackLinkFormatter = (cell, row) => (<a href={row.url}>{cell}</a>)

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

            JSX = <div className="row"><BootstrapTable
                bootstrap4
                striped
                hover
                condensed
                keyField='date.uts'
                data={recentTracks}
                columns={columns}
                pagination={paginationFactory()}
                headerClasses="thead-light" /></div>
        }

        return (JSX);
    }
}

export default withAxiosErrorHandler(RecentTracksView, axios);