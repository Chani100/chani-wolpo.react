import { Box, Grid } from "@mui/material";
import CardComponent from "../components/CardComponent";

const initialCardArr = [
  {
    id: 1,
    img: "https://www.photo-art.co.il/wp-content/uploads/2015/06/BY1A65881.jpg",
    title: "nature",
    price: 112,
    description:
      "lorm hgfddfvj xdtyfyghb ctyuh ftyuh drtyu drtyuj rtyujh dfvhbjky uyhytu uyfhu ",
  },
  {
    id: 2,
    img: "https://www.photo-art.co.il/wp-content/uploads/2015/06/BY1A65881.jpg",
    title: "nature 1",
    price: 112,
    description:
      "lorm hgfddfvj xdtyfyghb ctyuh ftyuh drtyu drtyuj rtyujh dfvhbjky uyhytu uyfhu ",
  },
  {
    id: 3,
    img: "https://www.photo-art.co.il/wp-content/uploads/2015/06/BY1A65881.jpg",
    title: "nature 2",
    price: 112,
    description:
      "lorm hgfddfvj xdtyfyghb ctyuh ftyuh drtyu drtyuj rtyujh dfvhbjky uyhytu uyfhu ",
  },
  {
    id: 4,
    img: "https://www.photo-art.co.il/wp-content/uploads/2015/06/BY1A65881.jpg",
    title: "nature 3",
    price: 112,
    description:
      "lorm hgfddfvj xdtyfyghb ctyuh ftyuh drtyu drtyuj rtyujh dfvhbjky uyhytu uyfhu ",
  },
  {
    id: 5,
    img: "https://www.photo-art.co.il/wp-content/uploads/2015/06/BY1A65881.jpg",
    title: "nature 4",
    price: 112,
    description:
      "lorm hgfddfvj xdtyfyghb ctyuh ftyuh drtyu drtyuj rtyujh dfvhbjky uyhytu uyfhu ",
  },
];
const HomePage = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {initialCardArr.map((item) => (
            <Grid item xs={4} key={item.id + Date.now()}>
          <CardComponent {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default HomePage;
