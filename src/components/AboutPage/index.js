import React, { useState, useEffect } from 'react';

import Loader from '../Loader';
import { database, auth } from '../../firebase';

import { CardHeader, CardBody, CardFooter, Title, Tag, Description, List, ListTitle, ListItem } from '../Card/style';


const AboutPage = props => {
return (
    <>
      
        <div className='card no-padding'>
          <CardHeader>
            <Title>
             Sobre e Perguntas Frequentes
            </Title>
            
          </CardHeader>

          <CardBody>
          <Description>A Care on Life foi criada para facilitar a comunicação entre profissionais da área se saúde ao cliente final..<br/><br/>
          Precisando de curativos ou apoio para acamados e higiene pessoal?
<br/><br/>
Nesta plataforma vamos listar os profissionais para facilitar a sua busca.<br/>

          </Description>
            <List>
            <ListTitle>Quem se pode inscrever  na plataforma?
</ListTitle><br/>
            <ListItem>
              <ul>
                <li> Profissionais da área de saúde que procuram trabalhar como cuidadores</li>
                <li> Pessoas que possuem experiência na área de cuidados</li>
                <li> Famílias ou pessoas por conta própria que necessitam da ajuda de um profissional</li>
              </ul>
              </ListItem><br/><br/>
            <ListTitle>Como entrar em contato com um profissional?</ListTitle><br/>
            <ListItem>
              <ul>
                <li> Encontre o profissional que procura e consulte os seus dados de contato</li>
              </ul>
            </ListItem><br/><br/>
            <ListTitle>Qual o objetivo desta plataforma?</ListTitle><br/>
            <ListItem>
              <ul>
                <li> Facilitar a busca de profissionais cuidadores e da área de saúde</li>
              </ul>  
            </ListItem><br/><br/>
            <ListTitle>Não sei se um profissional é qualificado, o que devo fazer?</ListTitle><br/>
            <ListItem>
              <ul>
                <li> Inscreva-se na plataforma e consulte o contato do profissional</li>
                <li> Verifique as competências do profissional</li>
              </ul>
            </ListItem><br/><br/>
            <ListTitle>Gostava de ser parceiro da plataforma, como posso contactar?</ListTitle><br/>
            <ListItem>
              <ul>
                <li> - contact@careonlife.com</li>
                <li> - contact@careoncare.com.br</li>
                <li> - Instagram: @careonlife</li>
              </ul>
            </ListItem><br/>
            </List>
          </CardBody>

          <CardFooter>
           
          </CardFooter>
        </div>
      
    </>
  );
}

export default AboutPage;