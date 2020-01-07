import styled from 'styled-components';

const IntroWrapper = styled.div`
  height: 50vh;
  background: url(${props => props.imageUrl}) 0% 50% no-repeat;
  background-size: 55%;
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media screen and (max-width: 600px) {
    width: 100%;
    background-size: 75%;
    background-position: 50% 0;
    padding-top: 60%;
  }
`

const IntroText = styled.div`
  font-family: 'Poppins', sans-serif;
  width: 45%;
  font-size: 2.5em;
  font-weight: 600;
  text-align: right;
  /* text-transform: lowercase; */
  line-height: 1.1;

  strong { color: var(--color-highlight)}

  .small{
    font-size:15px;
  }


  @media screen and (max-width: 600px) {
    width: 100%;
    font-size: 8vw;

    .small { margin-top: 20px;}
  }
`

export { IntroWrapper, IntroText }

