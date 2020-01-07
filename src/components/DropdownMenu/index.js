import React from 'react';
import { DropdownWrapper, Trigger, Menu } from './style';
import LinkWrapper from '../../tools/LinkWrapper/index';


const DropdownMenu = ({text, items}) => {
  
  return(
    <DropdownWrapper>
      <Trigger className="button login-button">{text}</Trigger>
      <Menu className>
        { items.map((item, index) => <LinkWrapper to={`${item.url}`} key={index}> {item.text} </LinkWrapper>) }
      </Menu>

    </DropdownWrapper>
  )
}

export default DropdownMenu