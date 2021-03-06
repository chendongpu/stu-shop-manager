import  {React,useEffect,useState} from 'react'
import {Form,Card,Input,Button,Upload,message} from "antd"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {createApi,  oneApi,modifyOne} from "../../../services/products";
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};




function Edit(props){

    const [form] = Form.useForm();

    const [loading,setLoading]=useState(false);
    const [imageUrl,setImageUrl]=useState("");
    const [editorState,setEditorState]=useState( BraftEditor.createEditorState(null));

    useEffect(()=>{
        if(props.match.params.id){
            oneApi(props.match.params.id).then(res=>{
                console.log("res",res);
                form.setFieldsValue({name:res.product.name,price:res.product.price});
                setImageUrl(res.product.file);
                setEditorState(BraftEditor.createEditorState(res.product.content));
            })
        }
    },[]);

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            console.log("info",info.file.response);

            setImageUrl(info.file.response.file_name);
            setLoading(false);

        }
    };

    const handleEditorChange = (e) => {
        setEditorState(e)
    }


    const onFinish = values => {
        console.log('Success:', values);
        console.log('提交');
        console.log("editorState",editorState.toHTML());
        if(props.match.params.id){
            modifyOne(props.match.params.id,{...values,file:imageUrl,content:editorState.toHTML()}).then(res=>{
                props.history.push("/admin/products");
            }).catch(err=>{
                console.log(err);
            });
        }else{
            createApi({...values,file:imageUrl,content:editorState.toHTML()}).then(res=>{
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

                <Form.Item
                    label="主图">
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="/api/index.php/test/upload"
                        onChange={(info)=>handleChange(info)}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>


                <Form.Item
                    label="content">
                    <BraftEditor
                        value={editorState}
                        onChange={(e)=>handleEditorChange(e)}
                    />
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