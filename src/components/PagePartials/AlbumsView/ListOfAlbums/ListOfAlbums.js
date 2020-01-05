import React from 'react';
//import classes from './ListOfAlbums.module.css';
import Album from './Album/Album';

const listOfAlbums = (props) => {
    const albums = props.albums.map((anAlbum, index) => {
        return <Album key={index} {...anAlbum} />
    });

    return (<div className="row">
        {albums}
    </div>)
};

export default listOfAlbums;