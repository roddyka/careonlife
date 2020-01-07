import React, { useState, useEffect, useRef } from 'react';

import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css';

import { CardBody, CardFooter, CardHeader, Title } from '../Card/style';

import { FilterButton } from '../Filter/style';
import { auth, database } from '../../firebase';
import Loader from '../Loader/index';

import { distritos } from '../../distritos';
import { concelhos } from '../../concelhos';

import messages from '../backEndMessages'
import { allowOnlyDigits } from '../../lib/index';
import { SubscribeSuccess } from '../UserPage/style';
import LinkWrapper from '../../tools/LinkWrapper/index';

const PartnerPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [docType, setDocType] = useState('passport');
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


  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    if(!local) return;
    const filteredRegions = concelhos.filter(c => c.Distrito === local)
    setRegionList(filteredRegions)

  }, [local])

  const subscribePartner = e => {
    e.preventDefault();

    if(!specialities.length) {
      setErrorCode('specialities/missing')
      return
    }

    setValidating(true);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        res.user.updateProfile({ displayName: name }).then(() => {
          createPartnerOnDatabase(res.user.uid)
        })
      })
      .catch(err => {
        console.log(err);
        setValidating(false);
        setErrorCode(err.code);
      });
  };

  const inputEl = useRef(null)

  useEffect(() => {
    if(!inputEl.current) return

    if(specialities.length) {
      inputEl.current.inputRef.current.removeAttribute('required')
    } else {
      inputEl.current.inputRef.current.setAttribute('required', 'required')
    }

  }, [specialities, inputEl.current])


  const createPartnerOnDatabase = userId => {

    const partnerData = {
      name,
      bio,
      contact: { email, phone },
      documents: { [docType]: doc },
      freelancer: { nif },
      especialities: specialities,
      localinformation: { country: 'PT', street, region, local },
      occupation,
      verified: false,
      date: (new Date).toLocaleDateString()
    };

    database
      .collection('partners')
      .doc(userId)
      .set(partnerData)
      .then(res => {
        console.log(res);
        setValidating(false);
        setSubscribed(true);
      });
  };


  return (
    <>
      <form className='card no-padding' onSubmit={e => subscribePartner(e)}>

        {validating && !subscribed && <Loader className='loader' />}

        {!validating && !subscribed && (
          <>
          <CardHeader>
            <Title>Cadastrar profissional</Title>
          </CardHeader>
            <CardBody className='form-body big'>
              <div className='grid'>
                <div>
                  <label className='required'>Nome</label>
                  <input type='text' required onChange={e => setName(e.target.value)} value={name}/>
                </div>
                <div>
                  <label className='required'>Email</label>
                  <input type='email' required onChange={e => setEmail(e.target.value)} value={email}/>
                </div>
              </div>

              <div className='grid'>
                <div>
                  <label className='required'>Phone</label>
                  <input type='tel' required  onChange={e => setPhone(e.target.value)} value={phone} onKeyDown={e => allowOnlyDigits(e)} />
                </div>
                <div>
                  <label className='required'>Crie sua senha</label>
                  <input type='password' required onChange={e => setPassword(e.target.value)} />
                </div>
              </div>

              <div className='form-section'>
                <div className='grid'>
                  <div>
                    <label>País</label>
                    <input type='text' readOnly disabled value='Portugal' />
                  </div>
                  <div>
                    <label className='required'>Distrito</label>
                    <select required onChange={e => setLocal(e.target.value)} value={local}>
                      <option value=""></option>
                      {distritos.map(d =>  <option value={d} key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className='required'>Concelho</label>
                    <select required onChange={e => setRegion(e.target.value)} value={region}> 
                      <option value=""></option>
                      {regionList.map(r => <option value={r.Concelhos} key={r.Concelhos}>{r.Concelhos}</option>)}
                    </select>
                  </div>
                </div>

                <div className='grid'>
                  <div>
                    <label className='required'>Rua</label>
                    <input type='text' required onChange={e => setStreet(e.target.value)} value={street}/>
                  </div>
                </div>

                <div className='grid'>
                  <div>
                    <label className='required'>Documento</label>
                    <select onChange={e => {
                      setDocType(e.target.value)
                      console.log(e.target.value)
                    }}>
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
                    <label className='required'>Profissão</label>
                    <input type='text' required onChange={e => setOccupation(e.target.value)} value={occupation} />
                  </div>
                </div>
                <div className='grid'>
                  <div>
                    <div>
                      <label className='required'>Especialidades (Você será pesquisado por estas especialidades)</label> 
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
                    <textarea onChange={e => setBio(e.target.value)} value={bio}/>{' '}
                  </div>
                </div>

                <div className='grid inline'>
                  <label>
                    Emite recibo verde?
                  </label>
                  <span>
                    <input type='radio'  name="nif" onChange={e => setShowNif(true)} checked={showNif} />Sim
                  </span>
                  <span>
                    <input type='radio' name="nif" onChange={e => setShowNif(false)} checked={!showNif} />Não
                  </span>
                </div>
                {showNif && (
                  <div className='grid'>
                    <div>
                      <label className='required'>NIF</label>
                      <input type='text' required onChange={e => setNif(e.target.value)} value={nif}  onKeyDown={e => allowOnlyDigits(e)}/>
                    </div>
                    <span></span>
                    <span></span>
                  </div>
                )}
              </div>

              {
                errorCode && <p className="error">{messages[errorCode]}</p>
              }
            </CardBody>
            <CardFooter>
              <FilterButton className='button'>Registrar</FilterButton>
            </CardFooter>
          </>
        )}

        {subscribed && (
          <SubscribeSuccess>
            <CardHeader>
              <Title>Cadastro Enviado!</Title>
            </CardHeader>
            <CardBody>
              <svg id="b90bc34a-8998-4c8b-8538-dc1cb46cfa6d" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="1042.88414" height="841" viewBox="0 0 1042.88414 841"><title>progress_tracking</title><ellipse cx="521.44207" cy="806" rx="521.44207" ry="35" fill="#3f3d56"/><ellipse cx="645.88414" cy="803" rx="341" ry="26" opacity="0.1"/><path d="M269.91737,736.23337l5.33912,61.39988,24.026,5.33912,5.33912-16.01736s-9.34346-44.04774-9.34346-52.05642Z" transform="translate(-78.55793 -29.5)" fill="#a0616a"/><path d="M336.65637,693.52041s-10.67824,26.6956-14.68258,29.36516,12.013,37.37384,12.013,37.37384l24.026-4.00434s-8.00868-28.03038-1.33478-44.04774Z" transform="translate(-78.55793 -29.5)" fill="#a0616a"/><path d="M329.31508,708.87038s-10.01085,3.337-14.01519,18.01953-4.00434,16.01736-4.00434,16.01736l6.6739,14.68258h4.00434s6.6739,22.69126,5.33912,30.69994,9.34346,38.70862,28.03038,37.37384,14.68258-24.026,14.68258-24.026l-9.34346-46.7173s0-12.013-2.66956-12.013-24.026,4.00434-24.026,4.00434v4.00434S318.63684,730.22686,329.31508,708.87038Z" transform="translate(-78.55793 -29.5)" fill="#2f2e41"/><path d="M295.27819,790.95935v-8.00868s-28.03038,4.00434-28.03038,8.00868v9.34346s-24.026,50.72164,2.66956,50.72164,32.03472-10.67824,32.03472-10.67824V825.66363s13.3478-6.6739,13.3478-10.67824-13.0253-39.37724-13.0253-39.37724S301.95209,796.29847,295.27819,790.95935Z" transform="translate(-78.55793 -29.5)" fill="#2f2e41"/><circle cx="184.68554" cy="58.03029" r="42.71296" fill="#a0616a"/><path d="M246.55872,120.2324s5.33912,25.36082,5.33912,28.03038,25.36082,14.68258,25.36082,14.68258l22.69126-4.00434,8.00868-24.026s-13.3478-20.0217-13.3478-28.03038Z" transform="translate(-78.55793 -29.5)" fill="#a0616a"/><path d="M250.13223,137.82852s13.77863,22.44728,33.80033,15.77338a27.612,27.612,0,0,0,19.58563-25.81165l65.84029,23.14209-12.013,97.43894,10.67824,113.4563L360.015,376.51016H242.55438s-4.00434-20.0217-5.33912-20.0217-4.00434-4.00434-2.66956-5.33912,4.00434-2.66956,2.66956-6.6739-2.66956-48.05208-2.66956-48.05208L194.5023,180.2975Z" transform="translate(-78.55793 -29.5)" fill="#d0cde1"/><path d="M199.174,391.86013l24.026,32.03472s4.00434-33.3695,9.34346-34.70428l-13.3478-9.34346Z" transform="translate(-78.55793 -29.5)" fill="#a0616a"/><path d="M466.13,366.49931s36.03906,22.69126,32.03472,37.37384-45.38252-25.36082-45.38252-26.6956S466.13,366.49931,466.13,366.49931Z" transform="translate(-78.55793 -29.5)" fill="#a0616a"/><path d="M241.887,366.49931h-2.66956l-4.00434,18.68692s-21.35648,18.68692-10.67824,48.05208l21.35648,140.1519,2.66956,162.84316,24.026,6.6739,26.6956-5.33912,6.6739-217.56914s9.34346-20.0217,5.33912-26.6956,1.33478-5.33912,1.33478-5.33912l28.03038,77.41724s-9.34346,25.36082,0,33.3695c0,0-1.33478,4.00434,0,5.33912s8.00868,6.6739,5.33912,9.34346-4.00434,0-4.00434,4.00434-13.3478,37.37384-8.00868,80.0868l17.35214,26.6956,16.01736-9.34346,29.36516-82.75636s-6.6739-12.013,0-14.68258,8.00868-5.33912,5.33912-9.34346-2.66956-17.35214,1.33478-24.026,0-17.35214,0-17.35214L388.71279,431.90353s6.6739-36.03906-16.01736-54.726L368.69109,362.495S335.32159,386.521,241.887,366.49931Z" transform="translate(-78.55793 -29.5)" fill="#2f2e41"/><path d="M226.20291,53.11789s13.56121-29.38261,39.55352-22.602,40.68362,16.95151,41.81372,27.12241-.565,25.42726-.565,25.42726-2.82526-20.90686-20.90686-16.38645-46.33412,1.1301-46.33412,1.1301l-4.5204,40.68361s-5.08546-7.34565-10.736-2.82525S208.1213,62.15869,226.20291,53.11789Z" transform="translate(-78.55793 -29.5)" fill="#2f2e41"/><path d="M214.524,180.2975H194.5023s-17.35214,14.68258-16.01736,42.713l-9.34346,78.752s0,38.70862,16.01736,66.739L202.511,401.871s6.6739-18.68692,26.6956-16.01736l-10.67824-28.03038v-6.6739s-4.00434-5.33912-4.00434-6.6739,5.33912-1.33478,1.33478-4.00434-8.00868-29.36516-8.00868-29.36516,1.33478-5.33912,2.66956-6.6739-1.33478-5.33912-1.33478-5.33912l2.66956-4.00434,17.35214-65.40422Z" transform="translate(-78.55793 -29.5)" fill="#d0cde1"/><path d="M346.66722,146.928l22.69126,4.00434s13.3478,13.3478,18.68692,29.36516l10.67824,48.05208,17.35214,34.70428s20.0217,20.0217,34.70428,65.40422l21.35648,40.0434-22.69126,13.3478s-62.73466-73.4129-70.74334-98.77372l-34.70428-66.739Z" transform="translate(-78.55793 -29.5)" fill="#d0cde1"/><rect x="394.88414" y="316" width="547" height="493" fill="#3f3d56"/><rect x="387.45583" y="386" width="15.29361" height="367" fill="#007bff"/><rect x="731.38414" y="388.5" width="71" height="2" fill="#f2f2f2"/><rect x="731.38414" y="372.5" width="72" height="12" fill="#f2f2f2"/><polygon points="804.384 752.5 758.384 752.5 758.384 726.5 791.634 726.5 791.634 728.5 760.384 728.5 760.384 750.5 802.384 750.5 802.384 737.965 804.384 737.965 804.384 752.5" fill="#f2f2f2"/><rect x="471.38414" y="430.5" width="331" height="8" fill="#f2f2f2"/><rect x="471.38414" y="467.5" width="331" height="8" fill="#f2f2f2"/><rect x="471.38414" y="504.5" width="331" height="8" fill="#f2f2f2"/><rect x="471.38414" y="541.5" width="331" height="8" fill="#f2f2f2"/><rect x="471.38414" y="578.5" width="331" height="8" fill="#f2f2f2"/><rect x="471.38414" y="615.5" width="331" height="8" fill="#f2f2f2"/><rect x="471.38414" y="652.5" width="331" height="8" fill="#f2f2f2"/><rect x="471.38414" y="689.5" width="331" height="8" fill="#f2f2f2"/><circle cx="852.38414" cy="434.5" r="13" fill="#007bff"/><circle cx="852.38414" cy="471.5" r="13" fill="#f2f2f2"/><circle cx="852.38414" cy="508.5" r="13" fill="#007bff"/><circle cx="852.38414" cy="545.5" r="13" fill="#f2f2f2"/><circle cx="852.38414" cy="582.5" r="13" fill="#f2f2f2"/><circle cx="852.38414" cy="619.5" r="13" fill="#f2f2f2"/><circle cx="852.38414" cy="656.5" r="13" fill="#007bff"/><circle cx="852.38414" cy="693.5" r="13" fill="#007bff"/><polygon points="781.884 746.414 770.677 735.207 772.091 733.793 781.884 743.586 811.177 714.293 812.591 715.707 781.884 746.414" fill="#007bff"/><ellipse cx="781.88414" cy="767" rx="69" ry="4" opacity="0.1"/><path d="M160.14648,823.52148c-.22949-.375-5.64062-9.41015-7.5166-28.17187-1.7207-17.21289-.61425-46.22656,14.43262-86.69824,28.50586-76.6709-6.56934-138.53321-6.92773-139.14942l1.73046-1.0039c.09082.15625,9.14161,15.92871,14.48829,41.04394a179.06122,179.06122,0,0,1-7.416,99.80664c-28.457,76.54-7.30078,112.77344-7.084,113.13086Z" transform="translate(-78.55793 -29.5)" fill="#3f3d56"/><circle cx="70.44207" cy="522.5" r="13" fill="#007bff"/><circle cx="111.44207" cy="570.5" r="13" fill="#007bff"/><circle cx="83.44207" cy="602.5" r="13" fill="#007bff"/><circle cx="117.44207" cy="629.5" r="13" fill="#007bff"/><circle cx="73.44207" cy="671.5" r="13" fill="#007bff"/><path d="M168,824s-13-32,26-56Z" transform="translate(-78.55793 -29.5)" fill="#3f3d56"/><path d="M152.012,823.41953s-5.91642-34.02934-51.7085-33.73768Z" transform="translate(-78.55793 -29.5)" fill="#3f3d56"/></svg>
            </CardBody>
            <CardFooter>
              <p className="message">Recebemos seus dados e em breve você aparecerá em nossa lista de profissionais</p>
              <LinkWrapper to={`/`} className='login-button link'>
              <FilterButton className='button' type='submit'>
                  OK
              </FilterButton>
              </LinkWrapper>
            </CardFooter>
          </SubscribeSuccess>
        )}

      </form>
    </>
  );
};

export default PartnerPage;
