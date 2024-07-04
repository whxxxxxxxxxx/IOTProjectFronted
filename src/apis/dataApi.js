import { request } from "@/utils"

//设备列表
/*export const $list=async()=>{
    let {data}=await request.get('/device')
    console.log(data)
    return data
}*/
export const $list=async(params)=>{
    let {data}=await request.post('/device/page2',params)
    return data
}

export const $searchlist=async(params)=>{
    let {data}=await request.post('/device/search/page2',params)
    return data
}

//添加设备
export const $add=async(params)=>{
    let {data}=await request.post('/device',params)
    return data
}

//删除设备
export const $del=async(params)=>{
    let {data}=await request.delete(`/device/${params}`,params)
    return data
}

//获取单个设备
export const $getone=async(params)=>{
    let {data}=await request.get(`/device/${params}`,params)
    return data
}

//获取单个设备监控数据
export const $getmonitor=async(params)=>{
    let {data}=await request.get(`/device/${params}/monitor`,params)
    return data
}

//修改角色
export const $update=async(id,params)=>{
    let {data}=await request.put(`/device/${id}`,params)
    return data
}