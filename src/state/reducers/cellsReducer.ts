import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initiaState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (
  state: CellsState = initiaState,
  action: Action
): CellsState => {
  switch (action.type) {
    case ActionType.MOVE_CELL:
      return state;
    case ActionType.UPDATE_CELL:
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    case ActionType.DELETE_CELL:
      return state;
    default:
      return state;
  }
};

export default reducer;
