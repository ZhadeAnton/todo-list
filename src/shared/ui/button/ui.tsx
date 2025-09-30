import styled from "@emotion/styled";
import type { PropsWithChildren } from "react";

const Root = styled.button`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  border-radius: 8px;
  border: none;
  color: white;
  background: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
}>;

export function Button({ children, onClick }: ButtonProps) {
  return <Root onClick={onClick}>{children}</Root>;
}
