import {
  calculateSignalModelType,
  SignalModelType,
} from "domain/SignalModelType";
import { defaultGuid } from "utils/guidUtils";

export interface SignalModel {
  id: Guid;
  type: SignalModelType;
  amplitude: number;
  frequency: number;
  phase: number;
}

export const defaultSignalModel: Readonly<SignalModel> = {
  id: defaultGuid,
  type: SignalModelType.Sin,
  amplitude: 1,
  frequency: 0.5,
  phase: 0,
};

export function calculateSignalModel(
  { type, amplitude, frequency, phase }: SignalModel,
  t: number
): number {
  return amplitude * calculateSignalModelType(type, frequency * t + phase);
}
