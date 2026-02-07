import * as React from "react";
import { 
    Html, 
    Head, 
    Preview, 
    Body, 
    Container, 
    Section, 
    Text 
} from "@react-email/components";

interface VerificationEmailProps {
    username: string;
    otp: string;
}

export const VerificationEmail: React.FC<VerificationEmailProps> = ({ username, otp }) => (
    <Html>
        <Head />
        <Preview>Your verification code for Icognito Messaging</Preview>
        <Body style={{ backgroundColor: "#f6f9fc", fontFamily: "Arial, sans-serif" }}>
            <Container style={{ maxWidth: "600px", margin: "40px auto", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", padding: "32px" }}>
                <Section>
                    <Text style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
                        Welcome to Icognito Messaging, {username}!
                    </Text>
                    <Text style={{ fontSize: "16px", marginBottom: "24px" }}>
                        We are excited to have you join our community. To complete your registration, please use the verification code below:
                    </Text>
                    <Section style={{ textAlign: "center", margin: "32px 0" }}>
                        <Text style={{ fontSize: "32px", fontWeight: "bold", letterSpacing: "6px", color: "#0070f3" }}>
                            {otp}
                        </Text>
                    </Section>
                    <Text style={{ fontSize: "14px", color: "#555" }}>
                        If you did not request this, please ignore this email.
                    </Text>
                    <Text style={{ fontSize: "14px", color: "#888", marginTop: "32px" }}>
                        Best regards,<br />
                        The Icognito Messaging Team
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default VerificationEmail;