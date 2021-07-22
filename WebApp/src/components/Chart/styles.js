import styled from "styled-components";

export const Container = styled.div`
  @media (min-width: 1275px) {
    height: 400px;
    width: 600px;
  }
  @media (max-width: 1274px) {
    height: 300px;
    width: 100%;
    max-width: 800px;
  }
`;
