import React, { useState, useEffect, useContext } from 'react';
import { FilterWrapper, FilterButton } from './style';

import { AppContext } from '../AppContext/index';

import { database } from '../../firebase';

const Filter = () => {
  const { appState, setState } = useContext(AppContext);

  const [specialities, setSpecialities] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedSpecialty, selectSpeciality] = useState(0);
  const [selectedState, selectState] = useState(0);
  const [selectedCity, selectCity] = useState(0);

  useEffect(() => {
    database
      .collection('partners')
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => doc.data());
        const specialitiesData = data.map(n => n.especialities).flat();
        setSpecialities([...new Set(specialitiesData)]);
      });
  }, []);

  useEffect(() => {
    if (!selectedSpecialty && selectedSpecialty !== 'any') return;

    database
      .collection('partners')
      .where('especialities', 'array-contains', selectedSpecialty)
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => doc.data());
        const locals = data.map(n => n.localinformation.local).flat();
        setStates([...new Set(locals)]);
      });
  }, [selectedSpecialty]);

  useEffect(() => {
    if (!selectedState) return;

    database
      .collection('partners')
      .where('especialities', 'array-contains', selectedSpecialty)
      .where('localinformation.local', '==', selectedState)
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => doc.data());
        const regions = data.map(n => n.localinformation.region).flat();
        setCities(regions);
      });
  }, [selectedState, selectedSpecialty]);

  const onFilterButtonClick = async () => {
    setState({ ...appState, nurseList: [] });
    
    let partnersRef = database.collection('partners');

    if (selectedSpecialty && selectedSpecialty !== "any") {
      partnersRef = await partnersRef.where('especialities', 'array-contains', selectedSpecialty);
    }

    if (selectedState && selectedState !== "any") {
      partnersRef = await partnersRef.where('localinformation.local', '==', selectedState);
    }

    if (selectedCity && selectedCity !== "any") {
      partnersRef = await partnersRef.where('localinformation.region', '==', selectedCity);
    }

    
    partnersRef.get().then(snapshot => {
      const data = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });

      setState({ ...appState, nurseList: [...data] });
    });
  };


  return (
    <FilterWrapper>
      <div className='filter' data-fetching={!specialities.length}>
        <select onChange={({ target }) => selectSpeciality(target.value)}>
          <option disabled={specialities.length}>Especialidade</option>
          <option value='any'>Qualquer especialidade</option>
          {specialities.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className='filter' data-fetching={(!!selectedSpecialty && selectedSpecialty !== 'any') && !states.length}>
        <select disabled={!states.length} onChange={({ target }) => selectState(target.value)}>
          <option disabled={states.length}>Distrito</option>
          <option value='any'>Qualquer distrito</option>
          {states.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className='filter'>
        <select
          onChange={({ target }) => selectCity(target.value)}
          disabled={!cities.length}
          data-fetching={selectedState && !cities.length}
        >
          <option disabled={cities.length}>Concelho</option>
          <option value='any'>Qualquer concelho</option>
          {cities.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <FilterButton className='button' disabled={!selectedSpecialty} onClick={onFilterButtonClick}>
        Buscar
      </FilterButton>
    </FilterWrapper>
  );
};

export default Filter;
