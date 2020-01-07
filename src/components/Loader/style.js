import styled from 'styled-components';

const LoaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100px;
  margin: 100px auto;

  &:before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      right: 50%;
      width: 70px;
      height: 70px;
      margin-top: -35px;
      margin-left: -35px;
      border-radius: 50%;
      border-top: 2px solid var(--color-highlight);
      border-right: 2px solid transparent;
      animation: spinner .45s linear infinite;
    }
`

export {
  LoaderWrapper
}