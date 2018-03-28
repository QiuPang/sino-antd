/* eslint-disable linebreak-style,no-param-reassign */
import { message } from 'antd';
import { querySkinPage, removeSkinPage, addSkinPage, updateSkinPage, viewSkinPage } from '../../services/skinApi';

export default {
  namespace: 'skinPage',

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
      const response = yield call(querySkinPage, payload);
      if (response.status === '1') {
        yield put({
          type: 'save',
          payload: response.dataMain,
        });
      } else {
        message.error(response.msg);
      }
      console.log('skinPage查询表单前端传值：', payload);
      console.log('skinPage查询数据后端响应：', response);

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *view({ payload }, { call, put }) {
      const response = yield call(viewSkinPage, payload);
      if (response.status === '1') {
        yield put({
          type: 'viewSave',
          payload: response.dataMain.skinSkinVo,
        });
      } else {
        message.error(response.msg);
      }
      console.log('skinPage详情单条记录前端传值：', payload);
      console.log('skinPage详情单条记录后端响应：', response);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addSkinPage, payload);
      if (response.status === '1') {
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
      console.log('skinPage列表添加前端传值：', payload);
      console.log('skinPage列表添加后端响应：', response);
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateSkinPage, payload);
      console.log('skinPage列表修改前端传值：', payload);
      console.log('skinPage列表修改后端响应：', response);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeSkinPage, payload);
      if (response.status === '1') {
        message.success('删除成功');
      } else {
        message.error(response.msg);
      }
      console.log('skinPage删除前端传值：', payload);
      console.log('skinPage删除后端响应：', response);
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
