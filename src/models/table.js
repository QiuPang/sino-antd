/* eslint-disable linebreak-style,no-param-reassign */
import { queryTable, removeTable, addTable, updateTable, checkTable } from '../services/api';

export default {
  namespace: 'table',

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
      const response = yield call(queryTable, payload);
      console.log('考试查询表单前端传值：', payload);
      console.log('考试查询数据后端响应：', response);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *check({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(checkTable, payload);
      console.log('考试启用校验前端传值：', payload);
      console.log('考试启用校验后端响应：', response);
      yield put({
        type: 'checkSave',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *add({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(addTable, payload);
      console.log('考试列表添加前端传值：', payload);
      console.log('考试列表添加后端响应：', response);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });

      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(updateTable, payload);
      console.log('考试列表修改前端传值：', payload);
      console.log('考试列表修改后端响应：', response);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });

      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(removeTable, payload);
      console.log('考试列表删除前端传值：', payload);
      console.log('考试列表删除后端响应：', response);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
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
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    checkSave(state, action) {
      return {
        ...state,
        checkData: action.payload,
      };
    },
  },
};
