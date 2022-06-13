export interface ResolutionModel {
  min: number;
  max: number;
  step: number;
}

export const defaultResolutionModel: Readonly<ResolutionModel> = {
  min: 0,
  max: 10,
  step: 0.001,
};
