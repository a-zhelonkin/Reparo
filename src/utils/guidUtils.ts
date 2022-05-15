import { v4 } from "uuid";

export const defaultGuid: Guid = "00000000-0000-0000-0000-000000000000";
export function guid(): Guid {
  return v4();
}
