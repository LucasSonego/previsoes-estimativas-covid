import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  max-width: 1320px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  width: 100%;

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

  .warning {
    max-width: 900px;
    margin: 15px auto;
    padding: 20px 30px;
    background: #f39c1255;
    border: 4px solid #f39c12;
    border-radius: 5px;
    color: #333;
    font-size: 16px;
    text-align: center;
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
