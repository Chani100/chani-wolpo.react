import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Box,
 
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import CreateIcon from "@mui/icons-material/Create";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneIcon from "@mui/icons-material/Phone";
import { Fragment, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";

const CardComponent = ({
  id,
  img,
  title,
  subTitle,
  phone,
  address,
  cardNumber,
  onDelete,
  onEdit,
  canEdit,
  canDelete,
  onDeletefav,
  moreIn,
  isFav,
}) => {
   const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const [favState, setfavState] = useState(isFav);
  const handleBtnDeleteClick = () => {
    onDelete(id);
  };
  const handleBtnEditClick = () => {
    onEdit(id);
  };

  const handlMoreInfor = () => {
    moreIn(id);
  };

  const handleFavBtnClick = async () => {
    try {
      await axios.patch("/cards/card-like/" + id);
      onDeletefav(id);
      setfavState(!favState);
    } catch (err) {
   
    }
  };
  return (
    <Card /* square raised */ className="cardStely">
      <CardActionArea>
        <CardMedia
          component="img"
         
          image={img}
          className="imgcard"
          onClick={handlMoreInfor}
        />
      </CardActionArea>
      <CardHeader title={title} subheader={`${subTitle}`} />
      <CardContent>
        <Typography>{`Phone: ${phone}`}</Typography>
        <Typography>{`Address: ${address}`}</Typography>
        <Typography>{`Card Number: ${cardNumber}`}</Typography>
      </CardContent>

      <CardActions>
        <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
          {canDelete ? (
            <Fragment>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={handleBtnDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
            </Fragment>
          ) : (
            ""
          )}
          {canEdit ? (
            <Fragment>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={handleBtnEditClick}
              >
                <CreateIcon />
              </IconButton>
            </Fragment>
          ) : (
            ""
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          {isLoggedIn ? (
            <Button color="primary" onClick={handleFavBtnClick}>
              <FavoriteIcon
                className="fav"
                sx={favState ? { color: "red" } : { color: "primary" }}
              />
            </Button>
          ) : (
            ""
          )}
          <IconButton aria-label="add an alarm" sx={{ color: "red" }}>
            <PhoneIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,

  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};
CardComponent.defaultProps = {
  img: "http://www.2all.co.il/web/Sites/tutyfrutyyy/65882_(6).jpg",
  subTitle: 0,
};
export default CardComponent;
