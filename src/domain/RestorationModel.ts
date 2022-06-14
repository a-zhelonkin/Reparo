export interface RestorationModel {
  readonly startIndex: number;
  readonly length: number;
  readonly crossing: number;
  readonly order: number;
}

export const defaultRestorationModel: Readonly<RestorationModel> = {
  startIndex: 200,
  length: 5,
  crossing: 20,
  order: 5,
};
