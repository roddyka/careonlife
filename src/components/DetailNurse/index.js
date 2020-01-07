import React, { useState, useEffect } from 'react';

import Loader from '../Loader';
import { database, auth } from '../../firebase';

import { CardHeader, CardBody, CardFooter, Title, Tag, Description, List, ListTitle, ListItem } from '../Card/style';

const DetailNurse = props => {
  const [nurse, setNurse] = useState(null);
  const [isPrivateDataVisible, togglePrivateData] = useState(false);

  useEffect(() => {
    database
      .collection('partners')
      .doc(props.match.params.id)
      .get()
      .then(doc => setNurse(doc.data()));
  }, [props.match.params.id]);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(user => (user ? togglePrivateData(true) : togglePrivateData(false)));

    return () => authListener();
  }, []);

  return (
    <>
      {nurse ? (
        <div className='card no-padding'>
          <CardHeader className="title-with-tags">
            <Title>
              {nurse.name}
              {nurse.occupation && <small> ({nurse.occupation})</small>}
            </Title>
            {nurse.especialities.map(s => (
              <Tag key={s}>{s}</Tag>
            ))}
          </CardHeader>

          <CardBody>
            <Description>{nurse.bio}</Description>
            <List>
              <ListTitle>Distrito</ListTitle>
              <ListItem>{nurse.localinformation.local}</ListItem><br/>
              <ListTitle>Concelho</ListTitle>
              <ListItem>{nurse.localinformation.region}</ListItem><br/>
              {/* <ListTitle>Emite recibo verde?</ListTitle>
              <ListItem>{!!nurse.freelancer.nif ? 'Sim' : 'Não'}</ListItem><br/> */}
              {isPrivateDataVisible && (
                <>
                  {
                    !!nurse.freelancer.nif &&
                    <>
                      {/* <ListTitle>NIF</ListTitle>
                      <ListItem>{nurse.freelancer.nif}</ListItem><br/> */}
                    </>
                  }
                  {/* <ListTitle>Rua</ListTitle>
                  <ListItem>{nurse.localinformation.street}</ListItem><br/> */}
                </>
              )}
            </List>
          </CardBody>

          <CardFooter>
            {isPrivateDataVisible ? (
              <>
                <listTitle>E-mail </listTitle>
                <ListItem><button className='button'>{nurse.contact.email}</button></ListItem>
                <listTitle>Contato</listTitle>
                <ListItem><button className='button'>{nurse.contact.phone}</button></ListItem>
              </>
            ) : (
              <button className='button' onClick={() => props.history.push('/login')}>
                Entre para ver informações de contato
              </button>
            )}
          </CardFooter>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DetailNurse;
