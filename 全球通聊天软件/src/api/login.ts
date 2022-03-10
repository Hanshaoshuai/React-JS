import { request } from '../services/request';

import { API_HOST } from './ip';

// 登录1
export async function login(data: any) {
  try {
    const res: any = await request(`${API_HOST}/post`, 'POST', data);
    return res;
  } catch (error) {
    return error;
  }
}

//注册
export async function registers(data: any) {
  try {
    const res: any = await request(`${API_HOST}/registers`, 'POST', data);
    return res;
  } catch (error) {
    return error;
  }
}

//上传头像
export async function fileUpload(data: any) {
  try {
    const res: any = await request(`${API_HOST}/file_upload`, 'POST', data);
    return res;
  } catch (error) {
    return error;
  }
}

//上传文件
export async function uploadFile(data: any) {
  try {
    const res: any = await request(`${API_HOST}/upload`, 'POST', data);
    return res;
  } catch (error) {
    return error;
  }
}

// 朋友圈上传

export async function friendsCircleFileUpload(data: any) {
  try {
    const res: any = await request(
      `${API_HOST}/friendsCircleFileUpload`,
      'POST',
      data
    );
    return res;
  } catch (error) {
    return error;
  }
}
