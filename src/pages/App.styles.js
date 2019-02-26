import styled from 'styled-components';

export const Button = styled.div`
  /* Adapt the colors based on primary prop */
  background: #FFF;
  color: #FF5B2D;

  font-size: 1em;
  margin: 1em;
  width: fit-content;
  padding: 0.25em 1em;
  border: 2px solid #FF5B2D;
  border-radius: 3px;
`;

export const Item = styled.div`
  /* Adapt the colors based on primary prop */
  background: ${props => props.itemColor ? props.itemColor : '#f2f4f7'};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border:  ${props => props.itemColor ? '#fff' : `2px solid ${props.itemColor}`};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
`;

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  width: 50%;
  color: ${props => props.inputColor || "palevioletred"};
  background: #fff;
  border: 2px solid #FF5B2D;
  border-radius: 3px;
  font-size: 1rem;
`;

export const Container = styled.div`
  margin: 0;
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  font-family: Source Sans Pro,sans-serif;
  background: #f2f4f7;
`

export const CenteringContainer = styled.div`
  margin: auto;
  width: 90%;
  padding: 10px;

  display: flex;
  flex-direction: ${props => props.flexDirection ? props.flexDirection : 'column'};
  align-items: ${props => props.alignItems ? props.alignItems : 'center'};

  background: ${props => props.background ? props.background : '#FFF'};
  border-radius: 6px;
  box-shadow: ${props => props.flexDirection ? '' : '0 2px 6px 0 rgba(23,25,30,0.05)'}; ;
`

export const TextBox = styled.div`
  color: ${props => props.fontColor ? props.fontColor : '#2e2e2e'};
  font-size: ${props => props.fontSize ? props.fontSize : '2rem'};
  padding: 10px 0;
  word-wrap: break-word;
`

export const TextBoxStatus = styled(TextBox)`
  word-break: break-word;
`

export const AHref = styled.a`
  word-wrap: break-word;
  width: 80%;
  color: #aeaeae;
  font-size: 1rem;
  padding: 10px 0;
`