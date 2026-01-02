import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => setPokemon(data.results));
  }, []);

  const filtered = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3}>
      <Typography variant="h5">
        Pokeverse | All Pokémon
      </Typography>

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
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
