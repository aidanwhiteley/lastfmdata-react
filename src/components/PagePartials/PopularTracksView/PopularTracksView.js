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
import { storeTopTracks } from '../../../store/apiDataSlice';
import { validateTimePeriod } from '../../../utilities/utils';

const mapDispatch = { storeTopTracks };

class PopularTracksView extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: false };

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

        if (!this.props.topTracks) {
            return false;
        }

        const topTracks = this.props.topTracks.find(topTracks => topTracks.timePeriod === timePeriod)
        if (!topTracks) {
            return false;
        }

        if ((new Date()).getTime() - topTracks.lastUpdate >= Constants.CACHE_TIMEOUT_MILLIS) {
            return false;
        }

        return true;
    }

    getTimePeriod() {
        return validateTimePeriod(this.props.match.params.timePeriod);
    }

    numericSortFunc(a, b, order) {

        if (order === 'asc') {
            return Number(b) - Number(a);
        } else {
            return Number(a) - Number(b);
        }
    }

    getRemoteData(timePeriod) {
        this.setState({ isLoading: true });

        axios.request(axiosConfig(Constants.METHOD_TOP_TRACKS, 50, timePeriod))
            .then(response => {
                this.props.storeTopTracks({ apiData: response.data, lastUpdate: (new Date().getTime()), timePeriod: timePeriod });
                this.setState({ isLoading: false });
            }).catch(error => {
                // Handling the error should be done in withAxiosErrorHandler
                this.setState({ isLoading: false });
            });
    } 

    render() {

        const timePeriod = this.getTimePeriod();
        const topTracks = this.props.topTracks.find(topTracks => topTracks.timePeriod === timePeriod);

        let JSX = <div className={classes.Loader}>Loading...</div>;

        if (!this.state.isLoading && topTracks) {
            const popularTracks = topTracks.apiData.toptracks.track;
            const trackLinkFormatter = (cell, row) => (<a href={row.url} target="_top">{cell}</a>);
            const artistLinkFormatter = (cell, row) => (<a href={row.artist.url} target="_top">{cell}</a>);
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

export default connect(mapStateToProps, mapDispatch)(withAxiosErrorHandler(PopularTracksView, axios));