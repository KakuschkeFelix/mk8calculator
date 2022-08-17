export interface IPart {
  name: string;
  WG: number;
  AC: number;
  ON: number;
  OF: number;
  MT: number;
  SL: number;
  SW: number;
  SA: number;
  SG: number;
  TL: number;
  TW: number;
  TA: number;
  TG: number;
}

export interface IPartList {
  type: string;
  parts: IPart[];
}

export interface IPartState {
  partlists: IPartList[];
}