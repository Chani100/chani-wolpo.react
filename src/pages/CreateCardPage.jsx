import ROUTES from "../routes/ROUTES";
import CachedIcon from "@mui/icons-material/Cached";
import atom from "../logo.svg";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validateEditCardParamsSchema from "../validation/editCardValidation";
import { toast } from "react-toastify";
import CreatCard from "../components/CreatComponent";

/* import atom from "../logo.svg"; */

const CreateCardPage = () => {
  const [inputState, setInputState] = useState({
    url: "",
    alt: "",
    title: "",
    subTitle: "",
    description: "",
    phone: "",
    email: "",
    /*  wed:"", */
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    /* zip:"", */
  });
  useEffect(() => {
    const joiResponse = validateEditCardParamsSchema(inputState);
    setInputsErrorsState(joiResponse);
  }, []);
  const [inputsErrorState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();

  const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditCardParamsSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }

      await axios.post("/cards/", inputState);
      toast.success("The card was successfully added!");
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("err", err);
      toast.error("errrrrrrrrrrrrrrrror");
    }
  };
  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateEditCardParamsSchema(inputState);
    setInputsErrorsState(joiResponse);
  };
  const shabmit = () => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState = {
      url: "",
      alt: "",
      title: "",
      subTitle: "",
      description: "",
      phone: "",
      email: "",
      /*  wed:"", */
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      /* zip:"", */
    };
    setInputState(newInputState);
    const joiResponse = validateEditCardParamsSchema(inputState);
    if (!joiResponse) {
      return;
    }
    let newjoiResponse = JSON.parse(JSON.stringify(joiResponse));
    Object.keys(newjoiResponse).forEach((index) => {
      newjoiResponse[index] = "";
      inputsErrorState(newjoiResponse);
    });
  };
 
   const keys = Object.keys(inputState);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create card
          </Typography>
          <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
  {/* component="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt={inputState.alt ? inputState.alt : ""}
            src={inputState.url ? inputState.url : atom}
          /> */} 

          {keys.map((item) => (
            <CreatCard
              key={item}
              item={item}
              inputState={inputState}
              onChange={handleInputChange}
              inputsErrorState={inputsErrorState}
            />
          ))}

          <Grid item xs={12} /* sm={6} */>
            <Button
              size="large"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              onClick={shabmit}
              endIcon={<CachedIcon />}
            ></Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              onClick={handleCancelBtnClick}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              disabled={inputsErrorState !== null}
              onClick={handleSaveBtnClick}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
      </Box>
    </Container>
  );
};

export default CreateCardPage;
