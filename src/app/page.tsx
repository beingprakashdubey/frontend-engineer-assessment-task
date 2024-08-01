"use client"
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import style from './page.module.scss';
import { useDispatch, useSelector } from "react-redux";
import {addUser} from "./redux/userSlice"
import { useRouter } from 'next/navigation';
import type { RootState, AppDispatch } from "./redux/store";

export default function Page() {
    const dispatch = useDispatch();
    const router = useRouter();
    type FieldType = {
        email?: string;
        name?: string;
    };
    const userData = useSelector((state: RootState) => state.userData);
    // console.log(userData);
    if (userData.users.length> 0) {
        router.push('/inbox');
    }
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const { email = '', name = '' } = values;
        let result =     dispatch(addUser({ email, name }));
        // console.log(values);
        if(result){
            router.push('/inbox');
        }
    };

    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Flex className={style.height100} justify={'center'} align={'center'}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                <Form.Item<FieldType>
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input type="email" />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                </Flex>
            </>
            )
}