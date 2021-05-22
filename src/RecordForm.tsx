import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { DateTimePicker } from "@material-ui/pickers/DateTimePicker";
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
        autoOk
        ampm={false}
        disableFuture
        value={record.datetime}
        onChange={(e) =>
          onRecordChange({ ...record, datetime: e ?? new Date() })
        }
        label="Date / time"
        fullWidth
        margin="normal"
      />
    </div>
  );
}
