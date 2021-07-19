import styled from "styled-components";

export const Container = styled.div`
  height: min-content;
  width: 600px;
  min-width: 440px;
  box-sizing: border-box;
  padding: 20px 40px 30px 40px;
  border: 1px solid #9993;
  border-radius: 10px;

  .row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

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

  .right {
    text-align: end;
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
