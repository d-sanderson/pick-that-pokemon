import React, { useState, useEffect } from "react";
import { Container } from "nes-react";
// Get a random pokemon (original 150)

// Present the user with a picture of the random pokemon

// The user has 10 seconds to correctly guess the pokemon from a selection of 6 pokemon

// When user guesses correctly the pokemon cry will play to indicate they guess correctly

// When the user guesses incorrectly an alternate sound will play to indicate that they guessed incorrectly. A user has 3 tries

const PickThatPokemon = () => {
  interface PokemonPropType {
    Art: string;
    English: string;
    Hepburn: string;
    Imperial: string;
    Kana: string;
    Metric: string;
    Ndex: string;
    Shape: string;
    Thumb: string;
    Trademarked: string;
    Type1: string;
    Type2: string;
  }

  const timer = 10;
  const [pokemon, setPokemon] = useState<PokemonPropType>();
  const [selection, setSelection] = useState([])
  const [pokemons, setPokemons] = useState({
    initialPokemons: [],
    currentPokemons: [],
  });


  useEffect(() => {
    async function fetchPokemon() {
      const response = await fetch(
        "https://s.cdpn.io/2652102/pokemon_gen_1.json"
      );
      const json = await response.json();
      console.log(json.data);
      setPokemons({
        initialPokemons: json.data,
        currentPokemons: json.data,
      });
    }
    fetchPokemon();

    return () => {};
  }, []);

  const getSelection = () => {
    for(const i = 0; i < 6; i++) {
      const randomPokemon = getRandomPokemon();
      setSelection([...selection, randomPokemon])
    }

  };
  const getRandomPokemon = () => {
    const index = Math.floor(
      Math.random() * pokemons.currentPokemons.length - 1
    );
    const randomPokemon = pokemons.currentPokemons[index];
    return randomPokemon
  };

  const removePokemon = (index: number) => {
    const newPokemons = [...pokemons.currentPokemons];
    newPokemons.slice(index, 1);
    setPokemons({ ...pokemons, currentPokemons: newPokemons });
  };
  return (
    <div style={{margin: '5% 40%'}}>
      <Container>
        <img
          style={{ height: "250px", width: "250px" }}
          src={`https://media.bulbagarden.net/media/upload/thumb/${pokemon?.Art}`}
          alt="currentPokemon"
        />
        {JSON.stringify(selection, null, 2)}
        <h1>Guess that Pokemon</h1>
        <div>
        <button style={{margin: 'auto'}} onClick={getSelection}>Start</button>
        </div>
      </Container>
    </div>
  );
};

export default PickThatPokemon;
