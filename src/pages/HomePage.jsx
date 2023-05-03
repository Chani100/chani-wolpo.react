import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import CardComponent from "../components/CardComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

import IconCreatComponen from "../components/IconCreatcomponents";

const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
 useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        toast.error("Oops");
      });
  }, []);
  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCardsArr && data) {
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
      let neworiginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        neworiginalCardsArr.filter(
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
      await axios.delete("/cards/" + id);
      setCardsArr((currentCardsArr) =>
        currentCardsArr.filter((item) => item._id != id)
      );

      toast.success("The image has been successfully deleted");
    } catch (err) {}
  };

  const handlEditFromInitialCardArr = (id) => {
    navigate(`/edit/${id}`);
  };
  const handlMoreInfo = (id) => {
    navigate(`/moreInformation/${id}`);
  };
  if (!cardsArr) {
    return <CircularProgress />;
  }
  const deleteFav = () => {};
  return (
    <Box>
      <Typography variant="h3">Welcome</Typography>
      <Typography variant="h6">
        Need Help? Here you can find business cards of various charitable
        organizations that work completely voluntarily. By clicking on the image
        of the card, a window will open with all the details of the
        organization. If you are not registered on the site at all, you can only
        view the home page. Did you sign up? excellent! Here are more options:
        Want to keep the card available? By clicking on the heart, the card will
        be saved in favorites and you can also access it through the favorites
        page Do you have such an organization and want to advertise? Register
        for the site, select the business option on the registration page and
        you can post a business card, edit it, and delete it. Your tickets will
        also appear on the My Tickets page. Entering cards if the content is not
        suitable for the site? We can delete your card pay attention! The
        content of the card and its reliability is the sole responsibility of
        the advertiser.
      </Typography>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item sm={6} md={4} xs={12} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              cardNumber={item.bizNumber}
              title={item.title}
              subTitle={item.subTitle}
              phone={item.phone}
              address={
                item.country +
                " " +
                item.state +
                " " +
                item.city +
                " " +
                item.street +
                " " +
                item.houseNumber
              }
              img={item.image ? item.image.url : ""}
              onDelete={handlDeleteFromInitialCardArr}
              onEdit={handlEditFromInitialCardArr}
              moreIn={handlMoreInfo}
              onDeletefav={deleteFav}
              canEdit={
                payload &&
                (payload.biz || payload.isAdmin) &&
                item.user_id == jwt_decode(localStorage.token)._id
              }
              canDelete={
                payload &&
                (payload.isAdmin ||
                  (payload.biz &&
                    item.user_id == jwt_decode(localStorage.token)._id))
              }
              isFav={
                localStorage.token &&
                item.likes.includes(jwt_decode(localStorage.token)._id)
              }
            />
          </Grid>
        ))}

        <IconCreatComponen canCreate={payload && payload.biz} />
      </Grid>
    </Box>
  );
};

export default HomePage;
