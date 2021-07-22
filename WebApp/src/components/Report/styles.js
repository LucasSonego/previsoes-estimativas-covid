import styled from "styled-components";

export const Container = styled.div`
  height: min-content;
  max-width: 600px;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 40px 30px 40px;
  border: 1px solid #9993;
  border-radius: 10px;
  margin: 25px 0 10px 0;

  h2 {
    margin: 0;
    color: #444;
  }

  .fonte {
    font-family: "Courier New", Courier, monospace;
    color: #555;
    margin-top: 10px;
    display: block;
  }
`;

export const Value = styled.h3`
  font-family: "Courier New", Courier, monospace;
  font-weight: bolder;
  font-size: 24px;
  color: #333;
  margin: 0;
`;

export const ExtraValue = styled.h3`
  font-family: "Courier New", Courier, monospace;
  font-weight: bolder;
  font-size: 18px;
  color: #444;
  margin: 0;
`;
export const Label = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 14px;
  color: #777;
`;

export const Row = styled.div`
  @media (min-width: 1275px) {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .right {
      text-align: end;
    }
  }
  @media (max-width: 1274px) {
    margin-top: 15px;
    .right {
      margin-top: 15px;
    }
  }
`;
