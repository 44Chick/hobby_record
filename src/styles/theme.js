import styled from "styled-components"

// 자주 쓰는 색
const azur = {
  deep: "#7F7FD5",
  mid: "#86A8E7",
  light: "#91EAE4",
}

// input / textarea / select
const common = {
  inputs: `
  border: 1px solid ${azur.deep};
  border-radius: 16px;
  :focus {
    outline: 2px solid ${azur.deep};
  }
  `,

  flexCenterColumn: `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  `,
}

const theme = {
  azur,
  common,
}

export default theme
