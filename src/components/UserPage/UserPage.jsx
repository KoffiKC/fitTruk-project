// ==================================< PERSONAL INFO PAGE >====================================================
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//--------------< MUI IMPORTS >-----------------------------
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

  // ======*** LINK TO MUI CHIPS FOR EDITABLE INPUTS: https://mui.com/material-ui/react-chip/



function UserPage() {
  //==================< SETUP >==========================
  const dispatch = useDispatch();
  const history = useHistory();

  //==================< VARIABLES >==========================
  const user = useSelector((store) => store.user);
  let userObj = {
    id: user.id,
    username: user.username,
    password: user.password,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    street: user.street,
    city: user.city,
    state: user.state,
    zip: user.zip,
    dob: user.dob,
    phone_number: user.phone_number,
    pronouns: user.pronouns,
    emergency_name: user.emergency_name,
    emergency_number: user.emergency_number,
    access_level: user.access_level,
    profile_pic: user.profile_image
  };
  const [editUser, setEditUser] = useState(userObj);
  let initials = '';

  //  ============< Pronoun Change >=============
  const handlePronounChange = (event) => {
    setEditUser({ ...editUser, pronouns: event.target.value });
  };
  //  ============< Address Change >=============
  const handleChangeStreet = (event) => {
    setEditUser({ ...editUser, street: event.target.value });
  };
  //  ============< Pronoun Change >=============
  const handleChangeCity = (event) => {
    setEditUser({ ...editUser, city: event.target.value });
  };

  const handleChangeState = (event) => {
    setEditUser({ ...editUser, state: event.target.value });
  };

  const handleChangeZip = (event) => {
    setEditUser({ ...editUser, zip: event.target.value });
  };

  //  ============< Submit >==============================================
  const handleSubmit = (event) => {
    event.preventDefault();
    let updatedUser = editUser;
    updatedUser = { ...updatedUser };
    console.log('Clicked Submit');
    console.log('Updated user info is:', updatedUser);
    dispatch({
      type: 'UPDATE_CUSTOMER_INFO',
      payload: updatedUser
    });
  }

  const handleReturnClick = () => {
    history.goBack();
    console.log('Clicked Cancel');
  }

  const getInitials = (nameObject) => {
    let firstLetter = 'H';
    let secondLetter = 'i';

    if (nameObject.first_name && nameObject.last_name) {
      firstLetter = (nameObject.first_name[0]).toUpperCase();
      secondLetter = (nameObject.last_name[0]).toUpperCase();
    } else if (nameObject.first_name) {
      firstLetter = (nameObject.first_name[0]).toUpperCase();
      secondLetter = (nameObject.first_name[1]);
    }
    initials = firstLetter + secondLetter;
    return true;
  }


  return (
    <>
      <h1><u>Personal Info Page</u></h1>

      {/* <button onClick={handleTest}>Test userObj</button> */}


      <div className="container">
        <form onSubmit={handleSubmit}>

          <div> {/* CAN EDIT  */}
            

            {/* ------ This will conditionally render a two letter string from the first/last name of the user, and it won't break the app if either of those two values isn't present ------ */}
            {(getInitials(user)) && <Avatar sx={{ bgcolor: '#ace23a' }}>{initials}</Avatar>}

            {/*=====< AVATAR WITH USER PROFILE PICTURE >====*/}
            {/* <Avatar src={user.profile_image} /> */}

          </div>

          <h2>Welcome, {user.first_name}!</h2>
          <div> {/* CAN EDIT  */}
            <p><b>Pronouns:</b> {user.pronouns}</p>
            <select onChange={handlePronounChange} value={editUser.pronouns}>
              <option value="He/Him"> He/Him</option>
              <option value="She/Her"> She/Her</option>
              <option value="They/Them"> They/Them</option>
            </select>
          </div>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Number:</b> {user.phone_number}</p>

          <div> {/* CAN EDIT  */}
            <p><b>Street:</b> {user.street}</p>
            <input
              type="text"
              placeholder={user.street}
              value={editUser.street}
              onChange={handleChangeStreet}
            />
          </div>
          <div>
            <p><b>City:</b> {user.city}</p>
            <input
              type="text"
              placeholder={user.city}
              value={editUser.city}
              onChange={handleChangeCity}
            />
          </div>
          <div>
            <p><b>State:</b> {user.state}</p>
            <input
              type="text"
              placeholder={user.state}
              value={editUser.state}
              onChange={handleChangeState}
            />
          </div>
          <div>
            <p><b>Zip:</b> {user.zip}</p>
            <input
              type="text"
              placeholder={user.zip}
              value={editUser.zip}
              onChange={handleChangeZip}
            />
          </div>

          <p>------- In case of emergencies ---------</p>
          <p><b>Emergency Contact:</b> {user.emergency_name}</p>
          <p><b>Number:</b> {user.emergency_number}</p>
          <button onClick={handleReturnClick}>Cancel</button>
          <button type="submit">Submit</button>
        </form>
      </div>


    </>
  );
}


export default UserPage;
