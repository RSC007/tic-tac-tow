import React from "react";
import { Box } from "@mui/system";

const Field = ({ index, onChange, value, winner }) => {
  return (
    <Box
      onClick={() => onChange(index[0], index[1], value)}
      sx={{
        width: 100,
        height: 100,
        backgroundColor: `${(value || winner) ? winner ? winner : value : "#f1b0b052"}`,
        "&:hover": {
          backgroundColor: "#000",
          opacity: [0.9, 0.8, 0.7]
        }
      }}
    />
  );
};

export default Field;
