import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [squad, setSquad] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => setPokemon(data.results));
  }, []);

  const addToSquad = (p) => {
    if (squad.length < 6 && !squad.find((s) => s.name === p.name)) {
      setSquad([...squad, p]);
    }
  };

  const removeFromSquad = (name) => {
    setSquad(squad.filter((p) => p.name !== name));
  };

  const filtered = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3}>
      <Typography variant="h5">
        Pokeverse | All Pokémon
      </Typography>

      <Button disabled={squad.length < 2}>Battle</Button>

      <TextField
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Grid container spacing={2}>
        {filtered.map((p) => {
          const id = p.url
            .split("/")
            .filter(part => part !== "")
            .pop();
          const inSquad = squad.find((s) => s.name === p.name);
          return (
            <Grid item key={p.name}>
              <Card>
                <CardMedia
                  component="img"
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={p.name}
                  sx={{ height: 120, objectFit: "contain", p: 1 }}
                />
                <CardContent>
                  <Typography align="center">
                    {p.name}
                  </Typography> 
                  {inSquad ? (
                    <Button onClick={() => removeFromSquad(p.name)}>Remove</Button>
                  ) : (
                    <Button onClick={() => addToSquad(p)}>Add</Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}