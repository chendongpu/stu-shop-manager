import  {React,useEffect,useState} from 'react'
import {Form,Card,Input,Button,message} from "antd"
import {createApi,  oneApi,modifyOne} from "../../../services/products";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};



function Edit(props){

    const [form] = Form.useForm();
    useEffect(()=>{
        if(props.match.params.id){
            oneApi(props.match.params.id).then(res=>{
                console.log("res",res);
                form.setFieldsValue({name:res.product.name,price:res.product.price});
            })
        }
    },[]);


    const onFinish = values => {
        console.log('Success:', values);
        console.log('提交');
        if(props.match.params.id){
            modifyOne(props.match.params.id,values).then(res=>{
                props.history.push("/admin/products");
            }).catch(err=>{
                console.log(err);
            });
        }else{
            createApi(values).then(res=>{
                props.history.push("/admin/products");
            }).catch(err=>{
                console.log(err);
            });
        }

    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        message.error('请输入正确的内容');
    };



    return (
        <Card title="商品编辑" extra={
            <Button onClick={()=>props.history.push("/admin/products")}>返回</Button>
        }>
            <Form
                form={form}
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="名字"
                    name="name"
                    rules={[{ required: true, message: '请输入商品名字!' }]}
                >
                    <Input placeholder="请输入商品名字" />
                </Form.Item>


                <Form.Item
                    label="价格"
                    name="price"
                    rules={[
                       // { required: true, message: '请输入商品价格!' },
                            {
                                validator: (_, value) =>{
                                    console.log("value",value);
                                    return value ? Promise.resolve() : Promise.reject(new Error('自定义规则，你应该输入商品价格'))
                                }

                            }
                        ]}

                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )

}
export default Edit