import styled from "@emotion/styled";
import React, { useState } from "react";
import { Container } from "src/components/utils/Container";
import Header from "src/components/Header";
import Seperator from "src/components/utils/Seperator";
import { Button } from "src/styled/Components";
import Head from "next/head";
import { client } from "src/graphql/client";
import { bookQuery } from "src/graphql/books/book";
import { IBook, Role } from "@dl/shared";
import { motion } from "framer-motion";
import { observer } from "mobx-react";
import { userStore } from "src/state/UserStore";
import { GetServerSideProps } from "next";
import BookImage from "src/components/BookParts/BookImage"
import opacity from "src/framer/opacity";
import { manageStore } from "src/state/ManageBookStore";
import ManageUser from "src/components/Manage/ManageUser";

function id({ name, imageUrl, description }: IBook) {
    const [imgError, setImgError] = useState(false);

    function imageError() {
        setImgError(true);
    }

    return (
        <>
            <ManageUser />
            <Head>
                <title>Digital Library - {name}</title>
            </Head>
            <Header />
            <Container
                style={{ margin: "1.5rem 0 5rem" }}
                max="65rem"
                min="1px"
                value="100%"
            >
                <Card variants={opacity} animate="show" initial="hidden">
                    <BookImage src={imageUrl} />
                    <InfoContainer>
                        <CardHeader>{name}</CardHeader>
                        <Seperator margin="0" />
                        <CardDescription>{description}</CardDescription>
                        <ButtonWrapper>
                            <Button
                                style={{
                                    visibility:
                                        userStore.user.role == Role.Administrator
                                            ? "visible"
                                            : "hidden",
                                }}
                                onClick={e => manageStore.open()}
                            >
                                Manage
                            </Button>
                        </ButtonWrapper>
                    </InfoContainer>
                </Card>
            </Container>
        </>
    );
}

export default observer(id);

export const getServerSideProps: GetServerSideProps<IBook> = async ({ params }) => {
    const { data, error } = await client
        .query<{ book: IBook }>(bookQuery, {
            id: parseInt(params.id as string),
        }).toPromise();

    if (data?.book == null || error != null) return { notFound: true };

    return {
        props: data.book,
    };
};

const CardHeader = styled(motion.h1)({
    fontSize: "clamp(1.25rem, 5vw, 2.5rem)",
    marginBottom: "1rem",
    wordBreak: "break-all",
})

const CardDescription = styled(motion.p)({
    flexGrow: 1,
    wordBreak: "break-all",
})

const Card = styled(motion.div)({
    background: "#F3F3F3",
    borderRadius: ".4rem",
    display: "grid",
    width: "100%",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "0fr 2fr",
    img: {
        userSelect: "none",
        borderRadius: ".4rem 0 0 .4rem",
        width: "10rem",
        minWidth: "10rem",
        height: "100%",
        objectFit: "cover",
    },
    svg: {
        paddingLeft: "1rem",
        minWidth: "10rem",
        height: "100%",
    },
});

const ButtonWrapper = styled.div({
    display: "flex",
    justifyContent: "flex-end",
    button: {
        padding: "1rem 2rem",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        background: "white",
        color: "black",
        margin: "1rem",
    },
});

const InfoContainer = styled.div({
    margin: "1rem 1.5rem",
    display: "flex",
    minHeight: "12.5rem",
    flexDirection: "column"
});
