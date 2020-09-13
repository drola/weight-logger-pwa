import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { DateTimePicker } from "@material-ui/pickers";
import React from "react";

import { WeightLogRecord } from "./WeightLogRecord";

export default function RecordForm(props: {
  record: WeightLogRecord;
  onRecordChange: (e: WeightLogRecord) => void;
}) {
  const { record, onRecordChange } = props;

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
        value={record.weight}
        onChange={(e) =>
          onRecordChange({ ...record, weight: Number(e.target.value) })
        }
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
