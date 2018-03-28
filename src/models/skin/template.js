/* eslint-disable linebreak-style,no-param-reassign */
import { message } from 'antd';
import { queryTemplate, removeTemplate, addTemplate, updateTemplate, viewTemplate } from '../../services/skinApi';

export default {
  namespace: 'template',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    checkData: {},
    loading: true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryTemplate, payload);
      if (response.status === '1') {
        yield put({
          type: 'save',
          payload: response.dataMain,
        });
      } else {
        message.error(response.msg);
      }
      console.log('Template查询表单前端传值：', payload);
      console.log('Template查询数据后端响应：', response);

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *view({ payload }, { call, put }) {
      const response = yield call(viewTemplate, payload);
      if (response.status === '1') {
        yield put({
          type: 'viewSave',
          payload: response.dataMain.skinTemplateVo,
        });
      } else {
        message.error(response.msg);
      }
      console.log('Template详情单条记录前端传值：', payload);
      console.log('Template详情单条记录后端响应：', response);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addTemplate, payload);
      if (response.status === '1') {
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
      console.log('Template列表添加前端传值：', payload);
      console.log('Template列表添加后端响应：', response);
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateTemplate, payload);
      console.log('Template列表修改前端传值：', payload);
      console.log('Template列表修改后端响应：', response);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeTemplate, payload);
      if (response.status === '1') {
        message.success('删除成功');
      } else {
        message.error(response.msg);
      }
      console.log('Template删除前端传值：', payload);
      console.log('Template删除后端响应：', response);
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    viewSave(state, action) {
      return {
        ...state,
        viewData: action.payload,
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
