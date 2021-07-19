import styled from "styled-components";

export const Container = styled.div`
  height: ${props => (props.height ? `${props.height}px` : "auto")};
  width: ${props => (props.width ? `${props.width}px` : "auto")};
`;
