import React from 'react';
import { IntroWrapper, IntroText } from './style';

import illustration from '../../img/undraw_doctors_hwty.svg'


const Intro = () => {
  return(
    <IntroWrapper imageUrl={illustration} className="wrapper">
      <IntroText>
      Encontre <strong>profissionais</strong> da área de saúde 
        de forma<strong> fácil</strong> e <strong>rápida</strong> 👌<br/>
        <p className="small" >Clique aqui e saiba mais em <a href="/about">Perguntas Frequentes</a></p>
      </IntroText>
      
    </IntroWrapper>
  )
}

export default Intro