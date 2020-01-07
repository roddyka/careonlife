import React, { useEffect, useState, useRef } from 'react';
import { auth, database } from '../../firebase';

import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css';

import { FilterButton } from '../Filter/style';
import { CardBody, CardFooter, CardHeader, Title } from '../Card/style';
import Loader from '../Loader/index';

import messages from '../backEndMessages'


import { distritos } from '../../distritos';
import { concelhos } from '../../concelhos';
import { allowOnlyDigits } from '../../lib/index';


const ProfiilePage = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [docType, setDocType] = useState('');
  const [doc, setDocValue] = useState('');

  // const [country, setCountry] = useState('')
  const [local, setLocal] = useState('');
  const [region, setRegion] = useState('');
  const [street, setStreet] = useState('');
  const [regionList, setRegionList] = useState([]);

  const [occupation, setOccupation] = useState('');
  const [bio, setBio] = useState('');
  const [specialities, setSpecialities] = useState([]);

  const [showNif, setShowNif] = useState(false);
  const [nif, setNif] = useState('');

  const [validating, setValidating] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);

  const [userType, setUserType] = useState(null);
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      user ? setCurrentUser(user) : props.history.push('/')
    })
  }, []);
  
  useEffect(() => {
    if (!currentUser) return;


    const fetchData = async collectionName => {
      const doc = await database
        .collection(collectionName)
        .doc(currentUser.uid)
        .get();

      return doc;
    };

    fetchData('partners').then(doc => {
      if(doc.exists) {
        setCurrentUserData(doc.data())
        setUserType('partner');
      } else {
        fetchData('users').then(user => setCurrentUserData(user.data()));
        setUserType('common');
      }
    });


  }, [currentUser]);


  useEffect(() => {

    if(!currentUserData) return

    setName(currentUserData.name)
    if(userType === 'common'){
      setEmail(currentUserData.email)
      setPhone(currentUserData.phone)
    } else {
      setEmail(currentUserData.contact.email)
      setPhone(currentUserData.contact.phone)
      setDocType(Object.keys(currentUserData.documents)[0])
      setDocValue(currentUserData.documents[Object.keys(currentUserData.documents)[0]])
      setSpecialities(currentUserData.especialities)
      setBio(currentUserData.bio)
      setLocal(currentUserData.localinformation.local)
      setRegion(currentUserData.localinformation.region)
      setStreet(currentUserData.localinformation.street)
      setOccupation(currentUserData.occupation)
      setShowNif(!!currentUserData.freelancer.nif)
      setNif(currentUserData.freelancer.nif)
    }
    
  }, [currentUserData])

  useEffect(() => {
    if(!local) return;
    const filteredRegions = concelhos.filter(c => c.Distrito === local)
    setRegionList(filteredRegions)

  }, [local])

  useEffect(() => {
    !showNif ? setNif('') :  setNif(nif)
  },[showNif])


  const inputEl = useRef(null)

  useEffect(() => {
    if(!inputEl.current) return

    if(specialities.length) {
      inputEl.current.inputRef.current.removeAttribute('required')
    } else {
      inputEl.current.inputRef.current.setAttribute('required', 'required')
      inputEl.current.inputRef.current.value = ''
    }
  }, [specialities, inputEl.current])

  const updateUserProfile = event => {

    database
    .collection('users')
    .doc(currentUser.uid)
    .set({ name, email, phone })
    .then(res => {
      setValidating(false);
      onSubscribeSuccess();
    });

    currentUser.updateProfile({ displayName: name })

  } 

  const upatePartnerProfile = event => {

    const partnerData = {
      name,
      bio,
      contact: { email, phone },
      documents: { [docType]: doc },
      freelancer: { nif },
      especialities: specialities,
      localinformation: { country: 'PT', street, region, local },
      occupation,
      verified: false
    };


    database
      .collection('partners')
      .doc(currentUser.uid)
      .set(partnerData)
      .then(res => {
        setValidating(false);
        onSubscribeSuccess()
      });

      currentUser.updateProfile({ displayName: name })
  };



  const onSubscribeSuccess = () => {
    setSubscribed(true);

    setTimeout(() => {
      setSubscribed(false);
    }, 4000)
  }


  return (
    <>
      <form className='card no-padding' onSubmit={e => {
        e.preventDefault()
        if(!specialities.length) {
          setErrorCode('specialities/missing')
          return
        }
        setValidating(true);
        userType === 'common' ? updateUserProfile(e) : upatePartnerProfile(e)
      }}>
        <CardHeader>
          <Title>Meu Perfil</Title>
        </CardHeader>

        {((validating && !subscribed || !currentUserData)) && <Loader className='loader' />}

        {subscribed && 
          <p className="success">Perfil atualizado!</p>
        }
        {!validating && userType && currentUserData && (
          <>
            <CardBody className='form-body big'>
              {userType === 'common' && (
                <>
                  <div className='grid'>
                    <div>
                      <label>Nome</label>
                      <input type='text' required onChange={e => setName(e.target.value)} value={name} />
                    </div>
                  </div>

                  <div className='grid'>
                    <div>
                      <label>Email</label>
                      <input type='email' readOnly value={email}/>
                    </div>
                    <div>
                      <label>Phone</label>
                      <input type='tel' required onChange={e => setPhone(e.target.value)} value={phone} onKeyDown={e => allowOnlyDigits(e)} />
                    </div>
                  </div>
                </>
              )}
 
              {userType === 'partner' && (
                <>
                <div className='grid'>
                  <div>
                    <label>Nome</label>
                    <input type='text' required onChange={e => setName(e.target.value)} value={name} />
                  </div>
                </div>

                <div className='grid'>
                  <div>
                    <label>Email</label>
                    <input type='email' disabled value={email}/>
                  </div>
                  <div>
                    <label>Phone</label>
                    <input type='tel' required onChange={e => setPhone(e.target.value)} value={phone} onKeyDown={e => allowOnlyDigits(e)}/>
                  </div>
                </div>
                  <div className='form-section'>
                    <div className='grid'>
                      <div>
                        <label>País</label>
                        <input type='text' readOnly disabled value='Portugal' />
                      </div>
                      <div>
                        <label>Distrito</label>
                        {/* <input type='text' required onChange={e => setLocal(e.target.value)} value={local}/> */}
                        <select required onChange={e => setLocal(e.target.value)} >
                          {distritos.map(d => <option value={d} key={d}>{d}</option>)}
                        </select>
                      </div>
                      <div>
                        <label>Concelho</label>
                        <select required onChange={e => setRegion(e.target.value)} value={region}> 
                          {regionList.map(r => <option value={r.Concelhos} key={r.Concelhos}>{r.Concelhos}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className='grid'>
                      <div>
                        <label>Rua</label>
                        <input type='text' required onChange={e => setStreet(e.target.value)} value={street} />
                      </div>
                    </div>

                    <div className='grid'>
                      <div>
                        <label>Documento</label>
                        <select onChange={e => setDocType(e.target.value)} value={docType}>
                          <option value='passport'>Passaporte</option>
                          <option value='AR'>AR</option>
                          <option value='BI'>BI</option>
                        </select>
                      </div>
                      <div>
                        <label>&nbsp;</label>
                        <input
                          type='text'
                          required
                          placeholder='Digite aqui o documento'
                          value={doc}
                          onChange={e => setDocValue(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='form-section'>
                    <div className='grid'>
                      <div>
                        <label>Profissão</label>
                        <input type='text' required onChange={e => setOccupation(e.target.value)} value={occupation} />
                      </div>
                    </div>
                    <div className='grid'>
                      <div>
                        <div>
                        <label>Especialidades</label>
                      <small style={{fontSize: '.85em', margin: '5px 0', display: 'block'}}>
                        Adicione uma especialidade por vez. Digite uma e pressione enter.
                      </small>
                        
                        </div>
                        <ReactTagInput
                          tags={specialities}
                          editable={true}
                          ref={inputEl}
                          onChange={newTags => setSpecialities(newTags)}
                          placeholder='Digite e pressione Enter'
                        />
                      </div>
                    </div>

                    <div className='grid'>
                      <div>
                        <label>Conte um pouco sobre a sua experiencia</label>
                        <textarea onChange={e => setBio(e.target.value)} value={bio} />
                      </div>
                    </div>

                    <div className='grid inline'>
                        <label>
                          Emite recibo verde?
                        </label>
                        <span>
                          <input type='radio' name="nif" onChange={e => setShowNif(true)} checked={showNif}/>Sim
                        </span>
                        <span>
                          <input type='radio' name="nif" onChange={e => setShowNif(false)} checked={!showNif}/>Não
                        </span>
                    </div>

                    {showNif && (
                      <div className='grid'>
                        <div>
                          <label>NIF</label>
                          <input type='text' required onChange={e => setNif(e.target.value)} value={nif} onKeyDown={e => allowOnlyDigits(e)}/>
                        </div>
                        <span></span>
                        <span></span>
                      </div>
                    )}
                  </div>
                </>
              )}

              {
                errorCode && <p className="error">{messages[errorCode]}</p>
              }
            </CardBody>
            <CardFooter>
              <FilterButton className='button'>Salvar</FilterButton>
            </CardFooter>
          </>
        )}
      </form>
    </>
  );
};

export default ProfiilePage;
