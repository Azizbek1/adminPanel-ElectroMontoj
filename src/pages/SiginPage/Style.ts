import styled from "styled-components";

export default styled.div`
  width: 400px;
  height: 80vh;
  margin: auto;
  display: flex;
  align-items: center;
  .auth-form {
    width: 100%;
    &__input {
      margin-bottom: 10px;
    }
  }
  .error {
    font-size: 14px;
    width: 100%;
    color: red;
    bottom: 0;
    z-index: 22;
  }
`;
