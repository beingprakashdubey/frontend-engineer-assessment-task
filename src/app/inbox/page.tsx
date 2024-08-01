"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Button, Menu, Modal, Form, Input, Image, Typography, Badge } from 'antd';
import style from "./home.module.scss";
import Logo from "../../../public/logo.png";
import ComposeIcon from "../../../public/pencil-square.svg";
import { useState } from "react";
import { addEmail, addStatus } from "../redux/emailSlice";
import type { RootState, AppDispatch } from "../redux/store";
import Link from "next/link";

const { TextArea } = Input;
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

export default function Page() {
    const dispatch: AppDispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.userData);
    const emailData = useSelector((state: RootState) => state.emailData.emails);
    const router = useRouter();
    // console.log(userData);
    if (userData.users.length <= 0) {
        router.push('/');
    }
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(true);
    const email = userData.users[0] ? userData.users[0].email : '';
    const from = userData.users[0] ? userData.users[0].email : '';
    const name = userData.users[0] ? userData.users[0].name : '';
    // console.log(userData.users[0].email);


    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        dispatch(addEmail({ to, from, subject, message, status }));
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        // console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleRead = (id: string, index: number) => {
        const status = false; 
        dispatch(addStatus({ id, status }));
    };
    const handleUnRead = (id: string, index: number) => {
        const status = true; 
        dispatch(addStatus({ id, status }));
    };
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
    const sortedEmails = emailData.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


    return (
        <>
            <Layout className={style.layoutStyleone}>
                <Header className={style.header}>
                    <div className={style.logo}>
                        <Image src={Logo.src} alt="Logo" preview={false}  />
                    </div>
                    <div className={style.dummySearch}></div>
                    <div className={style.userdetails}><Title level={4}>Welcome, {name}</Title></div>
                </Header>
                <Layout>
                    <Sider width={273.5} className={style.sider}>
                        <Menu className={style.menu}>

                            <Menu.Item key="1" onClick={showModal} className={style.composeButton}><Image src={ComposeIcon.src} alt="Compose Icon" /> Compose Email</Menu.Item>
                            <Menu.Item key="2">Inbox <Badge count={sortedEmails.length > 0 ? sortedEmails.length : ''}></Badge></Menu.Item>
                            {/* <Menu.Item key="2">{email}</Menu.Item> */}
                        </Menu>
                    </Sider>
                    <Content className={style.contentarea}>
                        <Title level={1}>Inbox <small>{email}</small></Title>
                        <div className={style.emailMain}>
                            <ul>
                                {sortedEmails.length > 0 ?
                                    sortedEmails.map((item, index) => (
                                        <li key={index}>
                                            <Link href={`/inbox/emails?id=${item.id}`} className={item.status ? style.unread : style.readed}  onClick={() => item.status ? handleRead(item.id, index) : ''}>
                                                    <span>{item.to.split('@')[0]}</span>
                                                    <span>{item.subject}</span>
                                                    <span>{item.message}</span>
                                                    <span>{formatDateTime(item.date)}</span>
                                                    
                                            </Link>
                                            <span  onClick={() => item.status ? handleRead(item.id, index) : handleUnRead(item.id, index)}>
                                                {item.status ? "Mark as read" : "Mark as unread"}
                                            </span>
                                        </li>
                                    ))
                                    :
                                    <li>No emails found</li>
                                }
                            </ul>
                        </div>
                    </Content>
                </Layout>
                <Footer>Footer content</Footer>
            </Layout>

            <Modal
                title="Compose Email"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form>
                    <Form.Item label="To" name="to">
                        <Input value={to} onChange={(e) => setTo(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Subject" name="subject">
                        <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Message" name="message">
                        <TextArea value={message} onChange={(e) => setMessage(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
