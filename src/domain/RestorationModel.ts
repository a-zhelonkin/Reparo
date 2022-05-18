export interface RestorationModel {
  readonly startIndex: number;
  readonly length: number;
  readonly crossing: number;
}

export const defaultRestorationModel: Readonly<RestorationModel> = {
  startIndex: 1000,
  length: 500,
  crossing: 100,
};
