import styled from 'styled-components'
export default styled.div`
.electroTitle{
   display: flex;
   justify-content: center;
   align-items: center;
   color: white;
}
.logo__bg{
   background: white;
   text-align: center;
   padding: 10px 10px;
   margin-bottom: 10px;
}
.ant-layout-sider{
      ::-webkit-scrollbar {
         width: 3px;
         @media(max-width: 992px){
         }
      }
      /* Track */
      ::-webkit-scrollbar-track {
         background: black;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
         opacity: 0;
      }
}


`