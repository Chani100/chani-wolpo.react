import { Box, CircularProgress, Grid } from "@mui/material";
import CardComponent from "../components/CardComponent";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import ROUTES from "../routes/ROUTES";
import CreatComponentNew from "../components/Creatcomponents";
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
      /*
        when component loaded and states not loaded
      */
      setOriginalCardsArr(data);
      setCardsArr(data.filter((card) => card.title.startsWith(filter)));
      return;
    }
    if (originalCardsArr) {
      /*
        when all loaded and states loaded
      */
      let neworiginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        neworiginalCardsArr.filter((card) => card.title.startsWith(filter))
      );
    }
  };
  useEffect(() => {
    filterFunc();
   /*  canEdit(); */
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
  if (!cardsArr) {
    return <CircularProgress />;
  }
   const delete1 = () => {};
  return (
    <Box>
      <h1>Welcome</h1>
      <h3>
        On this site you can view site cards if you are registered you can also
        choose favorites The site contains business cards of various
        entertainment sites throughout the country Want to add a card? Register
        as a business and you too can advertise your website! Once you've added
        a card, only you can edit and change its content (We can also delete...)
        Wishing you a pleasant time...
      </h3>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={4} key={item._id + Date.now()}>
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
              onDeletefav={delete1}
              canEdit={
                payload &&
                (payload.biz || payload.isAdmin) &&
                item.user_id == jwt_decode(localStorage.token)._id
              }
              canDelete={
                payload && payload.isAdmin||
                (payload.biz  &&
                item.user_id == jwt_decode(localStorage.token)._id)
              }
            />
          </Grid>
        ))}

        <CreatComponentNew canCreate={payload && payload.biz} />
      </Grid>
    </Box>
  );
};

export default HomePage;
