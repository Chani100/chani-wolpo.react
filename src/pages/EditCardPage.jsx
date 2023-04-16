import { useState, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import validateEditCardSchema, {
  validateEditCardParamsSchema,
} from "../validation/editCardValidation";
import ROUTES from "../routes/ROUTES";
import CreateIcon from "@mui/icons-material/Create";

import { CircularProgress } from "@mui/material";
import axios from "axios";
import atom from "../logo.svg";
import { toast } from "react-toastify";
const EditCardPage = () => {
  const { id } = useParams();

  const [inputState, setInputState] = useState(null);
  const [inputsErrorState, setinputsErrorState] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const errors = validateEditCardParamsSchema({ id });
        if (errors) {
          navigate("*");
          return;
        }
        const { data } = await axios.get("/cards/card/" + id);
        let newInputState = {
          ...data,
        };
        if (data.image && data.image.url) {
          newInputState.url = data.image.url;
        } else {
          newInputState.url = "";
        }
        if (data.image && data.image.alt) {
          newInputState.alt = data.image.alt;
        } else {
          newInputState.alt = "";
        }
        delete newInputState.image;
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.user_id;
        delete newInputState.bizNumber;
        delete newInputState.createdAt;
        setInputState(newInputState);
      } catch (err) {}
    })();
  }, [id]);
  const handeleBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditCardSchema(inputState);

      setinputsErrorState(joiResponse);
      if (!joiResponse) {
        await axios.put("/cards/" + id, inputState);
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      toast.error("errrrrrrrrrrror");
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };

  if (!inputState) {
    return <CircularProgress color="secondary" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Card
        </Typography>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt={inputState.alt ? inputState.alt : ""}
          src={inputState.url ? inputState.url : atom}
        />

        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="url"
                label="url "
                name="url"
                autoComplete="url"
                value={inputState.url ? inputState.url : " "}
                onChange={handleInputChange}
              />
              {inputsErrorState && inputsErrorState.url && (
                <Alert severity="warning">
                  {inputsErrorState.url.map((item) => (
                    <div key={"img-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                value={inputState.title}
                onChange={handleInputChange}
              />
              {inputsErrorState && inputsErrorState.title && (
                <Alert severity="warning">
                  {inputsErrorState.title.map((item) => (
                    <div key={"title-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="subTitle"
                label="SubTitle "
                name="subTitle"
                autoComplete="subTitle"
                value={inputState.subTitle}
                onChange={handleInputChange}
              />
              {inputsErrorState && inputsErrorState.subTitle && (
                <Alert severity="warning">
                  {inputsErrorState.subTitle.map((item) => (
                    <div key={"subTitle-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                value={inputState.description}
                onChange={handleInputChange}
              />
              {inputsErrorState && inputsErrorState.description && (
                <Alert severity="warning">
                  {inputsErrorState.description.map((item) => (
                    <div key={"description-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                value={inputState.address}
                onChange={handleInputChange}
              />
              {inputsErrorState && inputsErrorState.address && (
                <Alert severity="warning">
                  {inputsErrorState.address.map((item) => (
                    <div key={"address-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                value={inputState.phone}
                onChange={handleInputChange}
              />
              {inputsErrorState && inputsErrorState.phone && (
                <Alert severity="warning">
                  {inputsErrorState.phone.map((item) => (
                    <div key={"phone-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
                onClick={handeleBtnClick}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
                onClick={handeleBtnClick}
              >
                cancelation
              </Button>
            </Grid>
            <Grid container justifyContent="flex-end">
              {/* <Grid item></Grid> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default EditCardPage;
