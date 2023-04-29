import { Box, Card, CardActionArea, CardContent, CardHeader,  Grid,  Typography } from "@mui/material";

 /* const  cards=[
  title,
  subTitle,
  description,
  phone,
  stata,
  country,
  city,
  street,
  houseNumber,
  zipCode,
  email,
  web,
  bizNumber,
  createDAt,
]  */
const MoreComponent =({ inputState,item})=>{
  return (
    <Box sx={{ justifyContent: "center" }}>
      <Typography variant="body1" component="div">
        4{item}:<br />
        {inputState[item] ? inputState[item] : ""}
        <br />
        <br />
      </Typography>
    </Box>
  );
};

export default MoreComponent ;
