import styled from 'styled-components';
import { Trash } from '@styled-icons/boxicons-regular/Trash';
import { Edit } from '@styled-icons/boxicons-regular/Edit';

export const Checkbox = styled.input`
    margin-left: 30px;
    align-self: center;
`
export const StyledTrash = styled(Trash)`
    height: 30px;
    margin-right: 30px;
`

export const StyledEdit = styled(Edit)`
    height: 30px;
    margin-right: 15px;
`