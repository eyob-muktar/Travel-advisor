import React, {useEffect, useState} from 'react'
import { CssBaseline, Grid } from '@material-ui/core';


import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData } from './api';

const App = () => {
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [coordinates, setCoordinates] = useState()
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClicked] = useState(null)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=> {
      setCoordinates({ lat: latitude, lng: longitude})
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating >= rating);

    setFilteredPlaces(filteredPlaces);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  useEffect(() => {
    if(bounds.sw && bounds.ne) {

      setLoading(true)
      getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setLoading(false);
      })
    }
  }, [type, bounds])
  

  return (
    <>
    <CssBaseline />
    <Header 
      setCoordinates={setCoordinates}
    />
    <Grid container spacing={3} style={{ width: '100%'}}>
      <Grid item xs={12} md={4}>
        <List 
        places={filteredPlaces.length ? filteredPlaces : places} 
        childClicked={childClicked} 
        loading={loading}
        type={type}
        setType={setType}
        rating={rating}
        setRating={setRating}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Map 
        setCoordinates={setCoordinates}
        coordinates={coordinates}
        setBounds={setBounds}
        places={filteredPlaces.length ? filteredPlaces : places} 
        setChildClicked={setChildClicked}
         />
      </Grid>
    </Grid>
    </>
  )
}

export default App;