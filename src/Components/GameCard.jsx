import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardHeader } from "@mui/material";

import Field from "./Field";

const GameCard = () => {
  const [inputFields, setInputFields] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);
  const [value, setValue] = useState(false);
  const [winner, setWinner] = useState(null);

  const onReset = () => {
    setInputFields([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]) 
    setValue(false)
    setWinner(null)
  }

  const updateFieldValue = (colIndex, rowIndex, activeUser) => {
    let temp = inputFields;
    if (!temp[colIndex][rowIndex]) {
      temp[colIndex][rowIndex] = value ? "#d7085c" : "#1d19d7";
      setInputFields(temp);
      findWinner(temp, temp[colIndex][rowIndex]);
      setValue(!value);
    }
  };

  const findWinner = (temp, activeUser = "") => {
    temp?.forEach((value) => {
      // Horizontal pattern checking...
      let winner = value.every((value) => value === activeUser);
      if (winner) {
        setWinner(activeUser);
        return;
      }

      // static
      // Diagnol pattern checking...
      if (
        (temp[0][0] === activeUser &&
          temp[1][1] === activeUser &&
          temp[2][2] === activeUser) ||
        (temp[0][2] === activeUser &&
          temp[1][1] === activeUser &&
          temp[2][0] === activeUser)
      ) {
        setWinner(activeUser);
        return;
      }

      // Verical pattern checking

      for (let row = 0; row < value.length; row++) {
        var winCount = 0;
        for (let col = 0; col < value.length; col++) {
          if (temp[col][row] === activeUser) {
            winCount++
          }
        }
        if(winCount === 3){
          setWinner(activeUser)
        }
      }
    });
  };

  return (
    <>
      <Card sx={{ width: 345 }}>
        <Box sx={{ color: "#000", fontSize: "2rem" }}>Tic-Tac-Toe</Box>
        {winner && (
          <h3 style={{ color: winner }}>
            Winner {winner === "#d7085c" ? "Pink" : "Blue"}
          </h3>
        )}
        <CardContent>
          <Box
            sx={{
              display: "flex",
              height: "auto",
              flexWrap: "wrap",
              gap: "6px"
            }}
          >
            {inputFields[0].map((value, index) => (
              <Field
                key={index}
                winner={winner}
                index={[0, index]}
                value={value}
                onChange={updateFieldValue}
              />
            ))}
            {inputFields[1].map((value, index) => (
              <Field
                key={index}
                winner={winner}
                index={[1, index]}
                value={value}
                onChange={updateFieldValue}
              />
            ))}
            {inputFields[2].map((value, index) => (
              <Field
                key={index}
                winner={winner}
                index={[2, index]}
                value={value}
                onChange={updateFieldValue}
              />
            ))}
          </Box>
          <CardHeader>
            <Button onClick={onReset}>Reset</Button>
          </CardHeader>
        </CardContent>
      </Card>
    </>
  );
};

export default GameCard;
