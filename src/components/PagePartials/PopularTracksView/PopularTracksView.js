import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import withAxiosErrorHandler from '../../../services/withAxiosErrorHandler';
import axiosConfig from '../../../services/LastFmDataAxiosService';
import * as Constants from '../../../constants/appConstants';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import classes from './PopularTracksView.module.css';
import * as actionTypes from '../../../store/actions';

class PopularTracksView extends Component {

    state = {
        isLoading: false
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        if (!this.props.topTracks || (new Date() - this.props.topTracks.lastUpdate >= Constants.CACHE_TIMEOUT_MILLIS)) {
            axios.request(axiosConfig(Constants.METHOD_TOP_TRACKS, 50))
                .then(response => {
                    this.props.onTopTracksDataRetrieved(response.data);
                    this.setState({ isLoading: false });
                }).catch(error => {
                    // Handling the error should be done in withAxiosErrorHandler
                    this.setState({ isLoading: false });
                });
        } else {
            // Data retrieved from Redux store
            this.setState({ isLoading: false });
        }
    }

    numericSortFunc(a, b, order) {

        if (order === 'asc') {
          return Number(b) - Number(a);
        } else {
          return Number(a) - Number(b);
        }
    }

    render() {

        let JSX = <div className={classes.Loader}>Loading...</div>;

        if (!this.state.isLoading && this.props.topTracks) {
            const popularTracks = this.props.topTracks.apiData.toptracks.track;
            const trackLinkFormatter = (cell, row) => (<a href={row.url}>{cell}</a>);
            const artistLinkFormatter = (cell, row) => (<a href={row.artist.url}>{cell}</a>);
            const CaptionElement = () => <h3
                style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>
                Most played tracks</h3>;

            const columns = [{
                dataField: 'playcount',
                text: 'Play count',
                sortFunc: this.numericSortFunc,
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

const mapStateToProps = state => {
    return {
        topTracks: state.topTracks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTopTracksDataRetrieved: (apiData) => dispatch({ type: actionTypes.STORE_TOP_TRACKS_DATA, apiData: apiData })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withAxiosErrorHandler(PopularTracksView, axios));