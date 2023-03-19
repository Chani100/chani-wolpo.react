import { Fragment } from "react";
import Button from "@mui/material/Button";
import * as React from "react";

import Fingerprint from "@mui/icons-material/Fingerprint";
import { Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Container, Divider, Typography } from "@mui/material";
 import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";


const FirstComponent = () => {
  const stameTaxt = "hhhhhhhh";
  return (
    <Fragment>
      <Container>
        <h1 sx={{ fontsize: 500 }}>Hello Components </h1>
        <Divider>
          <Chip label="my chip"></Chip>
        </Divider>
        <h2 style={{ color: "red" }}>Hello {stameTaxt} </h2>
        <Card sx={{ width: "15rem" }} square raised>
          <CardMedia
            component="img"
            image="https://d3m9l0v76dty0.cloudfront.net/system/photos/2807818/original/28faadbea333e195b3bb15f695ed180d.jpg"
          ></CardMedia>
          <CardHeader title="taile "></CardHeader>
          <CardContent>
            <Typography>price</Typography>
            <Typography>description</Typography>
            <Typography>adress</Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="text"
              color="primary"
              endIcon={<ShoppingCartOutlinedIcon />}
            >
              buy now
            </Button>
          </CardActions>
        </Card>
        <Button startIcon={<Fingerprint />} variant="text" color="secondary">
          click me
        </Button>
      </Container>
    </Fragment>
  );
};
export default FirstComponent;
