export interface RestorationModel {
  readonly startIndex: number;
  readonly length: number;
  readonly crossing: number;
}

export const defaultRestorationModel: Readonly<RestorationModel> = {
  startIndex: 340,
  length: 10,
  crossing: 12,
};
