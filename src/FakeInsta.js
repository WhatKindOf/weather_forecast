import React from "react";
import styled, { css } from "styled-components";

class FakeInsta extends React.Component {
  getLocalStorageItem = key => {
    console.log(localStorage.getItem(key));
    return localStorage.getItem(key);
  };
  render() {
    return (
      <Div>
        <UpperDiv>
          <ProfileImageDiv>
            <ProfileImage src={this.getLocalStorageItem("src")} alt="profile" />
          </ProfileImageDiv>
          <ProfileDiv>
            <AccountSpan>
              {this.getLocalStorageItem("Account")}
              <Pencil>
                <img src={require("./images/pencil.png")} alt="pencil" />
              </Pencil>
            </AccountSpan>
            <TitleSpan>
              {this.getLocalStorageItem("Title")}
              <Pencil>
                <img src={require("./images/pencil.png")} alt="pencil" />
              </Pencil>
            </TitleSpan>
            <NicknameSpan>
              {this.getLocalStorageItem("Nickname")}
              <Pencil>
                <img src={require("./images/pencil.png")} alt="pencil" />
              </Pencil>
            </NicknameSpan>
            <Link href="http://www.lovers2019.com/" target="_blank">
              {this.getLocalStorageItem("Link")}
              <Pencil>
                <img src={require("./images/pencil.png")} alt="pencil" />
              </Pencil>
            </Link>
          </ProfileDiv>
        </UpperDiv>
        <MidDiv>
          <Content>게시물</Content>
          <ContentCount>155</ContentCount>
        </MidDiv>
        <LowerDiv>
          <RowDiv>
            <PictureDiv right="10px">
              <PictureImg src={require("./images/first.png")} alt="first" />
            </PictureDiv>
            <PictureDiv right="10px">
              <PictureImg src={require("./images/second.png")} alt="second" />
            </PictureDiv>
            <PictureDiv>
              <PictureImg src={require("./images/third.png")} alt="third" />
            </PictureDiv>
          </RowDiv>
        </LowerDiv>
      </Div>
    );
  }
}

const Div = styled.div`
  position: absolute;
  height: 93%;
  width: 100%;
  display: flex;
  flex-direction: column;
  jusify-content: center;
  align-items: center;
`;

const UpperDiv = styled.div`
  height: 30%;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const ProfileImageDiv = styled.div`
  width: 40%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: auto;
  height: auto;
  max-width: 70%;
  max-height: 95%;
`;

const ProfileDiv = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  aling-items: flex-start;
`;

const Pencil = styled.button`
  margin-left: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  position: absolute;
`;

const AccountSpan = styled.span`
  color: white;
  font-size: 3vmin;
  margin-bottom: 15px;
  font-weight: bold;
`;

const TitleSpan = styled.span`
  color: white;
  font-size: 2vmin;
  font-weight: bold;
`;

const NicknameSpan = styled.span`
  color: rgba(38, 38, 38);
  font-size: 2vmin;
  margin-top: 7px;
  font-weight: bold;
`;

const Link = styled.a`
  font-size: 2vmin;
  margin-top: 7px;
  cursor: pointer;
  text-decoration: none; !important
`;

const MidDiv = styled.div`
  height: 10%;
  width: 65%;
  display: flex;
  background-color: #5678d4;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 5px 5px #48c0d0, 0px -5px 5px 5px #48c0d0;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Content = styled.span`
  font-size: 2vmin;
  color: rgba(38, 38, 38);
`;

const ContentCount = styled.span`
  font-size: 2vmin;
  color: rgba(38, 38, 38);
  font-weight: bold;
`;

const LowerDiv = styled.div`
  height: 60%;
  width: 65%;
  display: flex;
  flex-direction: column;
  padding: 35px 5px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none !important;
  }
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const PictureDiv = styled.div`
  width: auto;
  height: auto;
  max-width: 350px;
  max-height: 250px;
  ${props => {
    if (props.right === "10px") {
      return css`
        margin-right: 10px;
      `;
    }
  }}
`;

const PictureImg = styled.img`
  width: 100%;
  height: 100%;
`;

export default FakeInsta;
