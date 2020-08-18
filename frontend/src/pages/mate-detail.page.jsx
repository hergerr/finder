import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { LocationPin } from '@styled-icons/entypo';
import { Books } from '@styled-icons/icomoon/Books';
import { Calendar } from '@styled-icons/boxicons-regular/Calendar';
import { ContactBox } from '../components/contact-box.component'; 
import { DetailBlock, WhiteBorder} from '../components/detail-block.component';
import { static_host } from '../assets/global-settings';

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

        axios.get(`http://localhost:8000/mate_offer_detail/${this.props.match.params.offerId}`).then(res => {
            if (res.status === 200) {
                this.setState({ data: res.data });
            }
        })
    }

    render() {
        // TODO
        // cannot fetch before loading
        let features = this.state.data.features;
        let customs = this.state.data.customs
        if (features && customs){
            features = features.split(';')
            customs = customs.split(';')
        } else {
            features = [];
            customs = [];
        }

        return (
            <Container>

                <Title>{this.state.data.title}</Title>
                <PhotoWrapper>
                    <Photo src={`${static_host}${this.state.data.image}`} />
                </PhotoWrapper>

                <Essentials>

                    <IconAndDescContainer>
                        <Birth />
                        <p>{this.state.data.age}</p>
                    </IconAndDescContainer>

                    <IconAndDescContainer>
                        <Location />
                        <p>{this.state.data.location}</p>
                    </IconAndDescContainer>

                    <IconAndDescContainer>
                        <Study />
                        <p>{this.state.data.field_of_study}</p>
                    </IconAndDescContainer>
                </Essentials>

                <DetailBlock title="Features" features={features}/>
                <WhiteBorder/>
                <DetailBlock title="Customs" features={customs}/>

                <ContactBox phone={this.state.data.phone} receiver={this.state.data.owner} subject={this.state.data.title}/>
            </Container>
        )
    }

}

export default withRouter(MateDetailPage);