import React,{useEffect,useState} from "react";
import {Button,Drawer,Form,Input} from "antd";
import {$add,$getone,$update}from './apis/dataApi';
export default function AddData({open,setOpen,handleSearch,deviceid,setdeviceid}){
    //定义表单实例
    let [form]=Form.useForm()
    let [editData,setEditData]=useState([])
    let [add, setAdd] = useState({
        "serial_number": '',  
        "device_id": '',  
        "Name": '',  
        "model": '',
        "location": {
            "latitude":null ,
            "longitude":null
          }, 
          "security": {
            "encryption_status": '',
          } 
      }); 
    useEffect(()=>{
        if(deviceid!==0){
            
            $getone(deviceid).then(data=>{
                data=data.data
                form.setFieldsValue({serial_number:data.SerialNumber})
                form.setFieldsValue({Name:data.Name})
                form.setFieldsValue({model:data.ModelData})
                form.setFieldsValue({latitude:data.Location.Latitude})
                form.setFieldsValue({longitude:data.Location.Longitude})
                form.setFieldsValue({encryption_status:data.Security.EncryptionStatus})
                console.log(data)
            })
        }
    },[deviceid])
    //表单提交方法
    const onFinish = (values) => {
        if(deviceid){
            
            setEditData({
                "device_id":values.device_id, 
                "serial_number":values.serial_number,
                "Name":values.Name,
                "model":values.model,
                "location": {
                "latitude": parseFloat(values.latitude),
                "longitude":parseFloat(values.longitude)
              },
              "security": {
                "encryption_status":values.encryption_status,
              } 
            });
           
        }else{
           
        console.log(values)
        setAdd({
            "device_id":values.device_id, 
            "serial_number":values.serial_number,
            "Name":values.Name,
            "model":values.model,
            "location": {
            "latitude": parseFloat(values.latitude),
            "longitude":parseFloat(values.longitude)
          },
          "security": {
            "encryption_status":values.encryption_status,
          } 
        });
        
      };}
      useEffect(()=>{
        if(add.Name){
            $add(add).then(()=>{
                console.log(add);
                 clear()
                 handleSearch()
                 setOpen(false)
             })
        }
    },[add])

    useEffect(()=>{
        if(editData.Name){
            $update(deviceid,editData).then(()=>{
                console.log(deviceid)
                handleSearch()
             })
        }
    },[editData])
      //清空表单
      const clear=()=>{
        form.setFieldsValue({serial_number:""})
        form.setFieldsValue({Name:""})
        form.setFieldsValue({model:""})
        form.setFieldsValue({latitude:""})
        form.setFieldsValue({longitude:""})
        form.setFieldsValue({encryption_status:""})
      }
      //关闭抽屉
    const onClose=()=>{
        clear()//清空表单
        setdeviceid(0)//取消编辑状态
        setOpen(false)//关闭抽屉
    }
    return (
        <>
        <Drawer title={deviceid?'修改角色':'添加角色'}
         width={500} onClose={onClose} open={open}
         destroyOnClose={true}
         >
        
        <Form 
            name="basic"
            form={form}
            labelCol={{
            span: 4,
            }}
            wrapperCol={{
            span: 20,
            }}
            style={{
            maxWidth: 700,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
            label="编号"
            name="device_id"
            hidden
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="编号"
            name="serial_number"
            rules={[
                {
                required: true,
                message: '请输入设备编号',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="名字"
            name="Name"
            rules={[
                {
                required: true,
                message: '请输入设备名字',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="型号"
            name="model"
            rules={[
                {
                required: true,
                message: '请输入型号',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="纬度"
            name="latitude"
            rules={[
                {
                required: true,
                message: '请输入位置',
                },
            ]}
            >
                {
                   <Input>
                   </Input> 
                }
            
            </Form.Item>

            <Form.Item
            label="经度"
            name="longitude"
            rules={[
                {
                required: true,
                message: '请输入位置',
                },
            ]}
            >
                {
                   <Input>
                   </Input> 
                }
            
            </Form.Item>

            <Form.Item
            label="状态"
            name="encryption_status"
            rules={[
                {
                required: true,
                message: '请输入位置',
                },
            ]}
            >
                {
                   <Input>
                   </Input> 
                }
            
            </Form.Item>
            
            <Form.Item
            wrapperCol={{
                offset: 4,
                span: 16,
            }}
            >
            <Button type="primary" htmlType="submit">
                {deviceid?'修改':'添加'}
            </Button>
            <Button onClick={clear} style={{marginLeft:'10px'}}>
                取消
            </Button>
            </Form.Item>
        </Form>
        </Drawer>
        </>
    )
}
