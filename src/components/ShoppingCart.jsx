// MUI IMPORTS
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// MUI JOY
import { Input } from "@mui/joy";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
// MUI ICONS
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import ListCart from "./ListCart";
import { useState } from "react";
// uuid
import { v4 as uuidv4 } from "uuid";
// faker
import { faker } from "@faker-js/faker";

export default function ShoppingCart() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const randomPrice = faker.number.float({
    min: 10,
    max: 1000,
    precision: 0.01,
  });

  // Handle add btn
  const handleAddBtn = () => {
    if (title.trim() === "") return;
    const newItem = {
      id: uuidv4(),
      title: title,
      quantity: 1,
      price: Number(faker.number.float({ min: 10, max: 900 }).toFixed(2)),
    };

    setItems([...items, newItem]);
    setTitle("");
  };

  // Handle delete btn
  const handleDeleteBtn = (id) => {
    setItems(items.filter((items) => items.id !== id));
  };

  // HandleIncrement
  const handleIncrement = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // HandleDecrement
  const handleDecrement = (id) => {
    setItems(
      items.map((item) =>
        (item.id === id) & (item.quantity > 1)
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
// calcul the total 
//reduce: function that loops through all items and adds up the result of i.price*i.qte
  const total = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        boxShadow: 3,
      }}
    >
      <Container maxWidth="sm" sx={{}}>
        <Card sx={{ mt: 4 }}>
          <CardHeader title="Shopping Cart" />
          <Divider />
          <CardContent>
            {/* Add Item Input */}
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add new item"
                variant="soft"
                sx={{ flexGrow: 1 }}
              />
              <Button
                onClick={handleAddBtn}
                color="primary"
                variant="soft"
                sx={{ minWidth: "40px", px: 1.5 }}
              >
                <AddIcon />
              </Button>
            </Stack>

            {/* list here */}
            {items.map((item) => (
              <ListCart
                key={item.id}
                item={item}
                handleDeleteBtn={handleDeleteBtn}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            ))}
          </CardContent>
          <Divider />

          <CardActions sx={{ p: 1 }}>
            <Stack
              direction="column"
              spacing={2}
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
                width="100%"
                alignContent={"start"}
              >
                <Typography variant="" sx={{ fontWeight: 700 }}>
                  Total:
                </Typography>
                <Typography variant="h6">${total}</Typography>
              </Stack>
              <Button
                color="primary"
                variant="solid"
                fullWidth
                sx={{ maxWidth: 400 }}
              >
                Go to checkout
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
}
