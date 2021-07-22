import styled from "styled-components";

export const Container = styled.div`
  max-width: 1320px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;

  .city-select {
    max-width: 900px;
    margin: 0 auto;
  }

  .generate-prediction {
    height: 40px;
    width: 100%;
    background-color: #3498db99;
    border: 2px solid #3498dbbb;
    border-radius: 4px;
    box-sizing: border-box;
    color: #fff;
    font-weight: bold;
    margin: 10px 0;

    transition: 0.5s;
    &:hover {
      background-color: #3498dbcc;
    }
  }

  @media (min-width: 1275px) {
    .generate-prediction {
      max-width: 300px;
      margin-left: 30px;
    }

    .city-select {
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const Row = styled.div`
  @media (min-width: 1275px) {
    display: flex;
    justify-content: space-between;
  }
  @media (max-width: 1274px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
