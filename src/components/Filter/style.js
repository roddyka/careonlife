import styled from 'styled-components';

const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr .5fr .5fr .25fr;
  grid-auto-rows: 50px;
  grid-gap: 20px;
  margin: 40px auto 80px;

  .filter {
    position: relative;

    select {
      appearance: none;
      background: none;
      border-radius: 0;
      /* outline: none; */
      border-top: none;
      border-right: none;
      border-left: none;
      box-shadow: none;
      font-family: inherit;
      font-size: 1.1em;
      font-weight: 600;
      height: 40px;
      border-bottom: 2px solid #888;
      color: #888;
      letter-spacing: 1px;
      width: 100%;
      transition: border-color .25s .15s, color .25s .15s;


      &[disabled] { cursor: not-allowed; }
      
      &[data-selected="true"]{
        color: var(--color-highlight);
        border-color: var(--color-highlight);
      }
    }

    &[data-fetching="true"]::before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      right: 20px;
      width: 20px;
      height: 20px;
      margin-top: -10px;
      margin-left: -10px;
      border-radius: 50%;
      border-top: 2px solid var(--color-highlight);
      border-right: 2px solid transparent;
      animation: spinner .45s linear infinite;
    }    
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const FilterButton = styled.button`
  font-size: 1.15em;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-highlight);
  /* border: 1px solid var(--color-highlight); */
  border-radius: 10px;
  /* padding: 0 15px; */
  cursor: pointer;
  letter-spacing: 1px;

  &[disabled] {
    color: #ccc;
    cursor: not-allowed;
  }
`

export {
  FilterWrapper,
  FilterButton
}