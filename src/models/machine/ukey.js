/* eslint-disable linebreak-style,no-param-reassign */
import { message } from 'antd';
import { viewUkey, queryUkey, removeUkey, addUkey, updateUkey } from '../../services/machineApi';
import { queryExamDataSelect } from '../../services/api';

export default {
  namespace: 'ukey',

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
      const response = yield call(queryUkey, payload);
      if (response.status === '1') {
        yield put({
          type: 'save',
          payload: response.dataMain,
        });
      } else {
        message.error(response.msg);
      }
      console.log('Use查询前端传值：', payload);
      console.log('Use查询后端响应：', response);

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *view({ payload, callback }, { call, put }) {
      const response = yield call(viewUkey, payload);
      if (response.status === '1') {
        yield put({
          type: 'viewSave',
          payload: response.dataMain.machineUkeyVo,
        });
      } else {
        message.error(response.msg);
      }
      console.log('Use详情单条记录前端传值：', payload);
      console.log('Use详情单条记录后端响应：', response);
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addUkey, payload);
      if (response.status === '1') {
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
      console.log('Use列表添加前端传值：', payload);
      console.log('Use列表添加后端响应：', response);
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateUkey, payload);
      if (response.status === '1') {
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
      console.log('Use列表修改前端传值：', payload);
      console.log('Use列表修改后端响应：', response);
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeUkey, payload);
      if (response.status === '1') {
        message.success('删除成功');
      } else {
        message.error(response.msg);
      }
      console.log('Use删除前端传值：', payload);
      console.log('Use删除后端响应：', response);

      if (callback) callback();
    },

    *examDataSelect({ payload, callback }, { call, put }) {
      const response = yield call(queryExamDataSelect, payload);
      console.log('Use硬件设备下拉菜单前端传值：', payload);
      console.log('Use硬件设备下拉菜单后端响应：', response);
      yield put({
        type: 'machineSelectSave',
        payload: response,
      });
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
    examDataSelectSave(state, action) {
      return {
        ...state,
        examDataSelectData: action.payload,
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
