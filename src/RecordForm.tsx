import DateTimePicker from "@mui/lab/DateTimePicker";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

import { WeightLogRecord } from "./WeightLogRecord";

export default function RecordForm(props: {
  record: WeightLogRecord;
  onRecordChange: (e: WeightLogRecord) => void;
}) {
  const { record, onRecordChange } = props;
  const [weight, setWeight] = useState(record.weight.toString());

  return (
    <div>
      <TextField
        type="number"
        label="Weight"
        InputProps={{
          endAdornment: <InputAdornment position="end">kg</InputAdornment>,
        }}
        inputProps={{ step: "0.1" }}
        fullWidth
        margin="normal"
        value={weight}
        onBlur={(e) => onRecordChange({ ...record, weight: Number(weight) })}
        onChange={(e) => setWeight(e.target.value)}
      />

      <DateTimePicker
        ampm={false}
        disableFuture
        value={record.datetime}
        onChange={(e) =>
          onRecordChange({ ...record, datetime: e as Date ?? new Date() })
        }
        label="Date / time"
        renderInput={(params) => <TextField fullWidth {...params} />}
      />
    </div>
  );
}
