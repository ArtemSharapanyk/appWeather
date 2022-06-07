import { ReactElement } from "react";

export interface AppRoutesInterface {
  component: ReactElement;
  name: string;
  route: string;
  closed?: boolean;
  nested?: AppRoutesInterface[];
  isInNavigation: boolean;
}
