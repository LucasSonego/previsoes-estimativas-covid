import styled from "styled-components";

export const Container = styled.div`
  background-color: #252626;
  color: #ecf0f1;
  .center {
    max-width: 1300px;
    box-sizing: border-box;
    padding: 20px 25px;
    margin: 0 auto;

    h2 {
      margin: 0 0 2px 0;
    }

    .hr {
      height: 1px;
      width: 100%;
      background: linear-gradient(
        90deg,
        #ecf0f1,
        #ecf0f1aa,
        #ecf0f144,
        #ecf0f133,
        #ecf0f125,
        #ecf0f115,
        #ecf0f108
      );
    }

    p {
      padding: 4px 0 0 0;
      font-size: 16px;
    }
  }
`;
