import styled from 'styled-components'

export const BtnBorder  = styled.button`
padding: 0.5em 1em;
font-size: ${props => props.fontSize || '1em'};
margin-left: ${props => props.marginLeft || '0'};
border-radius: 15px;
background-color: transparent;
color: ${props => props.color};
border: 2px solid ${props => props.borderColor};
`