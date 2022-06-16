export interface RestorationModel {
  readonly type: RestorationType;
  readonly startIndex: number;
  readonly length: number;
  readonly crossing: number;
  readonly order: number;
}

export enum RestorationType {
  v1 = "v1",
  v2 = "v2",
}

export const restorationTypeValues: ReadonlyArray<RestorationType> =
  Object.values(RestorationType);

export function restorationTypeToString(type: RestorationType): string {
  switch (type) {
    case RestorationType.v1:
      return "Версия 1";
    case RestorationType.v2:
      return "Версия 2";
    default:
      return null;
  }
}

export const defaultRestorationModel: Readonly<RestorationModel> = {
  type: RestorationType.v2,
  startIndex: 200,
  length: 5,
  crossing: 20,
  order: 5,
};
