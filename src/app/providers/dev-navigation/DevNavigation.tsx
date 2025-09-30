import styled from "@emotion/styled";
import type { PropsWithChildren } from "react";

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  background: #111;
  color: #fff;
  z-index: 1000;
`;

const Spacer = styled.div`
  height: 44px;
`;

export function DevNavigation({ children }: PropsWithChildren) {
  return (
    <>
      <Bar>DevNavigation: place test links here (dev only)</Bar>
      <Spacer />
      {children}
    </>
  );
}
