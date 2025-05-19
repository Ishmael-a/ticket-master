import React from 'react';
import { Html, Head, Body, Tailwind, Container, Section, Text, Button } from "@react-email/components"

interface EmailPasswordResetProps{
    toName: string;
    url: string
}

const EmailPasswordReset = ({toName, url}: EmailPasswordResetProps) => {
  return (
    <Html>
        <Head/>
        <Tailwind>
            <Body className="font-sans m-8 text-center">
                <Container>
                    <Section>
                        <Text>
                            Hello {toName}, you have requested to reset your password. Click on the below button to reset your password.
                        </Text>
                    </Section>
                    <Section>
                        <Button href={url} className='bg-black rounded text-white p-2 m-2'>
                            Reset Password
                        </Button>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
  )
}

export default EmailPasswordReset;
