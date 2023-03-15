import { Fragment } from "react";
import Button from "@mui/material/Button";
import * as React from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import { Chip, Divider } from "@mui/material";


const FirstComponent = () => {
  const stameTaxt = "hhhhhhhh";
  return (
    <Fragment>
      <h1 sx={{ fontsize: 500 }}>Hello Components </h1>
      <Divider>
      <Chip label="my chip"></Chip>
      </Divider>
      <h2 style={{ color: "red" }}>Hello {stameTaxt} </h2>
      <Button variant="text" color="secondary">
        click me
      

      <IconButton aria-label="fingerprint" color="secondary">
        <Fingerprint />
      </IconButton>
      </Button>
    </Fragment>
  );
};
export default FirstComponent;
