/* eslint-disable linebreak-style,no-param-reassign */
import { message } from 'antd';
import { queryClientInfoPage, removeClientInfoPage, addClientInfoPage, updateClientInfoPage, viewClientInfoPage } from '../../services/faceApi';

export default {
  namespace: 'clientInfoPage',

  state: {
    ClientInfo: {
      list: [],
      pagination: {},
    },
    checkClientInfo: {},
    loading: true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryClientInfoPage, payload);
      if (response.status === '1') {
        yield put({
          type: 'save',
          payload: response.ClientInfoMain,
        });
      } else {
        message.error(response.msg);
      }
      console.log('ClientInfoPage查询表单前端传值：', payload);
      console.log('ClientInfoPage查询数据后端响应：', response);

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *view({ payload }, { call, put }) {
      const response = yield call(viewClientInfoPage, payload);
      if (response.status === '1') {
        yield put({
          type: 'viewSave',
          payload: response.ClientInfoMain.faceClientInfoVo,
        });
      } else {
        message.error(response.msg);
      }
      console.log('ClientInfoPage详情单条记录前端传值：', payload);
      console.log('ClientInfoPage详情单条记录后端响应：', response);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addClientInfoPage, payload);
      if (response.status === '1') {
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
      console.log('ClientInfoPage列表添加前端传值：', payload);
      console.log('ClientInfoPage列表添加后端响应：', response);
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateClientInfoPage, payload);
      console.log('ClientInfoPage列表修改前端传值：', payload);
      console.log('ClientInfoPage列表修改后端响应：', response);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeClientInfoPage, payload);
      if (response.status === '1') {
        message.success('删除成功');
      } else {
        message.error(response.msg);
      }
      console.log('ClientInfoPage删除前端传值：', payload);
      console.log('ClientInfoPage删除后端响应：', response);
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ClientInfo: action.payload,
      };
    },
    viewSave(state, action) {
      return {
        ...state,
        viewClientInfo: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
};
