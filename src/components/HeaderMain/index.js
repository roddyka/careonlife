import React, { useEffect, useState } from 'react';

import LogoImg from '../../img/logo-img.png';
import LogoText from '../../img/logo-text.png';

import { Header, LogoImgStyle, LogoTextStyle, HeaderWrapper } from './style';
import LinkWrapper from '../../tools/LinkWrapper';
import DropdownMenu from '../DropdownMenu/index';

import { auth } from '../../firebase';

const HeaderMain = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const menu = [
    { text: 'Procuro um profissional', url: '/register/user' },
    { text: 'Sou um profissional', url: '/register/partner' }
  ];

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser)
  }, []);

  // useEffect(() => {
  //   console.log(currentUser)
  // }, [currentUser]);

  return (
    <Header>
      <HeaderWrapper className='wrapper'>
        <LinkWrapper to={`/`}>
          <LogoImgStyle src={LogoImg} />
          <LogoTextStyle src={LogoText} />
        </LinkWrapper>
        
        {(currentUser) ? (
          <>
          
            <LinkWrapper to={`/profile`} className='login-button welcome'>
              <button className='login-button link desktop'> Olá, {currentUser.displayName || currentUser.email}</button>
              <button className='login-button link mobile'> Meu perfil</button>
            </LinkWrapper>
            
            <button className='login-button ml-0' onClick={() => auth.signOut()}>
              Sair
            </button>
          </>
        ) : (
          <>
          
            <DropdownMenu text={'Registre-se'} items={menu} />
            
            <LinkWrapper to={`/login`} className='login-button link'>
                Entrar
            </LinkWrapper>
          </>
        )}
        {/* <LinkWrapper to={`/about`} className='login-button about'>
            Sobre e Perguntas Frequentes
        </LinkWrapper> */}
      </HeaderWrapper>
      
    </Header>
    
  );
};

export default HeaderMain;
