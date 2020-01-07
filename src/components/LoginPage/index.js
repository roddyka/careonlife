import React, { useState } from 'react';
import { CardBody, CardFooter, CardHeader, Title } from '../Card/style';
import { useLastLocation } from 'react-router-last-location';
import { FilterButton } from '../Filter/style';
import { auth } from '../../firebase';
import Loader from '../Loader/index';

import messages from '../backEndMessages'

const LoginPage = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validating, setValidating] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const [errorCode, setErrorCode] = useState(null);

  const lastLocation = useLastLocation();
 
  const login = e => {
    e.preventDefault();
    setValidating(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        setSubscribed(true);

        if(lastLocation && lastLocation.pathname.includes('/detail')){
          props.history.goBack();
        } else {
          props.history.push('/')
        }
      })
      .catch(err => {
        console.log(err);
        setValidating(false);
        setErrorCode(err.code)
      });
  };

  return (
    <>
      <div className='card no-padding'>
        {(validating && !subscribed) && <Loader className='loader' />}

        {(!validating && !subscribed) && (
          <form onSubmit={e => login(e)}>
            <CardHeader>
              <Title>Entrar</Title>
            </CardHeader>
            <CardBody className='form-body'>
              <label>Email:</label>
              <input type='email' value={email} onChange={e => setEmail(e.target.value)} required />
              <label>Senha:</label>
              <input type='password' value={password} onChange={e => setPassword(e.target.value)} required />
              {
                errorCode && <p className="error">{messages[errorCode]}</p>
              }
            </CardBody>
            <CardFooter>
              <FilterButton className='button' type='submit'>
                Entrar
              </FilterButton>
            </CardFooter>
          </form>
        )}
      </div>
    </>
  );
};

export default LoginPage;
