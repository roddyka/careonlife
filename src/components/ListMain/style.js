import styled from 'styled-components';

export const Card = styled.article`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .button {
        background-color: var(--color-highlight);
        /* text-transform: uppercase; */
        color: #fff;
        font-family: 'Poppins',sans-serif;
        font-weight: 600;
        letter-spacing: 2px;
        font-size: 1.15em;
        border-radius: 3px;
        text-decoration: none;
        padding: 10px 15px;

        transition: background-color .25s;

        &:hover {
            background-color: #424f69;
        }
    }

  @media screen and (max-width: 600px) {
    font-size: 3vw;

    .button { margin-left: auto; }
  }
`;

export const Title = styled.h2`
    text-transform: uppercase;
    color: var(--color-highlight);
    font-size: 1.4em;
    letter-spacing: 2px;
    font-weight: 600;
    font-family: 'Poppins',sans-serif;

    small { font-size: 12px; }
    
    @media screen and (max-width: 600px) {
      width: 100%;
      margin-bottom: 15px;

      small { 
        display: block;
        margin-top: 5px;
      }
    }
`;


export const Detail = styled.p`
    width: 100%;
    text-transform: uppercase;
    font-size: 1em;
    min-width: 400px;
    margin-top: 10px;
    color: var(--color-font);
`;



