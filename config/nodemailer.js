import nodemailer from 'nodemailer';

const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mehmedmuric22@gmail.com",
        pass: EMAIL_PASSWORD

    }
});