import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 400px;
  width: 600px;
  background-color: #eee;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  h2 {
    margin-top: 50px;
  }
  h3 {
    color: #777;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -100px;
    width: 200px;
    height: 200px;
    background-color: transparent;
    border: none;
    -webkit-user-select: none;
    user-select: none;
  }
  .wrapper .box-wrap {
    width: 70%;
    height: 70%;
    margin: calc((100% - 70%) / 2) calc((100% - 70%) / 2);
    position: relative;
    transform: rotate(-45deg);
  }
  .wrapper .box-wrap .box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(135, 0, 0, 0.6);
    background: linear-gradient(
      to right,
      #55efc4,
      #00b894,
      #81ecec,
      #00cec9,
      #74b9ff,
      #0984e3,
      #a29bfe,
      #6c5ce7,
      #a29bfe,
      #0984e3,
      #74b9ff,
      #00cec9,
      #81ecec,
      #00b894,
      #55efc4
    );
    background-position: 0% 50%;
    background-size: 1000% 1000%;
    visibility: hidden;
  }
  .wrapper .box-wrap .box.one {
    animation: moveGradient 15s infinite, oneMove 3.5s infinite;
  }
  .wrapper .box-wrap .box.two {
    animation: moveGradient 15s infinite, twoMove 3.5s 0.15s infinite;
  }
  .wrapper .box-wrap .box.three {
    animation: moveGradient 15s infinite, threeMove 3.5s 0.3s infinite;
  }
  .wrapper .box-wrap .box.four {
    animation: moveGradient 15s infinite, fourMove 3.5s 0.575s infinite;
  }
  .wrapper .box-wrap .box.five {
    animation: moveGradient 15s infinite, fiveMove 3.5s 0.725s infinite;
  }
  .wrapper .box-wrap .box.six {
    animation: moveGradient 15s infinite, sixMove 3.5s 0.875s infinite;
  }
  @keyframes moveGradient {
    to {
      background-position: 100% 50%;
    }
  }
  @keyframes oneMove {
    0% {
      visibility: visible;
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  @keyframes twoMove {
    0% {
      visibility: visible;
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  @keyframes threeMove {
    0% {
      visibility: visible;
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  @keyframes fourMove {
    0% {
      visibility: visible;
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  @keyframes fiveMove {
    0% {
      visibility: visible;
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  @keyframes sixMove {
    0% {
      visibility: visible;
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
`;
