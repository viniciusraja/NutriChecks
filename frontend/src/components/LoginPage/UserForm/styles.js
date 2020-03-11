import styled from 'styled-components';

export const Container = styled.div`
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  display:flex;
  flex-direction:column;
  align-items:center;
  
img{
  display:flex;
  width:50%;
  align-items:center;
}
div{
  display:flex;
  flex-direction:column;
  margin-bottom:10px;
}
span{
  display:flex;
  flex-direction:row;
  width:100%;
  justify-content:space-evenly;
  
}
h1{
  margin-top:20px;
  font-weight:400;
  color:grey;
}

`;
