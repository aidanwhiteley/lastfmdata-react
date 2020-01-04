import React, { Component } from 'react';
import axios from '../../../services/LastFmDataAxiosService';
import withAxiosErrorHandler from '../../../services/withAxiosErrorHandler';
// import classes from './recentTracksView.module.css';

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
                console.log(response);
            }).catch(error => {
                // Handling the error should be done in withAxiosErrorHandler
                this.setState({ isLoading: false });
            });
    }

    render() {
        return (<p>Working on it</p>)
    }
}

export default withAxiosErrorHandler(RecentTracksView, axios);