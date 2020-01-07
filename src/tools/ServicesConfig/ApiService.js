import { API } from "./Config";

const ApiService = {
  ValidateToken: token => {
    return fetch(`${API.url}/auth/validate`, {
      method: "POST",
      headers: { authorization: token }
    }).then(res => {
      if(!res.ok) { throw res }
      return res.json()
    })
  },
  //getall,
  ListNurse: () => {
    return fetch(`${API.url}/nurse`)
      .then(res => res.json())
      .then(res => res.nurse);
  },
  CreateNurse: nurse => {
    return fetch(`${API.url}/nurse`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: nurse
    }).then(res => res.json());
  },
  //getbyid
  ListNurseById: id => {
    return fetch(`${API.url}/nurse/partner/${id}`)
      .then(res => res.json())
      .then(res => res.nurse);
  },
  ListSpecialities: () => {
    return fetch(`${API.url}/nurse/specialty`)
      .then(res => res.json())
      .then(res => res.nurse);
  },
  ListStates: () => {
    // return fetch(`${API.url}/nurse/states`)
    return fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    ).then(res => res.json());
  },
  ListCities: stateId => {
    // return fetch(`${API.url}/nurse/cities/${stateId}`)
    return fetch(
      `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`
    ).then(res => res.json());
  },
  FindNurse: query => {
    // return fetch(`${API.url}/filter?${query}`)
    return fetch(`${API.url}/nurse`)
      .then(res => res.json())
      .then(res => res.nurse);
  }
};

export default ApiService;
