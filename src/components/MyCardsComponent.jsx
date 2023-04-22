import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import CoPresentTwoToneIcon from "@mui/icons-material/CoPresentTwoTone";
import { Fragment } from "react";
import { Box, IconButton } from "@mui/material";
import axios from "axios";
const Mycards = ({isBiz }) => {
  /* const favCards = () => {await axios.patch ("/api/cards/card-like/:id")} */
  const navigate = useNavigate();
  const handleIconeClick = async (ev) => {
    /*  try {
    const joiResponse = validateCreateSchema(inputState);
    setInputsErrorsState(joiResponse);
    console.log(joiResponse);
    if (!joiResponse) { */
    //move to homepage
    /*  await */ axios.patch("/api/cards/card-like/:id");

    toast.success("jjjjj!");
    navigate(ROUTES.HOME);
  };
  /*  } catch (err) { */
  /* console.log("err", err); */
  /*  toast.error("errrrrrrrrrrrrrrrror"); */

  /* useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        filterFunc(data);
      })) */
  /*  const btnCraet = () => {
    navigate(ROUTES.LOGIN);
  }; */
  return (
    <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
      {isBiz ? (
        <Fragment>
          <IconButton
            aria-label="delete"
            size="large"
            cn
            onClick={handleIconeClick}
          >
            <CoPresentTwoToneIcon />
          </IconButton>
        </Fragment>
      ) : (
        " "
      )}
    </Box>
  );
};

export default Mycards;
