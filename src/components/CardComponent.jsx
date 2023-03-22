import { Square } from "@mui/icons-material";
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

const CardComponent = ({ id, img, title, price, description, onDelete }) => {
  const handleBtnDeleteClick = () => {
    onDelete(id);
  };
  return (
    <Card square raised>
      <CardActionArea>
        <CardMedia component="img" image={img} />
      </CardActionArea>
      <CardHeader title={title} subheader={`$ ${price}`} />
      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
        className="buttonBuyNow"
          variant="text"
          color="primary"
          endIcon={<ShoppingCartOutlinedIcon />}
        >
          buy now
        </Button>
        <Button
          variant="text"
          color="error"
          onClick={handleBtnDeleteClick}
          endIcon={<DeleteIcon />}
        >
          Delet
        </Button>
      </CardActions>
    </Card>
  );
};
CardComponent.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  onDelete:PropTypes.func,
};
CardComponent.defaultProps = {
  img: "https://www.photo-art.co.il/wp-content/uploads/2017/09/IMG_9006.jpg",
  price: 0,
};
export default CardComponent;
