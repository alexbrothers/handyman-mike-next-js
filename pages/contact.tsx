import { Typography, Box, TextField, Button, Snackbar, Alert, CircularProgress } from "@mui/material";
import SectionContainer from "../components/SectionContainer";
import SectionHeader from "../components/SectionHeader";
import { GetStaticProps } from 'next'
import React from "react";
import validator from 'validator';
import Head from 'next/head';
import { ContactContent } from "../utils/types";
import { ContentfulClientFactory } from "../lib/contentful";
import Seo from "../components/Seo";

interface FormErrors {
    name: boolean,
    email: boolean,
    message: boolean,
}

export default function Contact(props: ContactContent) {
    const [nameValue, setNameValue] = React.useState<string>('');
    const [emailValue, setEmailValue] = React.useState<string>('');
    const [messageValue, setMessageValue] = React.useState<string>('');
    const [formErrors, setFormErrors] = React.useState<FormErrors>({
        name: false,
        email: false,
        message: false,
    });
    const [formSubmittedSuccess, setFormSubmittedSuccess] = React.useState<Boolean>(false);
    const [formSubmittedError, setFormSubmittedError] = React.useState<Boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
        setFormSubmittedSuccess(false);
        setFormSubmittedError(false);
    }

    const handleNameChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setNameValue(e.currentTarget.value);
    }

    const handleEmailChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setEmailValue(e.currentTarget.value);
    }

    const handleMessageChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMessageValue(e.currentTarget.value);
    }

    const isFormError = (errors: FormErrors) => {
        return errors.name || errors.email || errors.message;
    }

    const clearFormErrors = () => {
        setFormErrors({
            name: false,
            email: false,
            message: false,
        });
    }

    const resetForm = () => {
        setNameValue('');
        setEmailValue('');
        setMessageValue('');
    }

    const validateForm = (): FormErrors => {
        const formErrors: FormErrors = {
            name: false,
            email: false,
            message: false,
        }
        if (validator.isEmpty(nameValue, {ignore_whitespace: true})) {
            formErrors.name = true;
        }
        if (validator.isEmpty(emailValue, {ignore_whitespace: true}) || !validator.isEmail(emailValue)) {
            formErrors.email = true;
        }
        if (validator.isEmpty(messageValue, {ignore_whitespace: true})) {
            formErrors.message = true;
        }

        return formErrors;
    }

    const handleSubmit = async () => {
        const errors = validateForm();
        if (!isFormError(errors)) {
            clearFormErrors();
            try {
                setIsLoading(true);
                const response = await fetch('api/contact', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: nameValue,
                        email: emailValue,
                        message: messageValue,
                    })
                });
                const responseJson = await response.json();
                if (response.status !== 200) {
                    throw new Error(responseJson.message);
                }
                setFormSubmittedSuccess(true);
                resetForm();
            } catch (e: any) {
                console.log("unable to send email to server ", e.message);
                setFormSubmittedError(true);
            } finally {
                setIsLoading(false);
            }
        }
        else {
            setFormErrors(errors);
        }
    }

    return (
        <>
            <Seo title={props.seo.title} description={props.seo.description} page="contact" />
            <SectionContainer>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    rowGap: "30px"
                }}>
                    <SectionHeader name={props.header} component="h1" underline={false} />
                    <Typography paragraph>
                        {props.slug}
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        rowGap: "10px",
                        width: {
                            xs: "100%",
                            md: "75%",
                        },
                        margin: "auto",
                    }}>
                        <TextField 
                            id="name" 
                            label="Name" 
                            variant="filled" 
                            sx={{width: "100%"}}
                            required
                            onChange={handleNameChange}
                            error={formErrors.name}
                            value={nameValue}
                        />
                        <TextField 
                            id="email" 
                            label="Email" 
                            variant="filled" 
                            sx={{width: "100%"}}
                            required
                            onChange={handleEmailChange}
                            error={formErrors.email}
                            value={emailValue}
                        />
                        <TextField 
                            id="message" 
                            label="Message" 
                            variant="filled" 
                            multiline 
                            rows={7}
                            sx={{width: "100%"}}
                            required
                            onChange={handleMessageChange}
                            error={formErrors.message}
                            value={messageValue}
                        />
                        <Button 
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            Submit
                        </Button>
                        {isLoading && (
                            <CircularProgress
                                size={50}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                </Box>
                {formSubmittedSuccess && (
                    <Snackbar open autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                            Contact form submitted.
                        </Alert>
                    </Snackbar>
                )}
                {formSubmittedError && (
                    <Snackbar open autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                            An error occurred submitting the contact form.
                        </Alert>
                    </Snackbar>
                )}
            </SectionContainer>
        </>
    )
}

export const getStaticProps: GetStaticProps = async context => {
    const contentfulClient = await ContentfulClientFactory.getInstance();
    try {
        const contactContent: ContactContent = await contentfulClient.getContactContent();
        return {
          props: contactContent
        }
    } catch(e: any) {
        console.log(`error retrieving contact content from contentful: ${e.message}`);
        throw e;
    }
}