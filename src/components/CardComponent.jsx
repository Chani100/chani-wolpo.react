import { Square } from "@mui/icons-material"
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

const CardComponent=({img, title, price, description})=> {
    return(
 <Card square raised >
 <CardActionArea>
          <CardMedia
            component="img"
            image={img}/>
          
          </CardActionArea>
          <CardHeader title={title} subheader=
          {`$ ${price}`}/>
          <CardContent>
            
            <Typography>{description}</Typography>
           
          </CardContent>
          <CardActions>
            <Button
              variant="text"
              color="primary"
              endIcon={<ShoppingCartOutlinedIcon/>}
            >
              buy now
            </Button>
          </CardActions>
        </Card>
    )

}
export default  CardComponent