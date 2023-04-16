import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import CreateIcon from "@mui/icons-material/Create";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneIcon from "@mui/icons-material/Phone";
const CardComponent = ({
  id /* address, */ /* bizNumber,createdAt, */,
  /*  likes,phone, */ img,
  title,
  subTitle,
  description,
  onDelete,
  onEdit,
}) => {
  const handleBtnDeleteClick = () => {
    onDelete(id);
  };
  const handleBtnEditClick = () => {
    onEdit(id);
  };
  return (
    <Card square raised>
      <CardActionArea>
        <CardMedia component="img" image={img} className="imgcard" />
      </CardActionArea>
      <CardHeader title={title} subheader={`$ ${subTitle}`} />
      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        <IconButton color="error" aria-label="add an alarm">
          <PhoneIcon />
        </IconButton>
        <IconButton color="error" aria-label="add an alarm">
          <FavoriteIcon />
        </IconButton>
        <Button
          variant="outlined"
          color="error"
          onClick={handleBtnDeleteClick}
          endIcon={<DeleteIcon />}
        >
          Delet
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBtnEditClick}
          endIcon={<CreateIcon />}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};
CardComponent.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};
CardComponent.defaultProps = {
  img: "https://www.photo-art.co.il/wp-content/uploads/2017/09/IMG_9006.jpg",
  subTitle: 0,
};
export default CardComponent;
