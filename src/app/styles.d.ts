import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      text: string;
      background: string;
    };
    spacing: (factor: number) => string;
  }
}
