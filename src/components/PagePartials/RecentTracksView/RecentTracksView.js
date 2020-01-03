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
        axios.get()
            .then(response => {
                this.setState({ recentTracks: response.data })
            }).catch(error => {
                console.log('Its all gone so so wrong: ' + JSON.stringify(error));
            }); 
    }

    // componentDidMount() {
    //     fetch('http://jsonplaceholder.typicode.com/users')
    //     .then(res => res.json())
    //     .then((data) => {
    //       this.setState({ contacts: data })
    //     })
    //     .catch(console.log)
    //   }
    // }

    render() {
        return (<p>Working on it</p>)
    }
}

export default RecentTracksView;