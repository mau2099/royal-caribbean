import { FormControl as FormControlMUI } from "@mui/material";
import styled from 'styled-components';

export const StyledForm = styled.form`
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const FormControl = styled(FormControlMUI)`
  && {
    margin: 0 1em;
  }
`