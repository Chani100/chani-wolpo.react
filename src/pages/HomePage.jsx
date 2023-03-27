import { Box, Grid } from "@mui/material";
import CardComponent from "../components/CardComponent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialCardArr = [
  {
    id: 1,
    img: "https://images.squarespace-cdn.com/content/v1/5a7c0544d74cffa3a6ce66b3/1598294768973-3ZBAAYKDXW1NLJJORBWH/%D7%AA%D7%9E%D7%95%D7%A0%D7%AA+%D7%A0%D7%95%D7%A3+-+%D7%90%D7%92%D7%9D+%D7%92%D7%90%D7%A8%D7%93%D7%94%2C+%D7%90%D7%99%D7%98%D7%9C%D7%99%D7%94.jpg",
    title: "nature",
    price: 112,
    description: `lorm hgfddfvj xdtyfyghb ctyuh ftyuh drtyu drtyuj rtyujh dfvhbjky uyhytu uyfhu `,
  },
  {
    id: 2,
    img: "https://www.picshare.co.il/s_pictures/img94089.jpg",
    title: "nature 1",
    price: 112,
    description: `lorm hgfddfvj xdtyfyghb ctyuh ftyuh drtyu drtyuj rtyujh dfvhbjky uyhytu uyfhu`,
  },
  {
    id: 3,
    img: "https://www.photo-art.co.il/wp-content/uploads/2015/06/BY1A65881.jpg",
    title: "nature 2",

    description: `lorm hgfddfvj xdtyfyghb ctyuh ftyuh drtyu drtyuj rtyujh dfvhbjky uyhytu uyfhu `,
  },
  {
    id: 4,
    img: "https://www.picshare.co.il/s_pictures/img62733.jpg",
    title: "nature 3",
    price: 112,
    description: `lorm hgfddfvj xdtyfyghb ctyuh ftyuh drtyu drtyuj rtyujh dfvhbjky uyhytu uyfhu`,
  },
  {
    id: 5,
    img: "https://dalicanvas.co.il/wp-content/uploads/2021/06/%D7%A0%D7%95%D7%A3-%D7%A1%D7%AA%D7%95%D7%994.jpg",
    title: "nature 4",
    price: 112,
    description: `lorm hgfddfvj xdtyfyghb ctyuh ftyuh drtyu drtyuj rtyujh dfvhbjky uyhytu uyfhu `,
  },
  {
    id: 6,
    img: "https://www.art2rent.co.il/files/catalog/source/L95320036.jpg",
    title: "nature 5",
    price: 112,
    description: `lorm hgfddfvj xdtyfyghb ctyuh ftyuh drtyu drtyuj rtyujh dfvhbjky uyhytu uyfhu `,
  },
];
const HomePage = () => {
  const [cardsArr, setCardsArr] = useState(initialCardArr);
  const navigate = useNavigate();
  const handlDeleteFromInitialCardArr = (id) => {
    setCardsArr((newCardsArr) => newCardsArr.filter((item) => item.id != id));
  };
  const handlEditFromInitialCardArr = (id) => {
    navigate(`/edit/${id}`);
  };
  return (
    <Box>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={4} key={item.id + Date.now()}>
            <CardComponent
              {...item}
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
