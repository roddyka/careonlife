import styled from "styled-components";

const Title = styled.h2`
  text-transform: uppercase;
  color: var(--color-highlight);
  font-size: 1.5em;
  letter-spacing: 2px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;

  small { font-size: .5em; }


`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 25px;
  background: #fff;

  @media screen and (max-width: 600px) {
      display: block;
      flex-direction: column;
      
  }
`;

const CardBody = styled.div`
  padding: 25px;
  margin-bottom: 20px;
  background: #fff;
`;

const CardFooter = styled.div`
  text-align: center;
  padding: 25px;
  background: #fff;
  /* display: flex; */

  .button {
    font-size: 0.85em;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-highlight);
    border-radius: 10px;
    cursor: pointer;
    -webkit-letter-spacing: 1px;
    -moz-letter-spacing: 1px;
    -ms-letter-spacing: 1px;
    letter-spacing: 1px;
    outline: none;
    margin: 0 25px;

    &:hover {
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 600px) {

    .button { margin: 0;}
  }
  
`;

const Description = styled.p`
  color: #888;
`;

const List = styled.dl`
  margin-top: 50px;
  line-height: 1.5;
  /* display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 10px; */
`;

const ListTitle = styled.dt`
  color: #666;
  display: inline-block;
`;

const ListItem = styled.dd`
  font-weight: 600;
  display: inline-block;
  margin-left: 10px;
`;

const Tag = styled.span`
  background: #ccc;
  padding: 5px 15px;
  border-radius: 15px;
  display: inline-block;
  margin: 0 0 10px 10px;
  letter-spacing: 1px;
  font-size: 0.95em;

  &:empty { display: none; }

`;

export {
  Title,
  Tag,
  CardHeader,
  CardBody,
  CardFooter,
  Description,
  List,
  ListTitle,
  ListItem
};
