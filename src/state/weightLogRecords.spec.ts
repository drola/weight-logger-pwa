import weightLogRecords, {
  appendAction,
  createData,
  deleteAction,
  loadAction,
  updateAction
} from "./weightLogRecords";

describe("weightLogRecords reducer", () => {
  it("should correctly initialize", () => {
    expect(weightLogRecords(undefined, {} as any)).toEqual([]);
  });

  it("appendAction: should keep records in sorted order", () => {
    let state = weightLogRecords(
      [],
      appendAction(createData("2020/10/10", 100))
    );
    expect(state).toEqual([createData("2020/10/10", 100)]);
    state = weightLogRecords(
      state,
      appendAction(createData("2020/10/15", 110))
    );
    expect(state).toEqual([
      createData("2020/10/15", 110),
      createData("2020/10/10", 100)
    ]);
    state = weightLogRecords(
      state,
      appendAction(createData("2020/10/12", 112))
    );
    expect(state).toEqual([
      createData("2020/10/15", 110),
      createData("2020/10/12", 112),
      createData("2020/10/10", 100)
    ]);
  });

  it("deleteAction should remove records", () => {
    let state = [
      createData("2020/08/10", 80),
      createData("2020/08/09", 81),
      createData("2020/08/08", 82)
    ];
    expect(weightLogRecords(state, deleteAction(state[1]))).toEqual([
      createData("2020/08/10", 80),
      createData("2020/08/08", 82)
    ]);
  });

  it("loadAction should return new sorted state", () => {
    expect(
      weightLogRecords(
        undefined,
        loadAction([
          createData("2020/08/08", 80),
          createData("2020/08/10", 82),
          createData("2020/08/09", 81)
        ])
      )
    ).toEqual([
      createData("2020/08/10", 82),
      createData("2020/08/09", 81),
      createData("2020/08/08", 80)
    ]);
  });

  it("updateAction should update data on an existing record; resulting state should be sorted", () => {
    let state = [
      createData("2020/08/10", 80),
      createData("2020/08/09", 81),
      createData("2020/08/08", 82)
    ];
    expect(
      weightLogRecords(
        state,
        updateAction({
          original: state[1],
          updated: createData("2020/08/11", 81)
        })
      )
    ).toEqual([
      createData("2020/08/11", 81),
      createData("2020/08/10", 80),
      createData("2020/08/08", 82)
    ]);
  });
});
