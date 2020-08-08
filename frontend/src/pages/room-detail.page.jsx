import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Coins } from '@styled-icons/fa-solid';
import { Area } from '@styled-icons/boxicons-regular';
import { LocationPin } from '@styled-icons/entypo';
import { ContactBox } from '../components/contact-box.component';
import { DetailBlock, WhiteBorder} from '../components/detail-block.component';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Title = styled.h3`
    text-align: left;
    font-weight: 700;
    font-size: 30px;
    padding: 30px;
`

const PhotoWrapper = styled.div`
    width: 100%;
    background-color: var(--color-dark-grey);
    height: 400px;
    display: flex;
`

const Essentials = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    background-color: white;
    justify-content: space-evenly;
    align-items: center;

    p {
        font-size: 30px;
        font-weight: 100;
    }
`

const IconAndDescContainer = styled.div`
    display: flex;
`

const StyledCoin = styled(Coins)`
    color: black;
    height: 30px;
`

const StyledArea = styled(Area)`
    color: black;
    height: 30px;
`
const Location = styled(LocationPin)`
    color: black;
    height: 30px;
`


class RoomDetailPage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Container>
                <Title>Spacious room in city</Title>
                <PhotoWrapper>

                </PhotoWrapper>
                <Essentials>
                    <IconAndDescContainer>
                        <StyledCoin/>
                        <p>1000PLN/month</p>
                    </IconAndDescContainer>
                    <IconAndDescContainer>
                        <StyledArea />
                        <p>13 m2</p>
                    </IconAndDescContainer>
                    <IconAndDescContainer>
                        <Location/>
                        <p>Dominicain Square</p>
                    </IconAndDescContainer>
                </Essentials>

               
                <DetailBlock title="Building" features={['peacuful','peacuful','peacuful','peacuful','peacuful','peacuful']}/>
                <WhiteBorder/>
                <DetailBlock title="Flat" features={['peacuful','peacuful','peacuful','peacuful','peacuful','peacuful']}/>
                <WhiteBorder/>
                <DetailBlock title="Flatmates" features={['peacuful','peacuful']}/>
                <WhiteBorder/>
                <DetailBlock title="Rules" features={['peacuful','peacuful','peacuful','peacuful','peacuful','peacuful']}/>

                <ContactBox/>
            </Container>
        )
    }
}

export default withRouter(RoomDetailPage)