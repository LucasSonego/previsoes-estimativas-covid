import styled, { css } from "styled-components";

export const Container = styled.div`
  overflow: hidden;
  transition: 0.5s;
  margin-bottom: 5px;
  ${props =>
    props.isOpen &&
    css`
      height: ${props.maxHeight};
    `}
  ${props =>
    !props.isOpen &&
    css`
      height: 20px;
    `};
`;
