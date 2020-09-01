import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { SRLWrapper } from "simple-react-lightbox";
import { withRouter } from "react-router-dom";
import { Coins } from '@styled-icons/fa-solid';
import { Area } from '@styled-icons/boxicons-regular';
import { LocationPin } from '@styled-icons/entypo';
import { ContactBox } from '../components/contact-box.component';
import { DetailBlock, WhiteBorder } from '../components/detail-block.component';
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
    justify-content: center;
`

const Image = styled.img`
    max-height: 400px;
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
        this.state = { data: [] };
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/room_offer_detail/${this.props.match.params.offerId}`).then(res => {
            if (res.status === 200) {
                this.setState({ data: res.data });
            }
        })

    }

    render() {

        // TODO
        // cannot fetch before loading
        let building = this.state.data.building_features;
        let flat = this.state.data.flat_features;
        let flatmates = this.state.data.flatmates_features;
        let rules = this.state.data.rules;
        let photos = this.state.data.photos;
        if (flat && building && flatmates && rules && photos) {
            building = building.split(';');
            flat = flat.split(';');
            flatmates = flatmates.split(';');
            rules = rules.split(';');
            photos = photos.map((element, index) => (
                <Image src={`${static_host}${element.image}`} alt={index} key={index} />
            ));
        } else {
            building = [];
            flat = [];
            flatmates = [];
            rules = [];
        }

        let gallery;
        if (photos){
            gallery = <SRLWrapper>
                {photos}
            </SRLWrapper>
        }

        return (
            <Container>
                <Title>{this.state.data.title}</Title>
                <PhotoWrapper>
                {gallery}
                </PhotoWrapper>
                <Essentials>
                    <IconAndDescContainer>
                        <StyledCoin />
                        <p>{this.state.data.price}PLN/month</p>
                    </IconAndDescContainer>
                    <IconAndDescContainer>
                        <StyledArea />
                        <p>{this.state.data.area} m2</p>
                    </IconAndDescContainer>
                    <IconAndDescContainer>
                        <Location />
                        <p>{this.state.data.location}</p>
                    </IconAndDescContainer>
                </Essentials>


                <DetailBlock title="Building" features={building} />
                <WhiteBorder />
                <DetailBlock title="Flat" features={flat} />
                <WhiteBorder />
                <DetailBlock title="Flatmates" features={flatmates} />
                <WhiteBorder />
                <DetailBlock title="Rules" features={rules} />

                <ContactBox phone={this.state.data.phone} receiver={this.state.data.owner} subject={this.state.data.title}/>
            </Container>
        )
    }
}

export default withRouter(RoomDetailPage)