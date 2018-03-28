/* eslint-disable linebreak-style,no-param-reassign */
import { message } from 'antd';
import {
  queryExamPlan, removeExamPlan, addExamPlan, updateExamPlan, queryUnitSelect, queryExamNameSelect,
  viewExamPlan } from '../../services/api';

export default {
  namespace: 'examPlan',

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
      const response = yield call(queryExamPlan, payload);
      if (response.status === '1') {
        yield put({
          type: 'save',
          payload: response.dataMain,
        });
      } else {
        message.error(response.msg);
      }
      console.log('examPlan查询前端传值：', payload);
      console.log('examPlan查询后端响应：', response);

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *view({ payload }, { call, put }) {
      const response = yield call(viewExamPlan, payload);
      if (response.status === '1') {
        yield put({
          type: 'viewSave',
          payload: response.dataMain.dataExamPlanVo,
        });
      } else {
        message.error(response.msg);
      }
      console.log('examPlan详情单条记录前端传值：', payload);
      console.log('examPlan详情单条记录后端响应：', response);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addExamPlan, payload);
      if (response.status === '1') {
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
      console.log('examPlan列表添加前端传值：', payload);
      console.log('examPlan列表添加后端响应：', response);

      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateExamPlan, payload);
      console.log('examPlan列表修改前端传值：', payload);
      console.log('examPlan列表修改后端响应：', response);
      yield put({
        type: 'save',
        payload: response,
      });

      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeExamPlan, payload);
      if (response.status === '1') {
        message.success('删除成功');
      } else {
        message.error(response.msg);
      }
      console.log('examPlan删除前端传值：', payload);
      console.log('examPlan删除后端响应：', response);

      if (callback) callback();
    },
    *unitSelect({ payload, callback }, { call, put }) {
      const response = yield call(queryUnitSelect, payload);
      console.log('examPlan单位下拉菜单前端传值：', payload);
      console.log('examPlan单位下拉菜单后端响应：', response);
      yield put({
        type: 'unitSelectSave',
        payload: response,
      });
      if (callback) callback();
    },
    *examNameSelect({ payload, callback }, { call, put }) {
      const response = yield call(queryExamNameSelect, payload);
      console.log('examPlan考试名称下拉菜单前端传值：', payload);
      console.log('examPlan考试名称下拉菜单后端响应：', response);
      yield put({
        type: 'examNameSelectSave',
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
    unitSelectSave(state, action) {
      return {
        ...state,
        unitSelectData: action.payload,
      };
    },
    examNameSelectSave(state, action) {
      return {
        ...state,
        examNameSelectData: action.payload,
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
