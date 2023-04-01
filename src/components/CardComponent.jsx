import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import CreateIcon from "@mui/icons-material/Create";
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
        <Button
          className="buttonBuyNow"
          variant="outlined"
          color="primary"
          endIcon={<ShoppingCartOutlinedIcon />}
        >
          buy now
        </Button>
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
