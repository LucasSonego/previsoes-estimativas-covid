import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin-top: auto;
  background: #ecf0f1;
  padding: 15px 0;

  .content {
    max-width: 1300px;
    margin: 0 auto;
    display: flex;

    @media (min-width: 1000px) {
      justify-content: space-between;
    }
    @media (max-width: 1000px) {
      flex-direction: column;
      align-items: center;
      .section {
        border-top: 1px solid #999;
        margin-top: 15px;
        text-align: center;
        box-sizing: border-box;
        padding-top: 5px;

        .people {
          a {
            margin: 0 auto;
          }
        }
      }
    }

    img {
      height: 127px;
      width: 190px;
      margin-right: 15px;
    }

    .section {
      margin-right: 15px;
      width: 300px;
    }

    .people {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;

      h4 {
        cursor: pointer;
        margin-bottom: 5px;
      }

      span {
        font-weight: bold;
        color: #777;
      }

      a {
        width: fit-content;
        text-decoration: none;
        color: #555;
        font-size: 16px;
        font-weight: 500;

        transition: 0.2s;
        &:hover {
          color: #333;
        }
      }
    }
  }
`;
