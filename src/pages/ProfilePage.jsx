import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import validateRegisterSchema from "../validation/registerValidation";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import CachedIcon from "@mui/icons-material/Cached";
import RegisterComponent from "../components/RegisterComponent";
import { CircularProgress } from "@mui/material";

const ProfilePage = () => {
    const { id } = useParams();
  const [inputState, setInputState] = useState(null);
   const [inputsErrorState, setinputsErrorState] = useState({});
  const navigate = useNavigate();
 
   

  useEffect(() => {
    (async () => {
      try {
        const errors = validateRegisterSchema({ id });
      if (errors) {
            console.log("kkkkk");
   navigate("*");
          return;
        } ; 
          const { data } = await axios.get("/users/userInfo/"+ id);

          let newInputState = {
            ...data,
          };
 }catch (err) {}
 
   
  }) ();
},[]);
   
   const handeleBtnClick = async (ev) => {
    try {
      const joiResponse = validateRegisterSchema(inputState);
      setinputsErrorState(joiResponse);
      if (!joiResponse) {
        await axios.put("/user/" + id, inputState);
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      toast.error("errrrrrrrrrrror");
    }
  };
 const handleChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };
  if (!inputState) {
    return <CircularProgress color="secondary" />;
  }
  const handleBizChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState["biz"] = ev.target.checked;
    setInputState(newInputState);
  };
  const keys = Object.keys(inputState);

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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {keys.map((item) => (
              <RegisterComponent
                key={item}
                item={item}
                inputState={inputState}
                onChange={handleChange}
                inputsErrorState={inputsErrorState}
              />
            ))}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="biz"
                    value={inputState.biz}
                    color="primary"
                    onClick={handleBizChange}
                  />
                }
                label="Signup as business."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 1, mb: 1 }}
                color="primary"
                href={ROUTES.HOME}
              >
                CANCEL
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
          
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                disabled={inputsErrorState !== null}
                onClick={handeleBtnClick}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
            }
export default ProfilePage;