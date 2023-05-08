import axios from "axios";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import CardComponent from "../components/CardComponent";

import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";

const Favcards = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("/cards/get-my-fav-cards")
      .then(({ data }) => {
        filterFunc(data);
     
      })

      .catch((err) => {
        toast.error("Error from the server");
      });
  }, []);

const deleteFav = (id) => {
  setCardsArr(cardsArr.filter((card) => card._id !== id));
};

const filterFunc = (data) => {
  if (!originalCardsArr && !data) {
    return;
  }
  let filter = "";
  if (qparams.filter) {
    filter = qparams.filter;
  }
  if (!originalCardsArr && data) {
    /*
        when component loaded and states not loaded
      */
    setOriginalCardsArr(data);
    setCardsArr(
      data.filter(
        (card) =>
          card.title.startsWith(filter) || card.bizNumber.startsWith(filter)
      )
    );
    return;
  }
  if (originalCardsArr) {
    
 
    let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
    setCardsArr(
      newOriginalCardsArr.filter(
        (card) =>
          card.title.startsWith(filter) || card.bizNumber.startsWith(filter)
      )
    );
  }
};
useEffect(() => {
  filterFunc();
}, [qparams.filter]);
const handlDeleteFromInitialCardArr = async (id) => {
  try {
    if (!payload) {
      return;
    }
    await axios.delete("/cards/" + id);
    setCardsArr((newCardsArr) => newCardsArr.filter((item) => item._id != id));
  } catch (err) {
   
  }
};



if (!cardsArr) {
  return <CircularProgress />;
}if (cardsArr == 0) {
  toast.error(
    "You still haven't made a like to any card, Feel free to choose the tickets you like."
  );
}
    const handlEditFromInitialCardArr = (id) => {
      const cardId = cardsArr.find((card) => card._id == id);
      navigate(`/edit/${id}`, { state: { user_id: cardId.user_id } });
    };
    const handlMoreInfo = (id) => {
      navigate(`/moreInformation/${id}`);
    };
  return (
    <Box>
      <Typography variant="h3">fav page</Typography>
      <Typography variant="h5">Here you can fav</Typography>
      {cardsArr.length === 0 ? (
        <Box>
          <Typography variant="h6">You didn't fav cards</Typography>
          {/*   <CreatComponentNew canCreate={payload && payload.biz} /> */}
        </Box>
      ) : (
        <Grid container spacing={2}>
          {cardsArr.map((item) => (
            <Grid item sm={4} md={4} xs={12} key={item._id + Date.now()}>
              <CardComponent
                id={item._id}
                phone={item.phone}
                address={
                  item.street + " " + item.houseNumber + ", " + item.city
                }
                cardNumber={item.bizNumber}
                title={item.title}
                subTitle={item.subTitle}
                description={item.description}
                img={item.image ? item.image.url : ""}
                onDelete={handlDeleteFromInitialCardArr}
                onEdit={handlEditFromInitialCardArr}
                onDeletefav={deleteFav}
                moreIn={handlMoreInfo}
                canEdit={
                  payload &&
                  (payload.isAdmin || payload.biz) &&
                  item.user_id == jwt_decode(localStorage.token)._id
                }
                canDelete={
                  (payload && payload.isAdmin) ||
                  (payload.biz &&
                    item.user_id == jwt_decode(localStorage.token)._id)
                }
                isFav={
                  localStorage.token &&
                  item.likes.includes(jwt_decode(localStorage.token)._id)
                }
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favcards;
