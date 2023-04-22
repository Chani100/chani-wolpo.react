import axios from "axios";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { Box, CircularProgress, Grid } from "@mui/material";
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
      .get("/cards/cards")
      .then(({ data }) => {
        let dataArr = Object.entries(data);

        setCardsArr(
          dataArr.filter((card) =>
            card[1]["likes"].includes(jwt_decode (localStorage.token)._id)
          )
        );
      })

      .catch((err) => {
        toast.error("Oops");
      });
  }, []);

  const delete1 = (id) => {
    setCardsArr(cardsArr.filter((card) => card[1]._id !== id));
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
  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id != id)
      );
    } catch (err) {}
  };
  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
  };

  if (!cardsArr) {
    
     
     return <CircularProgress /> ;
      
  }

  return (
    <Box>
      <h1>fav page</h1>
      <h3>Here you can fav</h3>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={4} key={item[1]._id + Date.now()}>
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
              onDeletefav={delete1}
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
      </Grid>
    </Box>
  );
};

export default Favcards;
