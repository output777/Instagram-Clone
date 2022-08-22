import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Test from "../assets/test.jpg"
import { AiOutlineHeart } from "react-icons/ai";
import { IoChatbubbleOutline, IoPaperPlaneOutline, IoBookmarkOutline } from "react-icons/io5";
import { VscSmiley } from "react-icons/vsc";
import { __getComments, __getInstas, __postComments, __postInstas } from "../redux/modules/InstaSlice";
import PostDetail from "./PostDetail";

const MainPost = ({ insta }) => {

    const dispatch = useDispatch();

    // 모달 구현
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    }
    
    // 댓글 POST
    const [comment, setComment] = useState({
        content: "",
    })

    // comment POST, GET 구현
    useEffect(() => {
        dispatch(__getComments());
    }, [dispatch]);

    const { content } = comment;

    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        setComment({
            ...comment,
            [name]: value,
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(__postComments(comment))
    }

    return (
<<<<<<< HEAD
        <>
            <PostContainer onSubmit={onSubmitHandler}>
            {modalOpen && <PostDetail setModalOpen={setModalOpen}/>}
                <PostHeader>
                    <FirstHeader>
                        <UserImg />
                        <UserLabel>user_name</UserLabel>
                    </FirstHeader>
                    <BiDotsHorizontalRounded style={{ paddingRight: "15px" }} />
                </PostHeader>
                <PostImg />
                <LikeFirstBar>
                    <LikeBarSection>
                        <AiOutlineHeart size="30" style={{ cursor: "pointer" }} />
                        <IoChatbubbleOutline
                            size="28" style={{ cursor: "pointer" }}
                            onClick={showModal}
                        />
                        <IoPaperPlaneOutline size="28" style={{ cursor: "pointer" }} />
                    </LikeBarSection>
                    <IoBookmarkOutline size="27" style={{ paddingRight: "10px", cursor: "pointer" }} />
                </LikeFirstBar>
                <LikeSecondBar>
                    <UserLikeImg />
                    <UserLikeLable>
                        00명이 좋아합니다.
                    </UserLikeLable>
                </LikeSecondBar>
                <ContentWrap>
                    <ContentFirstSection>
                        <UserLabel>user_name</UserLabel>
                        <PostContent>{insta.content}</PostContent>
                    </ContentFirstSection>
                    <CommentCount>
                        댓글 0개 보기
                    </CommentCount>
                    <ContentTime>
                        예시: 6시간 전
                    </ContentTime>
                </ContentWrap>
                <CommentWrap>
                    <CommentFirstSection>
                        <VscSmiley size="26" style={{ padding: "0 10px" }} />
                        <CommentInput
                            type="text"
                            name="content"
                            value={content}
                            onChange={onChangeHandler}
                        />
                    </CommentFirstSection>
                    {/* <UploadLable>게시</UploadLable> */}
                    <UploadButton>게시</UploadButton>
                </CommentWrap>
            </PostContainer>
            
            </>
=======
        <PostContainer onSubmit={onSubmitHandler}>
            <PostHeader>
                <FirstHeader>
                    <UserImg />
                    <UserLabel>user_name</UserLabel>
                </FirstHeader>
                <BiDotsHorizontalRounded style={{ paddingRight: "15px" }} />
            </PostHeader>
            <PostImg />
            <LikeFirstBar>
                <LikeBarSection>
                    <AiOutlineHeart size="30" style={{ cursor: "pointer" }} />
                    <IoChatbubbleOutline
                        size="28" style={{ cursor: "pointer" }}
                    />
                    <IoPaperPlaneOutline size="28" style={{ cursor: "pointer" }} />
                </LikeBarSection>
                <IoBookmarkOutline size="27" style={{ paddingRight: "10px", cursor: "pointer" }} />
            </LikeFirstBar>
            <LikeSecondBar>
                <UserLikeImg />
                <UserLikeLable>
                    00명이 좋아합니다.
                </UserLikeLable>
            </LikeSecondBar>
            <ContentWrap>
                <ContentFirstSection>
                    <UserLabel>user_name</UserLabel>
                    <PostContent>{insta.content}</PostContent>
                </ContentFirstSection>
                <CommentCount>
                    댓글 0개 보기
                </CommentCount>
                <ContentTime>
                    예시: 6시간 전
                </ContentTime>
            </ContentWrap>
            <CommentWrap>
                <CommentFirstSection>
                    <VscSmiley size="26" style={{ padding: "0 10px" }} />
                    <CommentInput
                        type="text"
                        name="content"
                        value={content}
                        onChange={onChangeHandler}
                    />
                </CommentFirstSection>
                {/* <UploadLable>게시</UploadLable> */}
                <UploadButton>게시</UploadButton>
            </CommentWrap>
        </PostContainer>
>>>>>>> e83c928b7d6c3ef691a3c6bfb1bee9a6bcab0229
    )
}

export default MainPost;

const PostContainer = styled.form`
    width: 470px;
    height: 811px;
    border: 1px solid rgb(219,219,219);
    border-radius: 10px;
    margin-top: 25px;
`

const PostHeader = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const FirstHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 10px;
    /* gap: 10px; */
`
const UserImg = styled.div`
    border: 1px solid rgb(219,219,219);
    border-radius: 50px;
    width: 32px;
    height: 32px;
`
const UserLabel = styled.div`
    padding-left: 12px;
    font-weight: bold;
    font-size: 17px;
`
const PostImg = styled.div`
    width: 100%;
    height: 525px;
    background-Image: url(${Test});
    background-position: center;
    background-size: 100% 100%;
`

const LikeFirstBar = styled.div`
    width: 100%;
    height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const LikeBarSection = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
`
const LikeSecondBar = styled.div`
    width: 100%;
    height: 24px;
    display: flex;
    padding: 10px 0;
    
`

const UserLikeImg = styled.div`
    border: 1px solid rgb(219,219,219);
    border-radius: 50px;
    width: 20px;
    height: 20px;
    margin: 0 15px;
`

const UserLikeLable = styled.div`
    font-size: 16px;
`

const ContentWrap = styled.div`
    width: 100%;
    height: 90px;
    /* padding: 0 15px; */
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    gap: 8px;
`

const PostContent = styled.div`
    font-size: 16px;
`
const ContentFirstSection = styled.div`
    display: flex;
    gap: 10px;
`
const CommentCount = styled.div`
    padding-left: 12px;
    font-size: 15px;
    color: #8e8e8e;
`

const ContentTime = styled.div`
    padding-left: 12px;
    font-size: 12px;
    color: #8e8e8e;
`

const CommentWrap = styled.div`
    border-top: 1px solid rgb(219,219,219);
    /* width: 100%; */
    height: 49px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CommentFirstSection = styled.div`
    display: flex;
    align-items: center;
`

const CommentInput = styled.input`
    border: none;
    outline: none;
    width: 330px;
    height: 16px;
    font-size: 14px;
`

const UploadButton = styled.button`
    background-color: transparent;
    color: #0095f6;
    padding-right: 14px;
    font-size: 14px;
    border: none;
    cursor: pointer;
`