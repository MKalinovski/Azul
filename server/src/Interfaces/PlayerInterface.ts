export interface Player {
  id: number;
  name: string;
  score: number;
  board: {
    main: {
      row: number;
      colors: {
        color: string;
        isTrue: boolean;
        id: number;
      }[];
    }[];
    stacker: {
      quantity: number;
      color: string;
    }[];
    penalty: {
      FPToken: boolean;
      data: string[];
    }
  };
}

export interface PlayerArray {
  quantity: number;
  data: Player[];
}
