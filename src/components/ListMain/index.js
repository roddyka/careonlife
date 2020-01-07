import React, { useEffect, useContext } from 'react';

import { AppContext } from '../AppContext';

import LinkWrapper from '../../tools/LinkWrapper';
import Filter from '../Filter/index';
import Loader from '../Loader/index';

import { Detail, Title, Card } from './style';
import { database } from '../../firebase';

const ListMain = () => {
  const { appState, setState } = useContext(AppContext);
  const { nurseList } = appState;

  useEffect(() => {
    database
      .collection('partners')
      //.where('verified', '==', 'true')
      .orderBy('date','desc')
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
        setState({ ...appState, nurseList: [...data] });
      });

  }, []);

  return (
    <>
      <Filter />
      {nurseList.length ? (
        nurseList.map((line, index) => {
          return (
            <Card className='content card' key={index}>
              <Title>{line.name} {line.occupation && <small> {line.occupation}</small>}</Title>
              <LinkWrapper className='button link' to={`/detail/${line.id}`}>
                Ver detalhes
              </LinkWrapper>
            </Card>
          );
        })
      ) : (
        <Loader />
        // null
      )}
    </>
  );
};

export default ListMain;
