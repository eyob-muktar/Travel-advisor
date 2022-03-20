import React, {useState} from 'react'
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles';

const Header = ({ setCoordinates }) => {
  const [autocomplete, setAutoComplete] = useState(null);

  const onLoad = (autoC) => setAutoComplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlacee().geometry.location.lat();
    const lng = autocomplete.getPlacee().geometry.location.lng();

    setCoordinates({lat, lng});
  }


  const classes = useStyles();
  return (
    <AppBar position='static' color='secondary'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' className={classes.title}>
          Travel Advisor
        </Typography>
        <Box display='flex'>
        <Typography variant='h6' className={classes.title}>
          Explore new places
        </Typography>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase placeholder='Search...' classes={{root: classes.inputRoot, input: classes.inputInput}} />
          </div>
        </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header