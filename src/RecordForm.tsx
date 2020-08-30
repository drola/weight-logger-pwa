import React, { useState } from "react";
import { DateTimePicker } from "@material-ui/pickers";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

export default function RecordForm() {
  const [selectedDate, handleDateChange] = useState<Date | null>(new Date());
  return (
    <div>
      <TextField
        type="number"
        label="Weight"
        id="standard-start-adornment"
        InputProps={{
          endAdornment: <InputAdornment position="start">kg</InputAdornment>,
        }}
        inputProps={{ step: "0.1" }}
        fullWidth
        margin="normal"
      />

      <DateTimePicker
        autoOk
        ampm={false}
        disableFuture
        value={selectedDate}
        onChange={handleDateChange}
        label="Date / time"
        fullWidth
        margin="normal"
      />
    </div>
  );
}
