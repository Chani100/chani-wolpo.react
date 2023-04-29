import axios from "axios";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import CardComponent from "../components/CardComponent";

import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import IconCreatComponen from "../components/IconCreatcomponents";

const MyCards = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("/cards/my-cards/")
      .then(({ data }) => {
        let dataArr = Object.entries(data);

        setCardsArr(
          dataArr.filter((card) =>
            card[1]["user_id"].includes(jwt_decode(localStorage.token)._id)
          )
        );
      })

      .catch((err) => {
        console.log(err);
        if (!cardsArr) {
          toast.error("You have no saved cards that you created!");
        }
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
      setCardsArr(data.filter((card) => card.title.startsWith(filter)));
      return;
    }
    if (originalCardsArr) {
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter((card) => card.title.startsWith(filter))
      );
    }
  };
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);

  if (!cardsArr) {
    return <CircularProgress />;
  }
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
  if (cardsArr == 0) {
    toast.error(
      "You haven't created tickets yet,Feel free to create a card and post it."
    );
  }

  return (
    <Box>
      <h1>My Cards</h1>
      <h3>
        The cards you created yourself! You can edit and delete them. On the
        side you have a link to add a card.
      </h3>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item sm={6} md={4} xs={12}  key={item[1]._id + Date.now()}>
            <CardComponent
              id={item[1]._id}
              phone={item[1].phone}
              address={
                item[1].street + " " + item[1].houseNumber + ", " + item[1].city
              }
              cardNumber={item[1].bizNumber}
              title={item[1].title}
              subTitle={item[1].subTitle}
              description={item[1].description}
              img={item[1].image ? item[1].image.url : ""}
              /* onDelete={handlDeleteFromInitialCardArr}
              onEdit={handlEditFromInitialCardArr} */
              onDelete={handlDeleteFromInitialCardArr}
              onEdit={handlEditFromInitialCardArr}
              canEdit={
                payload &&
                (payload.isAdmin || payload.biz) &&
                item[1].user_id == jwt_decode(localStorage.token)._id
              }
              canDelete={
                (payload && payload.isAdmin) ||
                (payload.biz &&
                  item[1].user_id == jwt_decode(localStorage.token)._id)
              }
            />
          </Grid>
        ))}

        <IconCreatComponen canCreate={payload && payload.biz} />
      </Grid>
    </Box>
  );
};

export default MyCards;
