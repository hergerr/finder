import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { LocationPin } from '@styled-icons/entypo';
import { Books } from '@styled-icons/icomoon/Books';
import { Calendar } from '@styled-icons/boxicons-regular/Calendar';
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

const Photo = styled.img`

    margin: 0 auto;
    height: 400px;
    object-fit: cover;
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

const Location = styled(LocationPin)`
    color: black;
    height: 30px;
`

const Study = styled(Books)`
    color: black;
    height: 30px;
`

const Birth = styled(Calendar)`
    color: black;
    height: 30px;
`


class MateDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: {}}
    }

    componentDidMount(){

        axios.get(`http://localhost:8000/room_offer_detail/${this.props.match.params.offerId}`).then(res => {
            if (res.status === 200) {
                this.setState({ data: res.data });
                console.log(this.state.data);
            }
        })
    }

    render() {
        return (
            <Container>

                <Title>Peacuful IT student</Title>
                <PhotoWrapper>
                    <Photo src={this.state.src} />
                </PhotoWrapper>

                <Essentials>

                    <IconAndDescContainer>
                        <Birth />
                        <p>22</p>
                    </IconAndDescContainer>

                    <IconAndDescContainer>
                        <Location />
                        <p>Krzyki</p>
                    </IconAndDescContainer>

                    <IconAndDescContainer>
                        <Study />
                        <p>Computer Science</p>
                    </IconAndDescContainer>
                </Essentials>

                <DetailBlock title="Features" features={['peacuful','peacuful','peacuful','peacuful','peacuful','peacuful']}/>
                <WhiteBorder/>
                <DetailBlock title="Customs" features={['peacuful','peacuful','peacuful','peacuful','peacuful','peacuful']}/>

                <ContactBox/>
            </Container>
        )
    }

}

export default withRouter(MateDetailPage);