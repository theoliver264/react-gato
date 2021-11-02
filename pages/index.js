import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";

const players = ["X", "O"];

export default function Index() {
  const [player, setPlayer] = useState(players[Math.random() > 0.5 ? 0 : 1]);
  const [tablero, setTablero] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [winningLine, setWinningLine] = useState([]);

  const winner = useMemo(() => {
    const winningLines = [
      [
        [0, 0], // X X X
        [0, 1], // * * *
        [0, 2], // * * *
      ],
      [
        [1, 0], // * * *
        [1, 1], // X X X
        [1, 2], // * * *
      ],
      [
        [2, 0], // * * *
        [2, 1], // * * *
        [2, 2], // X X X
      ],
      [
        [0, 0], // X * *
        [1, 0], // X * *
        [2, 0], // X * *
      ],
      [
        [0, 1], // * X *
        [1, 1], // * X *
        [2, 1], // * X *
      ],
      [
        [0, 2], // * * X
        [1, 2], // * * X
        [2, 2], // * * X
      ],
      [
        [0, 0], // X * *
        [1, 1], // * X *
        [2, 2], // * * X
      ],
      [
        [0, 2], // * * X
        [1, 1], // * X *
        [2, 0], // X * *
      ],
    ];

    let winner = "";

    for (let i = 0; i < 8; i++) {
      const [a, b, c] = winningLines[i];

      if (
        tablero[a[0]][a[1]] === "X" &&
        tablero[b[0]][b[1]] === "X" &&
        tablero[c[0]][c[1]] === "X"
      ) {
        setWinningLine(winningLines[i]);
        winner = "X";
      } else if (
        tablero[a[0]][a[1]] === "O" &&
        tablero[b[0]][b[1]] === "O" &&
        tablero[c[0]][c[1]] === "O"
      ) {
        setWinningLine(winningLines[i]);
        winner = "O";
      }
    }
    return winner;
  }, [tablero]);

  const gameOver = useMemo(() => !!winner, [winner]);

  function handleClick(row, col) {
    if (tablero[row][col] !== "" || gameOver) {
      return;
    }

    setTablero((actual) => {
      const newTablero = [...actual];
      newTablero[row][col] = player;
      return newTablero;
    });

    if (player === "X") setPlayer(players[1]);
    else setPlayer(players[0]);
  }

  return (
    <Flex flexDir="column" placeItems="center" w="100vh">
      {!gameOver && (
        <Text fontSize="2rem" fontWeight="bold" textAlign="center" mb="1rem">
          Turno de "{player}"
        </Text>
      )}
      {gameOver && (
        <Text fontSize="2rem" fontWeight="bold" textAlign="center" mb="1rem">
          Juego Terminado
        </Text>
      )}
      {winner && (
        <Text fontSize="2rem" fontWeight="bold" textAlign="center" mb="1rem">
          Ganador {winner}
        </Text>
      )}

      <Grid templateRows="repeat(3, 150px)" w="fit-content">
        {tablero.map((fila, i) => (
          <Grid key={i} templateColumns="repeat(3, 150px)" w="100%" h="100%">
            {fila.map((pieza, j) => (
              <Flex
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                key={j}
                bg={
                  gameOver
                    ? winningLine.some((win) => win[0] === i && win[1] === j)
                      ? "red"
                      : "black"
                    : "black"
                }
                w="100%"
                h="100%"
                border="1px solid white"
                _hover={gameOver ? null : { bg: "gray.900" }}
                onClick={() => handleClick(i, j)}
              >
                <Text fontSize="6rem" color="white" as="span">
                  {pieza}
                </Text>
              </Flex>
            ))}
          </Grid>
        ))}
      </Grid>
      <Button
        colorScheme="red"
        size="lg"
        mt="1rem"
        onClick={() => {
          setTablero([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
          ]);
          setPlayer(players[Math.random() > 0.5 ? 0 : 1]);
        }}
      >
        Reset
      </Button>
    </Flex>
  );
}
