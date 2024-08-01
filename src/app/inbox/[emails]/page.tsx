"use client";

import { useSelector } from "react-redux";
import { Layout, Button, Menu, Modal, Form, Input, Image, Typography } from 'antd';
import style from "../home.module.scss";
import type { RootState } from "../../redux/store"; // Adjust the import path according to your project structure
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams from next/navigation
import { useEffect, useState } from "react";
import Logo from "../../../../public/logo.png";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";

const { Title, Paragraph } = Typography;
const { Header, Footer, Content } = Layout;

type Email = {
    id: string;
    to: string;
    from: string;
    subject: string;
    message: string;
    date: string;
    status: boolean;
};

export default function EmailDetail() {
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const [email, setEmail] = useState<Email | null>(null);
    const emailData = useSelector((state: RootState) => state.emailData.emails);
    const userData = useSelector((state: RootState) => state.userData);
    const name = userData.users[0] ? userData.users[0].name : '';
    // console.log(emailData);
    if (userData.users.length <= 0) {
        router.push('/');
    }
    useEffect(() => {
        const id = searchParams.get('id'); 
        if (id) {
            const foundEmail = emailData.find((email) => email.id === id);
            setEmail(foundEmail ?? null);
        }
    }, [searchParams, emailData]);
    // console.log(email);
    
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);

        // Format date as YYYY-MM-DD
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        // Format time as 12-hour clock with AM/PM
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedTime = `${hours}:${minutes} ${ampm}`;

        return `${formattedDate} ${formattedTime}`;
    };
    if (!email) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Layout className={style.layoutStyleone}>
                <Header className={style.header}>
                    <Image src={Logo.src} alt="Logo" preview={false} />
                    <div className={style.dummySearch}></div>
                    <div className={style.userdetails}><Title level={4}>Welcome, {name}</Title></div>
                </Header>
                <Layout>
                    <Sider width={273.5} className={style.sider}>
                        <Menu className={style.menu}>

                            {/* <Menu.Item key="1" >Compose Email</Menu.Item> */}
                            <Menu.Item key="2" ><Link href={'/inbox'}>Inbox</Link> </Menu.Item>
                            {/* <Menu.Item key="2">{email}</Menu.Item> */}
                        </Menu>
                    </Sider>
                    <Content className={style.contentarea}>
                        {/* <Title level={1}>Inbox <small>{email}</small></Title> */}
                        <div className={style.emailMain}>
                            <ul>
                            <Title level={2}>{email.subject}</Title>
                            <Paragraph><strong>From:</strong> {email.from}</Paragraph>
                            <Paragraph><strong>To:</strong> {email.to}</Paragraph>
                            <Paragraph><strong>Date:</strong> {formatDateTime(email.date)}</Paragraph>
                            <Paragraph><strong>Message:</strong> {email.message}</Paragraph>
                            </ul>
                        </div>
                    </Content>
                </Layout>
                <Footer>Footer content</Footer>
            </Layout>


        </>
    );
}
