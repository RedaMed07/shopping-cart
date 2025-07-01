import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import { Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import Stack from "@mui/material/Stack";
import Button from "@mui/joy/Button";



export default function ListCart({item, handleDeleteBtn,handleIncrement,handleDecrement}) {
    return(
<List
    size="sm"
    sx={{
      borderRadius: "md",
      boxShadow: "sm",
    }}
  >
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1.5,
      }}
    >
      <ListItemContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Typography level="title-md" sx={{ fontWeight: "800" }}>
          {item.title}
        </Typography>
        <Typography level="body-sm" color="neutral">
          ${item.price}
        </Typography>
      </ListItemContent>

      <Stack direction="row" spacing={1} alignItems="center">
        <Button onClick={()=>handleDecrement(item.id)} variant="outlined" size="sm" sx={{ minWidth: 32, px: 0 }}>
          -
        </Button>
        <Typography level="body-md" sx={{ width: 20, textAlign: "center" }}>
          {item.quantity}
        </Typography>
        <Button onClick={()=>handleIncrement(item.id)} variant="outlined" size="sm" sx={{ minWidth: 32, px: 0 }}>
          +
        </Button>

        <Button variant="plain" color="danger" size="sm" onClick={()=>handleDeleteBtn(item.id)}>
          <DeleteIcon />
        </Button>
      </Stack>
    </ListItem>
  </List>
)
}

  