import React, { Component } from 'react';
import axios from '../../../services/LastFmDataAxiosService';
import withAxiosErrorHandler from '../../../services/withAxiosErrorHandler';
// import classes from './popularTracksView.module.css';
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
        axios.get('/stubdata/gettoptracks.json')
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
                headerClasses="thead-light" />
        }

        return (<div className="row">{JSX}</div>);
    }
}

export default withAxiosErrorHandler(PopularTracksView, axios);