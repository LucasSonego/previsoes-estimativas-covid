import styled from "styled-components";

export const Container = styled.div`
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;

  .city-select {
    width: 900px;
    padding: 30px 0;
    margin: 0 auto;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    .generate-prediction {
      height: 40px;
      width: 350px;
      margin-left: 30px;
      background-color: #3498db99;
      border: 2px solid #3498dbbb;
      border-radius: 4px;
      box-sizing: border-box;
      color: #fff;
      font-weight: bold;

      transition: 0.5s;
      &:hover {
        background-color: #3498dbcc;
      }
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
  }
`;
