import styled  from 'styled-components';


const DropdownWrapper = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: 10px;

  &:hover nav {
    display: block;
  }


`

const Trigger = styled.button`
`

const Menu = styled.nav`
  position: absolute;
  /* width: 100%; */
  text-align: center;
  top: 100%;
  background-color: #fff;
  padding: 10px 20px;
  line-height: 2.5;
  border-radius: 3px;
  box-shadow: -5px 5px 5px -5px rgba(0,0,0,.25);
  display: none;

  a { 
    display: block; 
    color: #ccc;
    text-decoration: none;
    font-weight: 600;
    letter-spacing: 1px;
    white-space: nowrap;

    &:hover { color: #333; }
  }

  @media screen and (max-width: 600px) {
    right: 0;
  }
`

export {
  DropdownWrapper,
  Trigger,
  Menu
}