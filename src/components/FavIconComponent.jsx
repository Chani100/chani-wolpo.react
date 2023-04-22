/* import { Box, IconButton } from "@mui/material";
import { Fragment } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useSelector } from "react-redux";


const Favicon = async (id) => {
 
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);

  
  try {
    await axios.patch("/cards/card-like/" + id);
   
  } catch (err) {
    console.log("error when change fav", err.response.data);
  }

  return (
    <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
      {isLoggedIn ? (
        <Fragment>
          <IconButton size="large" onClick={Favicon}>
            <FavoriteIcon />
          </IconButton>
        </Fragment>
      ) : (
        " "
      )}
    </Box>
  );
};

export default Favicon;
 */