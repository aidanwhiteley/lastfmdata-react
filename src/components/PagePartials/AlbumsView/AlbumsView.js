import React, { Component } from 'react';
import axios from '../../../services/LastFmDataAxiosService';
import withAxiosErrorHandler from '../../../services/withAxiosErrorHandler';
// import classes from './AlbumsView.module.css';
import ListOfAlbums from './ListOfAlbums/ListOfAlbums';
import NoAlbumImageAvailable from '../../../assets/images/no_image_available.png';

class AlbumsView extends Component {

    state = {
        topAlbums: null,
        isLoading: false
    }

    smallDeviceImageOffset = window.screen.width < 500 ? 1 : 0;

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

    componentDidMount() {
        this.setState({ isLoading: true });
        axios.get('/stubdata/gettopalbums.json')
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

                this.setState({ topAlbums: albums })
                this.setState({ isLoading: false });

                console.log(this.state.topAlbums);
            }).catch(error => {
                // Handling the error should be done in withAxiosErrorHandler
                this.setState({ isLoading: false });
            });
    }

    render() {

        let JSX = <p>Awaiting data</p>
        if (!this.state.isLoading && this.state.topAlbums) {
            JSX = <ListOfAlbums albums={this.state.topAlbums} />
        }

        return (JSX);
    }
}

export default withAxiosErrorHandler(AlbumsView, axios);