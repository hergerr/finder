import React from 'react';
import styled from 'styled-components';
import { LocationPin } from '@styled-icons/entypo';
import { Books } from '@styled-icons/icomoon/Books';
import { Calendar } from '@styled-icons/boxicons-regular/Calendar';
import { SearchButton } from '../components/search-button.component';
 
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
    margin-top: 100px;
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: space-evenly;

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

const WhiteBorder = styled.div`
    background-color: white;
    width: 100%;
    height: 5px;
`

const DescriptionContainer = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
`

const DescriptionTitle = styled.h6`
    margin-top: 120px;
    font-weight: 100;
    font-size: 30px;
    width: 50%;
    text-align: center;
`

const Features = styled.div`
    margin-top: 80px;
    font-size: 19px;
    width: 50%;

    ul {
        li {
            list-style: none;
            line-height: 40px;
        }
    }
`

const ContactContainer = styled.div`
    width: 100%;
    background-color: white;
    height: 400px;
`

const ContactTitle = styled.h3`
    font-size: 40px;
    text-align: center;
    font-weight: 100;
    margin-top: 30px;
`

const ContactContentWrapper = styled.div`
    display:flex;
    width: 100%;
    height: 300px;
`

const Phone = styled.div`
    margin-top: 100px;
    font-size: 30px;
    width: 50%;
    text-align:center;

`

const FormWrapper = styled.form`
    display: flex;
    flex-direction:column;
    margin-top: 60px;
    margin: 0 auto;
    align-items: center;

    button {
        float: right;
        text-align: right;
    }
`

const TextArea = styled.textarea`
    width: 300px;
    height: 200px;
    margin-bottom: 10px;
`

export const MateDetailPage = (props) => {


    return (
        <Container>

            <Title>Peacuful IT student</Title>
            <PhotoWrapper>
                <Photo src={props.src} />
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

            <WhiteBorder />

            <DescriptionContainer>
                <DescriptionTitle>
                    Features
                </DescriptionTitle>

                <Features>
                    <ul>
                        <li>peacuful</li>
                        <li>quiet</li>
                        <li>gaming</li>
                        <li>cycling</li>
                    </ul>
                </Features>
            </DescriptionContainer>

            <WhiteBorder />


            <DescriptionContainer>
                <DescriptionTitle>
                    Customs
                </DescriptionTitle>

                <Features>
                    <ul>
                        <li>no smoking </li>
                        <li>no partying</li>
                        <li>wakes up at 11-12</li>
                        <li>goes to bed 23-24</li>
                    </ul>
                </Features>
            </DescriptionContainer>

            <ContactContainer>
                <ContactTitle>Contact</ContactTitle>

                <ContactContentWrapper>
                    <Phone>645 564 ***</Phone>
                    <FormWrapper>
                        <TextArea />
                        <SearchButton>Send</SearchButton>
                    </FormWrapper>
                </ContactContentWrapper>
            </ContactContainer>
        </Container>
    )
}