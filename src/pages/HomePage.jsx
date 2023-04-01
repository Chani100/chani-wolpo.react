import { Box, CircularProgress, Grid } from "@mui/material";
import CardComponent from "../components/CardComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const HomePage = () => {
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch();
  }, []);
  const handlDeleteFromInitialCardArr = async (id) => {
    try {
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id != id)
      );
      await axios.delete("/cards/" + id);
      
    } catch (err) {}
  };

  const handlEditFromInitialCardArr = (id) => {
    navigate(`/edit/${id}`);
  };
  if (!cardsArr) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={4} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              title={item.title}
              subTitle={item.subTitle}
              description={item.description}
              img={item.image.url}
              onDelete={handlDeleteFromInitialCardArr}
              onEdit={handlEditFromInitialCardArr}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
